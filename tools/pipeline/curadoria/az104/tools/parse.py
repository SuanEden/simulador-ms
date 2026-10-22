import pymupdf, re, json, os, sys
src, out = sys.argv[1], sys.argv[2]
os.makedirs(out+'/img', exist_ok=True)
doc = pymupdf.open(src)
items = []  # (kind, page, y, payload)
for pno in range(39, len(doc)):
    page = doc[pno]
    d = page.get_text("dict")
    H = page.rect.height
    for b in d["blocks"]:
        y0 = b["bbox"][1]; y1=b["bbox"][3]
        if b["type"] == 0:
            for l in b["lines"]:
                t = "".join(s["text"] for s in l["spans"]).strip()
                ly = l["bbox"][1]
                if not t: continue
                if re.match(r'^Page \d+ of \d+$', t): continue
                if re.match(r'^\d+\s+Microsoft - AZ-104 Practice Questions', t) or 'SecExams.com' in t and len(t)<80 and ly<60: continue
                if ly < 45 and ('AZ-104' in t or re.match(r'^\d+$',t)): continue
                items.append(("t", pno+1, ly, t, l["bbox"][0]))
        elif b["type"] == 1:
            w = b["bbox"][2]-b["bbox"][0]; h = y1-y0
            if w < 60 or h < 20: continue
            items.append(("i", pno+1, y0, b["bbox"], 0))
# sort within page by y
items.sort(key=lambda x: (x[1], x[2]))
qs = {}; cur=None; sec=None; imgcount={}
for it in items:
    kind, p, y, pay, x = it
    if kind=="t":
        m = re.match(r'^Question #(\d+)$', pay)
        if m:
            cur = int(m.group(1)); qs[cur] = {"n":cur,"pages":[p],"stem":[],"expl":[],"disc":[]}; sec="stem"; continue
        if cur is None: continue
        if pay == "Explanation": sec="expl"; continue
        if pay == "Community Discussion": sec="disc"; continue
        if p not in qs[cur]["pages"]: qs[cur]["pages"].append(p)
        qs[cur][sec].append(pay)
    else:
        if cur is None: continue
        k = imgcount.get(cur,0)+1; imgcount[cur]=k
        name = f"S{cur:03d}-{sec}-{k}.png"
        page = doc[p-1]
        clip = pymupdf.Rect(pay)
        pix = page.get_pixmap(clip=clip, dpi=150)
        pix.save(out+'/img/'+name)
        qs[cur][sec].append(f"[[IMG {name} {int(clip.width)}x{int(clip.height)}]]")
        if p not in qs[cur]["pages"]: qs[cur]["pages"].append(p)
json.dump(qs, open(out+'/qs.json','w'), indent=1)
print(len(qs), min(qs), max(qs), sum(imgcount.values()))
