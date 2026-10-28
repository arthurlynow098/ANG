# Frontend — O-BRECHÓ

React 18, TypeScript, Vite 6 e Tailwind CSS. Todos os serviços atuais executam no navegador; não há API externa nem variáveis de ambiente obrigatórias.

## Instalação e execução

Requer Node.js compatível com Vite 6 (Node 22 recomendado) e npm. Execute nesta pasta:

```bash
npm ci
npm run dev
```

Servidor na porta 5173. Para gerar e visualizar a distribuição:

```bash
npm run build
npm run preview
```

O build usa Vite. Checagem de tipos separada: `npx tsc --noEmit`.

## Demonstração e persistência

Usuários `admin`, `atendente` e `clara`, senha `123456`. Acesso demonstrativo, sem autenticação de servidor. Dados iniciais em `src/data/mockData.ts`; persistência na chave `ang_brecho_strict_der_v1` do localStorage. Limpar essa chave descarta as alterações locais e reinicia os dados.

## Estrutura

| Pasta em src/ | Responsabilidade |
|---|---|
| models, types | Entidades e tipos |
| repositories | Persistência local |
| services | Autenticação demonstrativa, triagem e vendas |
| context, hooks | Estado compartilhado |
| components | Layout, login e feedback |
| views | Início, triagem, produtos, vendas, clientes e equipe |
| utils | Validação e formatação |
| data | Dados iniciais e schema herdado |

Veja [arquitetura](../docs/arquitetura/README.md), [SQL](../data/README.md) e [testes](../docs/testes/README.md).
