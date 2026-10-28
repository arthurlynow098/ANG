# Exemplo de dicionário de dados relacional

> As entidades e regras a seguir são fictícias e ilustram um sistema de publicação de conteúdo. Não reutilize nomes, restrições, dados pessoais ou políticas como se fossem requisitos do seu projeto. Este modelo relacional é opcional: para dados não relacionais, arquivos, pipelines ou outros formatos, documente o esquema e as regras pertinentes ao formato real.

Este documento descreve a estrutura das entidades do banco de dados relacional, especificando o tipo de dados, regras de preenchimento, chaves e descrição de finalidade de cada atributo.

---

## 1. Tabela / Entidade: `USUARIO

- **Finalidade:** Armazena os dados cadastrais e as credenciais de acesso de todos os perfis de usuários do sistema.

| Coluna | Tipo de Dado | Nulo? | Chave | Descrição / Regra de Negócio |
|---|---|---|---|---|
| `id` | `INTEGER` / `BIGINT` | Não | PK | Chave primária artificial auto-incremental. |
| `nome` | `VARCHAR(150)` | Não | — | Nome completo do usuário. |
| `email` | `VARCHAR(120)` | Não | UK | E-mail corporativo ou pessoal; índice único. |
| `senha_hash` | `VARCHAR(255)` | Não | — | Hash seguro da senha gerado via algoritmo Argon2 ou bcrypt. |
| `perfil` | `VARCHAR(20)` | Não | — | Perfil de permissão: `ADMIN`, `USUARIO_FINAL`. |
| `criado_em` | `TIMESTAMP` | Não | — | Registro temporal de criação gerado automaticamente. |

---

## 2. Tabela / Entidade: `CONTEUDO

- **Finalidade:** Armazena as publicações, recursos e materiais manipulados na aplicação.

| Coluna | Tipo de Dado | Nulo? | Chave | Descrição / Regra de Negócio |
|---|---|---|---|---|
| `id` | `INTEGER` / `BIGINT` | Não | PK | Chave primária artificial auto-incremental. |
| `usuario_id` | `INTEGER` / `BIGINT` | Não | FK | Referencia `USUARIO.id`. Autor da publicação. |
| `titulo` | `VARCHAR(200)` | Não | — | Título explicativo do conteúdo. |
| `descricao` | `TEXT` | Sim | — | Descrição detalhada do material. |
| `status` | `VARCHAR(30)` | Não | — | Estado do ciclo de vida: `PENDENTE`, `PUBLICADO`, `REJEITADO`. |
| `publicado_em` | `TIMESTAMP` | Sim | — | Data/hora em que a aprovação foi efetivada pelo administrador. |

---

## 3. Tabela / Entidade: `AVALIACAO

- **Finalidade:** Armazena as notas e feedbacks registrados por usuários para os conteúdos disponibilizados.

| Coluna | Tipo de Dado | Nulo? | Chave | Descrição / Regra de Negócio |
|---|---|---|---|---|
| `id` | `INTEGER` / `BIGINT` | Não | PK | Chave primária artificial auto-incremental. |
| `conteudo_id` | `INTEGER` / `BIGINT` | Não | FK | Referencia `CONTEUDO.id`. |
| `usuario_id` | `INTEGER` / `BIGINT` | Não | FK | Referencia `USUARIO.id`. Avaliador do conteúdo. |
| `nota` | `SMALLINT` | Não | — | Nota de 1 a 5 atribuída pelo usuário. |
| `comentario` | `TEXT` | Sim | — | Parecer textual opcional do avaliador. |
