import json, re, sys
from PIL import Image, ImageDraw
sys.path.insert(0,'/home/claude/az104/tools')
q=json.load(open('/home/claude/az104/work/qs.json'))
cat=json.load(open('/home/claude/az104/work/cat.json'))
SP='/tmp/claude-0/-home-claude/3892468e-c6ce-50bc-bf08-32402479ca7a/scratchpad/'
def parts(n):
    x=q[str(n)]; st=x['stem']
    k=None
    for i,l in enumerate(st):
        if re.match(r'^(Hot Area|Select and Place|Answer Area)\s*:?', l): k=i
    area=[l.split()[1] for l in (st[k+1:] if k is not None else []) if l.startswith('[[IMG')]
    if not area:  # fallback: last stem image
        imgs=[l.split()[1] for l in st if l.startswith('[[IMG')]; area=imgs[-1:]
    ans=[l.split()[1] for l in x['expl'] if l.startswith('[[IMG')]
    return area, ans
def comp(ns, out):
    ims=[]
    for n in ns:
        a,b=parts(n)
        if b:
            for f in b: ims.append((f'Q{n} ANSWER',f))
        else:
            for f in a: ims.append((f'Q{n} AREA (sem gabarito em imagem)',f))
    loaded=[(t,Image.open('/home/claude/az104/work/img/'+f).convert('RGB')) for t,f in ims]
    W=max(i.width for _,i in loaded); H=sum(i.height+24 for _,i in loaded)
    c=Image.new('RGB',(W,H),'white'); d=ImageDraw.Draw(c); y=0
    for t,i in loaded:
        d.rectangle([0,y,W,y+20],fill=(255,230,230)); d.text((4,y+4),t,fill='red'); y+=22; c.paste(i,(0,y)); y+=i.height+2
    c.save(out)
if __name__=='__main__':
    ns=[int(a) for a in sys.argv[2].split(',')]
    comp(ns, SP+sys.argv[1])
    import mk
    for n in ns:
        x=q[str(n)]; st=mk.join(x['stem'])
        if n in mk.caseof: st=['<<CASE %s>>'%mk.caseof[n]]+st[-5:]
        print(f"##### Q{n}"); print('\n'.join(st)); print('-- EXPL:', ' '.join(l for l in x['expl'] if not l.startswith('[[IMG'))[:500]); print('-- DISC:', ' '.join(x['disc'])[:300]); print()
