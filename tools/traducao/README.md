# Lotes de tradução

Cada JSON desta pasta registra alterações de textos em campos específicos. `aplicar.mjs` lê os registros `SIM` em um contexto isolado e altera somente os campos indicados, mantendo os dados de correção. Os JSONs são reaplicáveis após uma regeneração a partir dos insumos originais.

```powershell
node tools/traducao/aplicar.mjs tools/traducao/lote-01.json
node tools/traducao/validar.mjs
```

Consulte `TRADUCAO_STATUS.md` antes de continuar. Nunca traduza automaticamente chaves, comandos, URLs ou identificadores. Um lote aplicado não significa que todo o arquivo foi revisado.
