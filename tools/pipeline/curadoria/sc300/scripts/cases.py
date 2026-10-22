import json, re, sys
sys.path.insert(0, "/home/claude/sc300/scripts")
from build import reflow
Q = json.load(open('/home/claude/sc300/qs.json'))
def body_of(n):
    s = Q[str(n)]["stem"]
    s = re.sub(r"^(HOTSPOT|DRAG DROP)\s*-?\s*\n?", "", s.strip())
    m = re.search(r"\bQuestion (HOTSPOT - |DRAG DROP - )?", s)
    if m: s = s[:m.start()]
    else:
        idx = [mm.start() for mm in re.finditer(r"\n(You need|You are|You plan|You implement|Which |What )", s)]
        s = s[:idx[-1]] if idx else s
    s = re.sub(r"\[\[IMG (\d+)\]\]", lambda mm: f"\n![Exhibit](img/S{n:03d}-{mm.group(1)}.png)\n", s)
    return s
# (title, start-marker regex) per case, in order
SPEC = {
 "CONTOSO": ("Contoso, Ltd.", 101, [("Overview", r"Overview\s*-?\s*\n"), ("Existing environment", r"Existing Environment\. Existing Environment\s*\n"),
            ("Microsoft 365/Azure", r"Existing Environment\. Microsoft 365/Azure Environment\s*\n"), ("Problem statements", r"Existing Environment\. Problem Statements\s*\n"),
            ("Planned changes", r"Requirements\. Planned Changes\s*-?\s*\n"), ("Technical requirements", r"Requirements\. Technical Requirements\s*\n")]),
 "ADATUM": ("ADatum Corporation", 102, [("Overview", r"Overview\s*-?\s*\n"), ("ADatum environment", r"Existing Environment\. ADatum Environment\s*\n"),
            ("Litware environment", r"Existing Environment\. Litware Environment\s*\n"), ("Problem statements", r"Existing Environment\. Problem Statements\s*\n"),
            ("Planned changes", r"Requirements\. Planned Changes\s*-?\s*\n"), ("Technical requirements", r"Requirements\. Technical Requirements\s*\n")]),
 "LITWARE": ("Litware, Inc.", 201, [("Overview", r"Overview\s*-?\s*\n"), ("Identity", r"Existing Environment\. Identity Environment\s*\n"),
            ("Cloud", r"Existing Environment\. Cloud Environment\s*\n"), ("On-premises", r"Existing Environment\. On-premises Environment\s*\n"),
            ("Delegation & licensing", r"Requirements\. Delegation Requirements\s*\n"), ("Management & authentication", r"Requirements\. Management Requirements\s*\n"),
            ("Access & monitoring", r"Requirements\. Access Requirements\s*\n")]),
}
SUB = [(r"Requirements\. (\w[\w ]*?) Requirements\s*\n", r"\n### \1 requirements\n"), (r"Existing Environment\. ", "")]
res = {}; used = []
for cid, (title, n, spec) in SPEC.items():
    s = body_of(n)
    pos = []
    for t, rx in spec:
        m = re.search(rx, s)
        if not m: sys.exit(f"{cid}: marker not found {rx}")
        pos.append((t, m.start(), m.end()))
    tabs = []
    for i, (t, st, en) in enumerate(pos):
        end = pos[i+1][1] if i + 1 < len(pos) else len(s)
        body = s[en:end]
        for a, b in SUB: body = re.sub(a, b, body)
        lines = body.split("\n")
        tabs.append({"title": t, "body": reflow(lines).replace("\n\n### ", "\n\n### ")})
    res[cid] = {"title": title, "tabs": tabs}
    used += re.findall(r"img/(S\d+-\d+\.png)", json.dumps(res[cid]))
json.dump({"cases": res, "imgs": used}, open('/home/claude/sc300/cases.json', 'w'), indent=1, ensure_ascii=False)
for cid in res:
    print(cid, [t["title"] for t in res[cid]["tabs"]])
print(res["LITWARE"]["tabs"][4]["body"][:900])
