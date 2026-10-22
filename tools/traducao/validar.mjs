import fs from 'node:fs';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';
import { abrir, ler } from './dados.mjs';

const base = '4ab8291';
const textos = new Set(['stem','topic','options','statements','pool','label','panelTitle','alt','caption','explanation','details','note','name','title','body','t','overview','prereqs','steps','test','evidence','expected','variations','breakit','cleanup']);
// URL já visível na captura Q028, agora também na transcrição adjacente.
const urlsTranscritas = {
  'exams/MD-102/questions.js/dados/Q028/stem': ['https://contoso.com'],
  'exams/MD-102/questions.js/dados/Q085/stem': ['https://products.office.com/en-us/explore-office-for-home','https://privacy.microsoft.com/en-us/privacystatement']
};
const protegidos = texto => ({
  imagens: [...texto.matchAll(/!\[[^\]]*\]\(([^)]+)\)(\{w=\d+\})?/g)].map(m => m[1] + (m[2] || '')),
  urls: [...texto.matchAll(/https?:\/\/[^\s<>"`]+/g)].map(m => m[0]),
  codigo: [...texto.matchAll(/```[^\n]*\n[\s\S]*?```/g)].map(m => m[0]),
  marcadores: [...texto.matchAll(/\[answer choice\]/g)].map(m => m[0])
});
function comparar(a,b,caminho,campo='') {
  if (typeof a === 'string' && typeof b === 'string' && textos.has(campo)) {
    const original = protegidos(a);
    original.urls.push(...(urlsTranscritas[caminho] || []));
    assert.deepEqual(protegidos(b), original, `Código/URL/imagem/marcador alterado: ${caminho}`);
    return;
  }
  if (Array.isArray(a)) {
    assert.ok(Array.isArray(b), caminho);
    assert.equal(b.length, a.length, `Quantidade alterada: ${caminho}`);
    a.forEach((v,i) => comparar(v,b[i],`${caminho}/${v?.id ?? i}`,campo));
  } else if (a && typeof a === 'object') {
    assert.deepEqual(Object.keys(b).sort(), Object.keys(a).sort(), `Chaves alteradas: ${caminho}`);
    for (const k of Object.keys(a)) comparar(a[k],b[k],`${caminho}/${k}`,k);
  } else assert.deepEqual(b,a,`Dado funcional alterado: ${caminho}`);
}
const resultados = [];
const arvore = execFileSync('git',['ls-tree','-r',base,'--','exams'],{encoding:'utf8',maxBuffer:2*1024*1024});
const blobs = new Map(arvore.trim().split('\n').map(linha => { const [meta,arquivo] = linha.split('\t'); return [arquivo,meta.split(' ')[2]]; }));
for (const codigo of ['MD-102','SC-300','AZ-104']) {
  for (const nome of ['exam','questions','docs','labs']) {
    const arquivo = `exams/${codigo}/${nome}.js`;
    const atual = abrir(arquivo);
    const antes = ler(execFileSync('git',['show',`${base}:${arquivo}`],{encoding:'utf8',maxBuffer:10*1024*1024}));
    comparar(antes,atual,arquivo);
    if (nome === 'questions') {
      const tipos = {};
      atual.dados.forEach(q => { tipos[q.type] = (tipos[q.type] || 0) + 1; });
      resultados.push({prova:codigo,questoes:atual.dados.length,tipos,estrutura:'equivalente'});
    }
  }
  const pasta = `exams/${codigo}/img`;
  for (const nome of fs.readdirSync(pasta)) {
    const arquivo = `${pasta}/${nome}`;
    const bytes = fs.readFileSync(arquivo);
    const hash = createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');
    assert.equal(hash,blobs.get(arquivo),`Imagem alterada: ${arquivo}`);
  }
  const fontes = `tools/pipeline/labs/${codigo.toLowerCase().replace('-','')}src`;
  const normalizarTitulos = t => t.replace(/^=== (ENV|L\d+) \| [^|\r\n]+/gm,'=== $1 | TITULO').replace(/\r\n/g,'\n');
  for (const nome of fs.readdirSync(fontes).filter(n => n.endsWith('.md'))) {
    const arquivo = `${fontes}/${nome}`;
    const original = execFileSync('git',['show',`${base}:${arquivo}`],{encoding:'utf8',maxBuffer:2*1024*1024});
    assert.equal(normalizarTitulos(fs.readFileSync(arquivo,'utf8')),normalizarTitulos(original),`Corpo da fonte de laboratório alterado fora do lote de títulos: ${arquivo}`);
  }
}
const html = fs.readFileSync('index.html','utf8');
for (const m of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)) new vm.Script(m[1]);
assert.match(html, /<html lang="pt-BR">/);
console.log(JSON.stringify({base,resultados,javascript:'sintaxe válida',imagens:'bytes preservados'},null,2));
