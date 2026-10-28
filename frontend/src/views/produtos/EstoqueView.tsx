import React, { useState } from 'react'
import { useBrecho } from '../../context/BrechoContext'

export const EstoqueView: React.FC = () => {
  const { produtos, obterNomeCategoria, go } = useBrecho()
  const [filtroStatus, setFiltroStatus] = useState<string>('')

  const filtrados = produtos.filter(
    p => !filtroStatus || p.status === filtroStatus
  )

  return (
    <section className="page active">
      <div className="page-head">
        <div>
          <h1>Estoque de Peças</h1>
          <p className="lead">
            Veja todas as peças que estão na loja, na triagem ou que já foram vendidas.
          </p>
        </div>
        <div className="actions">
          <select
            value={filtroStatus}
            onChange={e => setFiltroStatus(e.target.value)}
            style={{ width: '240px' }}
          >
            <option value="">Mostrar todas as peças</option>
            <option value="disponivel">Prontas para Venda</option>
            <option value="aguardando_triagem">Aguardando Triagem</option>
            <option value="vendido">Já Vendidas</option>
            <option value="reprovado">Descartadas</option>
          </select>
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Nome da Peça</th>
              <th>Categoria</th>
              <th>Tamanho, Marca e Estado</th>
              <th>Localização</th>
              <th>Preço</th>
              <th>Situação</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map(p => (
              <tr key={p.id}>
                <td><strong>{p.nome}</strong></td>
                <td>{p.categoria_id ? <span className="badge">{obterNomeCategoria(p.categoria_id)}</span> : 'Falta escolher'}</td>
                <td>
                  Tam: {p.tamanho} · {p.marca} · {p.estado}
                </td>
                <td>{p.localizacao}</td>
                <td>
                  {p.preco > 0 ? `R$ ${p.preco.toFixed(2).replace('.', ',')}` : '—'}
                </td>
                <td>
                  {p.status === 'disponivel' && (
                    <span className="badge-status-approved">Pronta para Venda</span>
                  )}
                  {p.status === 'aguardando_triagem' && (
                    <span
                      className="badge-status-pending"
                      style={{ cursor: 'pointer' }}
                      onClick={() => go('triagem')}
                    >
                      Aguardando Triagem
                    </span>
                  )}
                  {p.status === 'vendido' && (
                    <span className="badge">Vendida</span>
                  )}
                  {p.status === 'reprovado' && (
                    <span className="badge-status-rejected">Descartada</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

