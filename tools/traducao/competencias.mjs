import fs from 'node:fs';
import assert from 'node:assert/strict';
import { abrir, gravar } from './dados.mjs';

const lotes = JSON.parse(fs.readFileSync(new URL('./competencias.json', import.meta.url), 'utf8'));
const datas = { 'MD-102':'27 de outubro de 2026', 'SC-300':'28 de outubro de 2026', 'AZ-104':'17 de abril de 2026' };
for (const [codigo, traducoes] of Object.entries(lotes)) {
  const arquivo = `exams/${codigo}/docs.js`;
  const registro = abrir(arquivo);
  assert.equal(registro.dados.skills.length, traducoes.length);
  let itens = 0;
  registro.dados.skills.forEach((skill, i) => {
    const traducao = traducoes[i];
    assert.equal(skill.id, traducao.id);
    assert.equal(skill.items.length, traducao.items.length, `Itens da competência ${codigo}/${skill.id}`);
    skill.name = traducao.name;
    skill.items.forEach((item,j) => { item.t = traducao.items[j]; itens++; });
  });
  registro.dados.note = `Itens das *Competências avaliadas a partir de ${datas[codigo]}*. Cada questão do banco aponta para uma competência (botão **Competência** na explicação).`;
  gravar(arquivo,registro);
  console.log(`${codigo}: ${traducoes.length} competências e ${itens} itens traduzidos; títulos dos links ainda sujeitos à revisão.`);
}
