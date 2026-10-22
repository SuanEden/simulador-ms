import fs from 'node:fs';
import assert from 'node:assert/strict';
import { abrir, gravar } from './dados.mjs';

const campos = new Set(['stem','topic','options','statements','pool','label','panelTitle','alt','caption','explanation','details','note','name','title','body','t','overview','prereqs','steps','test','evidence','expected','variations','breakit','cleanup']);
for (const arquivoLote of process.argv.slice(2)) {
  const lote = JSON.parse(fs.readFileSync(arquivoLote, 'utf8'));
  for (const [arquivo, mudancas] of Object.entries(lote)) {
    assert.match(arquivo, /^(exams\/(MD-102|SC-300|AZ-104)|tools\/modelo-prova)\/(questions|exam|docs|labs)\.js$/);
    const registro = abrir(arquivo);
    for (const [caminho, traducao] of Object.entries(mudancas)) {
      const partes = caminho.split('/');
      let alvo = registro.dados;
      if (Array.isArray(alvo)) {
        const id = partes.shift();
        alvo = alvo.find(q => q.id === id);
        assert.ok(alvo, `${arquivo}: ID ${id} não existe`);
      }
      for (const parte of partes.slice(0, -1)) {
        alvo = alvo[parte];
        assert.ok(alvo !== undefined, `${arquivo}: caminho ${caminho} não existe`);
      }
      const chave = partes.at(-1);
      assert.ok(campos.has(chave), `Campo não textual: ${caminho}`);
      assert.ok(Object.hasOwn(alvo, chave), `Campo ausente: ${caminho}`);
      const anterior = alvo[chave];
      if (Array.isArray(traducao)) {
        assert.ok(Array.isArray(anterior));
        assert.equal(anterior.length, traducao.length, `Quantidade de itens: ${caminho}`);
        assert.ok(anterior.every(v => typeof v === 'string') && traducao.every(v => typeof v === 'string'));
      } else {
        assert.equal(typeof anterior, 'string');
        assert.equal(typeof traducao, 'string');
      }
      alvo[chave] = traducao;
    }
    gravar(arquivo, registro);
    console.log(`${arquivo}: ${Object.keys(mudancas).length} campos textuais aplicados`);
  }
}
