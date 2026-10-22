"""Enriquece o banco de uma prova com skill, detalhes e documentação do Learn, e gera docs.js.
Uso: python3 enrich.py CODE
Entradas (em enrich/<CODE>/):
  skills.base.json   ← tools/skills.py (Skills Measured do study guide oficial)
  catalog.py         ITEMS = {"1.2.3": ["caminho/learn", ...]}   docs por item do Skills Measured
  topics.py          T = {"tópico da questão": "1.2.3"}          item padrão por tópico
  details/*.py       DET = {"Q001": "markdown"} · ITEM = {"Q001": "1.2.3"} · QDOCS = {"Q001": ["caminho"]} · FIX = {"Q001": {campo: valor}}
                     TX = {"tópico": ["caminho"]} (docs extras por tópico) · BADREF = ["trecho de título de ref do dump a descartar"]
Saídas: exams/<CODE>/questions.js (campos skill, details, docs) e exams/<CODE>/docs.js"""
import sys, json, glob, os, re, subprocess, importlib.util, datetime
sys.path.insert(0, '/home/claude/enrich/tools'); import linkcheck
CODE = sys.argv[1]
B = f'/home/claude/enrich/{CODE}'; EX = f'/home/claude/SimuladorMS/exams/{CODE}'
L = 'https://learn.microsoft.com/en-us/'
def mod(path):
    spec = importlib.util.spec_from_file_location(os.path.basename(path)[:-3], path); m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m); return m
sk = json.load(open(f'{B}/skills.base.json'))
ITEMS = mod(f'{B}/catalog.py').ITEMS
T = mod(f'{B}/topics.py').T
DET, ITEM, QDOCS, FIX, TX, BADREF = {}, {}, {}, {}, {}, []
for f in sorted(glob.glob(f'{B}/details/*.py')):
    m = mod(f)
    BADREF += getattr(m, 'BADREF', [])
    for name, dst in (('DET', DET), ('ITEM', ITEM), ('QDOCS', QDOCS), ('FIX', FIX), ('TX', TX)):
        for k, v in getattr(m, name, {}).items():
            assert k not in dst or name == 'QDOCS', (f, name, k)
            dst[k] = v
src = open(f'{EX}/questions.js', encoding='utf-8').read()
cut = src.index('SIM.registerQuestions(')
head = src[:cut]
Q = json.loads(subprocess.check_output(['node', '-e', f'global.SIM={{registerQuestions:(c,a)=>{{console.log(JSON.stringify(a))}}}};require("{EX}/questions.js")']))
# FIX = {"Q001": {campo: valor}} corrige o banco (gabarito, opções, explicação) e fica registrado aqui
for q in Q:
    for k, v in FIX.get(q['id'], {}).items():
        if k == 'slots' and isinstance(v, dict):
            for j, sv in v.items(): q['slots'][int(j)].update(sv)
        else: q[k] = v
def full(p):
    if not p.startswith('http'): return L + p
    p = re.sub(r'^https?://docs\.microsoft\.com/', 'https://learn.microsoft.com/', p, flags=re.I)
    p = re.sub(r'^(https://learn\.microsoft\.com/)[a-z]{2}(-[a-z]{2,4}){1,2}/', r'\1en-us/', p, flags=re.I)
    if re.match(r'^https://learn\.microsoft\.com/(?!en-us/)', p): p = p.replace('https://learn.microsoft.com/', L, 1)
    return p
MSFT = re.compile(r'^https?://(learn|docs|support|techcommunity|azure)\.microsoft\.com/', re.I)
# coleta de URLs a validar
urls = set(full(p).split('#')[0] for v in ITEMS.values() for p in v)
for q in Q:
    for u in q.get('refs', []):
        if MSFT.match(u): urls.add(full(u).split('#')[0])
    for p in QDOCS.get(q['id'], []): urls.add(full(p).split('#')[0])
for tv in T.values():
    if isinstance(tv, (tuple, list)):
        for p in tv[1]: urls.add(full(p).split('#')[0])
for ps in TX.values():
    for p in ps: urls.add(full(p).split('#')[0])
C = linkcheck.check(sorted(urls))
def doc(u):
    u0 = full(u).split('#')[0]; i = C.get(u0)
    if not i or i['code'] != 200 or i['hub'] or not i['t'] or i['t'].startswith('404'): return None
    if not i['final'].startswith('https://learn.microsoft.com/') and not i['final'].startswith('https://techcommunity.microsoft.com/') and not i['final'].startswith('https://azure.microsoft.com/'): return None
    if any(b.lower() in i['t'].lower() for b in BADREF): return None
    return {'t': i['t'], 'u': i['final']}
HEAD = {'single': 'Por que não as outras', 'multi': 'Por que não as outras', 'yesno': 'Item a item', 'hotarea': 'Item a item', 'order': 'Sequência', 'match': 'Item a item'}
def fmt(txt, typ):
    """Sintaxe curta dos detalhes: 'Rótulo :: motivo' vira item com rótulo em negrito (cabeçalho automático
    conforme o tipo); '! texto' vira 'Dica de prova'; '#nohead' na 1ª linha suprime o cabeçalho."""
    lines, out, items, nohead = txt.strip().splitlines(), [], False, False
    if lines and lines[0].strip() == '#nohead': nohead, lines = True, lines[1:]
    for ln in lines:
        ln = ln.strip()
        if not ln: continue
        if ln.startswith('! '): out.append(('tip', ln[2:].strip()))
        elif ' :: ' in ln:
            k, v = ln.split(' :: ', 1); out.append(('it', f'- **{k.strip()}:** {v.strip()}')); items = True
        else: out.append(('p', ln))
    md, prev = [], None
    for kind, t in out:
        if kind == 'tip': md.append(''); md.append(f'**Dica de prova:** {t}')
        elif kind == 'it':
            if prev != 'it':
                if md: md.append('')
                if not nohead and prev != 'p': md.append(f'**{HEAD[typ]}**')
            md.append(t)
        else:
            if md: md.append('')
            md.append(t)
        prev = kind
    return '\n'.join(md).strip()
itemdocs = {k: [d for d in (doc(full(p)) for p in v) if d] for k, v in ITEMS.items()}
missing_topic, warn = set(), []
for q in Q:
    tv = T.get(q.get('topic')); tdocs = []
    if isinstance(tv, (tuple, list)): tv, tdocs = tv[0], list(tv[1])
    tdocs = TX.get(q.get('topic'), []) + tdocs
    it = ITEM.get(q['id']) or tv
    if not it: missing_topic.add(q.get('topic')); continue
    if it not in itemdocs: warn.append(('item inexistente', q['id'], it)); continue
    q['skill'] = '.'.join(it.split('.')[:2]); q['_item'] = it
    ds, seen = [], set()
    cand = [doc(full(p)) for p in QDOCS.get(q['id'], []) + tdocs] + [doc(u) for u in q.get('refs', []) if MSFT.match(u)] + itemdocs[it]
    for d in cand:
        if d and d['u'] not in seen and len(ds) < 4: seen.add(d['u']); ds.append(d)
    q['docs'] = ds
    if q['id'] in DET: q['details'] = fmt(DET[q['id']], q['type'])
if missing_topic: print('TÓPICOS SEM ITEM:', sorted(missing_topic))
for qid, ps in QDOCS.items():
    for p in ps:
        if not doc(full(p)): print('!! QDOC inválido', qid, p, C.get(full(p).split('#')[0]))
for tv in T.values():
    if isinstance(tv, (tuple, list)):
        for p in tv[1]:
            if not doc(full(p)): print('!! doc de tópico inválido', p, C.get(full(p).split('#')[0]))
for tp, ps in TX.items():
    if tp not in T: print('!! TX tópico inexistente', tp)
    for p in ps:
        if not doc(full(p)): print('!! TX inválido', tp, p, C.get(full(p).split('#')[0]))
for w in warn: print('!!', w)
order = ['id', 'src', 'domain', 'skill', 'topic', 'type', 'layout', 'panelTitle', 'group', 'stem', 'statements', 'options', 'slots', 'pool', 'targets',
         'answer', 'answer_original', 'shuffle', 'scope', 'review', 'explanation', 'details', 'docs', 'refs']
out = []
for q in Q:
    q.pop('_item', None)
    out.append({k: q[k] for k in order if k in q} | {k: v for k, v in q.items() if k not in order})
open(f'{EX}/questions.js', 'w', encoding='utf-8').write(head + 'SIM.registerQuestions("%s", ' % CODE + json.dumps(out, ensure_ascii=False, indent=2) + ');\n')
# docs.js
skills = []
for s in sk['skills']:
    items = [{'t': it['t'], 'docs': itemdocs.get(f"{s['id']}.{i}", [])} for i, it in enumerate(s['items'], 1)]
    skills.append({'id': s['id'], 'domain': s['domain'], 'name': s['name'], 'items': items})
today = datetime.date.today().strftime('%d/%m/%Y')
meta = {'updated': today, 'source': sk['source'], 'note': f"Itens do *{sk['block']}*. Cada questão do banco aponta para uma skill (botão **Skill** na explicação)."}
js = f'''/* =====================================================================
   SimuladorMS — documentação por skill · {CODE}
   Gerado por enrich.py a partir do study guide oficial e do catálogo curado.
   Links verificados no Microsoft Learn em {today}.
   ===================================================================== */
SIM.registerDocs("{CODE}", ''' + json.dumps(dict(meta, skills=skills), ensure_ascii=False, indent=1) + ');\n'
open(f'{EX}/docs.js', 'w', encoding='utf-8').write(js)
from collections import Counter
print('questões', len(Q), '· com skill', sum(1 for q in Q if 'skill' in q), '· com detalhes', sum(1 for q in Q if 'details' in q),
      '· docs/questão', round(sum(len(q.get('docs', [])) for q in Q) / len(Q), 2), '· sem docs', sum(1 for q in Q if not q.get('docs')))
print('por skill', sorted(Counter(q.get('skill') for q in Q).items(), key=lambda x: str(x[0])))
print('itens sem doc', [k for k, v in itemdocs.items() if not v])
