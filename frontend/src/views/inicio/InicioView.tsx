import React from 'react'
import { useBrecho } from '../../context/BrechoContext'

export const InicioView: React.FC = () => {
  const { go, usuarioLogado, produtos, clientes, triagens, pagamentos } = useBrecho()

  const pecasDisponiveis = produtos.filter(p => p.status === 'disponivel').length
  const pendentesTriagem = triagens.filter(t => t.status === 'Pendente').length
  const saldoCaixa = pagamentos.reduce((acc, pg) => acc + pg.valor, 0)
  const primeiroNome = usuarioLogado?.nome.split(' ')[0] || 'Equipe'

  return (
    <section className="page active">
      <div className="page-head">
        <div>
          <h1>Bom trabalho, {primeiroNome}!</h1>
          <p className="lead">Escolha uma das opções abaixo para começar o atendimento.</p>
        </div>
        <div className="actions">
          <button className="btn secondary" onClick={() => go('estoque')}>
            Ver Estoque Completo
          </button>
          <button className="btn secondary" onClick={() => go('relatorios')}>
            Ver Resumo do Caixa
          </button>
        </div>
      </div>

      <div className="stats">
        <div className="stat" style={{ borderLeft: '5px solid var(--warning)' }}>
          <div>
            <div className="stat-label">Peças Aguardando Triagem</div>
            <div className="stat-value" style={{ color: 'var(--warning)' }}>{pendentesTriagem}</div>
          </div>
          <div className="stat-icon" style={{ background: 'var(--warning-bg)', color: 'var(--warning)' }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          </div>
        </div>

        <div className="stat" style={{ borderLeft: '5px solid var(--success)' }}>
          <div>
            <div className="stat-label">Peças Prontas na Loja</div>
            <div className="stat-value" style={{ color: 'var(--success)' }}>{pecasDisponiveis}</div>
          </div>
          <div className="stat-icon" style={{ background: 'var(--success-bg)', color: 'var(--success)' }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
        </div>

        <div className="stat" style={{ borderLeft: '5px solid var(--ink)' }}>
          <div>
            <div className="stat-label">Total Recebido em Caixa</div>
            <div className="stat-value">R$ {saldoCaixa.toFixed(2).replace('.', ',')}</div>
          </div>
          <div className="stat-icon" style={{ background: 'var(--soft2)', color: 'var(--ink)' }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="quick">
          <div className="quick-top">
            <div className="quick-icon" style={{ background: 'var(--warning-bg)', color: 'var(--warning)', border: '1px solid var(--warning-border)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              </svg>
            </div>
            <div>
              <h3>1. Receber Doação e Fazer Triagem</h3>
              <p>Anote as doações que chegaram, avalie o estado das peças e defina o preço para irem para a loja.</p>
            </div>
          </div>
          <button className="btn success" style={{ width: '100%' }} onClick={() => go('triagem')}>
            Abrir Triagem ({pendentesTriagem} aguardando avaliação)
          </button>
        </div>

        <div className="quick">
          <div className="quick-top">
            <div className="quick-icon" style={{ background: 'var(--success-bg)', color: 'var(--success)', border: '1px solid var(--success-border)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <div>
              <h3>2. Ver Produtos e Realizar Venda</h3>
              <p>Consulte as roupas disponíveis na loja, negocie valores se precisar e feche a venda para o cliente.</p>
            </div>
          </div>
          <button className="btn" style={{ width: '100%' }} onClick={() => go('produtos')}>
            Ir para Produtos e Vendas ({pecasDisponiveis} peças)
          </button>
        </div>

        <div className="quick">
          <div className="quick-top">
            <div className="quick-icon" style={{ background: 'var(--soft2)', color: 'var(--ink)', border: '1px solid var(--line-strong)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <h3>3. Cadastro de Clientes</h3>
              <p>Cadastre clientes novos, consulte telefones ou veja o histórico de compras ({clientes.length} cadastrados).</p>
            </div>
          </div>
          <button className="btn secondary" style={{ width: '100%' }} onClick={() => go('clientes')}>
            Abrir Lista de Clientes
          </button>
        </div>

        <div className="quick">
          <div className="quick-top">
            <div className="quick-icon" style={{ background: 'var(--soft2)', color: 'var(--ink)', border: '1px solid var(--line-strong)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <h3>4. Equipe de Funcionários</h3>
              <p>Veja ou cadastre as pessoas que trabalham no brechó e têm acesso ao sistema.</p>
            </div>
          </div>
          <button className="btn secondary" style={{ width: '100%' }} onClick={() => go('atendentes')}>
            Gerenciar Funcionários
          </button>
        </div>
      </div>
    </section>
  )
}

