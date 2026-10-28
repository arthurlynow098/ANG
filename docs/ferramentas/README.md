# Ferramentas da documentação

Estes scripts servem para gerar e conferir as imagens dos documentos. Para apenas ler o projeto, use o [índice dos documentos](../fontes.md).

## Gerar as imagens das páginas

```bash
python -m pip install PyMuPDF
python docs/ferramentas/importar_documentos.py
```

Execute na pasta principal do projeto. O script usa os quatro PDFs do projeto em `Dados/`. Se essa pasta não existir, usa as cópias organizadas em `docs/`.

Ele gera uma imagem de cada página e separa as 13 telas e os três diagramas dos PDFs. Os arquivos originais não são alterados.

## Conferir links e arquivos

```bash
python docs/ferramentas/auditar_documentacao.py
```

O script confere links, imagens, documentos e a lista de tarefas em CSV. O resultado fica em `docs/testes/auditoria-documentacao.json`. Essa conferência não testa as operações de venda ou cadastro.

## Telas da aplicação atual

As dez imagens em `docs/prototipos/atual/` foram capturadas no Chrome, com o sistema rodando localmente e dados de exemplo. O arquivo `capturas.json` registra as telas e a configuração usada.
