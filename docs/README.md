# Documentação — O-BRECHÓ / ANG

Os READMEs de cada categoria descrevem o projeto atual. Arquivos com sufixo `-template` são formulários de referência do professor e contêm exemplos fictícios; não são requisitos aprovados nem testes executados. O documento DOCX é o modelo institucional original; a monografia da equipe ainda não foi fornecida.

# Documentação do projeto

Esta pasta reúne o documento acadêmico e os registros que explicam requisitos, modelos, decisões, continuidade e validação do projeto. Consulte o [template institucional de TG](TG-Template-ADS-formato-academico%201-v1.docx) e siga as orientações da disciplina. As subpastas são opcionais: mantenha as que forem úteis e não crie documentação apenas para preencher a estrutura.

## Documento acadêmico

Mantenha aqui a versão de trabalho da monografia (`tg.docx`) e a exportação em PDF (`tg.pdf`), se esses arquivos fizerem parte da entrega. Registre a data ou versão para indicar que as cópias correspondem ao mesmo conteúdo. Preserve a estrutura e os títulos do template institucional; confirme dúvidas de interpretação com a orientação. Os modelos de engenharia desta pasta complementam o trabalho acadêmico, mas não o substituem.

**Exemplo fictício:** `tg.docx` é a versão de trabalho atualizada em 2026-10-20 e `tg.pdf` é a exportação feita na mesma data. Os capítulos em redação permanecem identificados como em andamento.

## Para que serve cada subpasta

| Subpasta | Para que serve | Exemplos de conteúdo |
|---|---|---|
| [`requisitos/`](requisitos/README.md) | Registrar necessidades, comportamento esperado, qualidades e regras confirmadas do produto. | Requisitos funcionais e não funcionais, regras de negócio, critérios de aceite e rastreabilidade. |
| [`casos-de-uso/`](casos-de-uso/README.md) | Descrever objetivos de atores e interações com o sistema quando esse tipo de modelo for adequado. | Diagrama conceitual, especificações de fluxo principal, alternativas e exceções realmente definidas. |
| [`der/`](der/README.md) | Documentar dados persistidos e sua estrutura quando o projeto usar armazenamento de dados que se beneficie dessa modelagem. | DER, dicionário de dados, entidades, atributos, chaves e relacionamentos. Para dados não relacionais, documente o esquema pertinente sem forçar um DER relacional. |
| [`arquitetura/`](arquitetura/README.md) | Explicar a organização técnica e as responsabilidades dos componentes relevantes. | Visão arquitetural, diagramas de classes ou outros modelos necessários para compreender a solução. |
| [`prototipos/`](prototipos/README.md) | Comunicar e avaliar fluxos ou interfaces antes ou durante a implementação. | Protótipos web, telas móveis, estados de interface e decisões de interação. |
| [`testes/`](testes/README.md) | Planejar e registrar verificações técnicas ou avaliações pertinentes ao método do projeto. | Casos de teste, ambiente, resultados observados, evidências e avaliação com pessoas quando aplicável. |
| [`decisoes/`](decisoes/README.md) | Registrar decisões que afetam escopo, arquitetura, dados, integração ou evolução, incluindo contexto e consequências. | Decisões aceitas, rejeitadas ou substituídas e seus motivos. |
| [`continuidade/`](continuidade/README.md) | Distinguir a linha de base recebida de semestres anteriores do que foi alterado, criado, validado ou descontinuado nesta etapa. | Inventário de contribuições, comparação de versões e registro de evolução. |
| [`backlog/`](backlog/README.md) | Explicar alternativas de organização do trabalho quando um Product Backlog não se ajustar ao projeto. | Orientações para plano de pesquisa, catálogo de dados, migração ou outro instrumento. O backlog em Markdown, se adotado, fica em [`../PRODUCT-BACKLOG.md`](../PRODUCT-BACKLOG.md). |

As relações entre pastas são opcionais. Por exemplo, um requisito pode ser associado a um caso de uso, protótipo, parte da aplicação e teste quando essas relações existirem. Não exija que todo requisito gere uma tabela, classe, endpoint ou tela.

## Como escolher o que manter

- Projetos com interação de pessoas podem usar requisitos, casos de uso e protótipos.
- Projetos que persistem dados estruturados podem usar `der/`; não é necessário criar DER para projeto sem persistência relacional adequada.
- Projetos com web e mobile podem guardar protótipos e validações por plataforma, destacando diferenças relevantes.
- Pesquisa, análise de dados, automação, API sem interface, integração ou evolução de sistema legado podem usar outros documentos e justificar a não aplicabilidade dos modelos.
- Dados de clientes, credenciais e informações pessoais não devem ser expostos nos artefatos. Prefira exemplos sintéticos e referências a locais protegidos quando necessário.

## Estrutura sugerida

```text
docs/
├── TG-Template-ADS-formato-academico 1-v1.docx
├── tg.docx                         # versão da equipe, se aplicável
├── tg.pdf                          # exportação correspondente, se aplicável
├── README.md
├── requisitos/                     # especificação e rastreabilidade
├── casos-de-uso/                   # objetivos e fluxos, se aplicável
├── der/                            # modelo e dicionário de dados, se aplicável
├── arquitetura/                    # visões e classes pertinentes
├── prototipos/                     # interfaces e fluxos, se aplicável
├── testes/                         # plano e evidências de validação
├── decisoes/                       # decisões técnicas e de escopo
├── continuidade/                   # linha de base e evolução entre etapas
└── backlog/                        # orientação ou alternativa de planejamento
```

**Exemplo de uso:** uma equipe com aplicativo móvel, painel web e API mantém requisitos e casos de uso em suas pastas, protótipos identificados por plataforma e testes com resultados observados. Uma equipe de análise de dados pode manter fontes e métodos em `data/` na raiz do repositório, registrar conceitos de dados pertinentes em `der/` e documentar os resultados na monografia.
