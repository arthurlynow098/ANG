/**
 * Entidade TRIAGEM (Tabela Oficial do DER)
 * Relacionamentos: DOACAO (1:N), PRODUTO (1:N), FUNCIONARIO (1:N)
 */
export interface Triagem {
  id: number
  doacao_id: number
  produto_id: number
  funcionario_id: number
  data_triagem: string
  status: string
  observacao: string
}

