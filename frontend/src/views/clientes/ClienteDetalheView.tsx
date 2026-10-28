import React from 'react'
import { useBrecho } from '../../context/BrechoContext'

export const ClienteDetalheView: React.FC = () => {
  const {
    clienteSelecionado,
    vendas,
    itensVenda,
    produtos,
    pagamentos,
    atendentes,
    go
  } = useBrecho()

  if (!clienteSelecionado) {
    return (
      <section className="page active">
        <div className="page-head">
          <div>
            <button className="btn secondary small" onClick={() => go('clientes')}>
              Voltar para clientes
            </button>
            <h1 style={{ marginTop: '16px' }}>Cliente não selecionado</h1>
          </div>
        </div>
      </section>
    )
  }

  // JOIN relacional: VENDA (cliente_id) + ITEM_VENDA + PRODUTO + PAGAMENTO + FUNCIONARIO
  const vendasDoCliente = vendas.filter(v => v.cliente_id === clienteSelecionado.id)
  const totalMovimentado = vendasDoCliente.reduce((acc, v) => acc + v.valor_total, 0)

  return (
    <section className="page active">
      <div className="page-head">
        <div>
          <button className="btn secondary small" onClick={() => go('clientes')}>
            Voltar para clientes
          </button>
          <h1 style={{ marginTop: '16px' }}>{clienteSelecionado.nome}</h1>
          <p className="lead">{clienteSelecionado.telefone}</p>
        </div>
      </div>

      <div className="stats" style={{ gridTemplateColumns: 'repeat(2, 1fr)', maxWidth: '640px' }}>
        <div className="stat">
          <div>
            <div className="stat-label">Compras Realizadas</div>
            <div className="stat-value">{vendasDoCliente.length}</div>
          </div>
        </div>
        <div className="stat">
          <div>
            <div className="stat-label">Valor Total</div>
            <div className="stat-value">
              R$ {totalMovimentado.toFixed(2).replace('.', ',')}
            </div>
          </div>
        </div>
      </div>

      <div className="panel" style={{ marginBottom: '20px' }}>
        <h2>Dados do Cliente</h2>
        <div className="form-grid" style={{ rowGap: '12px' }}>
          <div>
            <div className="stat-label">Telefone</div>
            <div style={{ marginTop: '4px', fontWeight: 600 }}>
              {clienteSelecionado.telefone}
            </div>
          </div>
          <div>
            <div className="stat-label">E-mail</div>
            <div style={{ marginTop: '4px', fontWeight: 600 }}>
              {clienteSelecionado.email || 'Não informado'}
            </div>
          </div>
          {clienteSelecionado.observacoes && (
            <div className="full" style={{ background: 'var(--soft2)', padding: '12px', borderRadius: '4px', border: '1px solid var(--line)' }}>
              <div className="stat-label">Observações</div>
              <div style={{ marginTop: '4px', fontSize: '15px', lineHeight: '1.5' }}>
                {clienteSelecionado.observacoes}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="panel">
        <h2>Compras Realizadas</h2>
        <div className="table-wrap" style={{ border: 0 }}>
          <table style={{ minWidth: '620px' }}>
            <thead>
              <tr>
                <th>Data</th>
                <th>Produtos Comprados</th>
                <th>Atendente</th>
                <th>Forma de Pagamento</th>
                <th>Valor Total</th>
              </tr>
            </thead>
            <tbody>
              {vendasDoCliente.length === 0 ? (
                <tr>
                  <td colSpan={5} className="empty">
                    Nenhuma compra registrada para este cliente até o momento.
                  </td>
                </tr>
              ) : (
                vendasDoCliente.map(v => {
                  const itens = itensVenda.filter(iv => iv.venda_id === v.id)
                  const nomesProdutos = itens
                    .map(iv => {
                      const prod = produtos.find(p => p.id === iv.produto_id)
                      return prod ? prod.nome : `Produto #${iv.produto_id}`
                    })
                    .join(' + ')
                  const pag = pagamentos.find(pg => pg.venda_id === v.id)
                  const func = atendentes.find(f => f.id === v.funcionario_id)

                  return (
                    <tr key={v.id}>
                      <td><strong>{v.data}</strong></td>
                      <td>{nomesProdutos}</td>
                      <td>{func ? func.nome : 'Atendente'}</td>
                      <td><span className="badge">{pag ? pag.metodo : 'Pix'}</span></td>
                      <td><strong>R$ {v.valor_total.toFixed(2).replace('.', ',')}</strong></td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

