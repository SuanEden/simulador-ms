# Tradução do SimuladorMS para português brasileiro

Status: **em andamento; tradução integral ainda não concluída**.

## Estado atual para continuidade — 22/10/2026

| Prova | Enunciados e campos de resposta traduzidos | Ainda pendentes | Imagens com tradução textual |
|---|---:|---:|---:|
| MD-102 | 241/241 | 0 enunciados; explicações/detalhes e links ainda exigem revisão | 12/12 |
| SC-300 | 20/337 | 317, começando em Q021 | 14/163 |
| AZ-104 | 20/448 | 428, começando em Q037 | 0/319 |

Total: **281 enunciados e campos de resposta traduzidos; 745 pendentes**. Isso não significa que 281 questões tenham todos os seus materiais revisados. Há **682 títulos de documentos** ainda pendentes, **468 imagens** sem tradução textual e revisão terminológica dos **89 corpos de laboratórios**, explicações/detalhes e materiais auxiliares.

Já traduzidos: interface, 14 domínios, oito estudos de caso, 44 competências e seus 263 itens, títulos dos 89 laboratórios e três ambientes, cabeçalhos das 16 fontes Markdown e 99 títulos de documentação em 1.486 ocorrências. Quatro títulos que são nomes de cmdlets (20 ocorrências) são preservados intencionalmente.

Lista exata e reutilizável: `tools/traducao/TRADUCAO_PENDENCIAS.json`. Termos preservados: `tools/traducao/TERMOS_PRESERVADOS.md`. Resultados de testes: `TRADUCAO_VERIFICACOES.md`. Observações técnicas sem mudança de gabarito: `QUESTOES_PARA_REVISAO.md`.

## Ponto de recuperação

- Backup integral anterior às alterações: `../Certificados-102-backups/antes-traducao-2026-10-22.zip` (644 arquivos, incluindo PDFs e imagens; manifesto SHA-256 dentro do ZIP).
- Commit do estado original do simulador: `4ab8291`.
- O projeto já continha arquivos não rastreados; esse commit registra o estado encontrado. Os PDFs em `Dumps/` foram adicionados ao Git no commit `80b3be4` e também estão no backup.
- Não executar novamente a curadoria nem `enrich.py` durante a tradução: esses geradores podem substituir textos e gabaritos. Os insumos originais em `tools/pipeline/enrich/cache/` devem permanecer originais.

## Inventário e escopo

| Local | Conteúdo | Situação inicial |
|---|---|---|
| `index.html` | Interface, renderização dos seis tipos, correção, relatórios, armazenamento local | Predominantemente PT-BR; rótulos de respostas, documentação e curadoria ainda em inglês |
| `exams.js` | Catálogo das três certificações | Sem texto visível a traduzir |
| `exams/*/exam.js` | Domínios, pesos, metadados e estudos de caso | Domínios e estudos de caso em inglês |
| `exams/*/questions.js` | Enunciados, alternativas, afirmações, campos de resposta, explicações e links | Enunciados e respostas em inglês; explicações e detalhes já em PT-BR com termos mistos |
| `exams/*/docs.js` | Competências, itens do programa e títulos da documentação | Majoritariamente inglês |
| `exams/*/labs.js` | 89 laboratórios e três ambientes de referência | Narrativa em PT-BR; menus/configurações e alguns termos em inglês |
| `exams/*/img/` | Capturas e tabelas associadas às questões | Inspeção e tradução textual adjacente necessárias; preservar os arquivos |
| `LEIA-ME.md`, `README.md`, `tools/pipeline/PROCESSO.md` | Instruções de uso e manutenção | Predominantemente PT-BR; terminologia e exemplos a revisar |
| `tools/pipeline/labs/*src/*.md` | Fontes dos laboratórios | Manter sincronizadas com os laboratórios traduzidos |
| `tools/modelo-prova/` | Modelo funcional de questões e prova | Revisar conteúdo visível |
| `tools/pipeline/enrich/`, `tools/pipeline/curadoria/` | Geradores, curadoria, catálogos, snapshots e insumos históricos | Identificadores e snapshots originais preservados; documentar a aplicação da tradução após regeneração |
| `Dumps/*.pdf` | Fontes originais dos bancos | Preservar os documentos; a tradução usada pelo simulador ocorre nos bancos e nas transcrições das imagens |

| Prova | Questões | Única | Múltipla | Sim/não | Seletores | Ordenação | Associação | Labs |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| MD-102 | 241 | 122 | 23 | 28 | 50 | 7 | 11 | 32 |
| SC-300 | 337 | 221 | 10 | 35 | 58 | 5 | 8 | 27 |
| AZ-104 | 448 | 254 | 25 | 60 | 95 | 11 | 3 | 30 |

## Convenções

- Preservar produtos, comandos, código, URLs, caminhos, nomes dos recursos, propriedades e marcadores funcionais como `[answer choice]`.
- Preservar tenant, endpoint, input, output e outras expressões cuja tradução reduza a clareza.
- Traduzir papéis e opções descritivas quando são texto visível; conservar nomes de propriedades e valores literais de código.
- Nenhum gabarito, ID, peso, tipo, vínculo de imagem ou alternativa pode ser acrescentado, removido ou reordenado.
- Questões duvidosas ficam em registro separado, sem mudar os gabaritos recebidos.

## Lotes aplicados

- Interface: áreas de resposta dos seis tipos, sim/não e nomes acessíveis, ações, opções, rótulos de laboratórios/competências e escopo da curadoria. Os filtros mantêm os valores `in`, `borderline`, `out`; a detecção de imagem aceita a redação em português.
- `lote-01-casos-md102.json`: os 14 domínios das três provas; todas as abas e o conteúdo dos dois estudos de caso MD-102.
- `lote-02-md102-q001-q020.json`: enunciados e campos de resposta de Q001–Q020 da MD-102. Explicações/detalhes e títulos dos links ainda precisam da revisão final.
- `lote-03-md102-q021-q066.json` e `lote-04-md102-q067-q112.json`: mais 80 questões MD-102. Total: **100/241** enunciados e campos de resposta traduzidos (os IDs originais têm lacunas; não criar as questões ausentes).
- `lote-05-casos-sc300.json` e `lote-06-casos-az104.json`: todas as abas e textos dos seis estudos de caso SC-300/AZ-104. Os oito estudos de caso das três provas estão traduzidos; revisão final ainda necessária.
- `competencias.json` + `node tools/traducao/competencias.mjs`: as 44 competências e seus 263 itens, nas três provas. Os títulos dos documentos vinculados ainda estão em inglês. Os snapshots dos guias oficiais continuam originais.
- Imagens MD-102 Q005, Q017, Q028, Q044, Q085 e Q094: capturas inspecionadas; tradução dos rótulos e valores acrescentada ao enunciado, sem comentários sobre o gabarito. URLs presentes nas capturas foram reproduzidas literalmente e constam como adições permitidas no validador.
- `lote-08-sc300-q001-q020.json`: 20 enunciados e campos de resposta SC-300; 14 capturas inspecionadas e traduzidas textualmente junto às imagens, incluindo tabelas e telas do Azure AD Connect.
- `lote-09-az104-q001-q036.json`: os primeiros 20 enunciados e campos de resposta AZ-104 (os IDs não são contíguos).
- `rotulos.json` + `node tools/traducao/rotulos.mjs`: 320 ocorrências de tópicos descritivos traduzidas por correspondência exata de campo; títulos dos 89 laboratórios e dos três ambientes, com cabeçalhos das 16 fontes Markdown sincronizados. **Corpos dos laboratórios ainda pendentes de revisão terminológica.**
- `titulos-documentos.json` + `node tools/traducao/titulos-documentos.mjs`: 99 títulos de documentação traduzidos, em 1.486 ocorrências nos três bancos e catálogos; um título que é apenas nome de cmdlet preservado. Os demais títulos continuam pendentes.
- `lote-10-md102-q113-q154.json`, `lote-11-md102-imagens-restantes.json` e `lote-12-md102-q155-q212.json`: total MD-102 de **191/241** enunciados e campos de resposta traduzidos. **Todas as 12 imagens MD-102** inspecionadas e acompanhadas de tradução textual. Há uma questão traduzida adiantada, Q214; não retraduzir.
- `README.md`, `LEIA-ME.md` e `tools/pipeline/PROCESSO.md`: instruções e rótulos atualizados; tradução parcial sinalizada e processo de reaplicação documentado.
- `lote-13-md102-q213-q269.json`: últimos 50 enunciados MD-102 e respectivos campos de resposta. Total MD-102: **241/241 enunciados e campos de resposta**.
- `lote-14-revisao-textual.json`: refinamentos de redação em MD-102/SC-300 e expansão do nome do protocolo SCEP, preservando comandos e gabaritos.
- `lote-15-revisao-casos.json`: separador brasileiro de milhares nas quantidades da tabela Contoso MD-102, títulos de casos AZ-104 e preservação das camadas `Cool`/`Archive` para manter inequívoco o sentido técnico.
- `tools/traducao/reaplicar.mjs`: reaplicação ordenada de todos os lotes, competências, rótulos e títulos; auditoria e validação ao final. Confirmada a idempotência nos 29 arquivos de distribuição/fontes examinados.
- Correção móvel na interface: grade do banco usa coluna com mínimo zero; tabelas Markdown largas têm rolagem própria e região acessível. Não houve mudança no modelo, na correção ou no armazenamento.

## Verificações realizadas

- `node tools/traducao/validar.mjs`: aprovado após os lotes 01 e 02. As 1.026 questões mantêm IDs, ordem, tipos, número/ordem estrutural das alternativas, gabaritos atuais e originais, pesos, referências, vínculos e bytes das imagens. Comandos em blocos, URLs e marcadores funcionais preservados. Sintaxe do JavaScript da interface e dos registros válida.
- Playwright/Chrome, abertura direta por `file:///`, 1440 × 1000: três certificações selecionáveis; bancos com 241/337/448 linhas, zero erros estruturais e nenhuma imagem ausente. Q005 exibe a imagem e sua tradução textual. Nenhuma exceção JavaScript.
- Evidência e scripts temporários de navegador: `../Certificados-102-validacao/` (fora da distribuição).
- E2E Playwright/Chrome: seis tipos respondidos pela interface em treino; correção, explicação, detalhes, documentação e competência exibidos; 50% ao acertar um de dois itens. Três simulados de cinco questões concluídos com 1000/1000, revisão e histórico funcionando. Retomada após recarregar; persistência de respostas, estatísticas, estado e anotações de laboratório com acentos. Nenhuma exceção ou erro/aviso de console. As fontes remotas foram substituídas por CSS vazio somente no teste para validar sem depender do Google Fonts.
- Capturas inspecionadas em 1440 × 1000 e tela inicial em 390 × 844; tela inicial móvel sem rolagem horizontal. Outros fluxos móveis ainda não foram testados.
- A conferência dos Markdown detectou e permitiu corrigir um erro no script de atualização de cabeçalhos ENV antes do commit. O validador agora compara também os corpos e a estrutura dessas fontes com o original, aceitando apenas os títulos deste lote.
- Verificação final ampliada: exportação do progresso e duas importações consecutivas preservaram os três históricos sem duplicatas. Filtro de escopo limítrofe mostrou as 18 questões MD-102 esperadas e manteve o valor interno `borderline`. Q269 renderizada em português; estudo de caso com abas e alternância caso/questão funcionando em 390 px. SC-300 Q018 exibiu suas três imagens e três transcrições, sem alargar a página após a correção móvel.
- Sintaxe: 98 arquivos Python analisados por AST, 26 arquivos JavaScript/MJS verificados e 23 arquivos JSON válidos, além dos scripts inline do HTML. O backup foi lido e os hashes SHA-256 dos 644 arquivos originais foram conferidos.

## Próxima etapa

1. Ler o resumo atual e `tools/traducao/TRADUCAO_PENDENCIAS.json`; não retraduzir os 241 enunciados MD-102 nem os primeiros 20 de SC-300/AZ-104.
2. Continuar SC-300 em **Q021** e AZ-104 em **Q037**, usando somente os IDs presentes e mantendo os índices das alternativas.
3. Traduzir os 682 títulos de documentos pendentes ampliando o dicionário de correspondências exatas.
4. Revisar explicações/detalhes e tópicos mistos, inclusive nas questões com enunciado traduzido; preservar afirmações técnicas e registrar dúvidas separadamente.
5. Revisar os corpos dos 89 laboratórios e sincronizar as fontes Markdown sem alterar código, caminhos ou propriedades. O validador atual aceita somente mudanças de título nas fontes; ao traduzir corpos, ampliar a comparação de forma controlada para verificar seções, metadados, código, URLs e equivalência com `labs.js`.
6. Inspecionar e transcrever as 149 imagens SC-300 e 319 imagens AZ-104 restantes, sempre junto à imagem correspondente e sem dicas adicionais.
7. Revisar `tools/modelo-prova/` e a prosa dos materiais auxiliares. Manter originais os PDFs, snapshots e caches usados como fontes.
8. Executar `node tools/traducao/validar.mjs` e `node tools/traducao/auditar.mjs`, testar os novos lotes no navegador e fazer commit dos avanços grandes.

Nenhuma das três certificações está marcada como integralmente traduzida. O volume total excedeu esta sessão; o trabalho foi salvo com a próxima etapa e as evidências necessárias para continuar.

## Validação prevista

Comparação estrutural com o commit original; sintaxe JavaScript/JSON/Python; busca de inglês residual; execução no navegador dos seis tipos, três provas, explicações, documentação, laboratórios, correção e persistência. Browser plugin não disponível nesta sessão; usar Playwright com Chrome já instalado, sem alterar dependências do projeto.
