# Dados e modelo relacional

- [DER](DER.md): nove entidades e fluxo operacional atual.
- [Dicionário completo](dicionario-de-dados.md): todas as colunas, tipos, nulabilidade, valores padrão e chaves da migração existente.
- [Migração SQL](../../data/database/migrations/001_init_schema.sql).
- [Carga SQL](../../data/database/seeds/001_initial_data.sql).
- [Modelo de classes original](../arquitetura/diagrama-classes.md): inclui conceitos ainda não implementados.

O SQL existente usa sintaxe MySQL. O planejamento cita PostgreSQL e ainda precisa ser alinhado com esses arquivos. A aplicação atual salva os dados no navegador (localStorage) e não executa a migração. O DER descreve a estrutura implementada em tipos e SQL, sem substituir a desenho do modelo da equipe.
