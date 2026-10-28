import React, { useState } from 'react'
import { useBrecho } from '../../context/BrechoContext'
import { Funcionario } from '../../types'
import { formatPhone, validatePhone } from '../../utils/validators'

export const AtendentesView: React.FC = () => {
  const {
    usuarioLogado,
    atendentes,
    cadastrarAtendente,
    atualizarAtendente,
    excluirAtendente
  } = useBrecho()

  const isAdmin = usuarioLogado?.cargo === 'Administrador'

  const [modalFormAberto, setModalFormAberto] = useState(false)
  const [atendenteEmEdicao, setAtendenteEmEdicao] = useState<Funcionario | null>(null)
  const [atendenteParaExcluir, setAtendenteParaExcluir] = useState<Funcionario | null>(null)

  // Campos estritos da tabela FUNCIONARIO { id, nome, cargo, telefone, usuario, senha_hash }
  const [nome, setNome] = useState('')
  const [cargo, setCargo] = useState('Atendente')
  const [telefone, setTelefone] = useState('')
  const [usuario, setUsuario] = useState('')
  const [senhaHash, setSenhaHash] = useState('')
  const [erroForm, setErroForm] = useState('')

  const handleNovo = () => {
    setAtendenteEmEdicao(null)
    setNome('')
    setCargo('Atendente')
    setTelefone('')
    setUsuario('')
    setSenhaHash('123456')
    setErroForm('')
    setModalFormAberto(true)
  }

  const handleEditar = (a: Funcionario) => {
    setAtendenteEmEdicao(a)
    setNome(a.nome)
    setCargo(a.cargo)
    setTelefone(a.telefone)
    setUsuario(a.usuario)
    setSenhaHash('123456')
    setErroForm('')
    setModalFormAberto(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErroForm('')

    if (!nome.trim()) {
      setErroForm('Faltou digitar o nome do funcionário.')
      return
    }
    if (!usuario.trim() || /\s/.test(usuario.trim())) {
      setErroForm('Faltou digitar o nome de usuário (sem espaços).')
      return
    }
    if (!telefone.trim() || !validatePhone(telefone)) {
      setErroForm('Faltou digitar o telefone completo com DDD.')
      return
    }
    if (!senhaHash.trim()) {
      setErroForm('Faltou digitar uma senha para entrar no sistema.')
      return
    }

    const dados = {
      nome: nome.trim(),
      cargo,
      telefone: telefone.trim(),
      usuario: usuario.trim().toLowerCase(),
      senha_hash: senhaHash.trim()
    }

    if (atendenteEmEdicao) {
      const res = atualizarAtendente(atendenteEmEdicao.id, dados)
      if (!res.success) {
        setErroForm(res.message || 'Não foi possível salvar.')
        return
      }
    } else {
      const res = cadastrarAtendente(dados)
      if (!res.success) {
        setErroForm(res.message || 'Não foi possível cadastrar.')
        return
      }
    }

    setModalFormAberto(false)
  }

  return (
    <section className="page active">
      <div className="page-head">
        <div>
          <h1>Equipe de Funcionários</h1>
          <p className="lead">
            Pessoas que trabalham no brechó e têm acesso ao sistema.
          </p>
        </div>
        {isAdmin && (
          <div className="actions">
            <button className="btn success" onClick={handleNovo}>
              Cadastrar Funcionário
            </button>
          </div>
        )}
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Cargo</th>
              <th>Telefone</th>
              <th>Usuário</th>
              {isAdmin && <th style={{ textAlign: 'right' }}>Opções</th>}
            </tr>
          </thead>
          <tbody>
            {atendentes.map(a => {
              const isSelf = usuarioLogado?.id === a.id
              return (
                <tr key={a.id}>
                  <td>
                    <strong style={{ fontSize: '18px' }}>{a.nome}</strong>
                  </td>
                  <td>
                    <span className="badge">{a.cargo}</span>
                  </td>
                  <td>{a.telefone}</td>
                  <td>{a.usuario}</td>
                  {isAdmin && (
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '8px' }}>
                        <button
                          className="btn secondary small"
                          onClick={() => handleEditar(a)}
                        >
                          Editar
                        </button>
                        {!isSelf && (
                          <button
                            className="btn danger small"
                            onClick={() => setAtendenteParaExcluir(a)}
                          >
                            Apagar
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {atendenteParaExcluir && (
        <div className="modal-backdrop">
          <div className="modal-content" style={{ maxWidth: '420px' }}>
            <div className="modal-head">
              <h2>Apagar Funcionário?</h2>
              <button className="btn-close" onClick={() => setAtendenteParaExcluir(null)} type="button">
                Fechar
              </button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: '18px' }}>
                Tem certeza que quer apagar o acesso de <strong>{atendenteParaExcluir.nome}</strong>?
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn secondary" onClick={() => setAtendenteParaExcluir(null)}>
                Não, Voltar
              </button>
              <button
                type="button"
                className="btn danger"
                onClick={() => {
                  excluirAtendente(atendenteParaExcluir.id)
                  setAtendenteParaExcluir(null)
                }}
              >
                Sim, Apagar
              </button>
            </div>
          </div>
        </div>
      )}

      {modalFormAberto && (
        <div className="modal-backdrop">
          <div className="modal-content" style={{ maxWidth: '520px' }}>
            <div className="modal-head">
              <h2>{atendenteEmEdicao ? 'Editar Funcionário' : 'Novo Funcionário'}</h2>
              <button className="btn-close" onClick={() => setModalFormAberto(false)} type="button">
                Fechar
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Nome *</label>
                  <input
                    placeholder="Ex: João da Silva"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                  />
                </div>

                <div className="form-grid" style={{ marginBottom: '16px' }}>
                  <div>
                    <label>Cargo *</label>
                    <select value={cargo} onChange={e => setCargo(e.target.value)}>
                      <option value="Atendente">Atendente</option>
                      <option value="Responsável pela Triagem">Responsável pela Triagem</option>
                      <option value="Administrador">Administrador</option>
                    </select>
                  </div>
                  <div>
                    <label>Telefone *</label>
                    <input
                      placeholder="(11) 99999-9999"
                      value={telefone}
                      onChange={e => setTelefone(formatPhone(e.target.value))}
                    />
                  </div>
                </div>

                <div className="form-grid">
                  <div>
                    <label>Usuário (para entrar) *</label>
                    <input
                      placeholder="Ex: joao"
                      value={usuario}
                      onChange={e => setUsuario(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Senha *</label>
                    <input
                      type="password"
                      placeholder="Digite a senha"
                      value={senhaHash}
                      onChange={e => setSenhaHash(e.target.value)}
                    />
                  </div>
                </div>

                {erroForm && <div className="field-error">{erroForm}</div>}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn secondary" onClick={() => setModalFormAberto(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn success">
                  Salvar Funcionário
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}

