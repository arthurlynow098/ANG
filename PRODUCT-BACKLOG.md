# Product Backlog — O-BRECHÓ / ANG

**Objetivo:** centralizar a operação do brechó e apoiar as atividades sociais da ANG. **Responsável previsto por produto:** Tiago Pereira Cortes, PM/PO Júnior no estudo (p. 6). **Revisão documental:** 2026-10-27.

Prioridades são propostas por dependência e risco, a revisar pela equipe. Papéis e requisitos vêm dos PDFs; o estado de implementação vem da inspeção do repositório. Nenhum item é considerado aceito pelo parceiro sem evidência.

| ID | Item / necessidade | Prioridade proposta | Estado | Critério de conclusão | Origem / vínculo | Dependências |
|---|---|---|---|---|---|---|
| PB-01 | Acesso e sessão demonstrativos | Alta | Implementado localmente; produção pendente | Verificar login e papéis; substituir acesso demonstrativo antes do uso real | RNF01, RNF02 | PB-07 |
| PB-02 | Recebimento e triagem | Alta | Implementado parcialmente | Rastrear doação e resultado, assegurando regras de origem e aprovação | RF04, RF05 / CT-04, CT-05 | PB-12 |
| PB-03 | Catálogo, categorias e estoque | Alta | Implementado; alinhamento pendente | Usar categorias documentadas e restringir catálogo às peças aprovadas | RF06 / CT-06 | RF04, RF05 |
| PB-04 | Vendas e resumo financeiro | Alta | Implementado parcialmente | Conferir baixa, pagamentos e cálculos de venda; completar consulta por período | RF07, RF08 / CT-07, CT-08 | PB-11 |
| PB-05 | Clientes e equipe | Média | Implementado localmente; validação pendente | Manter cadastros e validar acesso e histórico | RF01, RF02, RF03 / CT-01 a CT-03 | PB-10, PB-07 |
| PB-06 | Backend e persistência compartilhada | Alta | Planejado na atividade | Implementar API e integrar banco adotado; testar relações e persistência | RNF05, RNF06, RNF07 | PB-13 |
| PB-07 | Autenticação e autorização de produção | Alta | Pendente | Remover permissões e senha demonstrativas como mecanismo de acesso real | RNF01, RNF02 | PB-06 |
| PB-08 | Validação funcional e com a ANG | Alta | Planejado | Executar cenários, registrar versão e resultados; organizar avaliação com parceiro | CT-01 a CT-08 / RNF03, RNF04, RNF08, RNF09 | Versão a avaliar |
| PB-09 | Revisão do trabalho acadêmico e referências | Média | Documentos organizados; entrega final pendente | Completar referências, orientação, etapa e documento final conforme disciplina | Estudo e atividade | Equipe e orientação |
| PB-10 | Agrupamento do histórico por categoria | Média | Pendente | Apresentar compras agrupadas pelas categorias dos produtos | RF02 / UC02 / CT-02 | Histórico existente |
| PB-11 | Relatório por dia e período | Alta | Pendente | Selecionar período e obter quantidade de itens e receita coerentes | RF08 / UC08 / CT-08 | Vendas e pagamentos |
| PB-12 | Aprovação exclusiva e origem das peças | Alta | Pendente | Alinhar registro interno pendente, catálogo comercial e aprovação pela gestora | RN01, RN02, RN03 / RF04, RF05 | Decisão de regra e PB-07 |
| PB-13 | Alinhar PostgreSQL planejado e SQL existente | Alta | Decisão e adaptação pendentes | Revisar sintaxe MySQL e adotar migração compatível com banco escolhido | Atividade p. 6 / RNF05 | Decisão técnica da equipe |

## Refinamento e histórico

Os IDs PB-01–PB-09 mantêm os temas da primeira publicação. A revisão dos documentos acrescenta PB-10–PB-13 para os pontos que ainda faltam. Agendamento permanece regra operacional, sem módulo de agenda no sistema atual. Shadcn/UI é tecnologia planejada, mas ainda não usada.

Estados distinguem planejamento, implementação local e validação. Fontes: [requisitos](docs/requisitos/especificacao-requisitos.md), [atividade](docs/continuidade/README.md), [lacunas](docs/requisitos/rastreabilidade.md).
