import {
  Cliente,
  Funcionario,
  Categoria,
  Doacao,
  Produto,
  Triagem,
  Venda,
  ItemVenda,
  Pagamento
} from '../types'

// 1. CATEGORIA { id, nome, descricao }
export const CATEGORIAS_INICIAIS: Categoria[] = [
  { id: 1, nome: 'Vestidos', descricao: 'Vestidos curtos, midi, longos e macaquinhos' },
  { id: 2, nome: 'Camisa masculina', descricao: 'Camisas sociais, polos e camisetas masculinas' },
  { id: 3, nome: 'Camisa feminina', descricao: 'Blusas, camisas e regatas femininas' },
  { id: 4, nome: 'Shorts e Calças', descricao: 'Bermudas, shorts, calças jeans e alfaiataria' },
  { id: 5, nome: 'Roupa de academia', descricao: 'Conjuntos esportivos, leggings e tops' },
  { id: 6, nome: 'Calçados', descricao: 'Tênis, sapatos, sandálias e botas' }
]

export const ESTADOS_CONSERVACAO = ['Novo', 'Bom', 'Regular', 'Para reparo'] as const

// 2. FUNCIONARIO { id, nome, cargo, telefone, usuario, senha_hash }
export const ATENDENTES_INICIAIS: Funcionario[] = [
  {
    id: 1,
    nome: 'Mariana Gestora',
    cargo: 'Administrador',
    telefone: '(11) 98765-4321',
    usuario: 'admin',
    senha_hash: '123456'
  },
  {
    id: 2,
    nome: 'João Atendente',
    cargo: 'Atendente',
    telefone: '(11) 97654-3210',
    usuario: 'atendente',
    senha_hash: '123456'
  },
  {
    id: 3,
    nome: 'Clara Triadora',
    cargo: 'Responsável pela Triagem',
    telefone: '(11) 96543-2109',
    usuario: 'clara',
    senha_hash: '123456'
  }
]

// 3. DOACAO { id, data_recebimento, origem, observacao }
export const DOACOES_INICIAIS: Doacao[] = [
  {
    id: 101,
    data_recebimento: '2026-10-20',
    origem: 'Paróquia Santa Rita',
    observacao: 'Sacola grande com peças femininas e masculinas higienizadas.'
  },
  {
    id: 102,
    data_recebimento: '2026-10-22',
    origem: 'Doador Anônimo',
    observacao: 'Entregue na recepção no período da manhã.'
  },
  {
    id: 103,
    data_recebimento: '2026-10-26',
    origem: 'Fernanda Lima',
    observacao: 'Doação de calçados e roupas esportivas.'
  },
  {
    id: 104,
    data_recebimento: '2026-10-27',
    origem: 'Condomínio Jardim das Flores',
    observacao: 'Lote recém-chegado aguardando avaliação.'
  }
]

// 4. PRODUTO { id, categoria_id, nome, descricao, tamanho, marca, estado, preco, status, localizacao }
export const PRODUTOS_INICIAIS: Produto[] = [
  {
    id: 1,
    categoria_id: 1,
    nome: 'Vestido Floral Midi',
    descricao: 'Vestido em viscose estampada.',
    tamanho: 'M',
    marca: 'Farm',
    estado: 'Novo',
    preco: 35,
    status: 'disponivel',
    localizacao: 'Arara A1'
  },
  {
    id: 2,
    categoria_id: 2,
    nome: 'Camisa Social Azul',
    descricao: 'Camisa 100% algodão manga longa.',
    tamanho: 'G',
    marca: 'Dudalina',
    estado: 'Bom',
    preco: 25,
    status: 'disponivel',
    localizacao: 'Arara B1'
  },
  {
    id: 3,
    categoria_id: 3,
    nome: 'Blusa Feminina Linho',
    descricao: 'Blusa básica em linho.',
    tamanho: 'P',
    marca: 'Hering',
    estado: 'Bom',
    preco: 20,
    status: 'disponivel',
    localizacao: 'Arara A2'
  },
  {
    id: 4,
    categoria_id: 4,
    nome: 'Short Esportivo',
    descricao: 'Short leve para caminhada.',
    tamanho: 'G',
    marca: 'Nike',
    estado: 'Bom',
    preco: 18,
    status: 'disponivel',
    localizacao: 'Estante C1'
  },
  {
    id: 5,
    categoria_id: 5,
    nome: 'Conjunto Academia',
    descricao: 'Top e Legging.',
    tamanho: 'M',
    marca: 'Lupo',
    estado: 'Novo',
    preco: 30,
    status: 'disponivel',
    localizacao: 'Estante C2'
  },
  {
    id: 6,
    categoria_id: 1,
    nome: 'Macaquinho Preto',
    descricao: 'Peça única casual.',
    tamanho: 'P',
    marca: 'Zara',
    estado: 'Bom',
    preco: 28,
    status: 'disponivel',
    localizacao: 'Arara A1'
  },
  {
    id: 7,
    categoria_id: null,
    nome: 'Jaqueta Jeans',
    descricao: 'Jaqueta jeans clara sem avarias.',
    tamanho: 'G',
    marca: 'Levi',
    estado: 'Bom',
    preco: 0,
    status: 'aguardando_triagem',
    localizacao: 'Mesa de Triagem'
  },
  {
    id: 8,
    categoria_id: null,
    nome: 'Tênis Casual Branco',
    descricao: 'Conferir estado da palmilha.',
    tamanho: '37',
    marca: 'All Star',
    estado: 'Regular',
    preco: 0,
    status: 'aguardando_triagem',
    localizacao: 'Mesa de Triagem'
  },
  {
    id: 9,
    categoria_id: null,
    nome: 'Vestido Longo Verde',
    descricao: 'Tecido acetinado.',
    tamanho: 'M',
    marca: 'Shoulder',
    estado: 'Novo',
    preco: 0,
    status: 'aguardando_triagem',
    localizacao: 'Mesa de Triagem'
  },
  {
    id: 10,
    categoria_id: null,
    nome: 'Suéter de Lã Cinza',
    descricao: 'Rasgos grandes na manga.',
    tamanho: 'M',
    marca: 'Renner',
    estado: 'Para reparo',
    preco: 0,
    status: 'reprovado',
    localizacao: 'Descarte'
  },
  {
    id: 11,
    categoria_id: 1,
    nome: 'Vestido Estampado Primavera',
    descricao: 'Peça vendida.',
    tamanho: 'M',
    marca: 'C&A',
    estado: 'Bom',
    preco: 35,
    status: 'vendido',
    localizacao: 'Vendido'
  },
  {
    id: 12,
    categoria_id: 2,
    nome: 'Camisa Polo Marinho',
    descricao: 'Peça vendida.',
    tamanho: 'G',
    marca: 'Lacoste',
    estado: 'Bom',
    preco: 25,
    status: 'vendido',
    localizacao: 'Vendido'
  }
]

// 5. TRIAGEM { id, doacao_id, produto_id, funcionario_id, data_triagem, status, observacao }
export const TRIAGENS_INICIAIS: Triagem[] = [
  {
    id: 1,
    doacao_id: 101,
    produto_id: 1,
    funcionario_id: 3,
    data_triagem: '2026-10-20',
    status: 'Aprovado',
    observacao: 'Peça impecável, classificada em Vestidos.'
  },
  {
    id: 2,
    doacao_id: 101,
    produto_id: 2,
    funcionario_id: 3,
    data_triagem: '2026-10-20',
    status: 'Aprovado',
    observacao: 'Botões e gola em ótimo estado.'
  },
  {
    id: 3,
    doacao_id: 101,
    produto_id: 3,
    funcionario_id: 1,
    data_triagem: '2026-10-21',
    status: 'Aprovado',
    observacao: 'Higienizada e pronta para venda.'
  },
  {
    id: 4,
    doacao_id: 102,
    produto_id: 4,
    funcionario_id: 3,
    data_triagem: '2026-10-22',
    status: 'Aprovado',
    observacao: 'Elástico conservado.'
  },
  {
    id: 5,
    doacao_id: 102,
    produto_id: 5,
    funcionario_id: 3,
    data_triagem: '2026-10-22',
    status: 'Aprovado',
    observacao: 'Conjunto novo.'
  },
  {
    id: 6,
    doacao_id: 103,
    produto_id: 6,
    funcionario_id: 1,
    data_triagem: '2026-10-26',
    status: 'Aprovado',
    observacao: 'Liberada para catálogo.'
  },
  {
    id: 7,
    doacao_id: 103,
    produto_id: 7,
    funcionario_id: 3,
    data_triagem: '2026-10-26',
    status: 'Pendente',
    observacao: 'Aguardando definição de categoria e preço.'
  },
  {
    id: 8,
    doacao_id: 103,
    produto_id: 8,
    funcionario_id: 3,
    data_triagem: '2026-10-26',
    status: 'Pendente',
    observacao: 'Verificar limpeza da sola.'
  },
  {
    id: 9,
    doacao_id: 104,
    produto_id: 9,
    funcionario_id: 1,
    data_triagem: '2026-10-27',
    status: 'Pendente',
    observacao: 'Aguardando avaliação.'
  },
  {
    id: 10,
    doacao_id: 102,
    produto_id: 10,
    funcionario_id: 3,
    data_triagem: '2026-10-22',
    status: 'Reprovado',
    observacao: 'Rasgos extensos na manga.'
  },
  {
    id: 11,
    doacao_id: 101,
    produto_id: 11,
    funcionario_id: 1,
    data_triagem: '2026-10-20',
    status: 'Aprovado',
    observacao: 'Aprovado e vendido.'
  },
  {
    id: 12,
    doacao_id: 101,
    produto_id: 12,
    funcionario_id: 1,
    data_triagem: '2026-10-20',
    status: 'Aprovado',
    observacao: 'Aprovado e vendido.'
  }
]

// 6. CLIENTE { id, nome, telefone, email, observacoes }
export const CLIENTES_INICIAIS: Cliente[] = [
  {
    id: 1,
    nome: 'Mariana Silva',
    telefone: '(11) 99999-1001',
    email: 'mariana.silva@email.com',
    observacoes: 'Prefere vestidos tamanho M.'
  },
  {
    id: 2,
    nome: 'Lucas Almeida',
    telefone: '(11) 98888-2030',
    email: 'lucas.almeida@email.com',
    observacoes: 'Procura camisas masculinas tamanho G.'
  },
  {
    id: 3,
    nome: 'Ana Costa',
    telefone: '(11) 97777-3040',
    email: 'ana.costa@email.com',
    observacoes: 'Cliente frequente.'
  },
  {
    id: 4,
    nome: 'Beatriz Santos',
    telefone: '(11) 96666-4012',
    email: 'beatriz.santos@email.com',
    observacoes: 'Interesse em roupas esportivas.'
  }
]

// 7. VENDA { id, cliente_id, funcionario_id, data, valor_total }
export const VENDAS_INICIAIS: Venda[] = [
  {
    id: 501,
    cliente_id: 1,
    funcionario_id: 2,
    data: '2026-10-21',
    valor_total: 35
  },
  {
    id: 502,
    cliente_id: 2,
    funcionario_id: 2,
    data: '2026-10-23',
    valor_total: 25
  }
]

// 8. ITEM_VENDA { id, venda_id, produto_id, quantidade, preco_unitario, subtotal }
export const ITENS_VENDA_INICIAIS: ItemVenda[] = [
  {
    id: 1,
    venda_id: 501,
    produto_id: 11,
    quantidade: 1,
    preco_unitario: 35,
    subtotal: 35
  },
  {
    id: 2,
    venda_id: 502,
    produto_id: 12,
    quantidade: 1,
    preco_unitario: 25,
    subtotal: 25
  }
]

// 9. PAGAMENTO { id, venda_id, metodo, valor, data }
export const PAGAMENTOS_INICIAIS: Pagamento[] = [
  {
    id: 1,
    venda_id: 501,
    metodo: 'Pix',
    valor: 35,
    data: '2026-10-21'
  },
  {
    id: 2,
    venda_id: 502,
    metodo: 'Cartão',
    valor: 25,
    data: '2026-10-23'
  }
]
