# Modelo de Diagrama de Entidade-Relacionamento (DER)

> **Referência no Template Fatec ADS:**
> Exigido no Capítulo 2.5 (*"Diagramas — Caso de Uso, DER, Diagramas de Classes"*). No texto da monografia, a representação deve seguir o padrão de legendas: título na parte superior (tamanho 10) e fonte na parte inferior (tamanho 10: `Fonte: Autor`).

---

### Figura X – Diagrama de Entidade-Relacionamento (Conceitual / Lógico)

```mermaid
erDiagram
    USUARIO {
        int id PK "Identificador único"
        string nome "Nome completo"
        string email UK "E-mail de acesso único"
        string senha_hash "Hash criptográfico da senha"
        string perfil "Tipo de perfil (ADMIN, ALUNO, COMUM)"
        datetime criado_em "Data de criação do registro"
    }

    CONTEUDO {
        int id PK "Identificador do conteúdo"
        int usuario_id FK "Chave estrangeira do autor"
        string titulo "Título da publicação"
        string descricao "Texto descritivo do material"
        string status "Status (PENDENTE, PUBLICADO, REJEITADO)"
        datetime publicado_em "Data de publicação"
    }

    AVALIACAO {
        int id PK "Identificador da avaliação"
        int conteudo_id FK "Chave estrangeira do conteúdo avaliado"
        int usuario_id FK "Chave estrangeira do avaliador"
        int nota "Nota atribuída (1 a 5)"
        string comentario "Observações do avaliador"
    }

    USUARIO ||--o{ CONTEUDO : "cria"
    USUARIO ||--o{ AVALIACAO : "realiza"
    CONTEUDO ||--o{ AVALIACAO : "recebe"
```

<div align="center">
<sub><b>Fonte:</b> Autor. (Tamanho 10 no rodapé da figura).</sub>
</div>

---

### Descrição dos Relacionamentos

- **USUARIO $\leftrightarrow$ CONTEUDO:** Relação de um para muitos ($1:N$). Um usuário cadastrado pode criar nenhum ou múltiplos conteúdos; cada conteúdo pertence a um único usuário autor.
- **USUARIO $\leftrightarrow$ AVALIACAO:** Relação de um para muitos ($1:N$). Um usuário pode registrar avaliações para múltiplos conteúdos.
- **CONTEUDO $\leftrightarrow$ AVALIACAO:** Relação de um para muitos ($1:N$). Um conteúdo pode receber diversas avaliações de usuários distintos.

> [!TIP]
> Caso a modelagem tenha sido feita em ferramentas como MySQL Workbench, Astah, DBeaver ou Draw.io, salve o arquivo editável nesta pasta (ex.: `der-v1.0.drawio`) e inclua a imagem exportada (`der-v1.0.png`).
