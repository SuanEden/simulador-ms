# Verificações da tradução — 22/10/2026

Resultado deste lote: **verificações estruturais e funcionais aprovadas; tradução integral pendente**. Consulte `TRADUCAO_STATUS.md` para cobertura e próximos passos.

## Alterações verificadas

- `index.html`: rótulos em português, valores internos dos filtros preservados, áreas de resposta dos seis tipos, nomes acessíveis Sim/Não e inserção das imagens após a referência em português.
- `exams/*/exam.js`: 14 domínios e oito estudos de caso, preservando IDs, pesos, duração, notas de aprovação e relações entre questões/casos.
- `exams/*/questions.js`: todos os 241 enunciados/campos de resposta MD-102 e os primeiros 20 SC-300/AZ-104; 26 imagens acompanhadas de tradução textual; tópicos e títulos de documentação parcialmente traduzidos.
- `exams/*/docs.js`: 44 competências e 263 itens, com traduções parciais dos títulos de links e URLs originais.
- `exams/*/labs.js` e `tools/pipeline/labs/*src/*.md`: títulos de 89 laboratórios, três ambientes e cabeçalhos das 16 fontes; corpos originais preservados e ainda sujeitos à revisão terminológica.
- `README.md`, `LEIA-ME.md`, `tools/pipeline/PROCESSO.md`: instruções de uso e manutenção da tradução.

## Ambiente

- Chrome instalado, executado por Playwright em contexto isolado. Nenhum dado do perfil de navegador do usuário foi lido ou alterado.
- Plugin Browser ausente (`Browser plugin not available`); usado Playwright instalado em `../Certificados-102-validacao/`, sem adicionar dependências ao simulador.
- Abertura direta: `file:///C:/Users/202502243057/Certificados-102/index.html`.
- Viewports: 1440 × 1000 e 390 × 844.
- No E2E, a requisição de CSS do Google Fonts recebeu CSS vazio para que o teste não dependesse de fontes remotas; o conteúdo e os scripts do simulador foram carregados dos arquivos reais.

## Integridade e sintaxe

| Verificação | Resultado |
|---|---|
| Quantidade de questões | 241 MD-102, 337 SC-300, 448 AZ-104: 1.026 preservadas |
| IDs, posições e tipos | Equivalentes ao commit original `4ab8291` |
| Gabaritos e gabaritos originais da curadoria | Preservados, inclusive os campos `answer_original` |
| Alternativas, afirmações, seletores, associações e pools | Mesmas quantidades, índices e estrutura; tradução aplicada por posição |
| Pesos, tempos, escopos, status e vínculos | Preservados |
| URLs, caminhos Windows, IPs, cmdlets e código | Preservados; código inline e blocos comparados; adições de URLs transcritas de imagens explicitamente registradas |
| Imagens | Bytes das 494 imagens iguais ao original; nenhuma ausente no carregamento dos bancos |
| Fontes Markdown dos laboratórios | Corpos e metadados preservados; somente títulos alterados |
| JavaScript | 26 arquivos JS/MJS e scripts inline do HTML com sintaxe válida |
| JSON | 23 arquivos válidos |
| Python | 98 arquivos analisados por AST sem erro de sintaxe |
| Backup | 644 arquivos originais lidos do ZIP e conferidos por SHA-256 |
| Reaplicação | Idempotente nos 29 arquivos da distribuição/fontes examinados |

## Fluxos exercitados no navegador

| Fluxo | Resultado |
|---|---|
| Identidade da página, conteúdo inicial e três certificações | Título SimuladorMS, conteúdo significativo e três opções carregadas |
| Erros e avisos | Nenhuma exceção JavaScript nem erro/aviso relevante de console no E2E; nenhum overlay de erro |
| Escolha única | MD-102 Q002 respondida e corrigida |
| Múltipla escolha em painel | MD-102 Q013 respondida e corrigida |
| Sim/não | MD-102 Q001 respondida e corrigida |
| Seletores | MD-102 Q005 respondida e corrigida; marcadores funcionais não aparecem como texto bruto |
| Ordenação | MD-102 Q006 respondida usando seleção e botão de mover |
| Associação | MD-102 Q023 respondida usando seleção de item e destino |
| Pontuação parcial | Q005: um de dois itens correto resultou em 50% |
| Explicações | Explicação, detalhes, documentação, competência e vínculos de laboratório exibidos |
| Documentação | Busca e treino por competência funcionando nas três provas |
| Simulados | Cinco questões respondidas corretamente em cada prova: 1000/1000 nas três |
| Retomada | Recarregar durante uma prova preservou a resposta e permitiu retomar |
| Revisão e histórico | Resultados, revisão das respostas e histórico exibidos nas três provas |
| Progresso local | Estatísticas, status e anotações de laboratório com acentos mantidos após recarregar |
| Exportação/importação | JSON exportado correspondeu aos históricos; duas importações consecutivas não duplicaram os simulados |
| Filtro de escopo | Rótulo em português seleciona `borderline`; 18 questões MD-102 esperadas |
| Estudo de caso | Abas, requisitos traduzidos e alternância caso/questão funcionando, inclusive em 390 px |
| Imagem e texto adjacente | Q005 MD-102 e Q018 SC-300 exibiram imagens e traduções; as três capturas Q018 carregaram |
| Mobile | Início, estudo de caso e banco Q018 sem rolagem horizontal da página; tabelas largas têm rolagem própria |

## Problema encontrado e corrigido

No banco SC-300 em 390 px, o conteúdo atingia 481 px. A coluna móvel da grade conservava a largura mínima do conteúdo, e as tabelas de transcrição podiam ultrapassar o cartão. A coluna passou a usar `minmax(0,1fr)`, os filhos aceitam redução e as tabelas Markdown têm uma região acessível com rolagem horizontal. O mesmo fluxo passou após a correção. Nenhum gabarito ou regra de correção foi alterado.

## Limites da verificação

- A tradução ainda tem 745 enunciados/campos de resposta SC-300/AZ-104, 682 títulos de documentos e 468 imagens pendentes, além da revisão das explicações, dos corpos dos laboratórios e de materiais auxiliares.
- Os testes de fluxo cobrem amostras dos tipos, sem percorrer manualmente as 1.026 questões. Os comandos de laboratório e serviços reais Microsoft não foram executados.
- Apenas Chrome foi exercitado; outros navegadores e todos os estados/gestos de arrastar não foram testados.
- Os URLs dos bancos foram preservados e comparados. O ajuste posterior de preferência `pt-br` nos destinos da interface e suas amostras externas estão descritos abaixo; não houve verificação individual de todos os artigos externos.
- Os PDFs, caches e snapshots originais permanecem originais. Dúvidas técnicas estão em `QUESTOES_PARA_REVISAO.md`, sem mudança de gabarito.

## Como repetir

Na raiz do projeto:

```powershell
node tools/traducao/validar.mjs
node tools/traducao/auditar.mjs
```

Após regenerar dados a partir dos originais, ou para conferir a reaplicação dos lotes:

```powershell
node tools/traducao/reaplicar.mjs
```

Scripts e evidências locais do navegador estão em `../Certificados-102-validacao/`: `smoke.cjs`, `e2e-progress.cjs`, `extra.cjs`, `smoke.json`, `e2e.json`, `extra.json` e as capturas abaixo. A instalação opcional do plugin Browser pode facilitar futuras inspeções visuais dentro do aplicativo.

## Evidências visuais

![Banco e estudo de caso em português, desktop](../Certificados-102-validacao/desktop-caso.png)

![Estudo de caso em 390 px](../Certificados-102-validacao/mobile-caso.png)

![Imagem original e tradução textual, banco SC-300 em 390 px](../Certificados-102-validacao/mobile-sc300.png)

## Links de documentação em português brasileiro — 22/10/2026

A interface passou a preferir `pt-br` nos links de `learn.microsoft.com`, `docs.microsoft.com` e `support.microsoft.com`. A mudança acontece na montagem dos links; os registros originais dos bancos, os comandos e os endereços dos cenários continuam preservados. Não modifica o título dos documentos.

- Validador estrutural aprovado: mesmas 1.026 questões, IDs, tipos, alternativas, gabaritos e imagens, além da sintaxe dos scripts inline.
- Quinze casos de URLs conferidos: localização, reaplicação sem duplicar o idioma, parâmetros, fragmentos, entidades HTML e preservação de endpoints, portais, terceiros e caminhos de imagens.
- Playwright/Chrome: 210/286/387 links nos catálogos de competências MD-102/SC-300/AZ-104 apontaram para `pt-br`, incluindo os guias oficiais. Busca e clique em nova aba mantiveram o destino localizado. O destino externo foi interceptado somente nesses cliques para isolar o teste de interface da rede.
- Laboratório L01 e explicação de uma questão por prova: links localizados; URLs dos bancos ainda originais. Botão Microsoft Learn do simulado aponta para `/pt-br/`. URL `contoso.com` da Q028 e os quatro portais do ambiente MD-102 foram preservados. Nenhuma exceção JavaScript.
- Amostras externas: páginas do Learn sobre administradores locais e criação de usuários abriram em português. Requisições HTTP ao antigo endereço de tags do Azure em `docs.microsoft.com` e ao artigo de coleções do My Apps em `support.microsoft.com` retornaram 200, com redirecionamentos e idioma HTML `pt-br`. Não foram testados todos os links; o conteúdo disponível depende da Microsoft.

Evidências locais: `../Certificados-102-validacao/links-ptbr.cjs` e `links-ptbr.json`. Backup dos arquivos antes da alteração: `../Certificados-102-backups/antes-links-ptbr-bc84383.zip`.
