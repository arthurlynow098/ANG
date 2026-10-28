# Linha de base e evolução — [semestre/ano]

- **Projeto:** [nome]
- **Equipe atual:** [identificação]
- **Período:** [semestre/ano]
- **Origem do trabalho anterior:** [repositório/arquivo institucional ou N/A]
- **Versão recebida no início:** [tag, commit, data ou versão do documento]
- **Como o estado inicial foi conferido:** [inspeção, demonstração, testes existentes, conversa registrada]
- **Limitações da comparação:** [arquivos ausentes, acesso, versão não identificada etc.]

## Estado recebido no início do semestre

Descreva, com evidências, o que já existia antes do trabalho deste período. Separe funcionalidades implementadas de funcionalidades testadas/validadas.

| Item/funcionalidade/artefato | Estado inicial | Evidência da linha de base | Limitação conhecida |
|---|---|---|---|
| [ID ou nome] | [implementado / parcial / protótipo / planejado / desconhecido] | [caminho, versão, página ou commit] | [limitação ou N/A] |

## O que mudou neste semestre

| Item | Classificação | Situação inicial → atual | Trabalho desenvolvido neste período | Evidência/localização | Validação/resultado |
|---|---|---|---|---|---|
| [ID ou nome] | [herdado e mantido / herdado e alterado / novo / pendente / removido] | [antes → agora] | [mudança concreta] | [arquivo, tela, teste, decisão, commit/PR] | [evidência ou não validado] |

Para itens herdados e mantidos, explique se foram reavaliados neste semestre ou apenas preservados. Para mudanças não concluídas, descreva o que foi feito, o que falta e por quê.

## Contribuições dos integrantes

Registre a contribuição de cada integrante por atividade ou conjunto de evidências. Trabalhos em dupla ou colaboração devem ser descritos como tais. Não use somente contagem de commits para medir contribuição.

| Integrante | Atividade/contribuição | Artefatos ou tarefas relacionados | Evidência | Colaboração/observação |
|---|---|---|---|---|
| [nome ou identificação] | [análise / modelagem / implementação / testes / documentação / coordenação] | [IDs/caminhos] | [commit/PR, arquivo, ata, teste ou validação] | [se aplicável] |

## Decisões e próximos passos

- **Decisões de continuidade ou mudança:** [DEC-ID, decisão e motivo]
- **Pendências herdadas:** [itens]
- **Próximos passos:** [ação, responsável/papel e critério de conclusão]

## Exemplo preenchido (fictício)

- **Projeto:** Estoque Escolar (fictício)
- **Equipe atual:** G0 (identificação fictícia)
- **Período:** 2º semestre de 2026 (ilustrativo)
- **Origem do trabalho anterior:** repositório de exemplo `escola/estoque
- **Versão recebida no início:** tag `v0.1` (fictícia)
- **Como o estado inicial foi conferido:** leitura do código e demonstração local com dados sintéticos.
- **Limitações da comparação:** não há evidência de validação com usuários na versão recebida.

### Estado recebido no início — exemplo

| Item/funcionalidade/artefato | Estado inicial | Evidência da linha de base | Limitação conhecida |
|---|---|---|---|
| Cadastro de materiais | implementado, validação não confirmada | `backend/material/` na tag `v0.1` fictícia | fluxo de edição não testado |
| Pedido de material | protótipo | tela `frontend/pedido.html` na tag `v0.1` fictícia | não grava no banco |

### Mudanças — exemplo

| Item | Classificação | Situação inicial → atual | Trabalho desenvolvido neste período | Evidência/localização | Validação/resultado |
|---|---|---|---|---|---|
| Cadastro de materiais | herdado e mantido | implementado → implementado | preservado; revisão de campos | `backend/material/`; commit `a1b2c3d` fictício | teste de regressão documentado em `docs/testes/` |
| Pedido de material | herdado e alterado | protótipo → implementação parcial | gravação e estado inicial adicionados | `backend/pedidos/`, `frontend/pedidos/`; PR fictício #12 | cenário local passou; aceite do cliente pendente |
| Aprovação por perfil | novo | não existia → planejado | requisito e protótipo definidos | RF-008 e `DEC-002` fictícios | ainda não implementado |

### Contribuição — exemplo

| Integrante | Atividade/contribuição | Artefatos ou tarefas relacionados | Evidência | Colaboração/observação |
|---|---|---|---|---|
| Estudante A (fictício) | implementação e documentação do fluxo de pedidos | RF-007, UC-004, backend/pedidos | commit/PR fictício e roteiro de teste | revisão em dupla com Estudante B |

Todos os nomes, identificadores, caminhos, tags, commits e resultados desta seção são fictícios. Substitua-os por evidências reais; não copie o estado ou o resultado como se tivesse ocorrido.
