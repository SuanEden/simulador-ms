# Publicação no GitHub Pages

O simulador funciona como site estático, mantendo as mesmas três certificações e funcionalidades da versão local. A tradução continua parcial; consulte [TRADUCAO_STATUS.md](../../TRADUCAO_STATUS.md).

## Situação em 22/10/2026

O repositório `SuanEden/Certificados-102` é privado. A tentativa de ativar o Pages retornou HTTP 422: `Your current plan does not support GitHub Pages for this repository.` O site ainda não foi publicado e a visibilidade do repositório foi preservada.

Alternativas: publicar o pacote em um repositório público separado; tornar o repositório atual público; ou usar um plano do GitHub que ofereça Pages em repositórios privados. Tornar o repositório atual público também expõe seus PDFs e histórico. Documentação: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

## Preparar o pacote

Na raiz do projeto, com Node.js instalado:

```powershell
node tools/publicar/preparar.mjs
```

O comando cria `_site/` com `index.html`, `exams.js`, os bancos, metadados, documentação, laboratórios e imagens das provas do catálogo. Os arquivos são copiados sem modificar seu conteúdo. PDFs, ferramentas e caches de curadoria ficam fora do pacote. A pasta gerada é ignorada pelo Git. Para gerar novamente, mova ou remova somente essa pasta gerada primeiro.

## Ativar a publicação no repositório atual

Depois de resolver a restrição de plano/visibilidade:

1. No GitHub, abra **Settings > Pages** e selecione **GitHub Actions** como fonte.
2. Abra **Actions > Publicar simulador no GitHub Pages > Run workflow**, escolhendo `main`.
3. Aguarde a conclusão e abra o endereço mostrado na etapa de publicação.

O workflow está configurado para execução manual enquanto a publicação aguarda essa decisão. Se for usado o repositório atual, o endereço esperado é `https://suaneden.github.io/Certificados-102/`; esse endereço só estará disponível após uma publicação bem-sucedida.

## Verificações do pacote

O pacote contém 509 arquivos, incluindo as 494 imagens, com aproximadamente 26,7 MB e nenhum PDF. Os hashes SHA-256 de todas as cópias correspondem aos originais. O YAML foi analisado e os arquivos JavaScript copiados tiveram a sintaxe verificada.

Testado por HTTP no Chrome com o caminho `/Certificados-102/`: três certificações carregadas, 241/337/448 questões, zero erros estruturais, todas as imagens encontradas e nenhuma exceção JavaScript ou recurso local ausente. MD-102 Q005 apresentou a imagem e a tradução textual. O armazenamento local persistiu após recarregar, e a tela inicial em 390 px não apresentou transbordamento horizontal. Evidências locais em `../Certificados-102-validacao/pages.cjs` e `pages.json` (fora do repositório; o caminho parte da raiz do projeto). A publicação e o endereço HTTPS ainda precisam de validação após liberar o Pages.

## Progresso dos estudos

O site salva o progresso no navegador de cada pessoa. A versão local e a versão publicada têm armazenamentos separados. Para levar os históricos e estatísticas já registrados, use **Exportar progresso** no histórico da versão local e **Importar progresso** no histórico do site. O formato atual de exportação não inclui todas as anotações/estados de laboratórios nem o simulado em andamento; finalize a tentativa antes de trocar de versão. O site não sincroniza dados entre dispositivos.
