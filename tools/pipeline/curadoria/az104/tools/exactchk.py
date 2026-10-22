import json,re,hashlib
from PIL import Image
q=json.load(open('/home/claude/az104/work/qs.json'))
d=json.load(open('/home/claude/az104/work/dups.json'))
def ih(f):
    im=Image.open('/home/claude/az104/work/img/'+f).convert('L').resize((32,32))
    return im.tobytes()
def imgs(n,sec='stem'): return [l.split()[1] for l in q[str(n)][sec] if l.startswith('[[IMG')]
def sim(a,b):
    import numpy as np
    A=np.frombuffer(ih(a),dtype=np.uint8).astype(int);B=np.frombuffer(ih(b),dtype=np.uint8).astype(int)
    return abs(A-B).mean()
def ans(n):
    x=q[str(n)]; s=[l for l in x['stem'] if 'Correct Answer' in l]
    m=re.search(r'Correct Answer:\s*(\S.*?)(?:Reference|$)',' '.join(x['expl']))
    return [re.match(r'^([A-H])\)',l).group(1) if re.match(r'^([A-H])\)',l) else l[:20] for l in s], (m.group(1)[:20] if m else '')
imgdiff=[];ansdiff=[]
for g in d['exact']:
    a=g[0]
    for b in g[1:]:
        ia,ib=imgs(a),imgs(b)
        if len(ia)!=len(ib) or any(sim(x,y)>6 for x,y in zip(ia,ib)): imgdiff.append((a,b,len(ia),len(ib)))
        if ans(a)!=ans(b): ansdiff.append((a,b,ans(a),ans(b)))
print('imgdiff',len(imgdiff),imgdiff)
print('ansdiff',len(ansdiff))
for x in ansdiff: print(x)
