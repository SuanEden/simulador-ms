# SimuladorMS

Simulador de provas de certificação que roda localmente no navegador. Para abrir, dê **duplo clique em `index.html`** (Edge ou Chrome). Não precisa de servidor, instalação nem internet.

O app é genérico: ele não sabe nada sobre nenhuma prova específica. Cada prova é uma pasta em `exams/`, e o app lê o que estiver lá.

```
SimuladorMS\
├── index.html          ← o app (não precisa mexer)
├── exams.js            ← lista de provas disponíveis
├── LEIA-ME.md
├── exams\
│   ├── MD-102\
│   │   ├── exam.js       ← domínios, pesos, tempo, estudos de caso
│   │   ├── questions.js  ← banco de questões (com detalhes, skill e docs do Learn)
│   │   ├── labs.js       ← labs práticos (opcional)
│   │   ├── docs.js       ← documentação por skill (opcional)
│   │   └── img\          ← exhibits (prints de tela)
│   ├── SC-300\          ← mesma estrutura
│   └── AZ-104\          ← mesma estrutura
└── tools\
    ├── modelo-prova\   ← modelo com um exemplo de cada tipo de questão
    └── pipeline\       ← ferramentas e insumos do processo (PROCESSO.md)
```

---

## Adicionar uma prova nova

1. Me envie o dump (PDF, com e sem respostas se tiver) e diga qual é a prova.
2. Eu devolvo a pasta `exams\<CODIGO>\` pronta (`exam.js`, `questions.js`, `labs.js`, `docs.js`, `img\`), com o mesmo tratamento das outras provas: curadoria, labs, detalhes com documentação do Learn e documentação por skill. Mande junto o `SimuladorMS.zip` atual, que tem as ferramentas em `tools\pipeline`.
3. Copie a pasta para dentro de `exams\`.
4. Acrescente uma linha no `exams.js`:

```js
SIM.catalog([
  { code: "MD-102", folder: "exams/MD-102" },
  { code: "SC-300", folder: "exams/SC-300" },
  { code: "AZ-104", folder: "exams/AZ-104" },
  { code: "AZ-305", folder: "exams/AZ-305" }   // ← nova
]);
```

5. Abra o `index.html`. A prova aparece na tela inicial.

Antes de estudar, abra **Banco de questões**. Ele mostra se o banco tem erros de estrutura, se faltam imagens e se algum domínio tem poucas questões.

---

## O que eu faço com o dump

| Etapa | O que acontece |
|---|---|
| Extração | Texto de cada página (OCR quando o PDF é imagem) e recorte dos exhibits para `img\` |
| Gabarito | Leitura da resposta marcada no dump (no formato ExamTopics, os quadros verdes) |
| Estrutura | Cada questão vira dado no formato abaixo; tabelas simples viram tabela de verdade, prints viram imagem |
| Escopo | Comparação com o Study Guide vigente; questões fora do escopo ficam `out` |
| Verificação | Conferência do gabarito com a documentação; erros viram `corrigida`, incertezas viram `duvidosa` |
| Cobertura | Contagem por domínio, para saber se o banco sustenta simulados sem repetição |

Você só precisa revisar as questões marcadas como `corrigida` ou `duvidosa`, e pode fazer isso dentro do app.

---

## Curadoria dentro do app

Em **Banco de questões**, clique numa questão para:

- mudar o **escopo** (`in`, `borderline`, `out`);
- mudar o **status** (`ok`, `corrigida`, `duvidosa`);
- **alterar o gabarito**: responda a questão como deveria ser e clique em *Salvar como gabarito*;
- escrever uma **nota de curadoria**.

Essas alterações ficam salvas no navegador. Para gravá-las de vez:

1. Clique em **Exportar questions.js**.
2. Substitua o arquivo na pasta da prova.
3. Clique em **Descartar alterações**, já que agora elas estão no arquivo.

---

## Levar o progresso para outra máquina

O histórico, as estatísticas por questão e a curadoria local ficam no navegador de cada computador. Para levar tudo para outra máquina:

1. Em **Histórico**, clique em **Exportar progresso**. Isso gera um `.json`.
2. Na outra máquina, use **Importar progresso**. Os dados são mesclados, sem duplicar simulados.

A pasta do app pode ser copiada livremente entre máquinas.

---

## Como o simulado é montado

- **Distribuição por domínio**: usa o ponto médio de cada faixa do Skills at a Glance, normalizado para o número de questões. Por exemplo, na MD-102 com 50 questões a distribuição fica 12 / 14 / 9 / 9 / 6. Há uma opção para sortear o peso dentro das faixas.
- **Estudo de caso**: um por simulado, com as questões do caso contando para os domínios delas. Fica numa seção própria; ao sair dela, não dá para voltar.
- **Série "Does this meet the goal?"**: uma por simulado. Cada questão trava depois de respondida e não aparece na tela de revisão.
- **Prioridade**: questões nunca vistas e as que você errou da última vez têm mais chance de sair.
- **Nota**: escala linear de 0 a 1000, com aprovação em 700. É uma estimativa, porque a Microsoft não usa escala linear.
- **Tempo**: o padrão vem do `exam.js` e é proporcional ao número de questões. O cronômetro continua correndo mesmo se você fechar o navegador.

---

## Formato das questões

Todas as questões têm estes campos:

```js
{
  id: "Q015",            // único dentro da prova
  src: 15,               // número no dump original
  domain: 2,             // id do domínio no exam.js
  topic: "Device lifecycle",
  type: "single",        // single | multi | yesno | hotarea | order | match
  stem: "Texto da questão…",   // aceita **negrito**, `código`, listas "- ", tabelas | a | b |
                               // e imagens no meio do texto: uma linha ![Exhibit](img/Q015-1.png){w=600}
  exhibits: [{ src: "img/Q015-1.png", alt: "descrição" }],   // opcional
  group: { kind: "case", id: "ADATUM" },  // opcional: "case" (estudo de caso) ou "series"
  scope: "in",           // in | borderline | out
  review: "ok",          // ok | corrigida | duvidosa
  answer_original: 1,    // gabarito do dump, quando corrigida
  explanation: "Por que a resposta é essa…",
  refs: ["https://learn.microsoft.com/…"]
}
```

Campos específicos de cada tipo:

| Tipo | Campos | Resposta |
|---|---|---|
| `single` | `options: [...]` | `answer: 1` (índice, começando em 0) |
| `multi` | `options: [...]` | `answer: [0, 3]` |
| `multi` + `layout: "panel"` | `options`, `panelTitle` | `answer: [...]`, para hot areas de clicar em menus |
| `yesno` | `statements: [...]` | `answer: [true, false, true]` |
| `hotarea` | `slots: [{ label, options, answer }]` | um `answer` por dropdown; `[answer choice]` no label põe o dropdown no meio da frase |
| `order` | `pool: [...]` | `answer: [1, 0, 2]`, ordem correta com índices do pool (pode haver distratores) |
| `match` | `pool: [...]`, `targets: [{ label, answer }]` | um `answer` por destino; o mesmo item pode ser usado mais de uma vez |

Para não embaralhar as alternativas (por exemplo, "Device1 only", "Device1 and Device2"…), use `shuffle: false`.

O texto dos estudos de caso fica uma vez só, no `exam.js` → `cases`, dividido em abas. As questões apontam para ele pelo `group.id`.

A pasta `tools\modelo-prova` tem um exemplo funcional de cada tipo.

---

## Labs práticos

Uma prova pode ter um arquivo opcional `labs.js` na pasta dela (`exams\<CODIGO>\labs.js`). Quando ele existe:

- aparece o botão **Labs** no topo e um card **Labs práticos** na tela da prova;
- a explicação de cada questão coberta ganha o link **Lab prático: Lxx**, que abre o lab;
- cada lab tem: o que ele testa, pré-requisitos, montagem passo a passo (com os caminhos do portal), como testar, onde conferir, resultado esperado, variações (as outras alternativas da questão), um jeito de quebrar de propósito e a limpeza;
- o status de cada lab (não iniciado, em andamento, concluído) e as suas anotações ficam salvos no navegador, junto com o histórico.

Comece pela página **Ambiente de referência dos labs** (o primeiro item da lista).

Sintaxe extra que os labs usam no texto:

| Sintaxe | Vira |
|---|---|
| `@ Intune: Devices > All devices > Sync` | caminho de navegação do portal |
| bloco entre três crases com `powershell` | código com botão **Copiar** |
| `1. passo` | lista numerada |
| `! texto` / `? texto` | aviso / dica |

---

## Detalhes e documentação

Ao clicar em **Verificar** no modo treino (ou ao revisar uma prova), a explicação de cada questão traz, nesta ordem:

- a **explicação** curta da resposta;
- **Detalhes**: por que as outras alternativas estão erradas (ou o motivo de cada item, em hot area e sim/não) e, quando ajuda, uma **Dica de prova**;
- **Documentação (Microsoft Learn)**: até 4 links vigentes, verificados no Learn;
- a **Skill** do Skills Measured a que a questão pertence (clique para abrir a skill na documentação);
- o **Lab prático**, quando houver.

O botão **Documentação** no topo (e o card na tela da prova) abre a seção **Documentação por skill**. Ela é organizada por domínio → skill → itens do Skills Measured, com os links de cada item, um filtro por domínio, uma busca e o botão **Treinar esta skill**, que monta um treino só com as questões daquela skill.

Esses dados vêm do `docs.js` e dos campos `skill`, `details` e `docs` do `questions.js`. O processo completo para gerar isso em uma prova nova está em `tools\pipeline\PROCESSO.md`.
