import fs from 'node:fs';
import vm from 'node:vm';

export function ler(texto) {
  let registro;
  const SIM = Object.fromEntries(['registerExam', 'registerQuestions', 'registerDocs', 'registerLabs'].map(metodo => [metodo, (...args) => {
    if (registro) throw new Error('Mais de um registro no arquivo');
    registro = { metodo, codigo: args.length === 2 ? args[0] : null, dados: args.at(-1) };
  }]));
  vm.runInNewContext(texto, { SIM }, { timeout: 1000 });
  if (!registro) throw new Error('Registro SIM não encontrado');
  return registro;
}

export function abrir(arquivo) { return ler(fs.readFileSync(arquivo, 'utf8')); }

export function gravar(arquivo, registro) {
  const original = fs.readFileSync(arquivo, 'utf8');
  const inicio = original.indexOf('SIM.');
  const prefixo = original.slice(0, inicio);
  const codigo = registro.codigo === null ? '' : JSON.stringify(registro.codigo) + ', ';
  fs.writeFileSync(arquivo, prefixo + `SIM.${registro.metodo}(${codigo}${JSON.stringify(registro.dados, null, 2)});\n`, 'utf8');
}
