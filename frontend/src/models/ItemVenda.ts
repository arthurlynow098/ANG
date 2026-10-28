/**
 * Entidade ITEM_VENDA (Tabela Oficial do DER)
 * Relacionamentos: VENDA (1:N) e PRODUTO (1:0..1)
 */
export interface ItemVenda {
  id: number
  venda_id: number
  produto_id: number
  quantidade: number
  preco_unitario: number
  subtotal: number
}

