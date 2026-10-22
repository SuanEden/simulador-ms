"""Monta exams/SC-300/questions.js a partir de work/qs.json + ann/*.py."""
import json, re, glob, os, sys, shutil
sys.path.insert(0, '/home/claude/az104/tools')
import mk
from PIL import Image

W = '/home/claude/az104'
OUT = '/home/claude/SimuladorMS/exams/SC-300'
q = json.load(open(W + '/work/qs.json'))
cat = json.load(open(W + '/work/cat.json'))

A = []
for f in sorted(glob.glob(W + '/ann/*.py')):
    g = {}
    exec(open(f).read(), g)
    A += g['A']
ann = {}
for a in A:
    assert a['n'] not in ann, ('duplicada', a['n'])
    ann[a['n']] = a

CASEMAP = {'CASE264': 'CONTOSO_A'}
CASE_END = {  # última frase do texto do caso; a pergunta começa depois dela
    'LITWARE': 'The principle of least privilege must be used.',
    'CONTOSO_A': 'probability that the users',
    'CONTOSO_B': 'anomalous Microsoft Office 365 activity.',
}
used_imgs = set()


def img_md(line):
    m = re.match(r'\[\[IMG (\S+) (\d+)x(\d+)\]\]', line)
    name, w = m.group(1), int(m.group(2))
    used_imgs.add(name)
    return f'![Exhibit](img/{name}){{w={round(w * 1.3)}}}'


def clean_line(l):
    l = l.replace('’', "'").replace('“', '"').replace('”', '"').replace('–', '-')
    l = re.sub(r'^[•]\s*', '- ', l)
    l = re.sub(r'^o\s+(?=[A-Z])', '  - ', l)
    return l


def strip_case(n, lines, cid):
    end = CASE_END[cid]
    k = None
    for i, l in enumerate(lines):
        if end in l:
            k = i
    assert k is not None, ('case end not found', n)
    tail = lines[k]
    j = tail.find(end)
    # resto da linha após a frase final (ex.: "... compromised. Question HOTSPOT -")
    rest = tail[j + len(end):]
    if cid == 'CONTOSO_A':
        rest = rest.split('.', 1)[1] if '.' in rest else ''
    out = ([rest.strip()] if rest.strip() else []) + lines[k + 1:]
    return out


def tidy(lines, kind):
    out = []
    for l in lines:
        l = l.strip()
        l = re.sub(r'^Question\s*', '', l)
        if re.match(r'^(HOTSPOT|DRAG DROP)\s*-?$', l):
            continue
        l = re.sub(r'^(HOTSPOT|DRAG DROP)\s*-?\s*', '', l)
        if re.match(r'^(Hot Area|Select and Place|Answer Area)\s*:?\s*$', l):
            continue
        if not l:
            continue
        out.append(l)
    if kind in ('HOT', 'DD'):  # remove a imagem da área de resposta (a última)
        for i in range(len(out) - 1, -1, -1):
            if out[i].startswith('[[IMG'):
                del out[i]
                break
    return out


def urls(text):
    toks = text.split()
    res, i = [], 0
    while i < len(toks):
        t = toks[i]
        if t.startswith('http'):
            u = t
            while (u.endswith('-') or u.endswith('/')) and i + 1 < len(toks) and not toks[i + 1].startswith('http') \
                    and re.match(r'^[a-z0-9][a-z0-9\-/#?=._&]*$', toks[i + 1]):
                i += 1
                u += toks[i]
            u = u.rstrip('.,;)')
            if u not in res:
                res.append(u)
        i += 1
    return res[:4]


def to_text(lines):
    blocks = []
    for l in lines:
        if l.startswith('[[IMG'):
            blocks.append(img_md(l))
        else:
            blocks.append(clean_line(l))
    # junta itens de lista consecutivos num bloco só
    txt, prev_list = '', False
    for b in blocks:
        is_list = b.startswith('- ') or b.startswith('  - ')
        kind = 'list' if is_list else ('table' if b.startswith('|') else None)
        if txt:
            txt += '\n' if (kind and kind == prev_list) else '\n\n'
        txt += b
        prev_list = kind
    txt = txt.replace('review screen. You ', 'review screen.\n\nYou ')
    txt = re.sub(r' (Solution: )', r'\n\n\1', txt)
    return txt


def build(n):
    a = ann[n]
    kind = cat[str(n)]
    x = q[str(n)]
    lines = mk.join(x['stem'])
    cid = mk.caseof.get(n) or (a['g'][1] if a.get('g') and a['g'][0] == 'case' else None)
    cid = CASEMAP.get(cid, cid)
    group = None
    if cid:
        lines = strip_case(n, lines, cid)
        group = {'kind': 'case', 'id': cid}
    elif a.get('g'):
        group = {'kind': a['g'][0], 'id': CASEMAP.get(a['g'][1], a['g'][1])}
    lines = [l.replace('\u00a0', ' ') for l in lines]
    if a.get('fix'):
        t = '\n'.join(lines)
        for old, new in a['fix'].items():
            if old not in t:
                print('!! fix não aplicado', n, old[:50])
            t = t.replace(old, new)
        lines = t.split('\n')
    lines = tidy(lines, kind)
    rec = {'id': 'Q%03d' % n, 'src': n, 'domain': a['d'], 'topic': a['t']}

    if kind == 'OPT':
        opts, stem, correct = [], [], []
        for l in lines:
            m = re.match(r'^([A-H])\) (.*)$', l)
            if m:
                opts.append(m.group(2))
            elif opts:
                opts[-1] += ' ' + l  # continuação da alternativa
            else:
                stem.append(l)
        for i, t in enumerate(opts):
            if '(Correct Answer)' in t:
                correct.append(i)
                opts[i] = re.sub(r'\s*\(Correct Answer\)\s*', ' ', t).strip()
        if not correct:
            letters = re.findall(r'Correct Answer:\s*([A-H]+)', ' '.join(x['expl']))
            correct = [ord(c) - 65 for c in letters[0]] if letters else []
        assert opts and correct, ('sem opções/gabarito', n)
        orig = correct
        if a.get('a'):
            correct = [ord(c) - 65 for c in a['a']]
        multi = len(correct) > 1 or len(orig) > 1
        rec['type'] = 'multi' if multi else 'single'
        rec['stem'] = to_text(stem)
        rec['options'] = opts
        rec['answer'] = sorted(correct) if multi else correct[0]
        if sorted(correct) != sorted(orig):
            rec['answer_original'] = sorted(orig) if multi else orig[0]
            rec.setdefault('_rev', 'corrigida')
        if opts[:2] == ['Yes', 'No'] and len(opts) == 2:
            rec['shuffle'] = False
    else:
        rec['stem'] = to_text(lines)
        if 'yn' in a:
            rec['type'] = 'yesno'
            rec['statements'] = list(a['yn'])
            rec['answer'] = [c == 'Y' for c in a['ans']]
            if a.get('ans_orig'):
                rec['answer_original'] = [c == 'Y' for c in a['ans_orig']]
        elif 'slots' in a:
            rec['type'] = 'hotarea'
            rec['slots'] = [{'label': lab, 'options': o.split('|'), 'answer': i} for lab, o, i in a['slots']]
            if a.get('ans_orig'):
                rec['answer_original'] = list(a['ans_orig'])
        elif 'panel' in a:
            title, o, ans = a['panel']
            rec['type'] = 'multi'
            rec['layout'] = 'panel'
            rec['panelTitle'] = title
            rec['options'] = o.split('|')
            rec['answer'] = [int(v) for v in ans.split(',')]
            rec['shuffle'] = False
        elif 'order' in a:
            pool, ans = a['order']
            rec['type'] = 'order'
            rec['pool'] = pool
            rec['answer'] = list(ans)
            if a.get('ans_orig'):
                rec['answer_original'] = list(a['ans_orig'])
        elif 'match' in a:
            pool, tg = a['match']
            rec['type'] = 'match'
            rec['pool'] = pool
            rec['targets'] = [{'label': lab, 'answer': i} for lab, i in tg]
            if a.get('ans_orig'):
                rec['answer_original'] = list(a['ans_orig'])
        else:
            raise SystemExit(('sem estrutura', n))
    if group:
        rec['group'] = group
    s = a.get('s', 'in')
    rec['scope'] = 'in' if s == 'default' else s
    rec['review'] = a.get('r') or rec.pop('_rev', 'ok')
    rec.pop('_rev', None)
    rec['explanation'] = a['e']
    r = urls(' '.join(x['expl']))
    if r:
        rec['refs'] = r
    # ordem de chaves amigável
    order = ['id', 'src', 'domain', 'topic', 'type', 'layout', 'panelTitle', 'group', 'stem', 'statements', 'options', 'slots',
             'pool', 'targets', 'answer', 'answer_original', 'shuffle', 'scope', 'review', 'explanation', 'refs']
    return {k: rec[k] for k in order if k in rec}


recs, skipped = [], {'dup': [], 'out': [], 'SIM': []}
for k in sorted(cat, key=int):
    n = int(k)
    if cat[k] == 'SIM':
        skipped['SIM'].append(n); continue
    a = ann.get(n)
    assert a, ('sem anotação', n)
    if a.get('s') == 'dup':
        skipped['dup'].append(n); continue
    if a.get('s') == 'out':
        skipped['out'].append(n); continue
    recs.append(build(n))

if __name__ == '__main__':
    os.makedirs(OUT + '/img', exist_ok=True)
    for f in glob.glob(OUT + '/img/*'):
        os.remove(f)
    tot = 0
    for name in sorted(used_imgs):
        im = Image.open(W + '/work/img/' + name).convert('RGB')
        # reduz para no máx. 1100 px de largura e quantiza para PNG leve
        if im.width > 1100:
            im = im.resize((1100, round(im.height * 1100 / im.width)), Image.LANCZOS)
        im = im.quantize(colors=128, method=Image.Quantize.MEDIANCUT)
        p = OUT + '/img/' + name
        im.save(p, optimize=True)
        tot += os.path.getsize(p)
    from collections import Counter
    head = f'''/* =====================================================================
   SimuladorMS — banco de questões SC-300
   Fonte: dump SC-300 (ExamTopics, 413 questões) — curadoria Claude, out/2026.
   {len(recs)} questões estruturadas. Fora do banco: {len(skipped['dup'])} duplicadas/variantes,
   {len(skipped['out'])} fora de escopo (Microsoft Entra Permissions Management, descontinuado,
   e questões inconsistentes) e {len(skipped['SIM'])} simulações (labs).

   Campos de curadoria:
     scope   in | borderline | out        → o simulado usa só "in" (borderline é opcional)
     review  ok | corrigida | duvidosa    → corrigida = gabarito do dump foi alterado
     answer_original                      → o que o dump marcava, quando difere
   ===================================================================== */
SIM.registerQuestions("SC-300", '''
    open(OUT + '/questions.js', 'w').write(head + json.dumps(recs, ensure_ascii=False, indent=2) + ');\n')
    print('questões', len(recs), 'imagens', len(used_imgs), 'KB', tot // 1024)
    print('tipos', Counter(r['type'] for r in recs))
    print('domínios', Counter(r['domain'] for r in recs))
    print('scope', Counter(r['scope'] for r in recs), 'review', Counter(r['review'] for r in recs))
    print('skipped', {k: len(v) for k, v in skipped.items()})
    json.dump(skipped, open(W + '/work/skipped.json', 'w'))
