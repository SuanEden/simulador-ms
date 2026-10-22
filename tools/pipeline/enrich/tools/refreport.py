"""Lista títulos das refs do dump por tópico (para montar BADREF/TX). Uso: refreport.py CODE"""
import json, subprocess, re, sys
sys.path.insert(0, '/home/claude/enrich/tools'); import linkcheck
C = linkcheck.load(); CODE = sys.argv[1]
def full(p):
    p = re.sub(r'^https?://docs\.microsoft\.com/', 'https://learn.microsoft.com/', p, flags=re.I)
    p = re.sub(r'^(https://learn\.microsoft\.com/)[a-z]{2}(-[a-z]{2,4}){1,2}/', r'\1en-us/', p, flags=re.I)
    return p.split('#')[0]
Q = json.loads(subprocess.check_output(['node', '-e', f'global.SIM={{registerQuestions:(c,a)=>{{console.log(JSON.stringify(a))}}}};require("/home/claude/SimuladorMS/exams/{CODE}/questions.js")']))
seen = set()
for q in sorted(Q, key=lambda q: q.get('topic', '')):
    for u in q.get('refs', []):
        i = C.get(full(u))
        if i and i['code'] == 200:
            k = (q['topic'][:32], i['t'][:80])
            if k not in seen: seen.add(k); print(f"{k[0]:32} | {k[1]}")
    if not q.get('refs'):
        k = (q['topic'][:32], '— (sem ref) 1º doc: ' + (q['docs'][0]['t'][:60] if q.get('docs') else ''))
        if k not in seen: seen.add(k); print(f"{k[0]:32} | {k[1]}")
