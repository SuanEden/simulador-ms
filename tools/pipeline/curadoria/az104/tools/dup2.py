import json, re, difflib
q = json.load(open('/home/claude/az104/work/qs.json'))
def norm(lines): return re.sub(r'\W+',' ',' '.join(l for l in lines if not l.startswith('[[IMG'))).lower()
tail={n: norm(x['stem'])[-700:] for n,x in q.items()}
ns=sorted(q,key=int); d=[]
for i,a in enumerate(ns):
  for b in ns[i+1:]:
    if abs(len(tail[a])-len(tail[b]))>60: continue
    r=difflib.SequenceMatcher(None,tail[a],tail[b]).ratio()
    if r>0.97: d.append((int(a),int(b),round(r,3)))
print(d)
