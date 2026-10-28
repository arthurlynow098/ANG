# Arquitetura do Projeto — O-BRECHÓ (Projeto ANG)

O projeto segue uma arquitetura modular em camadas para garantir separação de responsabilidades, fácil manutenção e aderência estrita ao modelo relacional (DER).

## Estrutura de Pastas

```text
ANG/
├── data/database/                  # Scripts SQL de migração e carga inicial
│   ├── migrations/            # DDL das 9 tabelas relacionais
│   └── seeds/                 # Dados iniciais em SQL
├── docs/                      # Documentação técnica e DER
├── frontend/src/
│   ├── models/                # Interfaces TypeScript das 9 entidades do DER
│   ├── repositories/          # Camada de acesso a dados e persistência relacional
│   ├── services/              # Regras de negócio (Autenticação, Triagem, Vendas)
│   ├── context/               # Provedor de estado global da aplicação
│   ├── hooks/                 # Hooks customizados (useBrecho)
│   ├── components/            # Componentes visuais reutilizáveis
│   ├── views/                 # Telas organizadas em 6 setores de domínio
│   │   ├── inicio/            # Painel inicial e indicadores rápidos
│   │   ├── triagem/           # Recebimento de doações e avaliação de peças
│   │   ├── produtos/          # Catálogo da loja, cadastro direto e estoque
│   │   ├── vendas/            # Fechamento de venda (PDV/negociação) e caixa
│   │   ├── clientes/          # Cadastro de clientes e histórico de compras
│   │   ├── equipe/            # Gestão de funcionários e acessos
│   │   └── index.ts           # Exportação centralizada dos setores
│   ├── utils/                 # Validações e formatadores (telefone, moeda, e-mail)
│   └── data/                  # Sementes de dados em memória e schema de referência
```
