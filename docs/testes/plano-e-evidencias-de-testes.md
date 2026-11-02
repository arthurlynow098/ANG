# Plano de testes

## 1. Versão e ambiente

Os primeiros testes técnicos foram feitos no Windows, com Node v24.22.1, na versão `c8ec5a8`. O [registro técnico](verificacao-tecnica.txt) contém os comandos e os resultados de 27/10/2026.

## 2. Andamento

| Frente | Método | Situação |
|---|---|---|
| Compilação React | npm.cmd run build | Passou na publicação inicial; saída em verificacao-tecnica.txt |
| Tipos TypeScript | tsc.cmd --noEmit | Passou na publicação inicial |
| Documentos | Leitura dos quatro PDFs e inspeção das páginas/diagramas | Conferidos em 27/10/2026 |
| Navegação visual do React | Login demonstrativo e abertura de dez telas em Chrome 144 | Realizada; sem confirmar cadastro, doação ou venda |
| Cópias e capturas | SHA-256 das cópias, contagem de páginas e imagens | Resultados em ../fontes.json e auditoria-documentacao.json |
| Fluxos React | Cenários CT-01–CT-08 abaixo | Ainda não executados |
| SQL | Aplicação em banco e testes de integridade | Não executados |
| Aceite da ANG | Sessão orientada com gestão e operação | Pendente |

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

## 4. Registros

- [Verificação técnica inicial](verificacao-tecnica.txt): comandos, ambiente, código de saída e limitações.
- [telasANG.pdf](../prototipos/fontes/telasANG.pdf): 13 figuras do protótipo e sua descrição funcional, incluindo erro de autenticação. O próprio PDF informa indicadores estáticos em Relatórios.
- [Manifesto das fontes](../fontes.json): PDFs copiados integralmente, páginas e SHA-256.
- [Capturas atuais](../prototipos/atual/README.md) e [registro da execução](../prototipos/atual/capturas.json): login e navegação concluídos sem erros JavaScript durante as capturas. As vendas e os cadastros completos ainda precisam ser testados.
- [Auditoria documental desta publicação](auditoria-documentacao.json): integridade, imagens e links locais, gerada antes do commit.

## 5. Avaliação com a ANG

Vamos avaliar as principais tarefas com a gestora e a equipe operacional. A sessão ainda precisa ser agendada. [Roteiro da avaliação](roteiro-avaliacao-usuarios.md).

## 6. Próximos passos

Falta testar a instalação do zero, os fluxos completos de cadastro e venda, a integração com o banco e as permissões de acesso. Em cada teste, vamos registrar a versão, os passos e o resultado. [Pendências dos requisitos](../requisitos/rastreabilidade.md).
