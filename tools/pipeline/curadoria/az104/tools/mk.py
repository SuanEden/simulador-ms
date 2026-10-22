import json, re
q = json.load(open('/home/claude/az104/work/qs.json'))
CASES = {'CONTOSO':[807,809,819,821,823,837,839],
         'GENERAL':[811,813,815,817,825,827,829,841,843],
         'LITWARE':[831,833,835,845,847]}
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
json.dump({'CASES':CASES,'casepre':casepre},open('/home/claude/az104/work/cases.json','w'))
def digest(n):
    x=q[str(n)]; st=join(x['stem'])
    if n in caseof: st=['<<CASE %s>>'%caseof[n]]+st[-6:]
    st=[('[SERIES] ' if l.startswith('Note: The question is included') or l.startswith('Note: This question is part') else '')+l for l in st]
    st=[re.sub(r'^\[SERIES\] Note: .*?(requirements|goals|solutions?)\.\s*','[SERIES] ',l) for l in st]
    ex=' '.join(x['expl'])[:300]
    disc=re.sub(r'(I took the exam|Today I achieved|Passed the exam)[^.!]*[.!]','',' '.join(x['disc']))[:380]
    return f"##### Q{n} p{x['pages'][0]}\n"+'\n'.join(st)+f"\n-- EXPL: {ex}\n-- DISC: {disc}\n"
if __name__=='__main__':
    import sys
    a,b=int(sys.argv[1]),int(sys.argv[2])
    cat=json.load(open("/home/claude/az104/work/cat.json"))
    want=sys.argv[3].split(",") if len(sys.argv)>3 else ["OPT"]
    U=set(json.load(open('/home/claude/az104/work/uniq.json'))['uniq'])
    for n in range(a,b+1):
        if n in U and cat[str(n)] in want: print(digest(n))
