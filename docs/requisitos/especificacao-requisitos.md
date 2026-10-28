# Especificação de requisitos — O-BRECHÓ / ANG

- **Instituição:** Fatec Sorocaba, Análise e Desenvolvimento de Sistemas.
- **Equipe:** Arthur Mendes Entsev, Eduardo Kioshi Yasuoka, Gustavo Henrique Oliveira da Silva e Tiago Pereira Cortes.
- **Documentos usados:** [requisitos funcionais](fontes/RequisitosFuncionais_ANG.pdf) e [estudo da equipe](../academico/fontes/2209ANG.pdf). Cada linha abaixo tem um link para a página usada como fonte.
- **Última atualização:** 2026-10-27. Requisitos retirados dos documentos.
- **Origem declarada no estudo:** conversa com os responsáveis pela ANG. [Ver página 15](../academico/evidencias/estudo-ang/pagina-15.png).

## 1. Requisitos funcionais

| ID | Nome | Comportamento especificado | Caso de uso | Situação no código atual | Onde conferir |
|---|---|---|---|---|---|
| RF01 | Cadastro de clientes | Registrar identificação e contato para comunicação futura | UC01 | Cadastro existente; teste funcional pendente | [Ver página 3](evidencias/requisitos-funcionais/pagina-03.png) |
| RF02 | Histórico de compras | Armazenar e consultar compras por cliente, agrupadas por categorias | UC02 | Histórico existente; agrupamento por categorias não implementado na tela | [Ver página 3](evidencias/requisitos-funcionais/pagina-03.png) |
| RF03 | Criar atendentes | Permitir ao administrador criar usuários e seus acessos | UC03 | Cadastro de funcionários no navegador; falta proteger o acesso no servidor | [Ver página 3](evidencias/requisitos-funcionais/pagina-03.png) |
| RF04 | Recebimento de doações | Registrar entradas de mercadorias provenientes exclusivamente de doações | UC04 | Registro e peças pendentes existentes; cadastro direto deve ser alinhado com a origem obrigatória | [Ver página 3](evidencias/requisitos-funcionais/pagina-03.png) |
| RF05 | Triagem e avaliação | Registrar etapas da triagem e avaliação de qualidade | UC05 | Aprovação/reprovação existentes; falta limitar a aprovação à gestora | [Ver página 3](evidencias/requisitos-funcionais/pagina-03.png) |
| RF06 | Categorização de produtos | Classificar em roupa de academia, shorts masculino, camisa feminina, camisa masculina e vestidos | UC06 | Filtro existente; os dados de exemplo usam Shorts e Calças e acrescenta Calçados | [Ver página 4](evidencias/requisitos-funcionais/pagina-04.png) |
| RF07 | Registro de saídas/vendas | Registrar venda e baixa do estoque; impedir trocas e doações como saída comercial | UC07 | Fluxo de venda existente; testes de integridade pendentes | [Ver página 4](evidencias/requisitos-funcionais/pagina-04.png) |
| RF08 | Relatórios financeiros | Consultar itens vendidos, valores e faturamento por dia ou período | UC08 | Resumo geral e lista de vendas existentes; falta filtrar e somar os resultados por período | [Ver página 4](evidencias/requisitos-funcionais/pagina-04.png) |

Prioridades não foram especificadas nos PDFs; as prioridades propostas ficam no [backlog](../../PRODUCT-BACKLOG.md).

## 2. Requisitos não funcionais

Esses requisitos estão no estudo: [Ver página 17](../academico/evidencias/estudo-ang/pagina-17.png) · [Ver página 18](../academico/evidencias/estudo-ang/pagina-18.png). A coluna de verificação mostra como podemos testá-los.

| ID | Atributo | Exigência documentada | Verificação proposta / situação | Onde conferir |
|---|---|---|---|---|
| RNF01 | Segurança de acesso | Autenticar por usuário e senha e permitir apenas usuários cadastrados | Testar acesso válido/inválido; login atual demonstrativo, sem backend | [Ver página 17](../academico/evidencias/estudo-ang/pagina-17.png) |
| RNF02 | Controle de permissões | Restringir operações conforme administrador e atendente | Conferir telas e operações por papel; não há autorização de servidor | [Ver página 17](../academico/evidencias/estudo-ang/pagina-17.png) |
| RNF03 | Desempenho | Resposta adequada em cadastros, consultas, vendas e relatórios | Definir carga, dispositivos e limite com a ANG; medição não realizada | [Ver página 17](../academico/evidencias/estudo-ang/pagina-17.png) |
| RNF04 | Usabilidade | Interface simples para pessoas sem conhecimentos técnicos avançados | Executar tarefas com equipe operacional; avaliação não realizada | [Ver página 17](../academico/evidencias/estudo-ang/pagina-17.png) |
| RNF05 | Armazenamento | Persistir produtos, clientes, usuários, vendas, pagamentos e histórico em banco | Não atendido como banco compartilhado; apenas localStorage nesta versão | [Ver página 17](../academico/evidencias/estudo-ang/pagina-17.png) · [Ver página 18](../academico/evidencias/estudo-ang/pagina-18.png) |
| RNF06 | Integridade | Evitar dados incompletos e inconsistência entre estoque, vendas e clientes | Exercitar validações e relações; execução funcional pendente | [Ver página 18](../academico/evidencias/estudo-ang/pagina-18.png) |
| RNF07 | Confiabilidade | Manter dados disponíveis e consistentes, especialmente vendas, estoque e caixa | Planejar recuperação e continuidade; localStorage não comprova atendimento | [Ver página 18](../academico/evidencias/estudo-ang/pagina-18.png) |
| RNF08 | Compatibilidade | Suportar navegadores modernos em computadores com rede de acesso | Definir matriz e executar cenários; validação não realizada | [Ver página 18](../academico/evidencias/estudo-ang/pagina-18.png) |
| RNF09 | Responsividade | Adaptar layout com legibilidade e facilidade de uso | Conferir larguras de tela e fluxos; não validar só pela existência de CSS | [Ver página 18](../academico/evidencias/estudo-ang/pagina-18.png) |
| RNF10 | Manutenibilidade | Código organizado e modular para correções e evolução | Inspeção das camadas, build e checagem de tipos; ver evidências técnicas | [Ver página 18](../academico/evidencias/estudo-ang/pagina-18.png) |

## 3. Regras de negócio

Os códigos RN01–RN08 foram criados aqui para facilitar a consulta às regras descritas no estudo.

| ID | Regra documentada | Fonte | Relação e pendência |
|---|---|---|---|
| RN01 | Mercadorias de entrada são exclusivamente doações | [Ver página 7](../academico/evidencias/estudo-ang/pagina-07.png) | RF04; cadastro direto atual não exige vínculo com doação |
| RN02 | Aprovação final da triagem é exclusiva da gestora Aline | [Ver página 7](../academico/evidencias/estudo-ang/pagina-07.png) | RF05 / RNF02; o código ainda não limita a aprovação à gestora |
| RN03 | Apenas peças aprovadas entram no catálogo comercial | [Ver página 4](../academico/evidencias/estudo-ang/pagina-04.png) | RF05, RF06; código armazena peças pendentes antes da aprovação, fora do catálogo disponível |
| RN04 | Saída comercial ocorre por venda, sem trocas ou doações diretas | [Ver página 6](../academico/evidencias/estudo-ang/pagina-06.png) | RF07; descarte de triagem é uma etapa distinta de saída comercial |
| RN05 | Atendimento ocorre por agendamento prévio | [Ver página 6](../academico/evidencias/estudo-ang/pagina-06.png) | Regra operacional; não há agenda implementada |
| RN06 | Caixa único e destinação integral da receita para a ANG | [Ver página 8](../academico/evidencias/estudo-ang/pagina-08.png) | RF08; resumo de recebimentos não comprova destinação efetiva dos recursos |
| RN07 | Meio de pagamento é obrigatório em cada transação | [Ver página 8](../academico/evidencias/estudo-ang/pagina-08.png) | RF07; Pix, Dinheiro e Cartão aparecem no protótipo |
| RN08 | Vestidos abrange macaquinhos, jardineiras e peças correlatas | [Ver página 8](../academico/evidencias/estudo-ang/pagina-08.png) | RF06; os nomes das categorias precisam ser alinhados |

## 4. Como vamos conferir os requisitos

Cada RF está ligado a um caso de uso com critérios e cenários em [tabela de acompanhamento](rastreabilidade.md) e no [plano de testes](../testes/plano-e-evidencias-de-testes.md). Os testes completos ainda precisam ser feitos. Depois disso, os resultados serão registrados no plano de testes.

## 5. Sobre esta versão

Esta versão usa os mesmos códigos de requisitos dos PDFs. Você também pode consultar todos os documentos pelo [índice](../fontes.md).
