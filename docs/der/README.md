# Modelo de dados — O-BRECHÓ

O [DER existente](DER.md) representa nove entidades: CLIENTE, FUNCIONARIO, CATEGORIA, DOACAO, PRODUTO, TRIAGEM, VENDA, ITEM_VENDA e PAGAMENTO.

As colunas, tipos SQL, nulabilidade e restrições estão definidos na [migração](../../data/database/migrations/001_init_schema.sql). Os tipos usados pelo frontend ficam em `frontend/src/models/`.

O DER é a modelagem relacional planejada. A persistência efetiva desta versão é localStorage, não um banco SQL. Arquivos `-template` são modelos do professor para ampliar e revisar a documentação.
