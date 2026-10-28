# Plano e evidências de validação

## 1. Escopo

Projeto O-BRECHÓ, código React da primeira publicação (`c8ec5a8`) e documentação consolidada em 2026-10-27. Ambiente técnico registrado: Windows, Node v24.22.1 e dependências locais. Verificação desta etapa: documentação, integridade dos PDFs, capturas, links e correspondência com o código.

## 2. Estratégia e situação

| Frente | Método | Situação |
|---|---|---|
| Compilação React | npm.cmd run build | Passou na publicação inicial; saída em verificacao-tecnica.txt |
| Tipos TypeScript | tsc.cmd --noEmit | Passou na publicação inicial |
| Documentos | Leitura dos cinco PDFs e inspeção das páginas/diagramas | Realizada nesta consolidação |
| Navegação visual do React | Login demonstrativo e abertura de dez telas em Chrome 144 | Realizada; sem confirmar cadastro, doação ou venda |
| Cópias e capturas | SHA-256 das cópias, contagem de páginas e imagens | Resultados em ../fontes.json e auditoria-documentacao.json |
| Fluxos React | Cenários CT-01–CT-08 abaixo | Planejados; não executados nesta etapa documental |
| SQL | Aplicação em banco e testes de integridade | Não executados |
| Aceite da ANG | Sessão orientada com gestão e operação | Não realizada / sem registro fornecido |

## 3. Casos de teste planejados

| ID | Requisito / UC | Pré-condição e procedimento | Resultado esperado | Estado |
|---|---|---|---|---|
| CT-01 | RF01 / UC01 | Autenticar atendente, cadastrar cliente com contato e tentar dados incompletos/duplicados | Registro válido persistido; dados inválidos ou duplicidade tratados conforme regra acordada | Não executado |
| CT-02 | RF02 / UC02 | Cliente com compras em categorias distintas; abrir histórico | Compras e categorias corretas; ausência de agrupamento atual deve ser registrada como lacuna | Não executado |
| CT-03 | RF03 / UC03 | Administrador cria atendente; perfil comum tenta acessar gestão | Cadastro acessível apenas ao papel autorizado; validar menu e operação, sem presumir autorização de servidor | Não executado |
| CT-04 | RF04 / UC04 | Registrar doação com duas peças; conferir vínculo e situação | Doação, produtos pendentes e triagens ligados, sem disponibilização comercial antecipada | Não executado |
| CT-05 | RF05 / UC05 | Avaliar uma peça aprovada e outra reprovada; tentar aprovação com perfil diferente da gestora | Aprovação/reprovação corretas; exclusividade conforme RN02, atualmente pendente | Não executado |
| CT-06 | RF06 / UC06 | Classificar peça aprovada e filtrar categorias documentadas | Categoria correta e catálogo filtrado; divergências do seed registradas | Não executado |
| CT-07 | RF07 / UC07 | Vender peça disponível, identificar pagamento e conferir estoque/itens/total; tentar peça indisponível | Venda e pagamento coerentes, baixa única e rejeição de operação inválida | Não executado |
| CT-08 | RF08 / UC08 | Preparar vendas em duas datas e consultar dia/período | Quantidade e receita corretas por período; filtro ausente registrado como pendência | Não executado |

## 4. Evidências reais disponíveis

- [Verificação técnica inicial](verificacao-tecnica.txt): comandos, ambiente, código de saída e limitações.
- [telasANG.pdf](../prototipos/fontes/telasANG.pdf): 13 figuras do protótipo e sua descrição funcional, incluindo erro de autenticação. O próprio PDF informa indicadores estáticos em Relatórios.
- [Manifesto das fontes](../fontes.json): PDFs copiados integralmente, páginas e SHA-256.
- [Capturas atuais](../prototipos/atual/README.md) e [registro da execução](../prototipos/atual/capturas.json): login e navegação visual, sem exceções JavaScript observadas durante a captura; não equivalem aos cenários comerciais completos.
- [Auditoria documental desta publicação](auditoria-documentacao.json): integridade, imagens e links locais, gerada antes do commit.

## 5. Avaliação com pessoas

O [roteiro proposto](roteiro-avaliacao-usuarios.md) contempla os responsáveis pela operação da ANG. Não foram fornecidos participantes, respostas, datas ou aceite. O estudo relata levantamento com responsáveis, mas não contém resultados de teste de usabilidade.

## 6. Limitações e próximos passos

Compilação e documentação não validam fluxos comerciais. Instalação limpa, integração SQL, autorização segura, testes de navegador e aprovação do parceiro permanecem pendentes. Priorizar as lacunas de [rastreabilidade](../requisitos/rastreabilidade.md) e registrar versão, passos, resultado observado e evidência ao executar cada cenário.
