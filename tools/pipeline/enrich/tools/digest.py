"""Resumo compacto das questões para escrever os detalhes. Uso: digest.py CODE Qini Qfim [tipos]"""
import sys, json, subprocess, re
CODE, a, b = sys.argv[1], int(sys.argv[2]), int(sys.argv[3])
types = sys.argv[4].split(',') if len(sys.argv) > 4 else None
EX = f'/home/claude/SimuladorMS/exams/{CODE}'
Q = json.loads(subprocess.check_output(['node', '-e', f'global.SIM={{registerQuestions:(c,a)=>{{console.log(JSON.stringify(a))}}}};require("{EX}/questions.js")']))
num = lambda q: int(re.sub(r'\D', '', q['id']))
for q in Q:
    if not (a <= num(q) <= b) or q.get('scope') == 'out': continue
    if types and q['type'] not in types: continue
    st = re.sub(r'!\[Exhibit\]\([^)]*\)(\{[^}]*\})?', '[img]', q['stem'])
    st = st.replace('\n\n', ' ¶ ')
    if len(st) > 520: st = '…' + st[-520:]
    print(f"## {q['id']} [{q['type']}] {q.get('topic','')}{' (case '+q['group']['id']+')' if q.get('group',{}).get('kind')=='case' else ''}")
    print(st)
    t = q['type']
    if t in ('single', 'multi'):
        ans = q['answer'] if isinstance(q['answer'], list) else [q['answer']]
        for i, o in enumerate(q['options']): print(f"  {'✓' if i in ans else '·'} {chr(65+i)}) {o}")
    elif t == 'yesno':
        for s_, v in zip(q['statements'], q['answer']): print(f"  {'Y' if v else 'N'} — {s_}")
    elif t == 'hotarea':
        for s_ in q['slots']: print(f"  [{s_['label']}] → {s_['options'][s_['answer']]}   (opções: {' | '.join(s_['options'])})")
    elif t == 'order':
        print('  ordem:', ' → '.join(q['pool'][i] for i in q['answer'])); print('  pool:', ' | '.join(q['pool']))
    elif t == 'match':
        for tg in q['targets']: print(f"  {tg['label']} → {q['pool'][tg['answer']]}")
    print('  EXPL:', q.get('explanation', ''))
    print()
