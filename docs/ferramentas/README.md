# Reprodução das capturas e integridade

O script `importar_documentos.py` copia os arquivos da pasta local `Dados/`, renderiza todas as páginas com 1400 pixels de largura, extrai as imagens originais e grava `docs/fontes.json` com SHA-256.

```bash
python -m pip install PyMuPDF
python docs/ferramentas/importar_documentos.py
```

Execute na raiz. Se `Dados/` não existir após clonar o repositório, o script usa os PDFs já organizados em `docs/*/fontes/`. Nenhum OCR foi necessário: os documentos possuem texto extraível e as figuras originais estão incorporadas nos PDFs.

As capturas são renderizações reais das páginas, sem redesenho por IA. As 13 telas e três diagramas foram extraídos em seu formato original. O script não altera nem comprime os PDFs de origem. Ferramentas instaladas localmente em `.tools/` e materiais de trabalho em `.work/` ficam fora do Git.

## Auditoria da documentação

```bash
python docs/ferramentas/auditar_documentacao.py
```

Confere links e âncoras locais, integridade dos PDFs, contagem e leitura das imagens e correspondência do backlog CSV. Grava o resultado em `docs/testes/auditoria-documentacao.json` e retorna erro se encontrar problemas. A auditoria não executa cenários comerciais ou validação com o parceiro.

## Capturas da aplicação atual

As dez imagens em `docs/prototipos/atual/` foram capturadas de uma execução local do Vite no Chrome headless, via DevTools Protocol. O perfil isolado carregou os dados de demonstração do código. O arquivo `capturas.json` registra navegador, viewport, versão e telas observadas. Essas imagens são distintas das figuras extraídas dos PDFs.
