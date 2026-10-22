import fs from 'node:fs';
import assert from 'node:assert/strict';
import { abrir, gravar } from './dados.mjs';

const { topicos, laboratorios } = JSON.parse(fs.readFileSync(new URL('./rotulos.json',import.meta.url),'utf8'));
for (const [codigo,titulos] of Object.entries(laboratorios)) {
  const questoes = `exams/${codigo}/questions.js`;
  const banco = abrir(questoes);
  let n = 0;
  for (const q of banco.dados) if (Object.hasOwn(topicos,q.topic)) { q.topic = topicos[q.topic]; n++; }
  gravar(questoes,banco);
  const arquivo = `exams/${codigo}/labs.js`;
  const registro = abrir(arquivo);
  assert.equal(registro.dados.labs.length,titulos.length);
  registro.dados.env.title = 'Ambiente de referência dos laboratórios';
  registro.dados.labs.forEach((lab,i) => {
    assert.equal(lab.id,`L${String(i+1).padStart(2,'0')}`);
    lab.title = titulos[i];
  });
  gravar(arquivo,registro);
  const pasta = `tools/pipeline/labs/${codigo.toLowerCase().replace('-','')}src`;
  let total = 0;
  for (const nome of fs.readdirSync(pasta).filter(n => n.endsWith('.md'))) {
    const caminho = `${pasta}/${nome}`;
    const fonte = fs.readFileSync(caminho,'utf8');
    const traduzida = fonte.replace(/^=== (ENV|L\d+) \| ([^|\r\n]+)(?: \|(.*))?$/gm,(linha,id,anterior,resto) => {
      if (id === 'ENV') return '=== ENV | Ambiente de referência dos laboratórios';
      const lab = registro.dados.labs.find(l => l.id === id);
      assert.ok(lab,`${codigo}: ${id} ausente`);
      total++;
      return `=== ${id} | ${lab.title} |${resto}`;
    });
    fs.writeFileSync(caminho,traduzida,'utf8');
  }
  assert.equal(total,titulos.length,`Cabeçalhos Markdown: ${codigo}`);
  console.log(`${codigo}: ${n} tópicos, ${titulos.length} títulos de laboratório e fontes correspondentes.`);
}
