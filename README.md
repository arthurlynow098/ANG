<div align="center">

# O-BRECHÓ
### Gestão solidária para a Associação Nova Geração

Projeto acadêmico de **Análise e Desenvolvimento de Sistemas · Fatec Sorocaba · 2026**

[Documentação](docs/README.md) · [Telas](docs/prototipos/README.md) · [Requisitos](docs/requisitos/especificacao-requisitos.md) · [Como executar](frontend/README.md) · [Backlog](PRODUCT-BACKLOG.md)

</div>

![Painel atual do O-BRECHÓ](docs/prototipos/atual/02-inicio.png)

*Captura real da aplicação React em navegador local, com dados de demonstração. Veja as [dez telas atuais](docs/prototipos/atual/README.md) e as [13 telas do protótipo documentado](docs/prototipos/fichas-de-telas.md).*

## Identificação

| Campo | Informação documentada |
|---|---|
| Projeto | O-BRECHÓ — Projeto ANG |
| Instituição / curso | Faculdade de Tecnologia de Sorocaba / Análise e Desenvolvimento de Sistemas |
| Parceiro | Associação Nova Geração (ANG) |
| Gestão da triagem | Aline, gestora citada no estudo da equipe |
| Ano | 2026 |
| Organização do repositório | [Template do professor André Souza](https://github.com/profAndreSouza/template_projeto_integrador), referência `3bdb36e777cc791a0ebb79b2d40ee2a6da127703` |
| Orientador / turma / etapa exata | Não identificados nos arquivos fornecidos |

| Integrante | Papel descrito no estudo |
|---|---|
| Arthur Mendes Entsev | Desenvolvedor Júnior |
| Eduardo Kioshi Yasuoka | Tech Lead |
| Gustavo Henrique Oliveira da Silva | UI/UX e Desenvolvedor Frontend Júnior |
| Thiago Pereira Cortez | PM/PO Júnior |

Fonte: [estudo da equipe, páginas 1 e 6](docs/academico/fontes/2209ANG.pdf). Os papéis documentados não equivalem a um registro individual de entregas. [Contexto, responsabilidades e estimativa de esforço](docs/academico/contexto-e-equipe.md).

## Resumo do projeto

A ANG atua junto a uma comunidade em situação de vulnerabilidade social, com crianças como principais beneficiárias. Seu brechó comercializa mercadorias recebidas exclusivamente por doação e destina integralmente a receita às atividades da associação. O O-BRECHÓ busca apoiar essa operação com registros de doações, triagem, produtos, vendas, pagamentos, clientes e equipe. [Fonte: estudo, páginas 4–8](docs/academico/fontes/2209ANG.pdf).

## Problema, objetivos e avaliação

O estudo identifica a necessidade de centralizar informações de estoque, vendas, clientes e movimentações financeiras, reduzindo controles manuais. O público direto é a gestora e a equipe operacional da ANG. O objetivo é oferecer uma solução de gestão interna adequada ao fluxo do brechó. [Fonte: estudo, páginas 14–15](docs/academico/fontes/2209ANG.pdf).

A avaliação inclui verificação técnica, cenários funcionais e futura validação com os responsáveis pela ANG. Há capturas do protótipo fornecidas pela equipe e verificações de compilação; não foi fornecido aceite do parceiro nem resultado de avaliação com participantes. [Plano e evidências](docs/testes/plano-e-evidencias-de-testes.md).

## Escopo e situação desta versão

### Incluído ou produzido

- Documentos reais da equipe: estudo de 31 páginas, atividade de acompanhamento, requisitos e documentação de 13 telas.
- Aplicação React/TypeScript com login demonstrativo, painel, doações, triagem, catálogo, cadastro de peças, estoque, vendas, resumo financeiro, clientes e funcionários.
- Modelo relacional de nove entidades, scripts SQL e persistência local no navegador.
- Requisitos **RF01–RF08** e **RNF01–RNF10**, casos de uso, diagramas originais e rastreabilidade entre documentos e código.

### Fora do escopo ou ainda não iniciado

Comércio eletrônico, entregas, múltiplas unidades, consignação e automação da triagem física estão fora da proposta inicial descrita no estudo (p. 14). Backend Express, integração PostgreSQL e Shadcn/UI aparecem como planejamento na atividade, mas não estão implementados no código atual. Agendamento é uma regra operacional documentada; não há módulo de agenda nesta versão. [Comparação de tecnologias e lacunas](docs/arquitetura/visao-arquitetural.md).

### Limitações, premissas e riscos

Os documentos descrevem o produto desejado; a implementação atual ainda é demonstrativa. O `localStorage` não oferece banco compartilhado. O login aceita credenciais demonstrativas e a função de hash existente não implementa SHA-256 criptográfico. Os relatórios atuais não possuem o filtro de período exigido por RF08. A aprovação exclusiva pela gestora e a compatibilidade entre o SQL MySQL existente e o PostgreSQL planejado precisam ser resolvidas. [Lacunas rastreadas](docs/requisitos/rastreabilidade.md).

Os nomes de clientes, produtos, saldos e contatos apresentados nas telas e no seed são exemplos de demonstração, não registros operacionais reais da ANG. Os dados reais incorporados à documentação são aqueles presentes nos PDFs da equipe.

## Organização do código

```text
ANG/
├── frontend/                 # Aplicação web e instruções de execução
├── data/database/            # Migração e carga SQL existentes
├── docs/
│   ├── academico/            # Estudo, contexto, equipe e orçamento estimado
│   ├── requisitos/           # RF, RNF, regras, rastreabilidade e PDF original
│   ├── casos-de-uso/         # Oito casos detalhados e diagramas originais
│   ├── der/                  # Modelo relacional e dicionário de dados
│   ├── arquitetura/          # Visão atual, planejada e classes
│   ├── prototipos/           # Galeria das 13 telas e PDF original
│   ├── testes/               # Plano, resultados e avaliação futura
│   ├── decisoes/             # Decisões de organização e documentação
│   ├── continuidade/         # Atividade, evolução e papéis documentados
│   ├── backlog/              # Índice CSV do backlog
│   ├── apoio/                # Protocolo pessoal de estudo, separado do produto
│   └── ferramentas/          # Reprodução das capturas dos PDFs
└── PRODUCT-BACKLOG.md
```

Organização por componentes separados conforme o template. Os serviços TypeScript atuais executam no navegador e pertencem ao frontend. Pastas `backend/`, `mobile/` e `application/` serão pertinentes apenas se esses componentes forem implementados.

## Componentes e evidências

| Frente | Estado e evidência |
|---|---|
| Aplicação web | [Código e execução](frontend/README.md); demonstração local |
| Modelo e SQL | [DER e dicionário](docs/der/README.md); SQL ainda sem integração |
| Requisitos e casos de uso | [RF/RNF](docs/requisitos/README.md) e [oito fluxos documentados](docs/casos-de-uso/README.md) |
| Interfaces | [Dez capturas atuais](docs/prototipos/atual/README.md) e [13 telas extraídas do PDF](docs/prototipos/fichas-de-telas.md) |
| Validação | [Resultados técnicos e limites](docs/testes/README.md) |
| Trabalho acadêmico | [Estudo original](docs/academico/README.md); modelo institucional preservado em `docs/` |
| Fontes e capturas | [Cinco PDFs e 60 páginas](docs/fontes.md), com [SHA-256 de integridade](docs/fontes.json) |

## Rastreabilidade do projeto

| Necessidade | Requisitos | Caso de uso | Código em frontend/src/ | Situação |
|---|---|---|---|---|
| Relacionamento com clientes | RF01, RF02 | UC01, UC02 | `views/clientes/` | Cadastro e histórico existentes; agrupamento por categoria pendente |
| Equipe e acessos | RF03, RNF01, RNF02 | UC03 | `views/equipe/`, `services/authService.ts` | Demonstração local; segurança de produção pendente |
| Entrada e avaliação | RF04, RF05 | UC04, UC05 | `views/triagem/`, `services/triagemService.ts` | Fluxo existente; exclusividade da gestora pendente |
| Catálogo e estoque | RF06 | UC06 | `views/produtos/` | Categorias a alinhar ao documento |
| Venda e financeiro | RF07, RF08 | UC07, UC08 | `views/vendas/`, `services/vendaService.ts` | Venda e resumo existentes; filtro de período pendente |

Consulte a [matriz completa](docs/requisitos/rastreabilidade.md) e o [backlog](PRODUCT-BACKLOG.md).

## Continuidade entre semestres

O estudo, a atividade e o protótipo documentam a análise e o planejamento anteriores ao código React atualmente disponível. O primeiro envio ao ANG foi o commit `c8ec5a8`. A relação entre as entregas, sem atribuir autoria individual sem evidência, está na [linha de base e evolução](docs/continuidade/linha-de-base-e-evolucao.md).

## Como começar

Requer Node.js compatível com Vite 6 (Node 22 recomendado) e npm.

```bash
git clone https://github.com/arthurlynow098/ANG.git
cd ANG/frontend
npm ci
npm run dev
```

Abra o endereço informado pelo Vite, normalmente `http://localhost:5173`. Contas de demonstração: `admin`, `atendente` ou `clara`, senha `123456`. Build: `npm run build`. [Instruções completas](frontend/README.md).
