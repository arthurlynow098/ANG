import React from 'react'
import { useBrecho } from '../context/BrechoContext'

export const Topbar: React.FC = () => {
  const { usuarioLogado, logout, paginaAtual, go, triagens } = useBrecho()

  if (!usuarioLogado) return null

  const pendenciasTriagem = triagens.filter(t => t.status === 'Pendente').length
  const inicialNome = usuarioLogado.nome.trim().charAt(0).toUpperCase() || 'A'

  return (
    <header className="topbar">
      <div className="logo-wrap" onClick={() => go('inicio')} title="Voltar ao Início">
        <div className="logo-badge">ANG</div>
        <div>
          <div className="logo">O Brechó</div>
          <span className="logo-sub">Gestão Solidária</span>
        </div>
      </div>

      <nav className="nav">
        <button
          className={paginaAtual === 'inicio' || paginaAtual === 'atendentes' || paginaAtual === 'relatorios' ? 'active' : ''}
          onClick={() => go('inicio')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span>Início</span>
        </button>

        <button
          className={paginaAtual === 'triagem' ? 'active' : ''}
          onClick={() => go('triagem')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
          <span>Triagem</span>
          {pendenciasTriagem > 0 && (
            <span className="badge-pill-alert">
              {pendenciasTriagem}
            </span>
          )}
        </button>

        <button
          className={paginaAtual === 'produtos' || paginaAtual === 'nova-venda' || paginaAtual === 'estoque' || paginaAtual === 'cadastro-produto' ? 'active' : ''}
          onClick={() => go('produtos')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <span>Produtos e Vendas</span>
        </button>

        <button
          className={paginaAtual === 'clientes' || paginaAtual === 'cliente-detalhe' ? 'active' : ''}
          onClick={() => go('clientes')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <span>Clientes</span>
        </button>
      </nav>

      <div className="user-area">
        <div className="user-pill">
          <div className="user-avatar">{inicialNome}</div>
          <div>
            <strong style={{ display: 'block', lineHeight: 1.2 }}>{usuarioLogado.nome.split(' ')[0]}</strong>
            <span className="user-role">{usuarioLogado.cargo}</span>
          </div>
        </div>
        <button className="btn secondary small" onClick={logout}>
          Sair
        </button>
      </div>
    </header>
  )
}
