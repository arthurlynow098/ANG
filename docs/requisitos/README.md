# Requisitos — O-BRECHÓ

Inventário extraído do código em 2026-10-27, pendente de confirmação com equipe e parceiro. Não representa requisitos aprovados pelo cliente.

| ID | Comportamento existente | Evidência em frontend/src/ | Critério manual proposto |
|---|---|---|---|
| RF-01 | Acesso demonstrativo por usuário | services/authService.ts | CT-01: acessar e sair |
| RF-02 | Receber doações e avaliar peças | views/triagem/, services/triagemService.ts | CT-02: receber, aprovar e descartar |
| RF-03 | Cadastrar e consultar produtos e estoque | views/produtos/ | CT-02: consultar peça aprovada |
| RF-04 | Registrar vendas, pagamento e relatórios | views/vendas/, services/vendaService.ts | CT-03: concluir venda e consultar relatório |
| RF-05 | Manter clientes e consultar histórico | views/clientes/ | CT-04: cadastrar cliente e consultar histórico |
| RF-06 | Manter funcionários e acessos | views/equipe/ | CT-04: cadastrar funcionário |

## Qualidade e regras

A aplicação usa interface web e armazenamento local. Compatibilidade, desempenho, acessibilidade e segurança de produção precisam de critérios acordados e validação própria. O DER e os serviços registram os estados de produto e triagem; as regras descritas no [DER](../der/DER.md) são referências da implementação existente, sem presumir aprovação externa.

Roteiros e resultados: [testes](../testes/README.md). Priorização: [backlog](../../PRODUCT-BACKLOG.md). O arquivo `especificacao-requisitos-template.md` permanece como modelo de preenchimento do professor.
