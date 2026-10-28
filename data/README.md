# Dados — O-BRECHÓ

- [Migração](database/migrations/001_init_schema.sql): nove tabelas, sintaxe MySQL (`AUTO_INCREMENT`).
- [Carga inicial](database/seeds/001_initial_data.sql): registros de referência.
- [DER](../docs/der/DER.md): entidades e relacionamentos.

A aplicação não executa esses scripts; usa `frontend/src/data/mockData.ts` e localStorage. A execução SQL não foi validada nesta reorganização. O arquivo `frontend/src/data/schema.sql` foi preservado como referência herdada, sem substituir a migração.
