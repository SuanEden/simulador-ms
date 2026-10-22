"""Lê o study guide oficial (Learn) e monta o esqueleto de skills da prova.
Uso: python3 skills.py CODE   → enrich/<CODE>/skills.base.json
Pega a lista de domínios cujo nome bate com os domínios do exam.js (útil quando o
study guide traz a versão atual e a próxima)."""
import re, sys, json, html, subprocess, os, difflib
CODE = sys.argv[1]
BASE = '/home/claude/enrich'
url = f'https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/{CODE.lower()}'
cache = f'{BASE}/cache/sg-{CODE.lower()}.html'
if not os.path.exists(cache):
    subprocess.run(['curl', '-sL', '--max-time', '40', url, '-o', cache], check=True)
t = open(cache, encoding='utf-8').read()
txt = lambda s: re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', '', s))).strip()
# tokens em ordem: h2, h3, h4, li
toks = [(m.group(1), txt(m.group(2))) for m in re.finditer(r'<(h2|h3|h4|li)\b[^>]*>(.*?)</\1>', t, re.S)]
exam = json.loads(subprocess.check_output(['node', '-e', f'''
global.SIM={{registerExam:d=>{{console.log(JSON.stringify(d.domains))}}}};require("/home/claude/SimuladorMS/exams/{CODE}/exam.js")''']))
names = [d['name'] for d in exam]
# blocos: cada h3 com % é um domínio
blocks = []; cur = None; sk = None
for tag, s in toks:
    if tag == 'h2':
        cur = None; sk = None
        blocks.append({'h2': s, 'domains': []}); continue
    if not blocks: continue
    if tag == 'h3':
        m = re.match(r'(.*?)\s*\((\d+)\s*[–-]\s*(\d+)\s*%\)', s)
        if m:
            cur = {'name': m.group(1).strip(), 'min': int(m.group(2)), 'max': int(m.group(3)), 'skills': []}
            blocks[-1]['domains'].append(cur); sk = None
        else:
            cur = None; sk = None
    elif tag == 'h4' and cur is not None:
        sk = {'name': s, 'items': []}; cur['skills'].append(sk)
    elif tag == 'li' and sk is not None:
        sk['items'].append(s)
cands = [b for b in blocks if b['domains'] and any(d['skills'] for d in b['domains'])]
def score(b):
    return sum(max(difflib.SequenceMatcher(None, n.lower(), d['name'].lower()).ratio() for d in b['domains']) for n in names)
best = max(cands, key=score)
print('bloco escolhido:', best['h2'], '| score', round(score(best), 2), '| candidatos:', [c['h2'] for c in cands])
out = []
for di, n in enumerate(names, 1):
    d = max(best['domains'], key=lambda d: difflib.SequenceMatcher(None, n.lower(), d['name'].lower()).ratio())
    for si, s in enumerate(d['skills'], 1):
        out.append({'id': f'{di}.{si}', 'domain': di, 'name': s['name'], 'items': [{'t': i} for i in s['items']]})
    print(f'D{di} {n}  ←  {d["name"]} ({len(d["skills"])} skills)')
os.makedirs(f'{BASE}/{CODE}', exist_ok=True)
json.dump({'source': url, 'block': best['h2'], 'skills': out}, open(f'{BASE}/{CODE}/skills.base.json', 'w'), ensure_ascii=False, indent=1)
for s in out: print(' ', s['id'], s['name'], len(s['items']))
