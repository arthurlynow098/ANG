import React, { useState } from 'react'
import { useBrecho } from '../context/BrechoContext'

export const Login: React.FC = () => {
  const { login } = useBrecho()
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErro('')
    const res = login(usuario, senha)
    if (!res.success) {
      setErro(res.error || 'Usuário ou senha inválidos.')
    }
  }

  const preencherDemo = (u: string) => {
    setUsuario(u)
    setSenha('123456')
    setErro('')
  }

  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="brand-header">
          <div className="brand-mark">ANG</div>
          <div>
            <div className="brand">O Brechó</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--success)' }}>
              Projeto Solidário ANG
            </div>
          </div>
        </div>
        <p className="subtitle">
          Digite seu usuário e senha para entrar no sistema de doações e vendas.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Usuário</label>
            <input
              placeholder="Ex: admin ou atendente"
              value={usuario}
              onChange={e => setUsuario(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              required
            />
          </div>
          <button className="btn success" style={{ width: '100%', marginTop: '8px', padding: '15px' }}>
            Entrar no Sistema
          </button>
          {erro && <div className="error" style={{ marginTop: '12px' }}>{erro}</div>}
        </form>

        <div className="footer-note" style={{ borderTop: '1px solid var(--line)', paddingTop: '18px', marginTop: '24px' }}>
          <p style={{ margin: '0 0 10px', fontSize: '14px', fontWeight: 700, color: 'var(--ink2)' }}>
            Acesso rápido de demonstração:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <button
              type="button"
              className="btn secondary small"
              onClick={() => preencherDemo('admin')}
            >
              Administrador
            </button>
            <button
              type="button"
              className="btn secondary small"
              onClick={() => preencherDemo('atendente')}
            >
              Atendente
            </button>
          </div>
          <p style={{ margin: '10px 0 0', fontSize: '12px', color: 'var(--muted)', textAlign: 'center' }}>
            Senha padrão: <strong>123456</strong>
          </p>
        </div>
      </div>
    </div>
  )
}
