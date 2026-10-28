# Rastreabilidade e lacunas

Referência documental: [RF, pp. 3–4](fontes/RequisitosFuncionais_ANG.pdf) e [estudo, pp. 15–29](../academico/fontes/2209ANG.pdf). Inspeção do código React existente; cenários funcionais ainda não executados nesta consolidação.

| Requisito | UC / cenário | Evidência em frontend/src/ | Lacuna ou resultado ainda necessário |
|---|---|---|---|
| RF01 | UC01 / CT-01 | views/clientes/ClientesView.tsx, context/BrechoContext.tsx | Verificar dados obrigatórios, duplicidade e persistência local |
| RF02 | UC02 / CT-02 | views/clientes/ClienteDetalheView.tsx | Tela lista compras e produtos, sem agrupamento por categoria |
| RF03 | UC03 / CT-03 | views/equipe/AtendentesView.tsx, components/Topbar.tsx | Gestão demonstrativa com controles de interface por cargo; autorização no servidor ausente |
| RF04 | UC04 / CT-04 | views/triagem/TriagemView.tsx, services/triagemService.ts | Cadastro direto permite produto sem doação; reconciliar com RN01 |
| RF05 | UC05 / CT-05 | views/triagem/TriagemView.tsx, context/BrechoContext.tsx | Aprovação exclusiva por Aline não garantida; peças são criadas como pendentes antes da aprovação |
| RF06 | UC06 / CT-06 | views/produtos/, data/mockData.ts | Seed amplia categorias; alinhar Shorts e Calças com Shorts masculino; rever abrangência de Vestidos |
| RF07 | UC07 / CT-07 | views/vendas/NovaVendaView.tsx, services/vendaService.ts | Verificar estoque, pagamento e consistência entre total negociado e itens |
| RF08 | UC08 / CT-08 | views/vendas/RelatoriosView.tsx | Resumo agregado sem seleção de período nem consolidação diária de quantidade |

## Planejamento e implementação

| Tema | Documento | Código / estado atual | Encaminhamento |
|---|---|---|---|
| Backend | Atividade p. 6: Node.js + TypeScript + Express | Não implementado | PB-06 |
| Banco | Atividade p. 6: PostgreSQL | SQL existente usa AUTO_INCREMENT, de MySQL; frontend usa localStorage | PB-13: decidir migração antes da integração |
| Componentes visuais | Atividade p. 6: Shadcn/UI | React e Tailwind; Shadcn/UI não instalado | Documentar diferença sem declarar adoção |
| Agenda e relatório como classes | Estudo p. 31: Agendamento e Relatorio | Sem entidades equivalentes no SQL atual | Preservar modelo conceitual; implementação a decidir |
| Aprovação exclusiva | Estudo pp. 4 e 7: gestora Aline | Interface permite operação por outros perfis autenticados | PB-12 |
| Cadastro anterior à aprovação | Texto prevê inclusão após aprovação | Repositório registra PRODUTO pendente para rastrear triagem | Definir distinção entre registro interno e catálogo comercial |
| Dados nas telas | telasANG.pdf pp. 6 e 14 | Protótipo possui números estáticos; React calcula seu próprio resumo | Não tratar números demonstrativos como dados financeiros reais |

## Evolução das referências

O primeiro envio usava RF-01 a RF-06 como rótulos extraídos apenas do código. Esses rótulos foram substituídos pelos IDs oficiais dos PDFs. Para evitar ambiguidade, UC01–UC08 acompanham RF01–RF08 nesta consolidação. Os IDs de testes CT-01–CT-08 seguem a mesma ordem; os quatro cenários genéricos anteriores foram detalhados e ampliados, sem afirmar sua execução.
