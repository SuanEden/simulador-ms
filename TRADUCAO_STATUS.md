# Tradução do SimuladorMS para português brasileiro

Status: **em andamento; tradução integral ainda não concluída**.

## Ponto de recuperação

- Backup integral anterior às alterações: `../Certificados-102-backups/antes-traducao-2026-10-22.zip` (644 arquivos, incluindo PDFs e imagens; manifesto SHA-256 dentro do ZIP).
- Commit do estado original do simulador: `4ab8291`.
- O projeto já continha arquivos não rastreados; esse commit registra o estado encontrado. Os PDFs em `Dumps/` continuam fora do Git e estão no backup.
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
- Imagens MD-102 Q005 e Q017: capturas inspecionadas; tradução completa dos rótulos e valores acrescentada ao enunciado, sem comentários sobre o gabarito. Q028 e Q044 inspecionadas, ainda sem transcrição.

## Verificações realizadas

- `node tools/traducao/validar.mjs`: aprovado após os lotes 01 e 02. As 1.026 questões mantêm IDs, ordem, tipos, número/ordem estrutural das alternativas, gabaritos atuais e originais, pesos, referências, vínculos e bytes das imagens. Comandos em blocos, URLs e marcadores funcionais preservados. Sintaxe do JavaScript da interface e dos registros válida.
- Playwright/Chrome, abertura direta por `file:///`, 1440 × 1000: três certificações selecionáveis; bancos com 241/337/448 linhas, zero erros estruturais e nenhuma imagem ausente. Q005 exibe a imagem e sua tradução textual. Nenhuma exceção JavaScript.
- Evidência e scripts temporários de navegador: `../Certificados-102-validacao/` (fora da distribuição).

## Próxima etapa

Continuar MD-102 a partir de Q021. Traduzir os estudos de caso SC-300/AZ-104 e os três catálogos de documentação. Revisar explicações/detalhes, laboratórios/fontes Markdown e todas as imagens restantes. SC-300 e AZ-104 ainda têm os enunciados e alternativas originais em inglês. Nenhum banco está marcado como integralmente concluído.

## Validação prevista

Comparação estrutural com o commit original; sintaxe JavaScript/JSON/Python; busca de inglês residual; execução no navegador dos seis tipos, três provas, explicações, documentação, laboratórios, correção e persistência. Browser plugin não disponível nesta sessão; usar Playwright com Chrome já instalado, sem alterar dependências do projeto.
