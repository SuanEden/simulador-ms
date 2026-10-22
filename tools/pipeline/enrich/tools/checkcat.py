import sys, importlib.util
sys.path.insert(0, '/home/claude/enrich/tools'); import linkcheck
CODE = sys.argv[1]
spec = importlib.util.spec_from_file_location('c', f'/home/claude/enrich/{CODE}/catalog.py'); m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
L = 'https://learn.microsoft.com/en-us/'
urls = [L + p.split('#')[0] for v in m.ITEMS.values() for p in v]
c = linkcheck.check(urls)
bad = 0
for k, v in m.ITEMS.items():
    for p in v:
        i = c[L + p.split('#')[0]]
        if i['code'] != 200 or i['hub'] or i['t'].startswith('404'):
            bad += 1; print('BAD', k, p, i)
        elif i['final'] != L + p.split('#')[0]:
            print('redir', k, p, '->', i['final'].replace(L, ''))
print('total', len(set(urls)), 'bad', bad)
