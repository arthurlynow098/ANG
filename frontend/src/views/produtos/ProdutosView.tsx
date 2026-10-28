import React from 'react'
import { useBrecho } from '../../context/BrechoContext'

export const ProdutosView: React.FC = () => {
  const {
    produtos,
    categorias,
    obterNomeCategoria,
    go,
    abrirVenda,
    filtroProdutoTexto,
    setFiltroProdutoTexto,
    filtroProdutoCategoriaId,
    setFiltroProdutoCategoriaId
  } = useBrecho()

  const produtosDisponiveis = produtos.filter(p => p.status === 'disponivel')
  const aguardandoTriagemCount = produtos.filter(p => p.status === 'aguardando_triagem').length

  const produtosFiltrados = produtosDisponiveis.filter(p => {
    const q = filtroProdutoTexto.toLowerCase().trim()
    const matchTexto =
      !q ||
      p.nome.toLowerCase().includes(q) ||
      p.marca.toLowerCase().includes(q) ||
      p.tamanho.toLowerCase().includes(q)
    const matchCat =
      filtroProdutoCategoriaId === null || p.categoria_id === filtroProdutoCategoriaId
    return matchTexto && matchCat
  })

  return (
    <section className="page active">
      <div className="page-head">
        <div>
          <h1>Produtos Disponíveis na Loja</h1>
          <p className="lead">
            Escolha a peça que o cliente quer levar e clique em <strong>Vender esta Peça</strong>.
          </p>
        </div>
        <div className="actions">
          <button className="btn secondary" onClick={() => go('estoque')}>
            Ver Todo o Estoque
          </button>
          {aguardandoTriagemCount > 0 && (
            <button className="btn secondary" onClick={() => go('triagem')}>
              Avaliar Doações ({aguardandoTriagemCount})
            </button>
          )}
          <button className="btn" onClick={() => go('cadastro-produto')}>
            Cadastrar Produto Direto
          </button>
        </div>
      </div>

      <div className="toolbar">
        <input
          placeholder="Procurar roupa pelo nome, marca ou tamanho..."
          value={filtroProdutoTexto}
          onChange={e => setFiltroProdutoTexto(e.target.value)}
          style={{ flex: 1, minWidth: '260px' }}
        />
        <select
          value={filtroProdutoCategoriaId ?? ''}
          onChange={e =>
            setFiltroProdutoCategoriaId(e.target.value ? Number(e.target.value) : null)
          }
          style={{ maxWidth: '260px' }}
        >
          <option value="">Todas as categorias</option>
          {categorias.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.nome}
            </option>
          ))}
        </select>
        {(filtroProdutoTexto || filtroProdutoCategoriaId !== null) && (
          <button
            className="btn secondary"
            onClick={() => {
              setFiltroProdutoTexto('')
              setFiltroProdutoCategoriaId(null)
            }}
          >
            Mostrar Tudo
          </button>
        )}
      </div>

      <div className="product-grid">
        {produtosFiltrados.length === 0 ? (
          <div className="empty" style={{ gridColumn: '1 / -1' }}>
            Nenhum produto encontrado com esses filtros.
          </div>
        ) : (
          produtosFiltrados.map(p => (
            <div key={p.id} className="product-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span className="badge">{obterNomeCategoria(p.categoria_id)}</span>
                  <span className="badge-status-approved">{p.estado}</span>
                </div>

                <div className="product-name">{p.nome}</div>
                {p.descricao && (
                  <p style={{ fontSize: '14px', color: 'var(--muted)', margin: '6px 0 0' }}>
                    {p.descricao}
                  </p>
                )}

                <div className="product-specs">
                  <span className="spec-chip">
                    Tam: <strong>{p.tamanho}</strong>
                  </span>
                  <span className="spec-chip">
                    Marca: <strong>{p.marca}</strong>
                  </span>
                  <span className="spec-chip">
                    Local: <strong>{p.localizacao}</strong>
                  </span>
                </div>
              </div>

              <div>
                <div className="price-box">
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--muted)' }}>
                    Preço sugerido
                  </span>
                  <div className="price" style={{ margin: 0 }}>
                    R$ {p.preco.toFixed(2).replace('.', ',')}
                  </div>
                </div>
                <button
                  className="btn success"
                  style={{ width: '100%' }}
                  onClick={() => abrirVenda(p.id)}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  Vender esta Peça
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}

