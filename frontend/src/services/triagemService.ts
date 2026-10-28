import { Doacao, Produto, Triagem } from '../models'

export interface NovaPecaDoacaoDTO {
  nome: string
  descricao: string
  tamanho: string
  marca: string
  estado: string
}

export const TriagemService = {
  criarRegistrosDoacao(dados: {
    data_recebimento: string
    origem: string
    observacao: string
    funcionario_id: number
    pecas: NovaPecaDoacaoDTO[]
  }): {
    novaDoacao: Doacao
    novosProdutos: Produto[]
    novasTriagens: Triagem[]
  } {
    const baseId = Date.now()
    const novaDoacao: Doacao = {
      id: baseId,
      data_recebimento: dados.data_recebimento,
      origem: dados.origem.trim(),
      observacao: dados.observacao.trim()
    }

    const novosProdutos: Produto[] = []
    const novasTriagens: Triagem[] = []

    dados.pecas.forEach((p, idx) => {
      const prodId = baseId + idx + 1
      const triagemId = baseId + 100 + idx + 1

      novosProdutos.push({
        id: prodId,
        categoria_id: null,
        nome: p.nome.trim(),
        descricao: p.descricao.trim(),
        tamanho: p.tamanho.trim() || 'Único',
        marca: p.marca.trim() || 'Sem marca',
        estado: p.estado,
        preco: 0,
        status: 'aguardando_triagem',
        localizacao: 'Mesa de Triagem'
      })

      novasTriagens.push({
        id: triagemId,
        doacao_id: novaDoacao.id,
        produto_id: prodId,
        funcionario_id: dados.funcionario_id,
        data_triagem: dados.data_recebimento,
        status: 'Pendente',
        observacao: dados.observacao.trim() || 'Aguardando avaliação'
      })
    })

    return { novaDoacao, novosProdutos, novasTriagens }
  }
}

