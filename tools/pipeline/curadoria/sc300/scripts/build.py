import json, re, glob, hashlib, os, sys
Q = json.load(open('/home/claude/sc300/qs.json'))
META = {}
if __name__ != '__main__': pass
for f in (sorted(glob.glob('/home/claude/sc300/meta/*.jsonl')) if __name__=='__main__' else []):
    for ln, line in enumerate(open(f), 1):
        line = line.strip()
        if not line: continue
        try: m = json.loads(line)
        except Exception as ex: sys.exit(f"{f}:{ln}: {ex}\n{line[:200]}")
        META[m["n"]] = m
LET = "ABCDEFGH"
used_imgs = set()

def reflow(lines):
    out = []; para = []
    def flush():
        if para: out.append(" ".join(para)); para.clear()
    for l in lines:
        l = l.strip()
        if not l or l == "-": flush(); continue
        if l.startswith("![") or l.startswith("### "): flush(); out.append(l); continue
        if re.match(r"^(✑|•|- )", l):
            flush(); para.append("- " + re.sub(r"^(✑|•|-)\s*", "", l)); continue
        if para and para[-1].startswith("- ") and not re.search(r"[.:?]$", para[-1]) and l[:1].islower():
            para.append(l); continue
        if para and para[0].startswith("- "): flush()
        para.append(l)
        if re.search(r"[.?:]$", l) and not re.search(r"\b(e\.g|i\.e|Inc|Ltd|vs)\.$", l): flush()
    flush()
    # merge consecutive list items into list blocks separated by single newlines
    res = []
    for p in out:
        if p.startswith("- ") and res and res[-1].split("\n")[-1].startswith("- "): res[-1] += "\n" + p
        else: res.append(p)
    return "\n\n".join(res)

def clean_stem(n, d, m, text=None):
    s = text if text is not None else d["stem"]
    s = re.sub(r"^(HOTSPOT|DRAG DROP)\s*-?\s*\n?", "", s.strip())
    s = re.sub(r"Note: This question is part of a series.*?appear in the review screen\.\s*", "", s, flags=re.S)
    s = re.sub(r"(Hot Area|Select and Place|Answer Area)\s*:\s*", "", s)
    for e in m.get("em", []):
        s = s.replace("[email protected]", e, 1)
    drop = set(m.get("drop", []))
    if (m.get("yn") or m.get("sl") or m.get("pool")) and "drop" not in m:
        stem_imgs = [i["k"] for i in d["imgs"] if i["sec"] == "stem"]
        if stem_imgs: drop.add(stem_imgs[-1])
    def rep(mm):
        k = int(mm.group(1))
        if k in drop: return ""
        fn = f"S{n:03d}-{k}.png"; used_imgs.add(fn)
        return f"\n![Exhibit](img/{fn})\n"
    s = re.sub(r"\[\[IMG (\d+)\]\]", rep, s)
    return reflow(s.split("\n"))

def series_key(stem):
    if "part of a series" not in stem: return None
    m = re.search(r"review screen\.\s*(.*?)Solution:", stem, re.S)
    if not m: return None
    return "S" + hashlib.md5(re.sub(r"\W+", "", m.group(1).lower()).encode()).hexdigest()[:6]

def case_of(stem):
    if "ADatum Corporation is a consulting" in stem[:600]: return "ADATUM"
    if "Litware, Inc. is a pharmaceutical" in stem[:600]: return "LITWARE"
    if "Contoso, Ltd. is a consulting" in stem[:600]: return "CONTOSO"
    raise SystemExit("unknown case: " + stem[:200])

def main():
    global out
    out = []; skipped = []
    for n in sorted(META):
        m = META[n]; d = Q[str(n)]
        if m.get("s") == "out": skipped.append((n, m.get("e", ""))); continue
        q = {"id": f"Q{n:03d}", "src": n, "domain": m["d"], "topic": m.get("t", "")}
        stem_raw = d["stem"]
        if d["tag"] == "CASE":
            cid = case_of(stem_raw); q["group"] = {"kind": "case", "id": cid}
            qs = m.get("qtext")
            if qs is None:
                mm = re.search(r"\bQuestion (HOTSPOT - |DRAG DROP - )?", stem_raw)
                if mm: qs = stem_raw[mm.end():]
                else:
                    idx = [x.start() for x in re.finditer(r"\n(You need|You are|You plan|You implement|Which |What )", stem_raw)]
                    qs = stem_raw[idx[-1]:] if idx else stem_raw
            stem_raw = qs
        sk = series_key(d["stem"])
        if sk: q["group"] = {"kind": "series", "id": sk}
        q["stem"] = m["stem"] if "stem" in m else clean_stem(n, d, m, stem_raw)
        if m.get("yn"):
            q["type"] = "yesno"; q["statements"] = m["yn"]; q["answer"] = [bool(x) for x in m["a"]]
        elif m.get("sl"):
            q["type"] = "hotarea"; q["slots"] = [{"label": l, "options": o, "answer": a} for l, o, a in m["sl"]]
        elif m.get("tg"):
            q["type"] = "match"; q["pool"] = m["pool"]; q["targets"] = [{"label": l, "answer": a} for l, a in m["tg"]]
        elif m.get("pool"):
            q["type"] = "order"; q["pool"] = m["pool"]; q["answer"] = m["a"]
        else:
            opts = m.get("opts") or [re.sub(r"^[A-H]\)\s*", "", o).strip() for o in d["opts"]]
            for e in m.get("em_opts", []):
                opts = [o.replace("[email protected]", e) for o in opts]
            letters = m.get("a") or d["ca"] or "".join(d["correct"])
            idx = [LET.index(c) for c in letters]
            if len(idx) > 1: q["type"] = "multi"; q["answer"] = idx
            else: q["type"] = "single"; q["answer"] = idx[0]
            q["options"] = opts
            if m.get("ns") or all(re.match(r"^(Yes|No)$", o) for o in opts) or any(re.search(r"\b(only|and)\b", o) and re.search(r"(User|Group|Device|App|VM|Admin)\d", o) for o in opts):
                q["shuffle"] = False
            if "ao" in m:
                q["answer_original"] = [LET.index(c) for c in m["ao"]] if len(m["ao"]) > 1 else LET.index(m["ao"])
        if m.get("layout"): q["layout"] = m["layout"]; q["panelTitle"] = m.get("pt", "")
        if "ao" in m and "answer_original" not in q:
            q["answer_original"] = [bool(x) for x in m["ao"]] if q["type"] == "yesno" else m["ao"]
        q["scope"] = m.get("s", "in"); q["review"] = m.get("r", "ok")
        if "ao" in m and q["review"] == "ok": q["review"] = "corrigida"
        q["explanation"] = m["e"]
        if m.get("refs"): q["refs"] = m["refs"]
        out.append(q)
    json.dump({"questions": out, "skipped": skipped, "imgs": sorted(used_imgs)}, open('/home/claude/sc300/built.json', 'w'), ensure_ascii=False, indent=1)
    print("built", len(out), "skipped", len(skipped), "imgs", len(used_imgs))
    
if __name__ == '__main__':
    main()
