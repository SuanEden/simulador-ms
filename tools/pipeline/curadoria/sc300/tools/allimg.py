import json,sys,re
from PIL import Image, ImageDraw
q=json.load(open('/home/claude/sc300/work/qs.json'))
SP='/tmp/claude-0/-home-claude/3892468e-c6ce-50bc-bf08-32402479ca7a/scratchpad/'
ims=[]
for n in sys.argv[2].split(','):
    x=q[n]
    for l in x['stem']+x['expl']:
        if l.startswith('[[IMG'): ims.append((f'Q{n} '+l.split()[1], l.split()[1]))
L=[(t,Image.open('/home/claude/sc300/work/img/'+f).convert('RGB')) for t,f in ims]
sc=float(sys.argv[3]) if len(sys.argv)>3 else 1.0
L=[(t,i.resize((int(i.width*sc),int(i.height*sc)))) for t,i in L]
W=max(i.width for _,i in L); H=sum(i.height+22 for _,i in L)
c=Image.new('RGB',(W,H),'white'); d=ImageDraw.Draw(c); y=0
for t,i in L:
    d.rectangle([0,y,W,y+18],fill=(255,230,230)); d.text((4,y+3),t,fill='red'); y+=20; c.paste(i,(0,y)); y+=i.height+2
c.save(SP+sys.argv[1]); print(c.size)
