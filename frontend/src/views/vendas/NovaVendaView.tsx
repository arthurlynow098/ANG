import React, { useState } from 'react'
import { useBrecho } from '../../context/BrechoContext'
import { formatPhone } from '../../utils/validators'

export const NovaVendaView: React.FC = () => {
  const {
    produtos,
    categorias,
    obterNomeCategoria,
    carrinhoIds,
    precosNegociados,
    valorFinalNegociado,
    setValorFinalNegociado,
    alterarPrecoItemCarrinho,
    clientes,
    go,
    adicionarItemVenda,
    removerItemCarrinho,
    modoClienteAtual,
    setModoClienteAtual,
    clienteSelecionadoId,
    setClienteSelecionadoId,
    clienteAvulsoNome,
    setClienteAvulsoNome,
    clienteAvulsoNumero,
    setClienteAvulsoNumero,
    formaPagamento,
    setFormaPagamento,
    finalizarVenda
  } = useBrecho()

  const [buscaVenda, setBuscaVenda] = useState('')
  const [categoriaFiltroVenda, setCategoriaFiltroVenda] = useState<number | null>(null)
  const [erroVenda, setErroVenda] = useState('')

  const pecasDisponiveis = produtos.filter(p => p.status === 'disponivel')

  const pecasFiltradas = pecasDisponiveis.filter(p => {
    const q = buscaVenda.toLowerCase().trim()
    const matchTexto =
      !q ||
      p.nome.toLowerCase().includes(q) ||
      p.marca.toLowerCase().includes(q) ||
      p.tamanho.toLowerCase().includes(q)
    const matchCat =
      categoriaFiltroVenda === null || p.categoria_id === categoriaFiltroVenda
    return matchTexto && matchCat
  })

  const pecasNoCarrinho = pecasDisponiveis.filter(p => carrinhoIds.includes(p.id))

  const somaItens = pecasNoCarrinho.reduce(
    (s, p) => s + (precosNegociados[p.id] !== undefined ? precosNegociados[p.id] : p.preco),
    0
  )

  const valorTotalExibido =
    valorFinalNegociado !== null ? valorFinalNegociado : somaItens

  const handleConfirmar = () => {
    setErroVenda('')
    if (pecasNoCarrinho.length === 0) {
      setErroVenda('Faltou escolher pelo menos uma peça para vender.')
      return
    }
    if (modoClienteAtual === 'cadastrado' && !clienteSelecionadoId) {
      setErroVenda('Faltou escolher quem é o cliente na lista.')
      return
    }
    if (modoClienteAtual === 'avulso') {
      if (!clienteAvulsoNome.trim()) {
        setErroVenda('Faltou digitar o nome do cliente.')
        return
      }
      if (!clienteAvulsoNumero.trim()) {
        setErroVenda('Faltou digitar o telefone do cliente.')
        return
      }
    }
    finalizarVenda()
  }

  return (
    <section className="page active">
      <div className="page-head">
        <div>
          <h1>Finalizar Venda</h1>
          <p className="lead">
            Inclua mais peças se precisar, ajuste os valores negociados e confirme o recebimento.
          </p>
        </div>
        <button className="btn secondary" onClick={() => go('produtos')}>
          Voltar para Produtos
        </button>
      </div>

      <div className="sale-layout">
        <div>
          <div className="panel">
            <h2>Quer incluir mais alguma peça na venda?</h2>
            <p style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '-10px', marginBottom: '16px' }}>
              Pesquise abaixo por nome, marca, tamanho ou categoria para adicionar ao pacote do cliente.
            </p>

            {/* Busca de Produtos na Tela de Finalizar Venda */}
            <div className="toolbar" style={{ marginBottom: '18px', background: 'var(--soft2)', boxShadow: 'none' }}>
              <input
                type="text"
                placeholder="Procurar peça por nome, marca ou tamanho..."
                value={buscaVenda}
                onChange={e => setBuscaVenda(e.target.value)}
                style={{ flex: 1, minWidth: '200px' }}
              />
              <select
                value={categoriaFiltroVenda ?? ''}
                onChange={e =>
                  setCategoriaFiltroVenda(e.target.value ? Number(e.target.value) : null)
                }
                style={{ maxWidth: '210px' }}
              >
                <option value="">Todas as categorias</option>
                {categorias.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nome}
                  </option>
                ))}
              </select>
              {(buscaVenda || categoriaFiltroVenda !== null) && (
                <button
                  type="button"
                  className="btn secondary small"
                  onClick={() => {
                    setBuscaVenda('')
                    setCategoriaFiltroVenda(null)
                  }}
                >
                  Limpar
                </button>
              )}
            </div>

            <div className="sale-products">
              {pecasFiltradas.length === 0 ? (
                <div className="empty" style={{ gridColumn: '1 / -1' }}>
                  Nenhuma peça encontrada com essa busca.
                </div>
              ) : (
                pecasFiltradas.map(p => {
                  const jaNoCarrinho = carrinhoIds.includes(p.id)
                  return (
                    <div key={p.id} className={`sale-item ${jaNoCarrinho ? 'selected' : ''}`}>
                      <div>
                        <strong style={{ fontSize: '16px', display: 'block', marginBottom: '3px' }}>{p.nome}</strong>
                        <div className="product-meta" style={{ margin: 0 }}>
                          {obterNomeCategoria(p.categoria_id)} · Tam: <strong>{p.tamanho}</strong>
                        </div>
                        <div style={{ fontWeight: 800, color: 'var(--success)', fontSize: '15px', marginTop: '4px' }}>
                          R$ {p.preco.toFixed(2).replace('.', ',')}
                        </div>
                      </div>
                      <button
                        className={`btn small ${jaNoCarrinho ? 'secondary' : 'success'}`}
                        disabled={jaNoCarrinho}
                        onClick={() => adicionarItemVenda(p.id)}
                      >
                        {jaNoCarrinho ? 'Na Sacola' : 'Incluir'}
                      </button>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>

        <aside className="cart">
          <div className="step-heading">
            <span className="step-badge">1</span>
            <h2 style={{ margin: 0 }}>Peças Escolhidas e Preços</h2>
          </div>
          <p style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '0', marginBottom: '14px' }}>
            Altere o valor de cada peça ou o total final caso tenha negociado um desconto.
          </p>

          <div>
            {!pecasNoCarrinho.length ? (
              <div className="empty">Nenhuma peça escolhida.</div>
            ) : (
              <>
                {pecasNoCarrinho.map(p => {
                  const precoAtual =
                    precosNegociados[p.id] !== undefined ? precosNegociados[p.id] : p.preco
                  return (
                    <div
                      key={p.id}
                      className="cart-row"
                      style={{ flexDirection: 'column', gap: '10px', padding: '14px 0' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <strong style={{ fontSize: '16px' }}>{p.nome}</strong>
                          <div style={{ fontSize: '13px', color: 'var(--muted)' }}>
                            Preço sugerido: R$ {p.preco.toFixed(2).replace('.', ',')}
                          </div>
                        </div>
                        <button
                          type="button"
                          className="btn danger small"
                          onClick={() => removerItemCarrinho(p.id)}
                        >
                          Tirar
                        </button>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', background: 'var(--soft2)', padding: '8px 12px', borderRadius: '10px' }}>
                        <label style={{ margin: 0, fontSize: '14px' }}>
                          Valor negociado da peça (R$):
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.50"
                          value={precoAtual}
                          onChange={e =>
                            alterarPrecoItemCarrinho(p.id, parseFloat(e.target.value) || 0)
                          }
                          style={{ width: '125px', padding: '8px 12px', fontWeight: 800, textAlign: 'right' }}
                        />
                      </div>
                    </div>
                  )
                })}

                <div
                  style={{
                    background: 'var(--success-bg)',
                    padding: '18px',
                    borderRadius: '14px',
                    border: '1.5px solid var(--success-border)',
                    marginTop: '16px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--ink2)', marginBottom: '8px', fontWeight: 600 }}>
                    <span>Soma das peças:</span>
                    <span>R$ {somaItens.toFixed(2).replace('.', ',')}</span>
                  </div>

                  <label style={{ fontSize: '15px', marginBottom: '6px', color: 'var(--success)' }}>
                    Valor Final da Compra (R$):
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.50"
                    value={valorTotalExibido}
                    onChange={e => {
                      const val = parseFloat(e.target.value)
                      setValorFinalNegociado(Number.isFinite(val) && val >= 0 ? val : 0)
                    }}
                    style={{
                      fontSize: '24px',
                      fontWeight: 900,
                      color: 'var(--success)',
                      padding: '10px 14px',
                      borderColor: 'var(--success-border)'
                    }}
                  />
                </div>
              </>
            )}
          </div>

          <div className="customer-box">
            <div className="step-heading">
              <span className="step-badge">2</span>
              <h2 style={{ margin: 0 }}>Quem está comprando?</h2>
            </div>
            <div className="customer-mode">
              <button
                type="button"
                className={`btn small ${modoClienteAtual === 'cadastrado' ? '' : 'secondary'}`}
                onClick={() => {
                  setModoClienteAtual('cadastrado')
                  setErroVenda('')
                }}
              >
                Já tem cadastro
              </button>
              <button
                type="button"
                className={`btn small ${modoClienteAtual === 'avulso' ? '' : 'secondary'}`}
                onClick={() => {
                  setModoClienteAtual('avulso')
                  setErroVenda('')
                }}
              >
                Cliente Novo
              </button>
            </div>

            {modoClienteAtual === 'cadastrado' ? (
              <div>
                <select
                  value={clienteSelecionadoId ?? ''}
                  onChange={e => {
                    setClienteSelecionadoId(e.target.value ? Number(e.target.value) : null)
                    setErroVenda('')
                  }}
                >
                  <option value="">Clique aqui para escolher o cliente...</option>
                  {clientes.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.nome} — {c.telefone}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="customer-choice">
                <div>
                  <label>Nome do Cliente *</label>
                  <input
                    placeholder="Digite o nome"
                    value={clienteAvulsoNome}
                    onChange={e => setClienteAvulsoNome(e.target.value)}
                  />
                </div>
                <div>
                  <label>Telefone *</label>
                  <input
                    placeholder="(11) 99999-9999"
                    value={clienteAvulsoNumero}
                    onChange={e => setClienteAvulsoNumero(formatPhone(e.target.value))}
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="step-heading">
              <span className="step-badge">3</span>
              <h2 style={{ margin: 0 }}>Como vai pagar?</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {(['Pix', 'Dinheiro', 'Cartão'] as const).map(metodo => (
                <button
                  key={metodo}
                  type="button"
                  className={`btn ${formaPagamento === metodo ? '' : 'secondary'}`}
                  onClick={() => setFormaPagamento(metodo)}
                >
                  {metodo}
                </button>
              ))}
            </div>
          </div>

          {erroVenda && <div className="field-error" style={{ marginTop: '14px' }}>{erroVenda}</div>}

          <button
            className="btn success"
            style={{ width: '100%', marginTop: '22px', fontSize: '18px', padding: '16px' }}
            onClick={handleConfirmar}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            Confirmar Venda (R$ {valorTotalExibido.toFixed(2).replace('.', ',')})
          </button>
        </aside>
      </div>
    </section>
  )
}

