"""Gera exams/<CODE>/labs.js a partir de labs/src/*.md."""
import glob, json, re, subprocess, sys
from collections import Counter

CODE = sys.argv[1] if len(sys.argv) > 1 else 'MD-102'
SRC = sys.argv[2] if len(sys.argv) > 2 else '/home/claude/labs/src'
OUT = f'/home/claude/SimuladorMS/exams/{CODE}/labs.js'
SECTIONS = ['overview', 'prereqs', 'steps', 'test', 'evidence', 'expected', 'variations', 'breakit', 'cleanup', 'refs']

# domínios das questões (lidos do banco via node)
qd = json.loads(subprocess.check_output(['node', '-e', f'''
global.SIM={{registerQuestions:(c,a)=>{{global.Q=a}}}};require("/home/claude/SimuladorMS/exams/{CODE}/questions.js");
console.log(JSON.stringify(Object.fromEntries(Q.map(q=>[q.id,q.domain]))))''']))

env, labs = None, []
for f in sorted(glob.glob(SRC + '/*.md')):
    for block in re.split(r'^=== ', open(f).read(), flags=re.M)[1:]:
        head, *rest = block.split('\n', 1)
        body = rest[0] if rest else ''
        parts = [p.strip() for p in head.split('|')]
        cur = {}
        meta, secs = body.split('\n## ', 1) if '\n## ' in '\n' + body else ('', body)
        if body.startswith('## '):
            meta, secs = '', body[3:]
        for line in meta.strip().splitlines():
            k, _, v = line.partition(':')
            cur[k.strip()] = v.strip()
        sec = {}
        for chunk in re.split(r'^## ', secs, flags=re.M):
            if not chunk.strip():
                continue
            name, _, txt = chunk.partition('\n')
            name = name.strip()
            assert name in SECTIONS, (parts[0], name)
            sec[name] = txt.strip()
        if parts[0] == 'ENV':
            env = {'title': parts[1], **sec}
            continue
        lid, title, kind, minutes = parts
        qs = [x.strip() for x in cur.get('questions', '').split(',') if x.strip()]
        for x in qs:
            assert x in qd, (lid, 'questão inexistente', x)
        pred = cur.get('predict') or None
        assert not pred or pred in qs, (lid, 'predict fora da lista')
        for need in ('overview', 'steps'):
            assert need in sec, (lid, 'falta', need)
        refs = [l[2:].strip() for l in sec.pop('refs', '').splitlines() if l.startswith('- ')]
        dom = Counter(qd[x] for x in qs).most_common(1)[0][0] if qs else 5
        labs.append(dict(id=lid, title=title, kind=kind, minutes=int(minutes), domain=dom,
                         questions=qs, predict=pred, refs=refs, **sec))

ids = [l['id'] for l in labs]
assert len(ids) == len(set(ids))
covered = sorted({q for l in labs for q in l['questions']})
head = f'''/* =====================================================================
   SimuladorMS — labs práticos {CODE}
   {len(labs)} labs montados a partir do banco de questões. Cada lab aponta para as
   questões que ele cobre (campo questions); o app mostra o link "Fazer o lab"
   na explicação dessas questões.
   Sintaxe extra de markdown usada aqui:
     @ Portal: Menu > Submenu > Item     → caminho de navegação
     ```powershell ... ```               → bloco de código com botão Copiar
     1. item                             → lista numerada
     ! texto  /  ? texto                 → aviso  /  dica
   ===================================================================== */
SIM.registerLabs("{CODE}", '''
open(OUT, 'w').write(head + json.dumps({'env': env, 'labs': labs}, ensure_ascii=False, indent=1) + ');\n')
print(len(labs), 'labs ·', len(covered), 'questões cobertas de', len(qd))
print(Counter(l['kind'] for l in labs), Counter(l['domain'] for l in labs))
