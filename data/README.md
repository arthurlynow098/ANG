# Dados e scripts SQL

- [Migração](database/migrations/001_init_schema.sql): nove tabelas e restrições existentes, com sintaxe MySQL (`AUTO_INCREMENT`).
- [Carga inicial](database/seeds/001_initial_data.sql): dados de referência, sem comprovação de operação real da associação.
- [DER](../docs/der/DER.md) e [dicionário completo](../docs/der/dicionario-de-dados.md).

A atividade da equipe prevê PostgreSQL (p. 6); os scripts atuais precisam ser alinhados com essa escolha antes de integração. O frontend usa `src/data/mockData.ts` e localStorage, não executa esses scripts. `frontend/src/data/schema.sql` permanece como referência herdada. Não houve execução SQL nesta etapa documental.

Os cinco arquivos recebidos em `Dados/` foram classificados em `docs/*/fontes/`, com [catálogo](../docs/fontes.md) e [hashes](../docs/fontes.json). Não foram usados para substituir o seed por registros pessoais ou financeiros reais da ANG.
