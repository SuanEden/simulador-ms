import json, sys, re, os
from PIL import Image, ImageDraw
q = json.load(open('/home/claude/sc300/qs.json'))
a, b = int(sys.argv[1]), int(sys.argv[2])
out = []
os.makedirs('/home/claude/sc300/cards', exist_ok=True)
def card(n, d):
    ims = []
    for im in d["imgs"]:
        fn = f"/home/claude/sc300/imgs/S{n:03d}-{im['k']}{'x' if im['sec']=='expl' else ''}.png"
        if os.path.exists(fn): ims.append((f"IMG {im['k']} ({im['sec']})", Image.open(fn).convert("RGB")))
    if not ims: return None
    W = 1000; parts = []
    for lab, im in ims:
        if im.width > W: im = im.resize((W, int(im.height * W / im.width)))
        parts.append((lab, im))
    H = sum(p[1].height + 30 for p in parts)
    c = Image.new("RGB", (W, H), "white"); y = 0; dr = ImageDraw.Draw(c)
    for lab, im in parts:
        dr.rectangle([0, y, W, y + 26], fill=(40, 60, 120)); dr.text((6, y + 6), f"Q{n} {lab}", fill="white")
        c.paste(im, (0, y + 28)); y += im.height + 30
    fn = f"/home/claude/sc300/cards/C{n:03d}.png"; c.save(fn); return fn, H
for n in range(a, b + 1):
    d = q[str(n)]
    if d["tag"] == "SIM": out.append(f"##### Q{n} SIMULATION (lab) — skip\n"); continue
    s = d["stem"]
    if d["tag"] == "CASE":
        m = re.search(r"Question (HOTSPOT - |DRAG DROP - )?", s)
        s = "[CASE " + ("Contoso" if "Contoso" in s[:300] else "Litware" if "Litware" in s[:300] else "ADatum") + "] ..." + (s[m.end()-0:] if m else s[-700:])
    cd = card(n, d)
    out.append(f"##### Q{n} [{d['tag']}] imgs={len(d['imgs'])} card={'C%03d.png h=%d'%(n,cd[1]) if cd else '-'}\n{s}\nOPTS: " + " | ".join(d["opts"]) +
               f"\nMARK: {''.join(d['correct'])} CA: {d['ca']}\nEXPL: {d['expl'][:600]}\nCOMM: {d['comm'][:500]}\n")
open(f"/home/claude/sc300/sheet_{a}_{b}.txt", "w").write("\n".join(out))
print("written", len(out))
