import json, re, sys
it = json.load(open(sys.argv[1]))
# order by page, y
for i in it:
    if i["k"] == "img": i["y"] = i["bbox"][1]
it = [i for i in it if not (i["k"]=="img" and (i["w"],i["h"]) in [(200,50),(9,6)])]
it = [i for i in it if not (i["k"]=="t" and (re.match(r"^Page \d+ of 914$", i["t"]) or "SecExams.com" in i["t"] or re.fullmatch(r"\d+", i["t"])))]
it.sort(key=lambda i: (i["p"], i["y"]))
qs = {}; cur = None
for i in it:
    if i["k"] == "t":
        m = re.fullmatch(r"Question #(\d+)", i["t"])
        if m and i["p"] >= 16:
            cur = int(m.group(1)); qs[cur] = {"n": cur, "items": []}; continue
    if cur is None: continue
    qs[cur]["items"].append(i)
out = {}
for n, q in qs.items():
    sec = "stem"; d = {"n": n, "stem": [], "opts": [], "expl": [], "comm": [], "imgs": [], "pages": sorted({i["p"] for i in q["items"]})}
    for i in q["items"]:
        if i["k"] == "t":
            t = i["t"]
            if t == "Explanation": sec = "expl"; continue
            if t == "Community Discussion": sec = "comm"; continue
            if sec in ("stem","opts") and re.match(r"^[A-H]\) ", t): sec = "opts"
            if sec == "opts" and not re.match(r"^[A-H]\) ", t) and d["opts"]:
                d["opts"][-1] += " " + t; continue
            d[sec].append(t)
        else:
            k = len(d["imgs"])
            d["imgs"].append({"k": k, "sec": sec, "p": i["p"], "bbox": i["bbox"], "w": i["w"], "h": i["h"]})
            if sec in ("stem","opts"): d[sec if sec=="stem" else "stem"].append(f"[[IMG {k}]]")
    d["stem"] = " \n".join(d["stem"])
    d["expl"] = " ".join(d["expl"]); d["comm"] = " ".join(d["comm"])[:3000]
    d["correct"] = [o[0] for o in d["opts"] if "(Correct Answer)" in o]
    d["opts"] = [o.replace(" (Correct Answer)", "").replace("(Correct Answer)","") for o in d["opts"]]
    m = re.search(r"Correct Answer:\s*([A-H]+)\b", d["expl"]); d["ca"] = m.group(1) if m else ""
    t = d["stem"][:40]
    d["kind"] = "HOT" if "HOTSPOT" in t else "DD" if "DRAG DROP" in t else ""
    out[n] = d
json.dump(out, open(sys.argv[2], "w"), indent=0)
print(len(out), "missing", [n for n in range(1, max(out)+1) if n not in out])
from collections import Counter
print(Counter(d["kind"] for d in out.values()))
print("with stem imgs", sum(1 for d in out.values() if any(x["sec"]=="stem" for x in d["imgs"])))
print("with expl imgs", sum(1 for d in out.values() if any(x["sec"]=="expl" for x in d["imgs"])))
print("no opts & no kind", [d["n"] for d in out.values() if not d["opts"] and not d["kind"]][:40])
