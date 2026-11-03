# Scripts do banco de dados

| Arquivo | Conteudo |
|---|---|
| [Migração inicial](database/migrations/001_init_schema.sql) | Criação das nove tabelas e seus relacionamentos |
| [Carga inicial](database/seeds/001_initial_data.sql) | Dados de exemplo |
| [DER](../docs/der/DER.md) | Diagrama das entidades |
| [Dicionário de dados](../docs/der/dicionario-de-dados.md) | Campos, tipos e restrições |

Os scripts usam MySQL. O planejamento prevê PostgreSQL, então precisamos ajustar a migração antes de conectar a aplicação ao banco. [Tecnologias planejadas](../docs/continuidade/evidencias/atividade-29-09-2026/pagina-06.png).

Por enquanto, o frontend carrega os exemplos de `src/data/mockData.ts` e salva as alterações no navegador. Os scripts SQL ainda não são executados pela aplicação. O arquivo `frontend/src/data/schema.sql` é uma referência da versão inicial.
