# O-BRECHÓ — Projeto ANG

Sistema web para apoiar a gestão de um brechó solidário: doações, triagem, catálogo, estoque, vendas, clientes e equipe.

## Identificação

- **Projeto:** O-BRECHÓ (ANG).
- **Equipe, orientação, parceiro e disciplina/etapa:** a confirmar pela equipe.
- **Versão analisada:** código local organizado para a primeira publicação no ANG.
- **Atualizado em:** 2026-10-27.
- **Modelo:** [template do professor André Souza](https://github.com/profAndreSouza/template_projeto_integrador), commit `3bdb36e777cc791a0ebb79b2d40ee2a6da127703`.

## Resumo do projeto

A solução busca centralizar o acompanhamento de peças doadas, sua avaliação e comercialização. A versão atual contém uma aplicação React com dados de demonstração e persistência no navegador. Os scripts SQL representam o modelo relacional planejado; a aplicação ainda não se conecta a um servidor de banco de dados.

## Problema, objetivos e avaliação

- **Necessidade tratada:** organizar registros de doações, peças, clientes e vendas em um fluxo único. A caracterização com o parceiro ainda precisa ser documentada.
- **Objetivo:** apoiar a operação e a consulta de estoque e vendas de um brechó solidário.
- **Pergunta/hipótese acadêmica:** a definir com a orientação, se aplicável.
- **Avaliação:** compilação técnica e cenários manuais em [testes](docs/testes/README.md). Avaliação com usuários ainda não registrada.

## Escopo e situação desta versão

### Incluído ou produzido

Login demonstrativo, painel inicial, recebimento de doações, triagem, catálogo, cadastro de produtos, estoque, vendas com negociação, relatórios, clientes e equipe. Código existente, pendente de validação funcional completa. Modelo de nove entidades e documentação disponíveis em `docs/`.

### Fora do escopo ou ainda não iniciado

Backend, integração SQL e aplicativo móvel não estão implementados. Documento acadêmico da equipe e aceite do parceiro não foram fornecidos.

### Limitações, premissas e riscos

Os dados ficam no `localStorage` de cada navegador, sem compartilhamento entre computadores. Login e hash atuais são demonstrativos: o serviço aceita a senha `123456`, e `gerarSenhaHash` não implementa SHA-256 criptográfico. Autenticação de produção depende de backend e revisão própria. Não inserir dados reais na demonstração publicada.

## Organização do código

```text
ANG/
├── frontend/                 # React + TypeScript + Vite + Tailwind
│   └── src/                  # Models, repositories, services, views etc.
├── data/database/            # Migração e carga SQL de referência
├── docs/
│   ├── requisitos/
│   ├── casos-de-uso/
│   ├── der/
│   ├── arquitetura/
│   ├── prototipos/
│   ├── testes/
│   ├── decisoes/
│   ├── continuidade/
│   └── backlog/
└── PRODUCT-BACKLOG.md
```

Adotada a organização por componentes separados do template. `application/`, `backend/` e `mobile/` não se aplicam ao código atual. Os serviços TypeScript executam no navegador e pertencem ao frontend.

## Componentes e evidências

| Componente | Estado | Evidência |
|---|---|---|
| Interface web | Implementada; validação funcional pendente | [frontend](frontend/README.md) |
| Dados | SQL e DER existentes; integração pendente | [data](data/README.md), [DER](docs/der/DER.md) |
| Requisitos e planejamento | Inventário do código; aceite pendente | [requisitos](docs/requisitos/README.md), [backlog](PRODUCT-BACKLOG.md) |
| Verificação técnica | Resultados efetivamente obtidos | [testes](docs/testes/README.md) |
| Documento acadêmico | Modelo preservado; redação pendente | [docs](docs/README.md) |

## Rastreabilidade do projeto

| Necessidade | Requisito/item | Modelo | Implementação | Validação |
|---|---|---|---|---|
| Avaliar doações | RF-02 / PB-02 | UC-02, DER | `frontend/src/views/triagem/`, `services/triagemService.ts` | CT-02 planejado |
| Vender peças | RF-04 / PB-04 | UC-03, DER | `frontend/src/views/vendas/`, `services/vendaService.ts` | CT-03 planejado |
| Manter clientes e equipe | RF-05, RF-06 | Requisitos | `frontend/src/views/clientes/`, `equipe/` | CT-04 planejado |

## Continuidade entre semestres

O código e os documentos locais antecedem esta organização. Semestre de origem e contribuições individuais não foram informados. Consulte a [linha de base](docs/continuidade/README.md).

## Como começar

Requer Node.js compatível com Vite 6 (Node 22 recomendado) e npm.

```bash
git clone https://github.com/arthurlynow098/ANG.git
cd ANG/frontend
npm ci
npm run dev
```

Abra o endereço informado pelo Vite, normalmente `http://localhost:5173`. Distribuição: `npm run build` em `frontend/`. Contas demonstrativas: `admin`, `atendente` ou `clara`, senha `123456`.

Instruções completas em [frontend/README.md](frontend/README.md) e [docs/README.md](docs/README.md).
