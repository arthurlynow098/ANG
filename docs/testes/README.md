# Plano e evidências de testes — O-BRECHÓ

Versão analisada: reorganização inicial do código local em 2026-10-27, anterior ao primeiro commit do ANG. Ambiente: Windows e dependências já presentes. Resultados técnicos serão registrados em [verificacao-tecnica.txt](verificacao-tecnica.txt).

## Verificações técnicas

Executar em `frontend/`: `npm run build` e `npx tsc --noEmit`. A compilação não comprova funcionamento dos fluxos nem aceite do cliente. A instalação limpa com `npm ci` e a execução SQL não foram verificadas nesta etapa.

## Cenários manuais planejados

| ID | Vínculo | Procedimento com dados de demonstração | Resultado esperado | Estado |
|---|---|---|---|---|
| CT-01 | RF-01 / UC-01 | Entrar com admin e senha demonstrativa; encerrar sessão; tentar usuário inexistente | Painel acessível e tentativa inválida rejeitada | Não executado |
| CT-02 | RF-02, RF-03 / UC-02 | Registrar doação, aprovar peça com categoria/preço/local; descartar outra com motivo | Peça aprovada disponível; descarte registrado | Não executado |
| CT-03 | RF-04 / UC-03 | Vender peça disponível, escolher cliente/pagamento e conferir estoque, histórico e relatório | Venda/pagamento coerentes; peça marcada como vendida | Não executado |
| CT-04 | RF-05, RF-06 | Cadastrar e editar cliente e funcionário; recarregar a página | Cadastros mantidos no mesmo navegador | Não executado |

Não há avaliação com usuários ou parceiro registrada. Após executar cenários, registrar versão, navegador, entradas, resultado observado e evidência. Os arquivos `-template` contêm exemplos do professor, não resultados reais.
