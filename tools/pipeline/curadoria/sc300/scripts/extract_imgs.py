import pymupdf, json, os, sys
from PIL import Image
q = json.load(open(sys.argv[1])); out = sys.argv[3]; os.makedirs(out, exist_ok=True)
doc = pymupdf.open(sys.argv[2])
for n, d in q.items():
    for im in d["imgs"]:
        x0,y0,x1,y1 = im["bbox"]
        if x1 <= x0 or y1 <= y0: continue
        page = doc[im["p"]-1]
        pix = page.get_pixmap(clip=pymupdf.Rect(x0,y0,x1,y1), dpi=200)
        fn = f"{out}/S{int(n):03d}-{im['k']}{'x' if im['sec']=='expl' else ''}.png"
        pix.save(fn)
        Image.open(fn).convert("RGB").quantize(colors=160, method=Image.Quantize.MEDIANCUT).save(fn, optimize=True)
print("ok")
