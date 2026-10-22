"""Valida URLs do Learn e guarda título + URL final em cache/links.json.
Uso: python3 linkcheck.py url1 url2 ...   (ou importar check(urls))"""
import json, os, re, sys, html, subprocess, concurrent.futures as cf
CACHE = '/home/claude/enrich/cache/links.json'
def load():
    return json.load(open(CACHE)) if os.path.exists(CACHE) else {}
def _one(u):
    r = subprocess.run(['curl', '-sL', '--max-time', '25', '-w', '\n%{http_code} %{url_effective}', u], capture_output=True, text=True, errors='replace')
    body, _, tail = r.stdout.rpartition('\n')
    try: code, final = tail.split(' ', 1)
    except ValueError: code, final = '000', u
    m = re.search(r'<title>(.*?)</title>', body, re.S)
    t = html.unescape(m.group(1)).strip() if m else ''
    t = re.sub(r'\s*\|\s*Microsoft Learn\s*$', '', t)
    final = final.split('?')[0].split('#')[0]
    # redirecionou para uma página genérica (raiz de produto / hub)?
    hub = len([p for p in final.replace('https://learn.microsoft.com/en-us/', '').split('/') if p]) <= 2 and len([p for p in u.replace('https://learn.microsoft.com/en-us/', '').split('/') if p]) > 2
    return u, {'code': int(code) if code.isdigit() else 0, 'final': final, 't': t, 'hub': hub}
def check(urls, force=False):
    c = load()
    todo = [u for u in dict.fromkeys(urls) if force or u not in c]
    with cf.ThreadPoolExecutor(8) as ex:
        for u, info in ex.map(_one, todo):
            c[u] = info
    json.dump(c, open(CACHE, 'w'), ensure_ascii=False, indent=0)
    return c
if __name__ == '__main__':
    c = check(sys.argv[1:], force=True)
    for u in sys.argv[1:]: print(c[u])
