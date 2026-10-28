/**
 * Entidade VENDA (Tabela Oficial do DER)
 * Relacionamentos: CLIENTE (1:N) e FUNCIONARIO (1:N)
 */
export interface Venda {
  id: number
  cliente_id: number
  funcionario_id: number
  data: string
  valor_total: number
}

