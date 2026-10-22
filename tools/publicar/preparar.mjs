import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const raiz = fileURLToPath(new URL('../../', import.meta.url));
const destino = path.join(raiz, '_site');
if (fs.existsSync(destino)) {
  throw new Error('A pasta _site já existe. Mova ou remova essa pasta antes de gerar um novo pacote.');
}

let catalogo;
const catalogoJS = fs.readFileSync(path.join(raiz, 'exams.js'), 'utf8');
vm.runInNewContext(catalogoJS, { SIM: { catalog: itens => { catalogo = itens; } } }, { timeout: 1000 });
if (!Array.isArray(catalogo) || !catalogo.length) throw new Error('Catálogo de provas inválido.');

const arquivos = ['index.html', 'exams.js'];
for (const prova of catalogo) {
  if (!/^exams\/[A-Za-z0-9-]+$/.test(prova.folder)) throw new Error('Pasta de prova inválida.');
  for (const nome of ['exam.js', 'questions.js', 'docs.js', 'labs.js']) {
    const arquivo = `${prova.folder}/${nome}`;
    if (fs.existsSync(path.join(raiz, arquivo))) arquivos.push(arquivo);
    else if (['exam.js', 'questions.js'].includes(nome)) throw new Error(`Arquivo ausente: ${arquivo}`);
  }
}
for (const arquivo of arquivos.filter(nome => nome.endsWith('.js'))) {
  new vm.Script(fs.readFileSync(path.join(raiz, arquivo), 'utf8'), { filename: arquivo });
}

fs.mkdirSync(destino);
for (const arquivo of arquivos) {
  const saida = path.join(destino, arquivo);
  fs.mkdirSync(path.dirname(saida), { recursive: true });
  fs.copyFileSync(path.join(raiz, arquivo), saida);
}
for (const prova of catalogo) {
  const imagens = path.join(raiz, prova.folder, 'img');
  if (fs.existsSync(imagens)) fs.cpSync(imagens, path.join(destino, prova.folder, 'img'), { recursive: true });
}
fs.writeFileSync(path.join(destino, '.nojekyll'), '');
console.log(`Pacote criado em ${destino}: ${catalogo.length} certificações, bancos, documentação, laboratórios e imagens.`);
