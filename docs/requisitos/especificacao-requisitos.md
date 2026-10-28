# Especificação de requisitos — O-BRECHÓ / ANG

- **Instituição:** Fatec Sorocaba, Análise e Desenvolvimento de Sistemas.
- **Equipe:** Arthur Mendes Entsev, Eduardo Kioshi Yasuoka, Gustavo Henrique Oliveira da Silva e Thiago Pereira Cortez.
- **Base documental:** [requisitos funcionais](fontes/RequisitosFuncionais_ANG.pdf), pp. 3–4; [estudo](../academico/fontes/2209ANG.pdf), pp. 4–8 e 14–18.
- **Versão desta consolidação:** 2026-10-27. Requisitos transpostos dos documentos; aceite formal não fornecido.
- **Origem declarada no estudo:** coleta de informações com responsáveis pela ANG, análise de processos e pesquisa de similares (p. 15).

## 1. Requisitos funcionais

| ID | Nome | Comportamento especificado | Caso de uso | Situação no código atual |
|---|---|---|---|---|
| RF01 | Cadastro de clientes | Registrar identificação e contato para comunicação futura | UC01 | Cadastro existente; teste funcional pendente |
| RF02 | Histórico de compras | Armazenar e consultar compras por cliente, agrupadas por categorias | UC02 | Histórico existente; agrupamento por categorias não implementado na tela |
| RF03 | Criar atendentes | Permitir ao administrador criar usuários e seus acessos | UC03 | Gestão local de funcionários; segurança de servidor pendente |
| RF04 | Recebimento de doações | Registrar entradas de mercadorias provenientes exclusivamente de doações | UC04 | Registro e peças pendentes existentes; cadastro direto deve ser conciliado com a origem obrigatória |
| RF05 | Triagem e avaliação | Registrar etapas da triagem e avaliação de qualidade | UC05 | Aprovação/reprovação existentes; exclusividade da gestora não garantida |
| RF06 | Categorização de produtos | Classificar em roupa de academia, shorts masculino, camisa feminina, camisa masculina e vestidos | UC06 | Filtro existente; seed usa Shorts e Calças e acrescenta Calçados |
| RF07 | Registro de saídas/vendas | Registrar venda e baixa do estoque; impedir trocas e doações como saída comercial | UC07 | Fluxo de venda existente; testes de integridade pendentes |
| RF08 | Relatórios financeiros | Consultar itens vendidos, valores e faturamento por dia ou período | UC08 | Resumo agregado e lista de vendas existentes; filtro e consolidação por período pendentes |

Prioridades não foram especificadas nos PDFs; as prioridades propostas ficam no [backlog](../../PRODUCT-BACKLOG.md).

## 2. Requisitos não funcionais

Fonte: estudo, pp. 17–18. Os critérios abaixo são propostas de verificação desta consolidação, sem inventar metas numéricas ou aprovação do parceiro.

| ID | Atributo | Exigência documentada | Verificação proposta / situação |
|---|---|---|---|
| RNF01 | Segurança de acesso | Autenticar por usuário e senha e permitir apenas usuários cadastrados | Testar acesso válido/inválido; login atual demonstrativo, sem backend |
| RNF02 | Controle de permissões | Restringir operações conforme administrador e atendente | Conferir telas e operações por papel; não há autorização de servidor |
| RNF03 | Desempenho | Resposta adequada em cadastros, consultas, vendas e relatórios | Definir carga, dispositivos e limite com a ANG; medição não realizada |
| RNF04 | Usabilidade | Interface simples para pessoas sem conhecimentos técnicos avançados | Executar tarefas com equipe operacional; avaliação não realizada |
| RNF05 | Armazenamento | Persistir produtos, clientes, usuários, vendas, pagamentos e histórico em banco | Não atendido como banco compartilhado; apenas localStorage nesta versão |
| RNF06 | Integridade | Evitar dados incompletos e inconsistência entre estoque, vendas e clientes | Exercitar validações e relações; execução funcional pendente |
| RNF07 | Confiabilidade | Manter dados disponíveis e consistentes, especialmente vendas, estoque e caixa | Planejar recuperação e continuidade; localStorage não comprova atendimento |
| RNF08 | Compatibilidade | Suportar navegadores modernos em computadores com rede de acesso | Definir matriz e executar cenários; validação não realizada |
| RNF09 | Responsividade | Adaptar layout com legibilidade e facilidade de uso | Conferir larguras de tela e fluxos; não validar só pela existência de CSS |
| RNF10 | Manutenibilidade | Código organizado e modular para correções e evolução | Inspeção das camadas, build e checagem de tipos; ver evidências técnicas |

## 3. Regras de negócio

IDs RN01–RN08 foram atribuídos nesta consolidação para rastrear as regras descritas no estudo; não existiam como códigos no PDF.

| ID | Regra documentada | Fonte | Relação e pendência |
|---|---|---|---|
| RN01 | Mercadorias de entrada são exclusivamente doações | Estudo pp. 4 e 7 | RF04; cadastro direto atual não exige vínculo com doação |
| RN02 | Aprovação final da triagem é exclusiva da gestora Aline | Estudo pp. 4 e 7 | RF05 / RNF02; exclusividade ainda não imposta pelo código |
| RN03 | Apenas peças aprovadas entram no catálogo comercial | Estudo pp. 4 e 7 | RF05, RF06; código armazena peças pendentes antes da aprovação, fora do catálogo disponível |
| RN04 | Saída comercial ocorre por venda, sem trocas ou doações diretas | Estudo pp. 5–6 | RF07; descarte de triagem é uma etapa distinta de saída comercial |
| RN05 | Atendimento ocorre por agendamento prévio | Estudo pp. 4 e 6 | Regra operacional; não há agenda implementada |
| RN06 | Caixa único e destinação integral da receita para a ANG | Estudo p. 8 | RF08; resumo de recebimentos não comprova destinação efetiva dos recursos |
| RN07 | Meio de pagamento é obrigatório em cada transação | Estudo p. 8 | RF07; Pix, Dinheiro e Cartão aparecem no protótipo |
| RN08 | Vestidos abrange macaquinhos, jardineiras e peças correlatas | Estudo pp. 5 e 8 | RF06; nomenclatura do seed precisa ser alinhada |

## 4. Critérios de aceite e rastreabilidade

Cada RF está ligado a um caso de uso com critérios e cenários em [rastreabilidade](rastreabilidade.md) e no [plano de testes](../testes/plano-e-evidencias-de-testes.md). Implementação existente, captura de tela e aceite da ANG são evidências diferentes; nenhum fluxo está marcado como aceito sem registro correspondente.

## 5. Histórico

Em 2026-10-27, os identificadores provisórios do primeiro README foram substituídos pelos RF01–RF08 e RNF01–RNF10 presentes nas fontes reais. Os PDFs foram preservados integralmente e suas capturas estão vinculadas ao [catálogo](../fontes.md).
