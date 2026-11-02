# Dicionário de dados - modelo existente

As nove tabelas estão definidas na [migração inicial](../../data/database/migrations/001_init_schema.sql). Os tipos usados no frontend ficam em `frontend/src/models/`. Os scripts ainda precisam ser adaptados ao PostgreSQL previsto no projeto.

## CLIENTE

Identificação e contato dos clientes.

| Coluna | Tipo SQL | Aceita nulo? | Chave | Regra SQL / finalidade |
|---|---|---|---|---|
| `id` | `INT` | Não | PK | Identificador do registro. Restrição `PRIMARY KEY AUTO_INCREMENT`. |
| `nome` | `VARCHAR(150)` | Não | - | Nome de identificação. Restrição `NOT NULL`. |
| `telefone` | `VARCHAR(30)` | Não | - | Contato telefônico. Restrição `NOT NULL`. |
| `email` | `VARCHAR(150)` | Sim | - | Endereço de e-mail. Restrição `DEFAULT ''`. |
| `observacoes` | `TEXT` | Sim | - | Anotações do cadastro. |

## FUNCIONARIO

Equipe e dados de acesso demonstrativo.

| Coluna | Tipo SQL | Aceita nulo? | Chave | Regra SQL / finalidade |
|---|---|---|---|---|
| `id` | `INT` | Não | PK | Identificador do registro. Restrição `PRIMARY KEY AUTO_INCREMENT`. |
| `nome` | `VARCHAR(150)` | Não | - | Nome de identificação. Restrição `NOT NULL`. |
| `cargo` | `VARCHAR(80)` | Não | - | Papel atribuído ao funcionário. Restrição `NOT NULL`. |
| `telefone` | `VARCHAR(30)` | Não | - | Contato telefônico. Restrição `NOT NULL`. |
| `usuario` | `VARCHAR(60)` | Não | UK | Identificador de acesso, sem duplicidade no SQL. Restrição `NOT NULL UNIQUE`. |
| `senha_hash` | `VARCHAR(255)` | Não | - | Campo destinado à credencial; implementação atual é demonstrativa, não hash criptográfico seguro. Restrição `NOT NULL`. |

## CATEGORIA

Classificação das peças.

| Coluna | Tipo SQL | Aceita nulo? | Chave | Regra SQL / finalidade |
|---|---|---|---|---|
| `id` | `INT` | Não | PK | Identificador do registro. Restrição `PRIMARY KEY AUTO_INCREMENT`. |
| `nome` | `VARCHAR(100)` | Não | - | Nome de identificação. Restrição `NOT NULL`. |
| `descricao` | `VARCHAR(255)` | Sim | - | Descrição textual. Restrição `DEFAULT ''`. |

## DOACAO

Entrada e origem dos lotes doados.

| Coluna | Tipo SQL | Aceita nulo? | Chave | Regra SQL / finalidade |
|---|---|---|---|---|
| `id` | `INT` | Não | PK | Identificador do registro. Restrição `PRIMARY KEY AUTO_INCREMENT`. |
| `data_recebimento` | `DATE` | Não | - | Data de entrada da doação. Restrição `NOT NULL`. |
| `origem` | `VARCHAR(150)` | Não | - | Origem declarada da doação. Restrição `NOT NULL`. |
| `observacao` | `TEXT` | Sim | - | Anotação do recebimento ou avaliação. |

## PRODUTO

Peça física, características, preço, situação e localização.

| Coluna | Tipo SQL | Aceita nulo? | Chave | Regra SQL / finalidade |
|---|---|---|---|---|
| `id` | `INT` | Não | PK | Identificador do registro. Restrição `PRIMARY KEY AUTO_INCREMENT`. |
| `categoria_id` | `INT` | Sim | FK → CATEGORIA.id | Categoria opcional, inclusive durante triagem. Restrição `NULL`. |
| `nome` | `VARCHAR(150)` | Não | - | Nome de identificação. Restrição `NOT NULL`. |
| `descricao` | `TEXT` | Sim | - | Descrição textual. |
| `tamanho` | `VARCHAR(20)` | Não | - | Tamanho da peça. Restrição `NOT NULL`. |
| `marca` | `VARCHAR(100)` | Sim | - | Marca informada ou padrão do cadastro. Restrição `DEFAULT 'Sem marca'`. |
| `estado` | `VARCHAR(50)` | Não | - | Estado de conservação. Restrição `NOT NULL`. |
| `preco` | `DECIMAL(10, 2)` | Não | - | Preço da peça. Restrição `NOT NULL DEFAULT 0.00`. |
| `status` | `VARCHAR(40)` | Não | - | Situação do produto ou da avaliação. Restrição `NOT NULL DEFAULT 'aguardando_triagem'`. |
| `localizacao` | `VARCHAR(100)` | Sim | - | Posição física de armazenamento. Restrição `DEFAULT 'Mesa de Triagem'`. |

Restrições referenciais:

- `CONSTRAINT fk_produto_categoria FOREIGN KEY (categoria_id) REFERENCES CATEGORIA(id) ON DELETE SET NULL`.

## TRIAGEM

Avaliação de uma peça, vinculada à doação e ao funcionário.

| Coluna | Tipo SQL | Aceita nulo? | Chave | Regra SQL / finalidade |
|---|---|---|---|---|
| `id` | `INT` | Não | PK | Identificador do registro. Restrição `PRIMARY KEY AUTO_INCREMENT`. |
| `doacao_id` | `INT` | Não | FK → DOACAO.id | Doação que originou a avaliação. Restrição `NOT NULL`. |
| `produto_id` | `INT` | Não | FK → PRODUTO.id | Peça associada ao registro. Restrição `NOT NULL`. |
| `funcionario_id` | `INT` | Não | FK → FUNCIONARIO.id | Funcionário responsável. Restrição `NOT NULL`. |
| `data_triagem` | `DATE` | Não | - | Data registrada da avaliação. Restrição `NOT NULL`. |
| `status` | `VARCHAR(40)` | Não | - | Situação do produto ou da avaliação. Restrição `NOT NULL DEFAULT 'Pendente'`. |
| `observacao` | `TEXT` | Sim | - | Anotação do recebimento ou avaliação. |

Restrições referenciais:

- `CONSTRAINT fk_triagem_doacao FOREIGN KEY (doacao_id) REFERENCES DOACAO(id) ON DELETE CASCADE`.
- `CONSTRAINT fk_triagem_produto FOREIGN KEY (produto_id) REFERENCES PRODUTO(id) ON DELETE CASCADE`.
- `CONSTRAINT fk_triagem_funcionario FOREIGN KEY (funcionario_id) REFERENCES FUNCIONARIO(id)`.

## VENDA

Operação comercial vinculada a cliente e funcionário.

| Coluna | Tipo SQL | Aceita nulo? | Chave | Regra SQL / finalidade |
|---|---|---|---|---|
| `id` | `INT` | Não | PK | Identificador do registro. Restrição `PRIMARY KEY AUTO_INCREMENT`. |
| `cliente_id` | `INT` | Não | FK → CLIENTE.id | Cliente da venda. Restrição `NOT NULL`. |
| `funcionario_id` | `INT` | Não | FK → FUNCIONARIO.id | Funcionário responsável. Restrição `NOT NULL`. |
| `data` | `DATE` | Não | - | Data do registro. Restrição `NOT NULL`. |
| `valor_total` | `DECIMAL(10, 2)` | Não | - | Valor final da venda. Restrição `NOT NULL`. |

Restrições referenciais:

- `CONSTRAINT fk_venda_cliente FOREIGN KEY (cliente_id) REFERENCES CLIENTE(id)`.
- `CONSTRAINT fk_venda_funcionario FOREIGN KEY (funcionario_id) REFERENCES FUNCIONARIO(id)`.

## ITEM_VENDA

Peça, quantidade e valor dentro de uma venda.

| Coluna | Tipo SQL | Aceita nulo? | Chave | Regra SQL / finalidade |
|---|---|---|---|---|
| `id` | `INT` | Não | PK | Identificador do registro. Restrição `PRIMARY KEY AUTO_INCREMENT`. |
| `venda_id` | `INT` | Não | FK → VENDA.id | Venda relacionada. Restrição `NOT NULL`. |
| `produto_id` | `INT` | Não | FK → PRODUTO.id | Peça associada ao registro. Restrição `NOT NULL`. |
| `quantidade` | `INT` | Não | - | Quantidade do item; o frontend atual vende uma unidade por peça. Restrição `NOT NULL DEFAULT 1`. |
| `preco_unitario` | `DECIMAL(10, 2)` | Não | - | Preço unitário registrado. Restrição `NOT NULL`. |
| `subtotal` | `DECIMAL(10, 2)` | Não | - | Valor do item. Restrição `NOT NULL`. |

Restrições referenciais:

- `CONSTRAINT fk_item_venda_venda FOREIGN KEY (venda_id) REFERENCES VENDA(id) ON DELETE CASCADE`.
- `CONSTRAINT fk_item_venda_produto FOREIGN KEY (produto_id) REFERENCES PRODUTO(id)`.

## PAGAMENTO

Modalidade, valor e data do pagamento de uma venda.

| Coluna | Tipo SQL | Aceita nulo? | Chave | Regra SQL / finalidade |
|---|---|---|---|---|
| `id` | `INT` | Não | PK | Identificador do registro. Restrição `PRIMARY KEY AUTO_INCREMENT`. |
| `venda_id` | `INT` | Não | UK; FK → VENDA.id | Venda relacionada. Restrição `NOT NULL UNIQUE`. |
| `metodo` | `VARCHAR(40)` | Não | - | Forma de pagamento. Restrição `NOT NULL`. |
| `valor` | `DECIMAL(10, 2)` | Não | - | Valor recebido. Restrição `NOT NULL`. |
| `data` | `DATE` | Não | - | Data do registro. Restrição `NOT NULL`. |

Restrições referenciais:

- `CONSTRAINT fk_pagamento_venda FOREIGN KEY (venda_id) REFERENCES VENDA(id) ON DELETE CASCADE`.

## Domínios usados pelo frontend

- Produto: `aguardando_triagem`, `disponivel`, `vendido`, `reprovado`.
- Triagem: `Pendente`, `Aprovado`, `Reprovado`.
- Conservação: Novo, Bom, Regular, Para reparo.
- Pagamento demonstrativo: Pix, Dinheiro e Cartão.

Esses domínios são strings no SQL; não existem CHECK ou ENUM que os imponham na migração atual.

## Integridade e diferenças de modelagem

O SQL não torna ITEM_VENDA.produto_id único. PAGAMENTO.venda_id é único, mas uma venda pode existir sem pagamento sob as restrições do SQL. Quantidade, preço e total não têm CHECK de positividade. As regras comerciais dependem da aplicação e de validação futura. O modelo conceitual original também possui Agendamento e Relatorio, que não foram adicionados artificialmente a este dicionário.
