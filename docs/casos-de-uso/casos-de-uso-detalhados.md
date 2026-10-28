# Casos de uso detalhados — O-BRECHÓ

Os oito casos abaixo seguem os requisitos RF01–RF08. Cada ficha tem links para as páginas do estudo que descrevem a operação.

## UC01 — Cadastro de clientes

| Campo | Informação |
|---|---|
| Requisito | RF01 |
| Ator principal | Atendente |
| Origem | [Ver página 22](../academico/evidencias/estudo-ang/pagina-22.png) · [Ver página 23](../academico/evidencias/estudo-ang/pagina-23.png) |
| Pré-condições | Atendente autenticado. |
| Pós-condições | Cliente registrado com identificação e contato. |
| Requisitos especiais | Não especificados no campo correspondente do estudo; aplicam-se os RNF gerais pertinentes |

### Fluxo principal

1. Solicitar o cadastro de cliente.
2. Apresentar os campos de identificação e contato.
3. Informar os dados do cliente.
4. Validar as informações.
5. Verificar se já existe cadastro.
6. Cadastrar o cliente.
7. Apresentar a confirmação.

### Alternativas e exceções

- Dados inválidos ou incompletos: informar erro, corrigir e repetir a validação.
- Cliente já cadastrado: informar a existência do registro e permitir sua consulta.

### Relação com a implementação

Código em `frontend/src/`: `views/clientes/ClientesView.tsx`. Cadastro existe; o tratamento de duplicidade e os critérios de contato precisam de execução de CT-01.

Teste planejado: **CT-01**. Execução e aprovação pendentes.

## UC02 — Histórico de compras

| Campo | Informação |
|---|---|
| Requisito | RF02 |
| Ator principal | Administrador |
| Origem | [Ver página 21](../academico/evidencias/estudo-ang/pagina-21.png) · [Ver página 22](../academico/evidencias/estudo-ang/pagina-22.png) |
| Pré-condições | Administrador autenticado e cliente cadastrado. |
| Pós-condições | Histórico do cliente apresentado. |
| Requisitos especiais | Não especificados no campo correspondente do estudo; aplicam-se os RNF gerais pertinentes |

### Fluxo principal

1. Solicitar o histórico de um cliente.
2. Solicitar a identificação do cliente.
3. Informar o cliente desejado.
4. Localizar seu cadastro.
5. Consultar as compras.
6. Organizar as compras por categorias dos produtos.
7. Apresentar o histórico.

### Alternativas e exceções

- Cliente não encontrado: informar ausência de cadastro e permitir nova identificação.

### Relação com a implementação

Código em `frontend/src/`: `views/clientes/ClienteDetalheView.tsx`. A tela atual apresenta as vendas e produtos, mas não implementa o agrupamento por categoria previsto no fluxo.

Teste planejado: **CT-02**. Execução e aprovação pendentes.

## UC03 — Criar atendentes

| Campo | Informação |
|---|---|
| Requisito | RF03 |
| Ator principal | Administrador |
| Origem | [Ver página 19](../academico/evidencias/estudo-ang/pagina-19.png) · [Ver página 20](../academico/evidencias/estudo-ang/pagina-20.png) |
| Pré-condições | Administrador autenticado. |
| Pós-condições | Atendente cadastrado com seus dados de acesso. |
| Requisitos especiais | Não especificados no campo correspondente do estudo; aplicam-se os RNF gerais pertinentes |

### Fluxo principal

1. Solicitar novo atendente.
2. Apresentar as informações necessárias.
3. Preencher os dados.
4. Validar as informações.
5. Cadastrar o atendente.
6. Criar seus dados de acesso.
7. Confirmar o cadastro.

### Alternativas e exceções

- Dados inválidos ou incompletos: informar erro e retornar à validação após correção.

### Relação com a implementação

Código em `frontend/src/`: `views/equipe/AtendentesView.tsx`. Gestão local implementada com condições de interface por cargo; não há autorização segura de servidor.

Teste planejado: **CT-03**. Execução e aprovação pendentes.

## UC04 — Recebimento de doações

| Campo | Informação |
|---|---|
| Requisito | RF04 |
| Ator principal | Responsável pela Triagem |
| Origem | [Ver página 25](../academico/evidencias/estudo-ang/pagina-25.png) |
| Pré-condições | Responsável autenticado e doação recebida. |
| Pós-condições | Doação registrada como entrada. |
| Requisitos especiais | Não especificados no campo correspondente do estudo; aplicam-se os RNF gerais pertinentes |

### Fluxo principal

1. Solicitar registro da doação.
2. Solicitar dados da entrada.
3. Informar os dados.
4. Verificar informações.
5. Registrar a origem como doação.
6. Disponibilizar os itens para avaliação.
7. Confirmar o recebimento.

### Alternativas e exceções

- Dados incompletos ou inválidos: corrigir e repetir a verificação.
- Origem diferente de doação: recusar a entrada e informar a regra.

### Relação com a implementação

Código em `frontend/src/`: `views/triagem/TriagemView.tsx e services/triagemService.ts`. O fluxo cria DOACAO, PRODUTO pendente e TRIAGEM. Cadastro direto de produto ainda precisa ser alinhado com a origem obrigatória.

Teste planejado: **CT-04**. Execução e aprovação pendentes.

## UC05 — Triagem e avaliação

| Campo | Informação |
|---|---|
| Requisito | RF05 |
| Ator principal | Responsável pela Triagem |
| Origem | [Ver página 26](../academico/evidencias/estudo-ang/pagina-26.png) · [Ver página 27](../academico/evidencias/estudo-ang/pagina-27.png) |
| Pré-condições | Responsável autenticado e itens recebidos por doação. |
| Pós-condições | Resultado da avaliação e situação do produto registrados. |
| Requisitos especiais | Não especificados no campo correspondente do estudo; aplicam-se os RNF gerais pertinentes |

### Fluxo principal

1. Solicitar a triagem.
2. Apresentar os produtos ainda não avaliados.
3. Selecionar uma peça.
4. Avaliar fisicamente suas condições.
5. Informar o resultado.
6. Registrar a avaliação.
7. Atualizar a situação.
8. Confirmar a avaliação.

### Alternativas e exceções

- Peça inadequada: reprovar, registrar o resultado e impedir a venda.
- Avaliação incompleta: solicitar complementação e retornar ao registro.

### Relação com a implementação

Código em `frontend/src/`: `views/triagem/TriagemView.tsx e context/BrechoContext.tsx`. Aprovação e descarte existem. O contexto do estudo (pp. 4 e 7) reserva aprovação final a Aline; essa exclusividade não está garantida no código.

Teste planejado: **CT-05**. Execução e aprovação pendentes.

## UC06 — Categorização de produtos

| Campo | Informação |
|---|---|
| Requisito | RF06 |
| Ator principal | Responsável pela Triagem |
| Origem | [Ver página 28](../academico/evidencias/estudo-ang/pagina-28.png) · [Ver página 29](../academico/evidencias/estudo-ang/pagina-29.png) |
| Pré-condições | Responsável autenticado e produto aprovado. |
| Pós-condições | Produto classificado e disponível para organização e consulta. |
| Requisitos especiais | Não especificados no campo correspondente do estudo; aplicam-se os RNF gerais pertinentes |

### Fluxo principal

1. Solicitar categorização.
2. Apresentar peças aprovadas.
3. Selecionar a peça.
4. Apresentar categorias.
5. Escolher a categoria.
6. Registrar a classificação.
7. Atualizar o cadastro.
8. Confirmar a categorização.

### Alternativas e exceções

- Produto não aprovado: impedir classificação para venda e informar a necessidade de aprovação.
- Categoria não escolhida: solicitar seleção e repetir o registro.

### Relação com a implementação

Código em `frontend/src/`: `views/produtos/ e views/triagem/TriagemView.tsx`. O React solicita categoria junto à aprovação, enquanto o fluxo documental separa as etapas. O seed de categorias também precisa de alinhamento.

Teste planejado: **CT-06**. Execução e aprovação pendentes.

## UC07 — Registro de saídas/vendas

| Campo | Informação |
|---|---|
| Requisito | RF07 |
| Ator principal | Atendente |
| Origem | [Ver página 23](../academico/evidencias/estudo-ang/pagina-23.png) · [Ver página 24](../academico/evidencias/estudo-ang/pagina-24.png) |
| Pré-condições | Atendente autenticado e peças disponíveis. |
| Pós-condições | Venda registrada, estoque atualizado e pagamento identificado. |
| Requisitos especiais | Não especificados no campo correspondente do estudo; aplicam-se os RNF gerais pertinentes |

### Fluxo principal

1. Iniciar venda.
2. Solicitar produtos.
3. Selecionar os itens.
4. Verificar disponibilidade.
5. Apresentar o total.
6. Informar a modalidade de pagamento.
7. Registrar a venda.
8. Realizar a baixa das peças.
9. Confirmar a operação.

### Alternativas e exceções

- Produto indisponível: informar, remover/substituir o item e repetir a verificação.
- Tentativa de troca ou doação como saída comercial: recusar e informar que somente venda é permitida.

### Relação com a implementação

Código em `frontend/src/`: `views/vendas/NovaVendaView.tsx e services/vendaService.ts`. O React usa peças unitárias e permite negociar valor; o protótipo anterior usava quantidades. Coerência entre total negociado e subtotais precisa ser verificada.

Teste planejado: **CT-07**. Execução e aprovação pendentes.

## UC08 — Relatórios financeiros

| Campo | Informação |
|---|---|
| Requisito | RF08 |
| Ator principal | Administrador |
| Origem | [Ver página 20](../academico/evidencias/estudo-ang/pagina-20.png) · [Ver página 21](../academico/evidencias/estudo-ang/pagina-21.png) |
| Pré-condições | Administrador autenticado e vendas registradas. |
| Pós-condições | Relatório financeiro apresentado. |
| Requisitos especiais | Não especificados no campo correspondente do estudo; aplicam-se os RNF gerais pertinentes |

### Fluxo principal

1. Solicitar relatório.
2. Solicitar o período.
3. Informar o intervalo.
4. Consultar vendas do período.
5. Calcular quantidade vendida, valores e faturamento.
6. Gerar o relatório.
7. Apresentar o resultado.

### Alternativas e exceções

- Período sem vendas: informar ausência de registros e permitir novo intervalo.

### Relação com a implementação

Código em `frontend/src/`: `views/vendas/RelatoriosView.tsx`. A tela atual resume recebimentos e lista vendas, mas não seleciona período nem soma as peças vendidas por dia. RF08 está parcialmente implementado.

Teste planejado: **CT-08**. Execução e aprovação pendentes.
