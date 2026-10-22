"""Busca no Microsoft Learn (API pública de busca) candidatos de documentação para cada
item do Skills Measured. Uso: python3 search.py CODE "contexto"  → enrich/<CODE>/cand.json"""
import sys, json, urllib.parse, subprocess, os, re, time
CODE, CTX = sys.argv[1], sys.argv[2]
BASE = '/home/claude/enrich'
sk = json.load(open(f'{BASE}/{CODE}/skills.base.json'))
SKIP = re.compile(r'/(training|credentials|answers|shows|events|lifecycle|samples|legal|previous-versions|archive)/')
def search(q, top=10):
    url = 'https://learn.microsoft.com/api/search?' + urllib.parse.urlencode({'search': q, 'locale': 'en-us', '$top': top})
    for _ in range(3):
        try:
            r = subprocess.run(['curl', '-s', '--max-time', '20', url], capture_output=True, text=True)
            return json.loads(r.stdout).get('results', [])
        except Exception:
            time.sleep(1)
    return []
out = {}
for s in sk['skills']:
    for it in s['items']:
        res = [r for r in search(f"{it['t']} {CTX}") if r.get('url', '').startswith('https://learn.microsoft.com/en-us/') and not SKIP.search(r['url'])]
        out[f"{s['id']}|{it['t']}"] = [{'t': r['title'], 'u': r['url'].split('?')[0].split('#')[0]} for r in res[:5]]
json.dump(out, open(f'{BASE}/{CODE}/cand.json', 'w'), ensure_ascii=False, indent=1)
for k, v in out.items():
    print('##', k)
    for i, r in enumerate(v): print(f'   {i} {r["t"]} | {r["u"].replace("https://learn.microsoft.com/en-us/","")}')
