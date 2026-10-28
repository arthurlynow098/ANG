# Plano e evidências de validação — modelo adaptável

> Registre somente testes planejados ou realmente executados. Os exemplos abaixo são fictícios. Não copie resultados, métricas, saídas de console ou aprovações como se fossem evidências reais. Validação com usuários é opcional e deve ser adequada ao objetivo, ao público e às orientações institucionais do projeto.

## 1. Escopo da validação

- **Versão/commit analisado:** [informar a versão efetivamente testada]
- **Data e responsável/papel:** [informar]
- **Ambiente:** [dispositivo, navegador, sistema operacional, servidor ou outro ambiente relevante]
- **Limitações:** [serviços indisponíveis, plataforma não testada, dados limitados etc.]

**Exemplo fictício:** “Foi planejada a verificação do fluxo de consulta no site e no aplicativo Android. A execução ainda não ocorreu; não há resultado observado.”

## 2. Estratégia por tipo de projeto

Selecione somente o que se aplica: testes unitários, integração, sistema/ponta a ponta, compatibilidade, usabilidade, validação de dados, avaliação com usuário, inspeção ou outro método. Para projetos com aplicativo móvel, registre dispositivo/emulador, versão do sistema, orientação, permissões e condições de conectividade quando afetarem o comportamento.

| Componente/ambiente | Tipo de validação | Escopo | Ferramenta ou procedimento | Situação |
|---|---|---|---|---|
| Exemplo: aplicativo Android | Teste de sistema | Consultar item online | Roteiro manual no emulador identificado | Planejado; exemplo fictício |
| Exemplo: API compartilhada | Integração | Resposta para consulta válida | Teste automatizado ou chamada controlada | A definir; exemplo fictício |

## 3. Casos de teste

| ID | Requisito/caso relacionado | Cenário e pré-condições | Procedimento/entrada | Resultado esperado | Resultado observado e evidência | Situação |
|---|---|---|---|---|---|---|
| CT-01 | RF a relacionar | Exemplo: pessoa consulta item existente | Abrir a função de consulta e selecionar o item de teste | Detalhes correspondem aos dados preparados | Preencher após executar, anexando evidência sem dados sensíveis | Planejado; exemplo fictício |
| CT-02 | RNF/compatibilidade a relacionar | Exemplo: abrir função no dispositivo/plataforma definidos | Registrar dispositivo, sistema e passos | Função principal pode ser concluída nas condições acordadas | Preencher após executar | Planejado; exemplo fictício |

Inclua fluxos alternativos ou de erro quando forem requisitos ou riscos relevantes. Não invente regras de validação que não constem nos requisitos.

## 4. Evidências de execução

Ao executar, registre data, versão/commit, ambiente, comando ou passos, resultado real e localização da evidência. Remova ou anonimize dados pessoais, credenciais e dados do cliente.

```text
Exemplo de registro ainda não executado:
Data: não executado
Versão: a definir
Ambiente: a definir
Resultado: não há resultado observado
Evidência: nenhuma
```

Para testes automatizados, cole a saída real ou indique o arquivo/relatório gerado. Não use uma saída simulada como evidência.

## 5. Avaliação com pessoas usuárias (quando aplicável)

Se o projeto exigir avaliação com participantes, descreva objetivo, público, procedimento, instrumento, tratamento dos dados e cuidados éticos conforme orientação do professor e regras institucionais aplicáveis. Ferramentas como formulário on-line são opções, não exigências. Se a validação não envolver pessoas, explique o método alternativo.

**Exemplo fictício:** “A equipe pretende observar três tarefas do protótipo com participantes convidados. O método, o número de participantes e o instrumento ainda dependem de validação com o orientador; não houve coleta.”

## 6. Resultados, limitações e próximos passos

Separe claramente testes planejados, executados e bloqueados. Registre falhas com passos para reproduzir, impacto, versão e acompanhamento. Não declare o sistema validado com base apenas na existência de código ou de uma demonstração pontual.
