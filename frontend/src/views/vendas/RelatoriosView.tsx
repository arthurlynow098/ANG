import React from 'react'
import { useBrecho } from '../../context/BrechoContext'

export const RelatoriosView: React.FC = () => {
  const { produtos, clientes, doacoes, vendas, pagamentos, atendentes } = useBrecho()

  const saldoCaixaUnico = pagamentos.reduce((acc, p) => acc + p.valor, 0)
  const totalPix = pagamentos.filter(p => p.metodo === 'Pix').reduce((a, b) => a + b.valor, 0)
  const totalCartao = pagamentos.filter(p => p.metodo === 'Cartão').reduce((a, b) => a + b.valor, 0)
  const totalDinheiro = pagamentos.filter(p => p.metodo === 'Dinheiro').reduce((a, b) => a + b.valor, 0)

  const pecasDisponiveis = produtos.filter(p => p.status === 'disponivel').length
  const pecasVendidas = produtos.filter(p => p.status === 'vendido').length
  const pecasAguardando = produtos.filter(p => p.status === 'aguardando_triagem').length
  const pecasReprovadas = produtos.filter(p => p.status === 'reprovado').length

  return (
    <section className="page active">
      <div className="page-head">
        <div>
          <h1>Resumo do Brechó</h1>
          <p className="lead">
            Acompanhe o total recebido em vendas e a situação das peças doadas.
          </p>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="panel">
          <h2>Dinheiro em Caixa</h2>
          <div className="cart-row">
            <span>Total Recebido</span>
            <strong style={{ fontSize: '18px', color: 'var(--success)' }}>
              R$ {saldoCaixaUnico.toFixed(2).replace('.', ',')}
            </strong>
          </div>
          <div className="cart-row">
            <span>Pagamentos em Pix</span>
            <strong>R$ {totalPix.toFixed(2).replace('.', ',')}</strong>
          </div>
          <div className="cart-row">
            <span>Pagamentos no Cartão</span>
            <strong>R$ {totalCartao.toFixed(2).replace('.', ',')}</strong>
          </div>
          <div className="cart-row" style={{ borderBottom: 0 }}>
            <span>Pagamentos em Dinheiro</span>
            <strong>R$ {totalDinheiro.toFixed(2).replace('.', ',')}</strong>
          </div>
        </div>

        <div className="panel">
          <h2>Resumo das Peças</h2>
          <div className="cart-row">
            <span>Doações Recebidas</span>
            <strong>{doacoes.length}</strong>
          </div>
          <div className="cart-row">
            <span>Peças Aguardando Triagem</span>
            <strong style={{ color: 'var(--warning)' }}>{pecasAguardando}</strong>
          </div>
          <div className="cart-row">
            <span>Peças Prontas para Venda</span>
            <strong style={{ color: 'var(--success)' }}>{pecasDisponiveis}</strong>
          </div>
          <div className="cart-row" style={{ borderBottom: 0 }}>
            <span>Peças Vendidas / Descartadas</span>
            <strong>{pecasVendidas} vendidas · {pecasReprovadas} descartadas</strong>
          </div>
        </div>

        <div className="panel" style={{ gridColumn: '1 / -1' }}>
          <h2>Últimas Vendas Realizadas</h2>
          <div className="table-wrap" style={{ border: 0 }}>
            <table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Cliente</th>
                  <th>Atendente</th>
                  <th>Pagamento</th>
                  <th>Valor Total</th>
                </tr>
              </thead>
              <tbody>
                {vendas.map(v => {
                  const cli = clientes.find(c => c.id === v.cliente_id)
                  const func = atendentes.find(a => a.id === v.funcionario_id)
                  const pag = pagamentos.find(pg => pg.venda_id === v.id)
                  return (
                    <tr key={v.id}>
                      <td>{v.data}</td>
                      <td><strong>{cli ? cli.nome : 'Cliente'}</strong></td>
                      <td>{func ? func.nome : 'Atendente'}</td>
                      <td><span className="badge">{pag ? pag.metodo : 'Pix'}</span></td>
                      <td><strong>R$ {v.valor_total.toFixed(2).replace('.', ',')}</strong></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

