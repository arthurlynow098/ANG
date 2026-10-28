# Especificação de requisitos — modelo adaptável

> Registre requisitos acordados para o projeto. As linhas de exemplo são fictícias e devem ser substituídas ou removidas. Não adote regras de negócio, tecnologias, métricas ou políticas de segurança deste exemplo sem validação da equipe e, quando necessário, do cliente.

- **Projeto:** Projeto Exemplo
- **Versão:** 0.1 (rascunho ilustrativo)
- **Data:** 2026-10-20
- **Escopo/versão do produto:** protótipo de consulta
- **Origem e validação:** reunião/decisão/documento a identificar

## 1. Requisitos funcionais (RF)

| ID | Nome | Descrição | Prioridade | Caso de uso ou rastreio alternativo | Estado | Origem/evidência |
|---|---|---|---|---|---|---|
| RF-01 | Consultar itens | Exemplo fictício: a pessoa usuária consulta os itens publicados e abre os detalhes de um item. | A definir | UC-01 | Em elaboração | Validar com a fonte real do requisito |
| RF-02 | Sincronizar consulta móvel | Exemplo fictício: quando aplicável, o aplicativo atualiza os dados exibidos a partir do serviço compartilhado. | A definir | UC-02 ou fluxo técnico justificado | Proposto | Excluir se não fizer parte do escopo |

## 2. Requisitos não funcionais (RNF)

Registre qualidade ou restrição relevante e um critério de verificação adequado ao projeto. Evite limites numéricos sem origem ou acordo. Para aplicativos móveis, indique plataformas e condições somente quando definidas.

| ID | Atributo/necessidade | Descrição | Critério de verificação acordado | Prioridade/estado | Origem |
|---|---|---|---|---|---|
| RNF-01 | Compatibilidade | Exemplo fictício: o aplicativo móvel deve estar disponível para a plataforma selecionada pela equipe e aceita no escopo. | Instalar e executar em dispositivo ou emulador da plataforma e versão definidos no plano de validação. | A definir | Validar com equipe/cliente |
| RNF-02 | Desempenho | Exemplo fictício: a consulta deve retornar em tempo adequado ao uso previsto. | Definir cenário, ambiente, amostra e limite com base na necessidade real; não usar um limite presumido. | A definir | A confirmar |

## 3. Regras de negócio (RN)

Inclua apenas regras de domínio documentadas. Separe-as dos requisitos técnicos e indique a origem. Se uma regra não foi fornecida, registre a dúvida como pendência; não a invente.

| ID | Regra | Origem/validação | Requisitos relacionados | Estado |
|---|---|---|---|---|
| RN-01 | Exemplo fictício: itens arquivados não aparecem na consulta pública. | Exemplo a validar com o cliente; remova se não corresponder ao domínio. | RF-01 | Ilustrativo |

## 4. Critérios de aceite e validação

Para cada requisito, explique como será possível verificar o atendimento. Critérios podem ser cenário manual, teste automatizado, inspeção, medição ou validação com usuário/cliente, conforme o tipo de requisito.

| Requisito | Cenário/condição | Resultado esperado | Método/evidência | Situação |
|---|---|---|---|---|
| RF-01 | Exemplo: há itens publicados cadastrados para demonstração. | A pessoa consegue localizar um item e consultar seus detalhes. | Roteiro de teste ou teste automatizado, ainda a definir. | Planejado; não afirmar execução antes de realizá-la |

## 5. Histórico e decisões

| Versão/data | Alteração | Motivo/origem | Responsável ou papel |
|---|---|---|---|
| 0.1 / 2026-10-20 | Estrutura inicial fictícia | Exemplo para preenchimento | Equipe |
