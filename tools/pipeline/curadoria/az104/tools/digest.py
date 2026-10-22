import json, re, sys, difflib
q = json.load(open('/home/claude/az104/work/qs.json'))
def norm(lines):
    return re.sub(r'\W+',' ',' '.join(l for l in lines if not l.startswith('[[IMG'))).lower()
keys = {n: norm(x['stem'])[:600] for n,x in q.items()}
# duplicates
ns = sorted(q, key=int); dups=[]
for i,a in enumerate(ns):
    for b in ns[i+1:]:
        if abs(len(keys[a])-len(keys[b]))>80: continue
        r = difflib.SequenceMatcher(None, keys[a], keys[b]).ratio()
        if r>0.97: dups.append((int(a),int(b),round(r,3)))
print('dups', dups)
