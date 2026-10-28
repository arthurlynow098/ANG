# Casos de uso — O-BRECHÓ

Fluxos identificados no código, a confirmar com equipe/parceiro. Os cargos existentes são Administrador, Atendente e Responsável pela Triagem; a matriz de permissões ainda precisa de validação.

| ID | Objetivo | Fluxo principal | Alternativas / pendências |
|---|---|---|---|
| UC-01 | Acessar demonstração | Informar usuário e senha, entrar no painel | Usuário inexistente ou senha rejeitada; senha demonstrativa aceita pelo serviço |
| UC-02 | Avaliar doação | Registrar doação e peça, avaliar, definir categoria/preço/local e aprovar | Reprovação com motivo; verificar em CT-02 |
| UC-03 | Registrar venda | Selecionar peças, negociar valores, informar cliente e pagamento, confirmar | Validações de estoque e valores em services/vendaService.ts; verificar em CT-03 |

Pré-condição dos fluxos operacionais: sessão demonstrativa ativa e dados disponíveis no navegador. Pós-condições previstas: peça classificada ou venda registrada e estado local atualizado. Não houve execução funcional destes cenários nesta reorganização.

Veja [requisitos](../requisitos/README.md), [DER](../der/DER.md) e [testes](../testes/README.md). Arquivos com sufixo `-template` são modelos, não evidências do ANG.
