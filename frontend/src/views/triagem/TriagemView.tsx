import React, { useState, useMemo } from 'react'
import { useBrecho, NovaPecaDoacaoInput } from '../../context/BrechoContext'
import { Triagem, Produto, Doacao } from '../../types'
import { ESTADOS_CONSERVACAO } from '../../data/mockData'

interface TriagemDetalhada {
  triagem: Triagem
  produto: Produto
  doacao: Doacao
  funcionarioNome: string
}

export const TriagemView: React.FC = () => {
  const {
    usuarioLogado,
    doacoes,
    produtos,
    triagens,
    categorias,
    atendentes,
    obterNomeCategoria,
    receberDoacao,
    aprovarTriagem,
    reprovarTriagem,
    reavaliarTriagem,
    go
  } = useBrecho()

  const [filtroStatus, setFiltroStatus] = useState<string>('')
  const [busca, setBusca] = useState('')

  const [modalDoacaoAberto, setModalDoacaoAberto] = useState(false)
  const [doadorAnonimo, setDoadorAnonimo] = useState(false)
  const [origemDoacao, setOrigemDoacao] = useState('')
  const [nomePeca, setNomePeca] = useState('')
  const [tamanhoPeca, setTamanhoPeca] = useState('M')
  const [marcaPeca, setMarcaPeca] = useState('')
  const [estadoPeca, setEstadoPeca] = useState<string>('Bom')
  const [obsDoacao, setObsDoacao] = useState('')
  const [erroDoacao, setErroDoacao] = useState('')

  const [itemAvaliar, setItemAvaliar] = useState<TriagemDetalhada | null>(null)
  const [categoriaIdTriagem, setCategoriaIdTriagem] = useState<number>(1)
  const [precoTriagem, setPrecoTriagem] = useState<string>('20')
  const [localizacaoTriagem, setLocalizacaoTriagem] = useState<string>('Arara A1')
  const [erroAprovacao, setErroAprovacao] = useState('')

  const [itemReprovar, setItemReprovar] = useState<TriagemDetalhada | null>(null)
  const [motivoReprovacao, setMotivoReprovacao] = useState('')
  const [erroReprovacao, setErroReprovacao] = useState('')

  const listaDetalhada: TriagemDetalhada[] = useMemo(() => {
    return triagens
      .map(t => {
        const produto = produtos.find(p => p.id === t.produto_id)
        const doacao = doacoes.find(d => d.id === t.doacao_id)
        const func = atendentes.find(a => a.id === t.funcionario_id)
        if (!produto || !doacao) return null
        return {
          triagem: t,
          produto,
          doacao,
          funcionarioNome: func ? func.nome : 'Funcionário'
        }
      })
      .filter((x): x is TriagemDetalhada => x !== null)
  }, [triagens, produtos, doacoes, atendentes])

  const filtrados = useMemo(() => {
    const q = busca.toLowerCase().trim()
    return listaDetalhada.filter(item => {
      const matchBusca =
        !q ||
        item.produto.nome.toLowerCase().includes(q) ||
        item.doacao.origem.toLowerCase().includes(q)
      const matchStatus = !filtroStatus || item.triagem.status === filtroStatus
      return matchBusca && matchStatus
    })
  }, [listaDetalhada, busca, filtroStatus])

  const pendentesCount = listaDetalhada.filter(x => x.triagem.status === 'Pendente').length
  const aprovadosCount = listaDetalhada.filter(x => x.triagem.status === 'Aprovado').length
  const reprovadosCount = listaDetalhada.filter(x => x.triagem.status === 'Reprovado').length

  const abrirModalNovaDoacao = () => {
    setDoadorAnonimo(false)
    setOrigemDoacao('')
    setNomePeca('')
    setTamanhoPeca('M')
    setMarcaPeca('')
    setEstadoPeca('Bom')
    setObsDoacao('')
    setErroDoacao('')
    setModalDoacaoAberto(true)
  }

  const handleSalvarDoacao = (e: React.FormEvent) => {
    e.preventDefault()
    setErroDoacao('')

    if (!nomePeca.trim()) {
      setErroDoacao('Faltou digitar o nome da roupa ou produto.')
      return
    }

    const origemFinal = doadorAnonimo ? 'Doador Anônimo' : origemDoacao.trim()
    if (!origemFinal) {
      setErroDoacao('Faltou digitar a origem da doação (ou marque "Doação Anônima").')
      return
    }

    const novaPeca: NovaPecaDoacaoInput = {
      nome: nomePeca.trim(),
      tamanho: tamanhoPeca.trim() || 'Único',
      marca: marcaPeca.trim() || 'Sem marca',
      estado: estadoPeca,
      descricao: obsDoacao.trim()
    }

    receberDoacao({
      data_recebimento: new Date().toISOString().slice(0, 10),
      origem: origemFinal,
      observacao: obsDoacao.trim(),
      funcionario_id: usuarioLogado?.id || 1,
      pecas: [novaPeca]
    })

    setModalDoacaoAberto(false)
  }

  const abrirModalAprovar = (item: TriagemDetalhada) => {
    setItemAvaliar(item)
    setCategoriaIdTriagem(item.produto.categoria_id || categorias[0]?.id || 1)
    setPrecoTriagem(item.produto.preco > 0 ? item.produto.preco.toString() : '25')
    setLocalizacaoTriagem('Arara A1')
    setErroAprovacao('')
  }

  const handleConfirmarAprovacao = (e: React.FormEvent) => {
    e.preventDefault()
    if (!itemAvaliar) return

    const precoNum = Number(precoTriagem.replace(',', '.'))
    if (!precoTriagem.trim() || !Number.isFinite(precoNum) || precoNum < 0) {
      setErroAprovacao('Faltou digitar um preço válido.')
      return
    }

    aprovarTriagem({
      triagem_id: itemAvaliar.triagem.id,
      categoria_id: categoriaIdTriagem,
      preco: precoNum,
      tamanho: itemAvaliar.produto.tamanho || 'Único',
      marca: itemAvaliar.produto.marca || 'Sem marca',
      estado: itemAvaliar.produto.estado,
      localizacao: localizacaoTriagem.trim() || 'Loja',
      observacao: 'Aprovado e liberado para venda'
    })

    setItemAvaliar(null)
  }

  const abrirModalReprovar = (item: TriagemDetalhada) => {
    setItemReprovar(item)
    setMotivoReprovacao('')
    setErroReprovacao('')
  }

  const handleConfirmarReprovacao = (e: React.FormEvent) => {
    e.preventDefault()
    if (!itemReprovar) return
    if (!motivoReprovacao.trim()) {
      setErroReprovacao('Faltou escrever o motivo pelo qual a peça foi descartada.')
      return
    }

    reprovarTriagem(itemReprovar.triagem.id, motivoReprovacao.trim())
    setItemReprovar(null)
  }

  return (
    <section className="page active">
      <div className="page-head">
        <div>
          <h1>Triagem de Doações</h1>
          <p className="lead">
            Anote o que chegou de doação e aprove as peças boas para irem para a venda.
          </p>
        </div>
        <div className="actions">
          <button className="btn success" onClick={abrirModalNovaDoacao}>
            Anotar Nova Doação
          </button>
        </div>
      </div>

      <div className="toolbar" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            className={`btn ${filtroStatus === '' ? '' : 'secondary'}`}
            onClick={() => setFiltroStatus('')}
          >
            Todas ({listaDetalhada.length})
          </button>
          <button
            className={`btn ${filtroStatus === 'Pendente' ? '' : 'secondary'}`}
            onClick={() => setFiltroStatus('Pendente')}
          >
            Para Avaliar ({pendentesCount})
          </button>
          <button
            className={`btn ${filtroStatus === 'Aprovado' ? '' : 'secondary'}`}
            onClick={() => setFiltroStatus('Aprovado')}
          >
            Aprovadas ({aprovadosCount})
          </button>
          <button
            className={`btn ${filtroStatus === 'Reprovado' ? '' : 'secondary'}`}
            onClick={() => setFiltroStatus('Reprovado')}
          >
            Descartadas ({reprovadosCount})
          </button>
        </div>

        <input
          type="text"
          placeholder="Procurar pelo nome da peça..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
          style={{ maxWidth: '300px' }}
        />
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Produto Doado</th>
              <th>Origem e Data</th>
              <th>Situação</th>
              <th>Observação</th>
              <th style={{ textAlign: 'right' }}>O que fazer?</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.length === 0 ? (
              <tr>
                <td colSpan={5} className="empty">
                  Nenhuma doação encontrada aqui.
                </td>
              </tr>
            ) : (
              filtrados.map(item => {
                const { triagem, produto, doacao } = item
                return (
                  <tr key={triagem.id}>
                    <td>
                      <strong style={{ fontSize: '18px' }}>{produto.nome}</strong>
                      <div style={{ color: 'var(--muted)', marginTop: '4px' }}>
                        Tamanho: <strong>{produto.tamanho}</strong> · Marca: <strong>{produto.marca}</strong> · Estado: <strong>{produto.estado}</strong>
                      </div>
                    </td>
                    <td>
                      <strong>{doacao.origem}</strong>
                      <div style={{ color: 'var(--muted)', fontSize: '14px' }}>
                        Data: {doacao.data_recebimento}
                      </div>
                    </td>
                    <td>
                      {triagem.status === 'Pendente' && (
                        <span className="badge-status-pending">Falta Avaliar</span>
                      )}
                      {triagem.status === 'Aprovado' && (
                        <div>
                          <span className="badge-status-approved">Aprovado p/ Venda</span>
                          <div style={{ fontWeight: 800, marginTop: '4px' }}>
                            R$ {produto.preco.toFixed(2).replace('.', ',')} ({obterNomeCategoria(produto.categoria_id)})
                          </div>
                        </div>
                      )}
                      {triagem.status === 'Reprovado' && (
                        <span className="badge-status-rejected">Descartado</span>
                      )}
                    </td>
                    <td style={{ maxWidth: '240px', color: 'var(--muted)' }}>
                      {triagem.observacao}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                        {triagem.status === 'Pendente' && (
                          <>
                            <button
                              className="btn success"
                              onClick={() => abrirModalAprovar(item)}
                            >
                              Aprovar
                            </button>
                            <button
                              className="btn danger"
                              onClick={() => abrirModalReprovar(item)}
                            >
                              Descartar
                            </button>
                          </>
                        )}

                        {triagem.status === 'Aprovado' && (
                          <button
                            className="btn secondary small"
                            onClick={() => go('produtos')}
                          >
                            Ver na Loja
                          </button>
                        )}

                        {triagem.status === 'Reprovado' && (
                          <button
                            className="btn secondary small"
                            onClick={() => reavaliarTriagem(triagem.id)}
                          >
                            Voltar para Avaliação
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {modalDoacaoAberto && (
        <div className="modal-backdrop">
          <div className="modal-content" style={{ maxWidth: '520px' }}>
            <div className="modal-head">
              <h2>Anotar Nova Doação</h2>
              <button className="btn-close" onClick={() => setModalDoacaoAberto(false)} type="button">
                Fechar
              </button>
            </div>
            <form onSubmit={handleSalvarDoacao}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Qual peça ou produto chegou? *</label>
                  <input
                    type="text"
                    placeholder="Ex: Camisa Azul, Vestido Floral..."
                    value={nomePeca}
                    onChange={e => setNomePeca(e.target.value)}
                  />
                </div>

                <div className="form-grid" style={{ marginBottom: '18px' }}>
                  <div>
                    <label>Tamanho</label>
                    <input
                      type="text"
                      placeholder="Ex: P, M, G, 38, Único"
                      value={tamanhoPeca}
                      onChange={e => setTamanhoPeca(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Marca</label>
                    <input
                      type="text"
                      placeholder="Ex: Hering, Sem marca"
                      value={marcaPeca}
                      onChange={e => setMarcaPeca(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Estado da Peça</label>
                  <select
                    value={estadoPeca}
                    onChange={e => setEstadoPeca(e.target.value)}
                  >
                    {ESTADOS_CONSERVACAO.map(est => (
                      <option key={est} value={est}>{est}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group" style={{ background: 'var(--soft2)', padding: '16px', borderRadius: '10px', border: '2px solid var(--line)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <label style={{ margin: 0 }}>Origem da Doação (Quem doou?)</label>
                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', margin: 0, cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={doadorAnonimo}
                        onChange={e => setDoadorAnonimo(e.target.checked)}
                        style={{ width: '20px', height: '20px', margin: 0 }}
                      />
                      Doação Anônima
                    </label>
                  </div>
                  {!doadorAnonimo && (
                    <input
                      type="text"
                      placeholder="Digite o nome de quem doou"
                      value={origemDoacao}
                      onChange={e => setOrigemDoacao(e.target.value)}
                    />
                  )}
                </div>

                <div className="form-group">
                  <label>Observação (Opcional)</label>
                  <input
                    type="text"
                    placeholder="Algum detalhe sobre a doação..."
                    value={obsDoacao}
                    onChange={e => setObsDoacao(e.target.value)}
                  />
                </div>

                {erroDoacao && <div className="field-error">{erroDoacao}</div>}
              </div>

              <div className="modal-footer">
                <button type="button" className="btn secondary" onClick={() => setModalDoacaoAberto(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn success">
                  Salvar Doação
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {itemAvaliar && (
        <div className="modal-backdrop">
          <div className="modal-content" style={{ maxWidth: '460px' }}>
            <div className="modal-head">
              <h2>Aprovar para Venda</h2>
              <button className="btn-close" onClick={() => setItemAvaliar(null)} type="button">
                Fechar
              </button>
            </div>
            <form onSubmit={handleConfirmarAprovacao}>
              <div className="modal-body">
                <p style={{ fontSize: '18px', marginTop: 0 }}>
                  Peça: <strong>{itemAvaliar.produto.nome}</strong>
                </p>

                <div className="form-group">
                  <label>Escolha a Categoria *</label>
                  <select
                    value={categoriaIdTriagem}
                    onChange={e => setCategoriaIdTriagem(Number(e.target.value))}
                  >
                    {categorias.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.nome}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Preço de Venda (em Reais) *</label>
                  <input
                    type="number"
                    step="1"
                    min="0"
                    placeholder="Ex: 25"
                    value={precoTriagem}
                    onChange={e => setPrecoTriagem(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Localização na Loja</label>
                  <input
                    type="text"
                    placeholder="Ex: Arara A1"
                    value={localizacaoTriagem}
                    onChange={e => setLocalizacaoTriagem(e.target.value)}
                  />
                </div>

                {erroAprovacao && <div className="field-error">{erroAprovacao}</div>}
              </div>

              <div className="modal-footer">
                <button type="button" className="btn secondary" onClick={() => setItemAvaliar(null)}>
                  Voltar
                </button>
                <button type="submit" className="btn success">
                  Confirmar e Enviar para Loja
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {itemReprovar && (
        <div className="modal-backdrop">
          <div className="modal-content" style={{ maxWidth: '460px' }}>
            <div className="modal-head">
              <h2>Descartar Peça</h2>
              <button className="btn-close" onClick={() => setItemReprovar(null)} type="button">
                Fechar
              </button>
            </div>
            <form onSubmit={handleConfirmarReprovacao}>
              <div className="modal-body">
                <p style={{ fontSize: '18px', marginTop: 0 }}>
                  Por que a peça <strong>{itemReprovar.produto.nome}</strong> não pode ser vendida?
                </p>
                <textarea
                  rows={3}
                  placeholder="Ex: Está rasgada, manchada ou estragada..."
                  value={motivoReprovacao}
                  onChange={e => setMotivoReprovacao(e.target.value)}
                />
                {erroReprovacao && <div className="field-error">{erroReprovacao}</div>}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn secondary" onClick={() => setItemReprovar(null)}>
                  Voltar
                </button>
                <button type="submit" className="btn danger">
                  Confirmar Descarte
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}

