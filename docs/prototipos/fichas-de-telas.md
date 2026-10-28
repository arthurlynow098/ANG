# Galeria e fichas das 13 telas

**Plataforma:** web. **Fonte:** [telasANG.pdf](fontes/telasANG.pdf). **Estado:** protótipo HTML documentado pela equipe em 2026, sem aceite anexado. Os nomes e números são dados de demonstração. As imagens são os bytes extraídos do PDF, sem alterar a imagem.

Os números de página abaixo indicam ordem das páginas no arquivo, não a numeração impressa.

| Tela | Página | Requisito / fluxo |
|---|---:|---|
| [Autenticação](#01-autenticacao) | 4 | RNF01 |
| [Credenciais inválidas](#02-credenciais-invalidas) | 5 | RNF01 |
| [Início — Administrador](#03-inicio-administrador) | 6 | Navegação / RNF04 |
| [Produtos](#04-produtos) | 7 | RF06, RF07 / UC06, UC07 |
| [Cadastro de produto](#05-cadastro-produto) | 8 | RF06 / UC06 |
| [Nova venda — cliente cadastrado](#06-venda-cliente-cadastrado) | 9 | RF07 / UC07 |
| [Nova venda — cliente avulso](#07-venda-cliente-avulso) | 10 | RF07 / UC07 |
| [Clientes](#08-clientes) | 11 | RF01 / UC01 |
| [Detalhe do cliente](#09-detalhe-cliente) | 12 | RF02 / UC02 |
| [Estoque](#10-estoque) | 13 | RF06, RF07 / UC06, UC07 |
| [Relatórios](#11-relatorios) | 14 | RF08 / UC08 |
| [Atendentes](#12-atendentes) | 15 | RF03 / UC03 |
| [Início — Atendente](#13-inicio-atendente) | 16 | RNF02 |

<a id="01-autenticacao"></a>

## Autenticação

![Autenticação — captura original](imagens/01-autenticacao.png)

**Origem:** página 4 do PDF. **Requisito:** RNF01.

**O que aparece e como funciona:** Campos Usuário e Senha, botão Entrar e nota com credenciais de demonstração. Após login válido, apresenta Início.

**Como está no sistema atual:** Login React em components/Login.tsx; continua demonstrativo.

[Conferir a página completa](evidencias/telas-ang/pagina-04.png).

<a id="02-credenciais-invalidas"></a>

## Credenciais inválidas

![Credenciais inválidas — captura original](imagens/02-credenciais-invalidas.png)

**Origem:** página 5 do PDF. **Requisito:** RNF01.

**O que aparece e como funciona:** Mensagem de erro no login; permanece fora das páginas internas e permite corrigir as credenciais.

**Como está no sistema atual:** O React usa sua própria mensagem de erro e sua própria verificação de login. [Ver código do login](../../frontend/src/services/authService.ts).

[Conferir a página completa](evidencias/telas-ang/pagina-05.png).

<a id="03-inicio-administrador"></a>

## Início — Administrador

![Início — Administrador — captura original](imagens/03-inicio-administrador.png)

**Origem:** página 6 do PDF. **Requisito:** Navegação / RNF04.

**O que aparece e como funciona:** Painel com atalhos e indicadores de 128 produtos, 42 vendas, 31 clientes e receita de R$ 1.284, todos demonstrativos.

**Como está no sistema atual:** O React usa views/inicio/InicioView.tsx com seus próprios dados e menu; não são números reais da ANG.

[Conferir a página completa](evidencias/telas-ang/pagina-06.png).

<a id="04-produtos"></a>

## Produtos

![Produtos — captura original](imagens/04-produtos.png)

**Origem:** página 7 do PDF. **Requisito:** RF06, RF07 / UC06, UC07.

**O que aparece e como funciona:** Busca por nome, filtro de categoria, cartões com preço e quantidade, cadastro e ação Dar baixa / vender. Esgotados ficam desabilitados.

**Como está no sistema atual:** O React organiza peças unitárias e seus estados em views/produtos/ProdutosView.tsx.

[Conferir a página completa](evidencias/telas-ang/pagina-07.png).

<a id="05-cadastro-produto"></a>

## Cadastro de produto

![Cadastro de produto — captura original](imagens/05-cadastro-produto.png)

**Origem:** página 8 do PDF. **Requisito:** RF06 / UC06.

**O que aparece e como funciona:** Nome, categoria, preço e quantidade inicial obrigatórios; descrição opcional; cancelar retorna ao catálogo.

**Como está no sistema atual:** React acrescenta características e localização em CadastroProdutoView.tsx; cadastro direto precisa ser alinhado com doação e aprovação obrigatórias.

[Conferir a página completa](evidencias/telas-ang/pagina-08.png).

<a id="06-venda-cliente-cadastrado"></a>

## Nova venda — cliente cadastrado

![Nova venda — cliente cadastrado — captura original](imagens/06-venda-cliente-cadastrado.png)

**Origem:** página 9 do PDF. **Requisito:** RF07 / UC07.

**O que aparece e como funciona:** Seleciona produtos, compõe carrinho, escolhe cliente e meio de pagamento, verifica quantidade e finaliza com baixa do estoque.

**Como está no sistema atual:** React permite negociação por peça e total e emite comprovante; a consistência financeira precisa de cenário funcional próprio.

[Conferir a página completa](evidencias/telas-ang/pagina-09.png).

<a id="07-venda-cliente-avulso"></a>

## Nova venda — cliente avulso

![Nova venda — cliente avulso — captura original](imagens/07-venda-cliente-avulso.png)

**Origem:** página 10 do PDF. **Requisito:** RF07 / UC07.

**O que aparece e como funciona:** No protótipo documentado, nome e número são obrigatórios e vinculados somente à venda, sem cadastro permanente automático.

**Como está no sistema atual:** No modelo atual, toda venda precisa estar ligada a um cliente pelo campo `cliente_id`. Essa é uma diferença em relação ao primeiro protótipo. [Ver estrutura de Venda](../../frontend/src/models/Venda.ts).

[Conferir a página completa](evidencias/telas-ang/pagina-10.png).

<a id="08-clientes"></a>

## Clientes

![Clientes — captura original](imagens/08-clientes.png)

**Origem:** página 11 do PDF. **Requisito:** RF01 / UC01.

**O que aparece e como funciona:** Lista identificação, contato, quantidade de compras e total gasto. Selecionar uma linha abre o histórico.

**Como está no sistema atual:** React possui manutenção de clientes além da consulta descrita nesta versão HTML.

[Conferir a página completa](evidencias/telas-ang/pagina-11.png).

<a id="09-detalhe-cliente"></a>

## Detalhe do cliente

![Detalhe do cliente — captura original](imagens/09-detalhe-cliente.png)

**Origem:** página 12 do PDF. **Requisito:** RF02 / UC02.

**O que aparece e como funciona:** Resumo individual e últimas compras com data, produtos, pagamento e total. O PDF informa limite de oito registros recentes.

**Como está no sistema atual:** React apresenta vendas do cliente sem o mesmo limite de oito; ainda falta agrupamento por categoria previsto em RF02.

[Conferir a página completa](evidencias/telas-ang/pagina-12.png).

<a id="10-estoque"></a>

## Estoque

![Estoque — captura original](imagens/10-estoque.png)

**Origem:** página 13 do PDF. **Requisito:** RF06, RF07 / UC06, UC07.

**O que aparece e como funciona:** Tabela de produtos, categorias, quantidades e disponibilidade; estoque reduzido após a venda na sessão do protótipo.

**Como está no sistema atual:** React acompanha peças por status e persiste localmente em vez de comprovar estoque real da instituição.

[Conferir a página completa](evidencias/telas-ang/pagina-13.png).

<a id="11-relatorios"></a>

## Relatórios

![Relatórios — captura original](imagens/11-relatorios.png)

**Origem:** página 14 do PDF. **Requisito:** RF08 / UC08.

**O que aparece e como funciona:** Indicadores estáticos: o próprio documento informa que os números não são recalculados pelo protótipo.

**Como está no sistema atual:** React calcula resumo local de pagamentos e peças, porém não implementa o período e a total diário exigidos.

[Conferir a página completa](evidencias/telas-ang/pagina-14.png).

<a id="12-atendentes"></a>

## Atendentes

![Atendentes — captura original](imagens/12-atendentes.png)

**Origem:** página 15 do PDF. **Requisito:** RF03 / UC03.

**O que aparece e como funciona:** Consulta dos dois usuários demonstrativos. O documento informa que esta versão HTML não cria, edita, bloqueia ou exclui atendentes.

**Como está no sistema atual:** React já oferece gestão local de funcionários; segurança de servidor ainda ausente.

[Conferir a página completa](evidencias/telas-ang/pagina-15.png).

<a id="13-inicio-atendente"></a>

## Início — Atendente

![Início — Atendente — captura original](imagens/13-inicio-atendente.png)

**Origem:** página 16 do PDF. **Requisito:** RNF02.

**O que aparece e como funciona:** Mostra o painel sem a opção Atendentes no menu, demonstrando diferenciação visual por perfil no HTML.

**Como está no sistema atual:** A navegação React mudou; a captura evidencia a versão HTML e não comprova autorização segura na aplicação atual.

[Conferir a página completa](evidencias/telas-ang/pagina-16.png).

## Fluxos e validação

O capítulo final do PDF (p. 17) descreve autenticação, cadastro, venda, histórico, disponibilidade e encerramento da sessão. Não há resultado de avaliação com participantes ou aceite. A navegação do protótipo reorganiza o layout abaixo de 900 e 620 pixels, segundo o PDF (p. 3), mas isso não constitui teste de responsividade do React atual.
