import { Produto, Venda, ItemVenda, Pagamento } from '../models'

export const VendaService = {
  calcularTotais(
    pecasCarrinho: Produto[],
    precosNegociados: Record<number, number>,
    valorFinalNegociado: number | null
  ) {
    const somaOriginal = pecasCarrinho.reduce((s, p) => s + p.preco, 0)
    const somaItens = pecasCarrinho.reduce(
      (s, p) => s + (precosNegociados[p.id] !== undefined ? precosNegociados[p.id] : p.preco),
      0
    )
    const total =
      valorFinalNegociado !== null && Number.isFinite(valorFinalNegociado) && valorFinalNegociado >= 0
        ? valorFinalNegociado
        : somaItens

    return { somaOriginal, somaItens, total }
  },

  gerarEntidadesVenda(params: {
    clienteId: number
    funcionarioId: number
    formaPagamento: string
    pecasCarrinho: Produto[]
    precosNegociados: Record<number, number>
    total: number
  }): {
    novaVenda: Venda
    novosItensVenda: ItemVenda[]
    novoPagamento: Pagamento
    data: string
    vendaId: number
  } {
    const data = new Date().toISOString().slice(0, 10)
    const vendaId = Date.now()

    const novaVenda: Venda = {
      id: vendaId,
      cliente_id: params.clienteId,
      funcionario_id: params.funcionarioId,
      data,
      valor_total: params.total
    }

    const novosItensVenda: ItemVenda[] = params.pecasCarrinho.map((p, idx) => {
      const precoUnit =
        params.precosNegociados[p.id] !== undefined ? params.precosNegociados[p.id] : p.preco
      return {
        id: vendaId + idx + 1,
        venda_id: vendaId,
        produto_id: p.id,
        quantidade: 1,
        preco_unitario: precoUnit,
        subtotal: precoUnit
      }
    })

    const novoPagamento: Pagamento = {
      id: vendaId + 500,
      venda_id: vendaId,
      metodo: params.formaPagamento,
      valor: params.total,
      data
    }

    return { novaVenda, novosItensVenda, novoPagamento, data, vendaId }
  }
}

