import pymupdf, json, sys, re
doc = pymupdf.open(sys.argv[1])
items = []
for pno in range(len(doc)):
    page = doc[pno]
    d = page.get_text("dict")
    for b in d["blocks"]:
        if b["type"] == 1:
            w, h = b["width"], b["height"]
            items.append({"k": "img", "p": pno+1, "bbox": [round(x,1) for x in b["bbox"]], "w": w, "h": h})
        else:
            for l in b["lines"]:
                t = "".join(s["text"] for s in l["spans"]).strip()
                if t: items.append({"k": "t", "p": pno+1, "y": round(l["bbox"][1],1), "x": round(l["bbox"][0],1), "t": t})
json.dump(items, open(sys.argv[2], "w"))
print(len(items), sum(1 for i in items if i["k"]=="img"))
from collections import Counter
print(Counter((i["w"],i["h"]) for i in items if i["k"]=="img").most_common(5))
