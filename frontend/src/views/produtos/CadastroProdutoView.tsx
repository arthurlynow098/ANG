import React, { useState } from 'react'
import { useBrecho } from '../../context/BrechoContext'
import { ESTADOS_CONSERVACAO } from '../../data/mockData'

export const CadastroProdutoView: React.FC = () => {
  const { go, categorias, cadastrarProduto } = useBrecho()
  const [nome, setNome] = useState('')
  const [categoriaId, setCategoriaId] = useState<number>(categorias[0]?.id || 1)
  const [tamanho, setTamanho] = useState('M')
  const [marca, setMarca] = useState('')
  const [estado, setEstado] = useState<string>('Bom')
  const [preco, setPreco] = useState('')
  const [localizacao, setLocalizacao] = useState('Arara A1')
  const [descricao, setDescricao] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const sucesso = cadastrarProduto({
      categoria_id: categoriaId,
      nome: nome.trim(),
      descricao: descricao.trim(),
      tamanho: tamanho.trim() || 'Único',
      marca: marca.trim() || 'Sem marca',
      estado,
      preco: Number(preco),
      localizacao: localizacao.trim() || 'Loja'
    })
    if (sucesso) {
      setNome('')
      setPreco('')
      setDescricao('')
    }
  }

  return (
    <section className="page active">
      <div className="page-head">
        <div>
          <h1>Cadastrar Produto</h1>
          <p className="lead">Registre uma nova peça no catálogo.</p>
        </div>
      </div>
      <div className="panel">
        <form onSubmit={handleSubmit} className="form-grid">
          <div>
            <label>Nome do produto *</label>
            <input
              placeholder="Ex: Vestido midi florido"
              value={nome}
              onChange={e => setNome(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Categoria *</label>
            <select
              value={categoriaId}
              onChange={e => setCategoriaId(Number(e.target.value))}
              required
            >
              {categorias.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.nome}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Tamanho *</label>
            <input
              placeholder="P, M, G, 38..."
              value={tamanho}
              onChange={e => setTamanho(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Marca</label>
            <input
              placeholder="Ex: Hering"
              value={marca}
              onChange={e => setMarca(e.target.value)}
            />
          </div>
          <div>
            <label>Estado *</label>
            <select value={estado} onChange={e => setEstado(e.target.value)}>
              {ESTADOS_CONSERVACAO.map(est => (
                <option key={est} value={est}>{est}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Preço de venda (R$) *</label>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="0,00"
              value={preco}
              onChange={e => setPreco(e.target.value)}
              required
            />
          </div>
          <div className="full">
            <label>Localização *</label>
            <input
              placeholder="Ex: Arara A1"
              value={localizacao}
              onChange={e => setLocalizacao(e.target.value)}
              required
            />
          </div>
          <div className="full">
            <label>Descrição</label>
            <textarea
              placeholder="Descrição da peça"
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
            ></textarea>
          </div>
          <div className="actions full">
            <button
              type="button"
              className="btn secondary"
              onClick={() => go('produtos')}
            >
              Cancelar
            </button>
            <button className="btn success">Cadastrar Produto</button>
          </div>
        </form>
      </div>
    </section>
  )
}

