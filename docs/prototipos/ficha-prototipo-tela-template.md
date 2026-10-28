# Ficha de protótipo ou interface — modelo adaptável

> Use para telas, páginas, interfaces móveis, painéis, dispositivos ou etapas de interação que sejam relevantes ao projeto. Não é necessário criar protótipo de toda interface. Os exemplos são fictícios e devem ser substituídos pelo conteúdo real.

## 1. Identificação

- **ID e nome:** PRT-01 — Consulta de itens
- **Projeto/versão:** Projeto Exemplo — protótipo 0.1
- **Plataforma:** Web / Android / iOS / outra / não aplicável
- **Dispositivo, viewport ou contexto:** [informar se relevante; por exemplo, modelo de aparelho ou largura de tela]
- **Ferramenta/arquivo:** [Figma, imagem, código, desenho ou outro]
- **Ator e objetivo relacionado:** pessoa usuária consulta um item; relacionar ao RF/UC real
- **Estado:** rascunho / em validação / validado / implementado

## 2. Representação

Insira a imagem ou link acessível do protótipo e registre sua versão. Para interface móvel, mostre um enquadramento que permita ler os componentes e, se necessário, identifique gestos, navegação, teclado, permissões ou comportamento em diferentes orientações.

### Exemplo fictício — esboço adaptável

```text
WEB                         APLICATIVO MÓVEL
+----------------------+    +----------------+
| Nome do projeto      |    | Projeto        |
| Buscar: [_________]  |    | [Buscar...]    |
| Resultado A          |    | Resultado A    |
| Resultado B          |    | Resultado B    |
+----------------------+    | [Detalhes]     |
                            +----------------+
```

Este esboço mostra apenas uma possível organização de uma função de consulta. Remova o formato que não pertence ao projeto. Não representa uma exigência de que as versões web e móvel tenham interfaces iguais.

## 3. Componentes e comportamento

| Elemento | Comportamento previsto | Requisito/caso relacionado | Observação ou estado |
|---|---|---|---|
| Campo de busca | Exemplo: recebe o termo que a pessoa deseja consultar | Identificador a confirmar | Não definir validação sem requisito correspondente |
| Resultado | Exemplo: abre detalhes do item selecionado | Identificador a confirmar | Conteúdo fictício |
| Navegação móvel | Exemplo: apresenta retorno à lista de resultados | Identificador a confirmar | Incluir somente se aplicável |

Descreva estados importantes que façam parte do escopo, como carregamento, ausência de resultados, erro ou falta de conexão. Indique diferenças entre plataformas somente quando existirem ou forem relevantes.

## 4. Fluxo e validação

**Exemplo fictício:** “A pessoa informa um termo, solicita a consulta e seleciona um resultado para ver seus detalhes. A equipe ainda precisa validar se esse fluxo corresponde ao requisito RF-01.”

Registre quem revisou o protótipo, data, comentários recebidos e mudanças efetuadas. Não marque como validado sem evidência da validação.

## 5. Relação com a implementação

Informe se o protótipo corresponde à versão implementada. Se houver diferenças, explique a decisão ou a pendência e indique caminhos de tela/componente relevantes. Um protótipo não comprova, sozinho, que a funcionalidade foi implementada ou testada.
