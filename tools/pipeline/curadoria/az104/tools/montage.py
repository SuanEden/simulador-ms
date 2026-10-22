import sys
from PIL import Image, ImageDraw
out=sys.argv[1]; files=sys.argv[2:]
ims=[Image.open('/home/claude/az104/work/img/'+f).convert('RGB') for f in files]
W=max(i.width for i in ims); H=sum(i.height+22 for i in ims)
c=Image.new('RGB',(W,H),'white'); d=ImageDraw.Draw(c); y=0
for f,i in zip(files,ims):
    d.text((4,y+4),f,fill='red'); y+=20; c.paste(i,(0,y)); y+=i.height+2
c.save(out); print(c.size)
