# Processo padrão — nova prova no SimuladorMS

Toda prova nova passa pelas mesmas cinco etapas. Esta pasta guarda as ferramentas e os insumos usados nas provas já feitas (MD-102, SC-300 e AZ-104), para que qualquer atualização futura parta do mesmo ponto.

> Para o Claude, numa sessão nova: peça ao Newton o `SimuladorMS.zip` atual e o dump novo. Descompacte o app em `/home/claude/SimuladorMS` e copie `tools/pipeline/enrich` para `/home/claude/enrich`. Os scripts usam esses caminhos.

## 1. Curadoria do dump → `exams/<CODE>/questions.js`

- Extrair as questões (texto e imagens) e montar o banco no formato do app (`tools/modelo-prova`).
- **Remover duplicadas**, incluindo as quase idênticas.
- Marcar o escopo pelo Skills Measured vigente: `scope: in | borderline | out`. As `out` saem do banco.
- **Validar o gabarito** contra a documentação atual. Quando corrigir: `review: "corrigida"` + `answer_original`. Quando houver dúvida: `review: "duvidosa"`.
- Explicação curta em PT-BR (`explanation`), com o que muda em relação ao dump.
- Estudos de caso em `exam.js` (`cases`), domínios e pesos copiados do study guide.
- Referência: `curadoria/` (scripts usados na AZ-104 e na SC-300; veja `curadoria/az104/NOTES.md`).

## 2. Labs → `exams/<CODE>/labs.js`

- Agrupar as questões por tema e escrever um lab por grupo (fontes em Markdown em `labs/<code>src/*.md`).
- Seções de cada lab: overview, pré-requisitos, montagem passo a passo (caminhos "Clique aqui > Aqui"), como testar, onde conferir, resultado esperado, variações, quebre de propósito, limpeza.
- Gerar com `python3 labs/build_labs.py <CODE> labs/<code>src`. Cada lab lista as questões que cobre, e cada questão ganha o link "Lab prático".

## 3. Skills Measured → `enrich/<CODE>/skills.base.json`

```
python3 tools/skills.py <CODE>
```
Lê o study guide oficial (`learn.microsoft.com/.../study-guides/<code>`) e grava domínios, skills e itens. Confira se os pesos batem com o `exam.js`.

## 4. Documentação + detalhes

| Arquivo | Conteúdo |
|---|---|
| `enrich/<CODE>/catalog.py` | `ITEMS = {"1.2.3": ["caminho/learn", ...]}`: 1 a 4 docs do Learn por item do Skills Measured |
| `enrich/<CODE>/topics.py` | `T = {"tópico": "1.2.3"}` ou `("1.2.3", ["docs extras"])`: cada tópico do banco aponta para um item |
| `enrich/<CODE>/details/dNN.py` | `DET` (detalhes por questão), `FIX` (correções do banco), `QDOCS`, `ITEM`, `TX` (docs extras por tópico), `BADREF` (refs do dump fora de contexto) |

Sintaxe curta do `DET`:
- `Rótulo :: motivo` vira um item em negrito. O cabeçalho é automático: "Por que não as outras" ou "Item a item".
- `! texto` vira **Dica de prova**.
- Um parágrafo em negrito no início (ex.: `**Série "Solution":** …`) substitui o cabeçalho.
- Como as alternativas são embaralhadas no app, use o **nome da opção**, nunca a letra.

Ferramentas, nesta ordem:
```
python3 tools/checkcat.py <CODE>          # valida os links do catálogo (404, redirecionamentos, hubs)
python3 tools/digest.py <CODE> 1 9999      # resumo das questões para escrever os detalhes
python3 tools/enrich.py <CODE>             # grava skill/details/docs no questions.js e gera docs.js
python3 tools/refreport.py <CODE>          # revisa as refs do dump por tópico (para o BADREF/TX)
```
O `enrich.py` é idempotente: pode rodar quantas vezes quiser. Ele valida todos os links no Learn (cache em `cache/links.json`), normaliza para en-us e limita a 4 docs por questão, nesta prioridade: QDOCS → TX → docs do tópico → refs do dump → docs do item.

## 5. Validação e entrega

- Banco: tela "Banco de questões" do app com **0 erros / 0 avisos** e imagens ok.
- E2E (Playwright): prova completa com 100% de acerto = 1000; Verificar mostra Detalhes, Documentação, Skill e Lab; Documentação por skill com filtros e "Treinar esta skill"; mobile em 390 px sem rolagem horizontal.
- Acrescentar a prova no `exams.js` e no `LEIA-ME.md`.
- Entregar o `SimuladorMS.zip` completo e o zip da pasta da prova.

## Situação atual

| Prova | Questões | Labs | Skills | Detalhes | Docs/questão |
|---|---|---|---|---|---|
| MD-102 | 241 | 32 | 13 | 241 | ~2,8 |
| SC-300 | 337 | 27 | 16 | 337 | ~2,9 |
| AZ-104 | 448 | 30 | 15 | 448 | ~3,1 |

Links verificados no Microsoft Learn em 12/10/2026. Reexecute `checkcat.py` e `enrich.py` quando o study guide mudar (a Microsoft atualiza o Skills Measured algumas vezes por ano).
