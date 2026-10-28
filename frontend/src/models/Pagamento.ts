/**
 * Entidade PAGAMENTO (Tabela Oficial do DER)
 * Relacionamento: VENDA (1:1)
 */
export interface Pagamento {
  id: number
  venda_id: number
  metodo: string
  valor: number
  data: string
}

