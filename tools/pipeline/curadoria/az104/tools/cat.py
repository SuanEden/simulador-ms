import json,re
from collections import Counter
q=json.load(open('/home/claude/az104/work/qs.json'))
cat={}
for n,x in q.items():
    s='\n'.join(x['stem'])
    if re.search(r'^(HOTSPOT|Hot Area)',s,re.M): c='HOT'
    elif re.search(r'^(DRAG DROP|Select and Place)',s,re.M): c='DD'
    elif re.search(r'^[A-H]\) ',s,re.M): c='OPT'
    elif re.search(r'SIMULATION|Lab|Click to expand|username and password',s): c='SIM'
    else: c='UNK'
    cat[n]=c
json.dump(cat,open('/home/claude/az104/work/cat.json','w'))
print(Counter(cat.values()))
print([n for n,c in cat.items() if c=='UNK'][:40])
