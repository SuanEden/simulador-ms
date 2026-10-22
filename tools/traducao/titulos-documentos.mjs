import fs from 'node:fs';
import { abrir, gravar } from './dados.mjs';

const traducoes = JSON.parse(fs.readFileSync(new URL('./titulos-documentos.json',import.meta.url),'utf8'));
for (const codigo of ['MD-102','SC-300','AZ-104']) {
  for (const nome of ['questions','docs']) {
    const arquivo = `exams/${codigo}/${nome}.js`;
    const registro = abrir(arquivo);
    let n = 0;
    const visitar = obj => {
      if (!obj || typeof obj !== 'object') return;
      if (typeof obj.t === 'string' && typeof obj.u === 'string' && Object.hasOwn(traducoes,obj.t)) {
        if (obj.t !== traducoes[obj.t]) { obj.t = traducoes[obj.t]; n++; }
      }
      for (const v of Object.values(obj)) visitar(v);
    };
    visitar(registro.dados);
    gravar(arquivo,registro);
    console.log(`${arquivo}: ${n} ocorrências de títulos traduzidas; URLs preservadas.`);
  }
}
