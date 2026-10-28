import React from 'react'
import { useBrecho } from '../context/BrechoContext'

export const FeedbackUI: React.FC = () => {
  const {
    notificacoes,
    fecharNotificacao,
    resumoUltimaVenda,
    fecharResumoVenda,
    go
  } = useBrecho()

  return (
    <>
      {/* Toasts Flutuantes de Feedback */}
      {notificacoes.length > 0 && (
        <div className="toast-container" aria-live="polite">
          {notificacoes.map(n => (
            <div key={n.id} className={`toast-card toast-${n.tipo}`}>
              <div className="toast-icon" aria-hidden="true">
                {n.tipo === 'sucesso' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                )}
                {n.tipo === 'aviso' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                )}
                {n.tipo === 'erro' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                )}
              </div>
              <div className="toast-content">
                <div className="toast-title">{n.titulo}</div>
                {n.detalhe && <div className="toast-detail">{n.detalhe}</div>}
              </div>
              <button
                type="button"
                className="toast-close"
                onClick={() => fecharNotificacao(n.id)}
                aria-label="Fechar aviso"
              >
                Fechar
              </button>
              <div className="toast-progress" />
            </div>
          ))}
        </div>
      )}

      {/* Modal Elegante de Comprovante de Venda Realizada */}
      {resumoUltimaVenda && (
        <div className="modal-backdrop">
          <div className="modal-content" style={{ maxWidth: '500px' }}>
            <div className="modal-body" style={{ textAlign: 'center', padding: '28px 24px 20px' }}>
              <div className="sale-success-badge">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>

              <h2 style={{ fontSize: '24px', marginBottom: '6px', color: 'var(--ink)' }}>
                Venda Confirmada com Sucesso!
              </h2>
              <p style={{ color: 'var(--muted)', margin: '0 0 20px', fontSize: '15px' }}>
                O pagamento foi registrado no caixa e as peças deram saída do estoque.
              </p>

              <div className="receipt-box">
                <div className="receipt-row">
                  <span>Cliente</span>
                  <strong>{resumoUltimaVenda.clienteNome}</strong>
                </div>
                <div className="receipt-row">
                  <span>Atendente</span>
                  <strong>{resumoUltimaVenda.atendenteNome}</strong>
                </div>
                <div className="receipt-row">
                  <span>Forma de Pagamento</span>
                  <span className="badge">{resumoUltimaVenda.metodoPagamento}</span>
                </div>
                <div className="receipt-row">
                  <span>Data</span>
                  <strong>{resumoUltimaVenda.data}</strong>
                </div>

                <div className="receipt-divider" />

                <div style={{ textAlign: 'left', marginBottom: '10px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Peças Vendidas ({resumoUltimaVenda.itens.length})
                  </div>
                  {resumoUltimaVenda.itens.map(item => {
                    const teveDescontoItem = item.precoVendido !== item.precoOriginal
                    return (
                      <div key={item.id} className="receipt-item">
                        <span>{item.nome}</span>
                        <div>
                          {teveDescontoItem && (
                            <span style={{ textDecoration: 'line-through', color: 'var(--muted)', fontSize: '13px', marginRight: '8px' }}>
                              R$ {item.precoOriginal.toFixed(2).replace('.', ',')}
                            </span>
                          )}
                          <strong>R$ {item.precoVendido.toFixed(2).replace('.', ',')}</strong>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="receipt-total-box">
                  <span>Valor Total Pago</span>
                  <strong>R$ {resumoUltimaVenda.valorTotal.toFixed(2).replace('.', ',')}</strong>
                </div>
              </div>
            </div>

            <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
              <button
                type="button"
                className="btn secondary"
                onClick={() => {
                  fecharResumoVenda()
                  go('relatorios')
                }}
              >
                Ver Caixa
              </button>
              <button
                type="button"
                className="btn success"
                onClick={fecharResumoVenda}
              >
                Pronto, Continuar Vendendo
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

