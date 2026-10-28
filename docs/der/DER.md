# Diagrama Entidade-Relacionamento (DER) — O-BRECHÓ (Projeto ANG)

Este documento descreve a modelagem relacional oficial do sistema **O-BRECHÓ**, composta estritamente por **9 tabelas**.

```mermaid
erDiagram
    CLIENTE ||--o{ VENDA : compra
    FUNCIONARIO ||--o{ VENDA : registra
    VENDA ||--|{ ITEM_VENDA : possui
    VENDA ||--|| PAGAMENTO : quitada_por
    PRODUTO ||--o| ITEM_VENDA : vendido_em
    CATEGORIA |o--o{ PRODUTO : classifica
    DOACAO ||--o{ TRIAGEM : origina
    PRODUTO ||--o{ TRIAGEM : avaliado_em
    FUNCIONARIO ||--o{ TRIAGEM : realiza

    CLIENTE {
        int id PK
        string nome
        string telefone
        string email
        string observacoes
    }
    FUNCIONARIO {
        int id PK
        string nome
        string cargo
        string telefone
        string usuario
        string senha_hash
    }
    VENDA {
        int id PK
        int cliente_id FK
        int funcionario_id FK
        date data
        decimal valor_total
    }
    ITEM_VENDA {
        int id PK
        int venda_id FK
        int produto_id FK
        int quantidade
        decimal preco_unitario
        decimal subtotal
    }
    PAGAMENTO {
        int id PK
        int venda_id FK
        string metodo
        decimal valor
        date data
    }
    DOACAO {
        int id PK
        date data_recebimento
        string origem
        string observacao
    }
    CATEGORIA {
        int id PK
        string nome
        string descricao
    }
    PRODUTO {
        int id PK
        int categoria_id FK
        string nome
        string descricao
        string tamanho
        string marca
        string estado
        decimal preco
        string status
        string localizacao
    }
    TRIAGEM {
        int id PK
        int doacao_id FK
        int produto_id FK
        int funcionario_id FK
        date data_triagem
        string status
        string observacao
    }
```

## Fluxo Operacional de Dados

1. **Entrada de Doação (`DOACAO` ➔ `PRODUTO` ➔ `TRIAGEM`)**:
   - Registra a entrada na tabela `DOACAO`.
   - Cria o registro da peça em `PRODUTO` com `status = 'aguardando_triagem'` e `categoria_id = null`.
   - Cria a avaliação em `TRIAGEM` com `status = 'Pendente'`.
2. **Avaliação na Triagem (`TRIAGEM` ➔ `PRODUTO`)**:
   - **Aprovar:** Atualiza `TRIAGEM.status = 'Aprovado'` e define `PRODUTO.categoria_id`, `PRODUTO.preco`, `PRODUTO.localizacao` e `PRODUTO.status = 'disponivel'`.
   - **Descartar:** Atualiza `TRIAGEM.status = 'Reprovado'` (com motivo em `observacao`) e `PRODUTO.status = 'reprovado'`.
3. **Fechamento de Venda (`VENDA` ➔ `ITEM_VENDA` + `PAGAMENTO`)**:
   - Cria o registro em `VENDA` vinculando `cliente_id` e `funcionario_id`.
   - Registra cada peça negociada em `ITEM_VENDA` (`preco_unitario` e `subtotal`).
   - Registra a quitação em `PAGAMENTO` (`metodo`, `valor`, `data`).
   - Atualiza `PRODUTO.status = 'vendido'`.

