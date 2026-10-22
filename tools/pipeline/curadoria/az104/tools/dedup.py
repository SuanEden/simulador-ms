import json,re,difflib,collections
q=json.load(open('/home/claude/az104/work/qs.json'))
def norm(lines): return re.sub(r'\(correct answer\)','',re.sub(r'\W+',' ',' '.join(l for l in lines if not l.startswith('[[IMG'))).lower()).strip()
key={int(n):norm(x['stem']) for n,x in q.items()}
groups=collections.defaultdict(list)
for n in sorted(key): groups[key[n]].append(n)
exact=[g for g in groups.values() if len(g)>1]
print('exact groups',len(exact),'extra copies',sum(len(g)-1 for g in exact))
# near-dups among representatives
reps=sorted(g[0] for g in groups.values())
near=[]
import itertools
byLen=sorted(reps,key=lambda n:len(key[n]))
for i,a in enumerate(byLen):
    for b in byLen[i+1:]:
        if len(key[b])-len(key[a])>40: break
        sm=difflib.SequenceMatcher(None,key[a],key[b],autojunk=False)
        if sm.real_quick_ratio()<0.97 or sm.quick_ratio()<0.97: continue
        r=sm.ratio()
        if r>0.97: near.append((min(a,b),max(a,b),round(r,3)))
near.sort()
print('near',len(near))
json.dump({'exact':exact,'near':near},open('/home/claude/az104/work/dups.json','w'))
