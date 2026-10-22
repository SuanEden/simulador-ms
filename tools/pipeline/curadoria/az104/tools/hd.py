import json, re, sys
from PIL import Image, ImageDraw
sys.path.insert(0,'/home/claude/az104/tools')
import mk
q=mk.q
SP='/tmp/claude-0/-home-claude/3892468e-c6ce-50bc-bf08-32402479ca7a/scratchpad/'
def imgs(lines): return [l.split()[1] for l in lines if l.startswith('[[IMG')]
def parts(n):
    x=q[str(n)]; st=imgs(x['stem']); ex=imgs(x['expl'])
    return st[:-1], st[-1:], ex   # exhibits, area, answer
CAT=json.load(open('/home/claude/az104/work/cat.json'))
ns=[int(a) for a in sys.argv[2].split(',')]; sc=float(sys.argv[3]) if len(sys.argv)>3 else 0.65
ims=[]
for n in ns:
    exh,area,ans=parts(n)
    for f in exh: ims.append((f'Q{n} exhibit {f}',f))
    if not ans or CAT[str(n)]=='DD':
        for f in area: ims.append((f'Q{n} AREA',f))
    for f in ans: ims.append((f'Q{n} ANSWER {f}',f))
L=[]
for t,f in ims:
    i=Image.open('/home/claude/az104/work/img/'+f).convert('RGB')
    i=i.resize((max(1,int(i.width*sc)),max(1,int(i.height*sc))))
    L.append((t,i))
import glob,os
for f in glob.glob(SP+sys.argv[1]+'*.png'): os.remove(f)
pages=[[]];h=0
for t,i in L:
    if h+i.height>2300 and pages[-1]: pages.append([]); h=0
    pages[-1].append((t,i)); h+=i.height+20
for k,pg in enumerate(pages):
    W=max(i.width for _,i in pg); H=sum(i.height+20 for _,i in pg)
    c=Image.new('RGB',(max(W,300),H),'white'); d=ImageDraw.Draw(c); y=0
    for t,i in pg:
        d.rectangle([0,y,c.width,y+16],fill=(255,225,225)); d.text((3,y+2),t,fill='red'); y+=18; c.paste(i,(0,y)); y+=i.height+2
    c.save(SP+f'{sys.argv[1]}{k}.png')
print('pages',len(pages))
for n in ns:
    x=q[str(n)]; st=mk.join(x['stem'])
    if n in mk.caseof: st=['<<CASE %s>>'%mk.caseof[n]]+st[-6:]
    st=[l for l in st if not l.startswith('Note: The question') ]
    print(f"##### Q{n} {mk.json.load(open('/home/claude/az104/work/cat.json'))[str(n)]}"); print('\n'.join(st))
    print('-- EXPL:', ' '.join(l for l in x['expl'] if not l.startswith('[[IMG'))[:260])
    print('-- DISC:', re.sub(r'(I took the exam|Today I achieved|Passed the exam)[^.!]*[.!]','',' '.join(x['disc']))[:300]); print()
