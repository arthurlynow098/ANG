export type {
  Cliente,
  Funcionario,
  Venda,
  ItemVenda,
  Pagamento,
  Doacao,
  Categoria,
  Produto,
  Triagem
} from '../models'

export type PaginaApp =
  | 'inicio'
  | 'triagem'
  | 'clientes'
  | 'cliente-detalhe'
  | 'produtos'
  | 'cadastro-produto'
  | 'nova-venda'
  | 'estoque'
  | 'relatorios'
  | 'atendentes'
