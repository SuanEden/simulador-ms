import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

// Execute a partir da raiz do projeto. A ordem mantém as revisões textuais por último.
const lotes = fs.readdirSync('tools/traducao').filter(n => /^lote-.*\.json$/.test(n)).sort().map(n => `tools/traducao/${n}`);
execFileSync(process.execPath,['tools/traducao/aplicar.mjs',...lotes],{stdio:'inherit'});
for (const script of ['competencias','rotulos','titulos-documentos','auditar','validar']) {
  execFileSync(process.execPath,[`tools/traducao/${script}.mjs`],{stdio:'inherit'});
}
