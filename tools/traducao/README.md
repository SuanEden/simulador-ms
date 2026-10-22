# Lotes de tradução

Cada JSON de lote desta pasta registra alterações de textos em campos específicos. `aplicar.mjs` lê os registros `SIM` em um contexto isolado e altera somente os campos indicados, mantendo os dados de correção. Os JSONs são reaplicáveis após uma regeneração a partir dos insumos originais.

Na raiz do projeto, reaplique tudo na ordem correta:

```powershell
node tools/traducao/reaplicar.mjs
```

Para aplicar ou verificar um lote individual:

```powershell
node tools/traducao/aplicar.mjs tools/traducao/lote-01-casos-md102.json
node tools/traducao/competencias.mjs
node tools/traducao/rotulos.mjs
node tools/traducao/titulos-documentos.mjs
node tools/traducao/auditar.mjs
node tools/traducao/validar.mjs
```

Consulte `TRADUCAO_STATUS.md` antes de continuar. Nunca traduza automaticamente chaves, comandos, URLs ou identificadores. Um lote aplicado não significa que todo o arquivo foi revisado.

`TRADUCAO_PENDENCIAS.json` enumera os IDs e imagens pendentes e os títulos ainda não traduzidos. `TERMOS_PRESERVADOS.md` distingue marcas, código, identificadores e vocabulário técnico de conteúdo pendente. Acrescente observações técnicas em `questoes-revisao.json`; `auditar.mjs` gera o registro `QUESTOES_PARA_REVISAO.md` na raiz, sem alterar gabaritos.
