import json,re,difflib
q=json.load(open('/home/claude/az104/work/qs.json'))
d=json.load(open('/home/claude/az104/work/dups.json'))
def norm(lines): return re.sub(r'\W+',' ',' '.join(l for l in lines if not l.startswith('[[IMG'))).lower().strip()
for a,b,r in d['near']:
    x,y=norm(q[str(a)]['stem']).split(),norm(q[str(b)]['stem']).split()
    sm=difflib.SequenceMatcher(None,x,y,autojunk=False)
    df=[(' '.join(x[i1:i2]),' '.join(y[j1:j2])) for t,i1,i2,j1,j2 in sm.get_opcodes() if t!='equal']
    print(a,b,r,' || '.join(f'[{u[:70]}]->[{v[:70]}]' for u,v in df)[:400])
