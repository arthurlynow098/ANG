/**
 * Entidade PRODUTO (Tabela Oficial do DER)
 * Relacionamento: CATEGORIA (0..1:N)
 */
export interface Produto {
  id: number
  categoria_id: number | null
  nome: string
  descricao: string
  tamanho: string
  marca: string
  estado: string
  preco: number
  status: string
  localizacao: string
}

