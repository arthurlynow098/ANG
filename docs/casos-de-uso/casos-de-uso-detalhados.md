# Casos de uso detalhados

As operações do sistema são divididas entre atendimento, administração e triagem.

## UC01 - Cadastro de clientes

| Campo | Informação |
|---|---|
| Requisito | RF01 |
| Ator principal | Atendente |
| Origem | [Ver página 22](../academico/evidencias/estudo-ang/pagina-22.png) · [Ver página 23](../academico/evidencias/estudo-ang/pagina-23.png) |
| Pré-condições | Atendente autenticado. |
| Pós-condições | Cliente registrado com identificação e contato. |
| Requisitos especiais | Aplicam-se os requisitos gerais de qualidade e acesso |

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

[views/clientes/ClientesView.tsx](../../frontend/src/views/clientes/ClientesView.tsx)

Cadastro existe. O tratamento de duplicidade e os critérios de contato precisam de execução de CT-01.

Teste CT-01 pendente.

## UC02 - Histórico de compras

| Campo | Informação |
|---|---|
| Requisito | RF02 |
| Ator principal | Administrador |
| Origem | [Ver página 21](../academico/evidencias/estudo-ang/pagina-21.png) · [Ver página 22](../academico/evidencias/estudo-ang/pagina-22.png) |
| Pré-condições | Administrador autenticado e cliente cadastrado. |
| Pós-condições | Histórico do cliente apresentado. |
| Requisitos especiais | Aplicam-se os requisitos gerais de qualidade e acesso |

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

[views/clientes/ClienteDetalheView.tsx](../../frontend/src/views/clientes/ClienteDetalheView.tsx)

A tela atual apresenta as vendas e produtos, mas não implementa o agrupamento por categoria previsto no fluxo.

Teste CT-02 pendente.

## UC03 - Criar atendentes

| Campo | Informação |
|---|---|
| Requisito | RF03 |
| Ator principal | Administrador |
| Origem | [Ver página 19](../academico/evidencias/estudo-ang/pagina-19.png) · [Ver página 20](../academico/evidencias/estudo-ang/pagina-20.png) |
| Pré-condições | Administrador autenticado. |
| Pós-condições | Atendente cadastrado com seus dados de acesso. |
| Requisitos especiais | Aplicam-se os requisitos gerais de qualidade e acesso |

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

[views/equipe/AtendentesView.tsx](../../frontend/src/views/equipe/AtendentesView.tsx)

Gestão local implementada com condições de interface por cargo. Não há autorização segura de servidor.

Teste CT-03 pendente.

## UC04 - Recebimento de doações

| Campo | Informação |
|---|---|
| Requisito | RF04 |
| Ator principal | Responsável pela Triagem |
| Origem | [Ver página 25](../academico/evidencias/estudo-ang/pagina-25.png) |
| Pré-condições | Responsável autenticado e doação recebida. |
| Pós-condições | Doação registrada como entrada. |
| Requisitos especiais | Aplicam-se os requisitos gerais de qualidade e acesso |

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

[views/triagem/TriagemView.tsx](../../frontend/src/views/triagem/TriagemView.tsx) · [services/triagemService.ts](../../frontend/src/services/triagemService.ts)

O fluxo cria DOACAO, PRODUTO pendente e TRIAGEM. Cadastro direto de produto ainda precisa ser alinhado com a origem obrigatória.

Teste CT-04 pendente.

## UC05 - Triagem e avaliação

| Campo | Informação |
|---|---|
| Requisito | RF05 |
| Ator principal | Responsável pela Triagem |
| Origem | [Ver página 26](../academico/evidencias/estudo-ang/pagina-26.png) · [Ver página 27](../academico/evidencias/estudo-ang/pagina-27.png) |
| Pré-condições | Responsável autenticado e itens recebidos por doação. |
| Pós-condições | Resultado da avaliação e situação do produto registrados. |
| Requisitos especiais | Aplicam-se os requisitos gerais de qualidade e acesso |

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

[views/triagem/TriagemView.tsx](../../frontend/src/views/triagem/TriagemView.tsx) · [context/BrechoContext.tsx](../../frontend/src/context/BrechoContext.tsx)

Aprovação e descarte existem. O contexto do estudo (pp. 4 e 7) reserva aprovação final a Aline. Essa exclusividade não está garantida no código.

Teste CT-05 pendente.

## UC06 - Categorização de produtos

| Campo | Informação |
|---|---|
| Requisito | RF06 |
| Ator principal | Responsável pela Triagem |
| Origem | [Ver página 28](../academico/evidencias/estudo-ang/pagina-28.png) · [Ver página 29](../academico/evidencias/estudo-ang/pagina-29.png) |
| Pré-condições | Responsável autenticado e produto aprovado. |
| Pós-condições | Produto classificado e disponível para organização e consulta. |
| Requisitos especiais | Aplicam-se os requisitos gerais de qualidade e acesso |

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

[views/produtos/](../../frontend/src/views/produtos/) · [views/triagem/TriagemView.tsx](../../frontend/src/views/triagem/TriagemView.tsx)

O React solicita categoria junto à aprovação, enquanto o fluxo documental separa as etapas. O seed de categorias também precisa de alinhamento.

Teste CT-06 pendente.

## UC07 - Registro de saídas/vendas

| Campo | Informação |
|---|---|
| Requisito | RF07 |
| Ator principal | Atendente |
| Origem | [Ver página 23](../academico/evidencias/estudo-ang/pagina-23.png) · [Ver página 24](../academico/evidencias/estudo-ang/pagina-24.png) |
| Pré-condições | Atendente autenticado e peças disponíveis. |
| Pós-condições | Venda registrada, estoque atualizado e pagamento identificado. |
| Requisitos especiais | Aplicam-se os requisitos gerais de qualidade e acesso |

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

[views/vendas/NovaVendaView.tsx](../../frontend/src/views/vendas/NovaVendaView.tsx) · [services/vendaService.ts](../../frontend/src/services/vendaService.ts)

O React usa peças unitárias e permite negociar valor. O protótipo anterior usava quantidades. Coerência entre total negociado e subtotais precisa ser verificada.

Teste CT-07 pendente.

## UC08 - Relatórios financeiros

| Campo | Informação |
|---|---|
| Requisito | RF08 |
| Ator principal | Administrador |
| Origem | [Ver página 20](../academico/evidencias/estudo-ang/pagina-20.png) · [Ver página 21](../academico/evidencias/estudo-ang/pagina-21.png) |
| Pré-condições | Administrador autenticado e vendas registradas. |
| Pós-condições | Relatório financeiro apresentado. |
| Requisitos especiais | Aplicam-se os requisitos gerais de qualidade e acesso |

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

[views/vendas/RelatoriosView.tsx](../../frontend/src/views/vendas/RelatoriosView.tsx)

A tela atual resume recebimentos e lista vendas, mas não seleciona período nem soma as peças vendidas por dia. RF08 está parcialmente implementado.

Teste CT-08 pendente.
