# Requisitos: o que já existe e o que falta

Esta tabela mostra o que já existe e o que falta em cada requisito. As fontes de cada requisito estão na [especificação](especificacao-requisitos.md). Os nomes dos arquivos abaixo são links para o código.

| Requisito | Caso de uso / teste | Onde está no código | O que falta conferir ou ajustar |
|---|---|---|---|
| RF01 | UC01 / CT-01 | [views/clientes/ClientesView.tsx](../../frontend/src/views/clientes/ClientesView.tsx), [context/BrechoContext.tsx](../../frontend/src/context/BrechoContext.tsx) | Verificar dados obrigatórios, duplicidade e persistência local |
| RF02 | UC02 / CT-02 | [views/clientes/ClienteDetalheView.tsx](../../frontend/src/views/clientes/ClienteDetalheView.tsx) | Tela lista compras e produtos, sem agrupamento por categoria |
| RF03 | UC03 / CT-03 | [views/equipe/AtendentesView.tsx](../../frontend/src/views/equipe/AtendentesView.tsx), [components/Topbar.tsx](../../frontend/src/components/Topbar.tsx) | Gestão demonstrativa com controles de interface por cargo; autorização no servidor ausente |
| RF04 | UC04 / CT-04 | [views/triagem/TriagemView.tsx](../../frontend/src/views/triagem/TriagemView.tsx), [services/triagemService.ts](../../frontend/src/services/triagemService.ts) | Cadastro direto permite produto sem doação; alinhar com RN01 |
| RF05 | UC05 / CT-05 | [views/triagem/TriagemView.tsx](../../frontend/src/views/triagem/TriagemView.tsx), [context/BrechoContext.tsx](../../frontend/src/context/BrechoContext.tsx) | Aprovação exclusiva por Aline não garantida; peças são criadas como pendentes antes da aprovação |
| RF06 | UC06 / CT-06 | [views/produtos/](../../frontend/src/views/produtos/), [data/mockData.ts](../../frontend/src/data/mockData.ts) | Os dados de exemplo usam mais categorias; alinhar Shorts e Calças com Shorts masculino; rever abrangência de Vestidos |
| RF07 | UC07 / CT-07 | [views/vendas/NovaVendaView.tsx](../../frontend/src/views/vendas/NovaVendaView.tsx), [services/vendaService.ts](../../frontend/src/services/vendaService.ts) | Verificar estoque, pagamento e consistência entre total negociado e itens |
| RF08 | UC08 / CT-08 | [views/vendas/RelatoriosView.tsx](../../frontend/src/views/vendas/RelatoriosView.tsx) | Resumo geral sem seleção de período nem total de peças vendidas por dia |

## Planejamento e implementação

| Tema | Documento | Código / estado atual | Encaminhamento |
|---|---|---|---|
| Backend | [Ver página 6](../continuidade/evidencias/atividade-29-09-2026/pagina-06.png): Node.js + TypeScript + Express | Não implementado | PB-06 |
| Banco | [Ver página 6](../continuidade/evidencias/atividade-29-09-2026/pagina-06.png): PostgreSQL | SQL existente usa AUTO_INCREMENT, de MySQL; frontend usa localStorage | PB-13: decidir migração antes da integração |
| Componentes visuais | [Ver página 6](../continuidade/evidencias/atividade-29-09-2026/pagina-06.png): Shadcn/UI | React e Tailwind; Shadcn/UI não instalado | Documentar diferença sem declarar adoção |
| Agenda e relatório como classes | [Ver página 31](../academico/evidencias/estudo-ang/pagina-31.png): Agendamento e Relatorio | Não existem no SQL atual | Agenda fora do escopo atual; desenho original mantido para consulta |
| Aprovação exclusiva | [Ver página 4](../academico/evidencias/estudo-ang/pagina-04.png) · [Ver página 7](../academico/evidencias/estudo-ang/pagina-07.png): gestora Aline | Interface permite operação por outros perfis autenticados | PB-12 |
| Cadastro anterior à aprovação | [Ver página 7](../academico/evidencias/estudo-ang/pagina-07.png): cadastro após aprovação | Repositório registra PRODUTO pendente para rastrear triagem | Definir distinção entre registro interno e catálogo comercial |
| Dados nas telas | [Ver página 6](../prototipos/evidencias/telas-ang/pagina-06.png) e [14](../prototipos/evidencias/telas-ang/pagina-14.png) | Protótipo possui números estáticos; React calcula seu próprio resumo | Não tratar números demonstrativos como dados financeiros reais |

## Sobre os códigos usados

RF01–RF08 são os códigos dos requisitos nos documentos. UC01–UC08 identificam os casos de uso. CT-01–CT-08 identificam os testes, que ainda precisam ser feitos.
