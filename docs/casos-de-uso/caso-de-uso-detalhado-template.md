# Especificação de caso de uso — modelo adaptável

> Use quando houver interação entre ator e sistema que se beneficie desta descrição. O exemplo é fictício. Não crie pré-condições, permissões, validações ou regras que não tenham sido definidas nos requisitos ou com o cliente. Para processo automático sem ator, registre a rastreabilidade adequada em outro artefato.

- **ID e nome:** UC-01 — Consultar item
- **Objetivo:** Exemplo fictício: permitir que a pessoa encontre um item e consulte seus detalhes.
- **Ator(es):** Pessoa usuária (exemplo)
- **Requisito(s) relacionado(s):** RF-01 (exemplo; conferir identificadores reais)
- **Interface/plataforma:** Web / Android / iOS / desktop / API / outra, conforme aplicável
- **Versão e situação:** 0.1 — exemplo ilustrativo

## Condições

- **Gatilho:** Exemplo: a pessoa solicita a consulta.
- **Pré-condições:** [Registrar somente condições necessárias e documentadas; ou “não definidas”.]
- **Pós-condições:** [Descrever o resultado observável; não presumir persistência ou auditoria.]

## Fluxo principal

| Passo | Ator | Ação do ator | Resposta do sistema |
|---|---|---|---|
| 1 | Pessoa usuária | Informa o termo de consulta. | O sistema recebe a solicitação. |
| 2 | Pessoa usuária | Solicita a consulta. | O sistema apresenta os resultados disponíveis conforme o requisito. |
| 3 | Pessoa usuária | Seleciona um resultado. | O sistema apresenta os detalhes correspondentes. |

O fluxo acima é fictício. Adapte-o às interações e respostas realmente previstas. Quando a ação for processamento interno, descreva-a na resposta do sistema, sem atribuí-la ao ator.

## Fluxos alternativos e exceções

Inclua apenas alternativas relevantes e previstas ou identificadas como questões a decidir. Informe o passo de origem e como o fluxo termina ou retorna ao principal.

**Exemplo fictício:** “A partir do passo 2, quando a consulta não retorna itens, o sistema informa que não foram encontrados resultados.” Use somente se esse comportamento estiver acordado.

## Regras, dados e variações de plataforma

- **Regras relacionadas:** [IDs existentes ou “não identificadas até o momento”].
- **Dados relevantes:** [Dados usados no fluxo, sem incluir dados pessoais reais].
- **Variações web/mobile:** [Descrever somente diferenças relevantes; por exemplo, navegação por toque ou operação offline, se fizerem parte dos requisitos].
- **Critério de aceite:** [Indicar critério acordado ou registrar como pendente; não inventar regra].

## Exemplo de manutenção

Se o fluxo real não tiver exceção definida, registre “nenhum fluxo alternativo documentado nesta versão” e acompanhe a questão como pendência apenas se ela for necessária para avançar. Não preencha o modelo com comportamentos presumidos.
