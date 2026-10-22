import fs from 'node:fs';
import assert from 'node:assert/strict';
import { abrir, ler } from './dados.mjs';
import { execFileSync } from 'node:child_process';

const pasta = new URL('./',import.meta.url);
const lotes = fs.readdirSync(pasta).filter(n => /^lote-.*\.json$/.test(n)).sort();
const traduzidas = {};
for (const nome of lotes) {
  const lote = JSON.parse(fs.readFileSync(new URL(nome,pasta),'utf8'));
  for (const [arquivo,campos] of Object.entries(lote)) {
    const codigo = arquivo.match(/^exams\/([^/]+)\/questions\.js$/)?.[1];
    if (!codigo) continue;
    traduzidas[codigo] ||= new Set();
    for (const campo of Object.keys(campos)) if (/^[^/]+\/stem$/.test(campo)) traduzidas[codigo].add(campo.split('/')[0]);
  }
}
const titulos = JSON.parse(fs.readFileSync(new URL('./titulos-documentos.json',import.meta.url),'utf8'));
const relatorio = {
  data:'2026-10-22',
  status:'PARCIAL — não declarar tradução integral',
  base:'4ab8291',
  observacao:'Contagens de enunciados e campos de resposta aplicados; explicações, detalhes, tópicos, links e laboratórios têm revisão separada.',
  provas:{},
  titulosDocumentosPendentes:[],
  revisaoTerminologicaPendente:['explanation/details dos três bancos','tópicos mistos remanescentes, especialmente AZ-104','corpos dos 89 laboratórios e suas fontes Markdown','tools/modelo-prova/','prosa e exemplos históricos de tools/pipeline/'],
  preservados:'TERMOS_PRESERVADOS.md'
};
const documentos = new Map();
const coletarDocs = (obj,arquivo,caminho='') => {
  if (!obj || typeof obj !== 'object') return;
  if (typeof obj.t === 'string' && typeof obj.u === 'string') {
    if (!documentos.has(obj.t)) documentos.set(obj.t,[]);
    documentos.get(obj.t).push({arquivo,caminho,url:obj.u});
  }
  for (const [k,v] of Object.entries(obj)) coletarDocs(v,arquivo,`${caminho}/${k}`);
};
const duvidas = [];
for (const codigo of ['MD-102','SC-300','AZ-104']) {
  const arquivo = `exams/${codigo}/questions.js`;
  const atuais = abrir(arquivo).dados;
  const originais = ler(execFileSync('git',['show',`4ab8291:${arquivo}`],{encoding:'utf8',maxBuffer:10*1024*1024})).dados;
  const ids = traduzidas[codigo] || new Set();
  for (const id of ids) assert.ok(atuais.some(q => q.id === id),`${codigo}: ID de lote ausente ${id}`);
  const imagens = new Map(fs.readdirSync(`exams/${codigo}/img`).map(nome => [`img/${nome}`,{arquivo:`exams/${codigo}/img/${nome}`,questoes:[],traducaoAdjacente:false}]));
  for (const q of atuais) {
    const refs = new Set((q.exhibits || []).map(e => e.src));
    for (const m of q.stem.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)) refs.add(m[1]);
    for (const ref of refs) {
      const item = imagens.get(ref);
      assert.ok(item,`${codigo}/${q.id}: imagem ausente ${ref}`);
      item.questoes.push(q.id);
      if (q.stem.includes('### Tradução do texto')) item.traducaoAdjacente = true;
    }
  }
  relatorio.provas[codigo] = {
    total:atuais.length,
    enunciadosCamposRespostaAplicados:ids.size,
    idsAplicados:atuais.filter(q => ids.has(q.id)).map(q => q.id),
    idsPendentes:atuais.filter(q => !ids.has(q.id)).map(q => q.id),
    imagens:[...imagens.values()],
    laboratorios:abrir(`exams/${codigo}/labs.js`).dados.labs.length,
    corposLaboratoriosRevisadosIntegralmente:0
  };
  for (const q of originais.filter(q => q.review === 'duvidosa')) duvidas.push({codigo,id:q.id});
  coletarDocs(atuais,arquivo);
  coletarDocs(abrir(`exams/${codigo}/docs.js`).dados,`exams/${codigo}/docs.js`);
}
const jaTraduzidos = new Set(Object.values(titulos));
let traduzidosOcorrencias = 0, preservadosOcorrencias = 0;
for (const [titulo,ocorrencias] of documentos) {
  if (jaTraduzidos.has(titulo) && !Object.hasOwn(titulos,titulo)) traduzidosOcorrencias += ocorrencias.length;
  else if (/^[A-Z][a-z]+-[\w]+(?:\s+\([^)]+\))?$/.test(titulo)) preservadosOcorrencias += ocorrencias.length;
  else relatorio.titulosDocumentosPendentes.push({titulo,ocorrencias});
}
relatorio.resumo = {
  questoes:1026,
  enunciadosCamposRespostaAplicados:Object.values(relatorio.provas).reduce((n,p) => n+p.enunciadosCamposRespostaAplicados,0),
  enunciadosPendentes:Object.values(relatorio.provas).reduce((n,p) => n+p.idsPendentes.length,0),
  imagens:Object.values(relatorio.provas).reduce((n,p) => n+p.imagens.length,0),
  imagensComTraducaoAdjacente:Object.values(relatorio.provas).reduce((n,p) => n+p.imagens.filter(i => i.traducaoAdjacente).length,0),
  titulosDocumentosTraduzidosOcorrencias:traduzidosOcorrencias,
  titulosCmdletsPreservadosOcorrencias:preservadosOcorrencias,
  titulosDocumentosPendentesUnicos:relatorio.titulosDocumentosPendentes.length
};
fs.writeFileSync(new URL('./TRADUCAO_PENDENCIAS.json',import.meta.url),JSON.stringify(relatorio,null,2)+'\n','utf8');
const candidatos = JSON.parse(fs.readFileSync(new URL('./questoes-revisao.json',import.meta.url),'utf8'));
const linhas = candidatos.map(q => `| ${q.exam} ${q.id} | ${q.note} |`).join('\n');
const notas = `# Questões para revisão técnica separada\n\nNenhum gabarito foi alterado durante a tradução. Este registro não confirma erros nem altera os status existentes. A base de comparação é o commit 4ab8291, incluindo as correções de curadoria que já existiam.\n\nArquivo gerado por auditar.mjs. Acrescente novas observações na fonte tools/traducao/questoes-revisao.json para preservá-las nas próximas auditorias.\n\n## Observações encontradas na tradução\n\n| Prova / questão | Observação para revisão futura |\n|---|---|\n${linhas}\n\n## Questões já marcadas como duvidosas no estado original\n\n`;
let texto = notas;
for (const codigo of ['MD-102','SC-300','AZ-104']) texto += `- **${codigo}:** ${duvidas.filter(q => q.codigo === codigo).map(q => q.id).join(', ')}.\n`;
texto += '\nAs notas e explicações de curadoria originais continuam nos bancos. Não exibir este registro como dica durante uma questão. Uma validação técnica com fontes atuais é uma tarefa separada da tradução.\n';
fs.writeFileSync('QUESTOES_PARA_REVISAO.md',texto,'utf8');
console.log(JSON.stringify(relatorio.resumo,null,2));
