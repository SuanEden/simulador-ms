import json, re
q = json.load(open('/home/claude/sc300/work/qs.json'))
CASES = {'LITWARE':[102,103,104,105,106,107,233,234,235,236],
         'CONTOSO_A':[197,198,199,200,205,208,212,213,214,215,216,217],
         'CONTOSO_B':[201,202,203,204,206,207,209,210,211,218,219],
         'CASE264':[264]}
def join(lines):
    out=[]; buf=''; prevlen=99
    for l in lines:
        if l.startswith('[[IMG'):
            if buf: out.append(buf); buf=''
            out.append(l); prevlen=0; continue
        l=l.replace('✑','-').strip()
        if re.match(r'^[-•]\s*$', l): continue
        newpara = bool(re.match(r'^([-•]|[A-H]\) |Box \d|NOTE:)', l)) or (buf and prevlen < 62 and l[:1].isupper()) or (buf and re.search(r'[?:]$', buf))
        if newpara and buf: out.append(buf); buf=''
        buf = (buf+' '+l).strip() if buf else l
        prevlen=len(l)
    if buf: out.append(buf)
    return out
casepre={}
for k,ids in CASES.items():
    stems=[join(q[str(i)]['stem']) for i in ids]
    if len(stems)==1: casepre[k]=0; continue
    n=0
    while all(len(s)>n and s[n]==stems[0][n] for s in stems): n+=1
    casepre[k]=n
caseof={i:k for k,ids in CASES.items() for i in ids}
json.dump({'CASES':CASES,'casepre':casepre},open('/home/claude/sc300/work/cases.json','w'))
def digest(n):
    x=q[str(n)]; st=join(x['stem'])
    if n in caseof: st=['<<CASE %s>>'%caseof[n]]+st[-6:]
    ex=' '.join(x['expl'])[:350]
    disc=' '.join(x['disc'])[:450]
    return f"##### Q{n} p{x['pages'][0]}\n"+'\n'.join(st)+f"\n-- EXPL: {ex}\n-- DISC: {disc}\n"
if __name__=='__main__':
    import sys
    a,b=int(sys.argv[1]),int(sys.argv[2])
    cat=json.load(open("/home/claude/sc300/work/cat.json"))
    want=sys.argv[3].split(",") if len(sys.argv)>3 else ["OPT"]
    for n in range(a,b+1):
        if cat[str(n)] in want: print(digest(n))
