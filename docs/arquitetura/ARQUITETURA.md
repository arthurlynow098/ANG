# Organização em camadas — O-BRECHÓ

O frontend atual executa inteiramente no navegador. Separar serviços e repositório no TypeScript não cria um backend ou banco relacional.

```text
frontend/src/
├── models/          # Interfaces das nove entidades
├── types/           # Tipos e compatibilidade de importação
├── repositories/    # BrechoRepository e localStorage
├── services/        # AuthService, TriagemService e VendaService
├── context/         # Estado e operações compartilhadas
├── hooks/           # Acesso ao contexto
├── components/      # Login, navegação, feedback e layout
├── views/
│   ├── inicio/
│   ├── triagem/
│   ├── produtos/
│   ├── vendas/
│   ├── clientes/
│   └── equipe/
├── utils/           # Formatação e validação
└── data/            # Dados de demonstração e schema de referência
```

Scripts SQL ficam em `data/database/`, na raiz do repositório. Documentos e fontes ficam em `docs/`. A separação respeita o template do professor e mantém o código executável em uma única pasta.

Consulte a [visão arquitetural](visao-arquitetural.md) para responsabilidades, tecnologias planejadas e limites, e o [modelo original de classes](diagrama-classes.md) para diferenças entre planejamento e implementação.
