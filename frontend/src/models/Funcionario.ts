/**
 * Entidade FUNCIONARIO (Tabela Oficial do DER)
 */
export interface Funcionario {
  id: number
  nome: string
  cargo: string
  telefone: string
  usuario: string
  senha_hash: string
}

