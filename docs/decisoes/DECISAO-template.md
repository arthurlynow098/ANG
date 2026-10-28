# DEC-[ID] — [título curto]

- **Estado:** proposta / aceita / rejeitada / substituída
- **Data:** [AAAA-MM-DD]
- **Responsáveis pela decisão:** [papéis ou equipe; evite dados pessoais desnecessários]
- **Relacionado a:** [RF, caso de uso, backlog, risco ou artefato]

## Contexto

[Qual problema ou necessidade levou à decisão?]

## Alternativas consideradas

- [Alternativa A — vantagens, custos e riscos]
- [Alternativa B — vantagens, custos e riscos]

## Decisão e justificativa

[O que foi escolhido e por quê?]

## Consequências e revisão

[Impactos no escopo, implementação, validação e documentos. Quando esta decisão deve ser revista?]

## Exemplo preenchido (fictício)

### DEC-001 — Importação inicial do catálogo de materiais (exemplo)

- **Estado:** aceita (exemplo)
- **Data:** 2026-10-20 (data ilustrativa)
- **Responsáveis pela decisão:** equipe do projeto e representante fictício da Escola Exemplo
- **Relacionado a:** RF-002 e item PB-EX-02 (IDs fictícios)

#### Contexto

O sistema escolar de exemplo precisa carregar o catálogo inicial de materiais. A integração com o sistema administrativo da escola ainda não foi confirmada.

#### Alternativas consideradas

- Importar um arquivo CSV preparado e revisado pela equipe: menor dependência externa, mas exige atualização manual.
- Integrar diretamente com o sistema administrativo: reduz duplicidade, mas depende de acesso, contrato e validação da API.

#### Decisão e justificativa

Para a primeira versão, usar importação CSV com validação de colunas e relatório de linhas rejeitadas. A integração externa fica fora do escopo até que o cliente confirme acesso e necessidade.

#### Consequências e revisão

A equipe precisa documentar o formato do CSV e testar importação com dados fictícios. A decisão deve ser revista se a escola disponibilizar uma API e solicitar sincronização automática.

> Este exemplo é inventado para ensinar o preenchimento. Substitua-o por uma decisão e evidências reais; não o interprete como requisito ou decisão do seu projeto.
