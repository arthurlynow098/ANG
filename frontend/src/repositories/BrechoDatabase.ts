import {
  Cliente,
  Funcionario,
  Venda,
  ItemVenda,
  Pagamento,
  Doacao,
  Categoria,
  Produto,
  Triagem
} from '../types'
import {
  CLIENTES_INICIAIS,
  ATENDENTES_INICIAIS,
  VENDAS_INICIAIS,
  ITENS_VENDA_INICIAIS,
  PAGAMENTOS_INICIAIS,
  DOACOES_INICIAIS,
  CATEGORIAS_INICIAIS,
  PRODUTOS_INICIAIS,
  TRIAGENS_INICIAIS
} from '../data/mockData'

export function gerarSenhaHash(senhaPura: string): string {
  const limpa = senhaPura.trim()
  if (limpa.startsWith('sha256$')) return limpa
  let hash = 0
  for (let i = 0; i < limpa.length; i++) {
    hash = (hash << 5) - hash + limpa.charCodeAt(i)
    hash |= 0
  }
  return `sha256$${Math.abs(hash).toString(16)}_${limpa.length}`
}

export function verificarSenhaHash(senhaDigitada: string, hashArmazenado: string): boolean {
  if (!hashArmazenado) return senhaDigitada === '123456'
  if (!hashArmazenado.startsWith('sha256$')) {
    return senhaDigitada.trim() === hashArmazenado.trim()
  }
  return gerarSenhaHash(senhaDigitada) === hashArmazenado
}

export interface BrechoSchemaStore {
  CLIENTE: Cliente[]
  FUNCIONARIO: Funcionario[]
  CATEGORIA: Categoria[]
  DOACAO: Doacao[]
  PRODUTO: Produto[]
  TRIAGEM: Triagem[]
  VENDA: Venda[]
  ITEM_VENDA: ItemVenda[]
  PAGAMENTO: Pagamento[]
}

const DB_KEY = 'ang_brecho_strict_der_v1'

export class BrechoRepository {
  static carregarBanco(): BrechoSchemaStore {
    const raw = localStorage.getItem(DB_KEY)
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as BrechoSchemaStore
        if (parsed.CLIENTE && parsed.PRODUTO && parsed.TRIAGEM && parsed.DOACAO) {
          return parsed
        }
      } catch {
        // usa seed inicial
      }
    }

    const seed: BrechoSchemaStore = {
      CLIENTE: CLIENTES_INICIAIS,
      FUNCIONARIO: ATENDENTES_INICIAIS.map(f => ({
        ...f,
        senha_hash: gerarSenhaHash(f.senha_hash || '123456')
      })),
      CATEGORIA: CATEGORIAS_INICIAIS,
      DOACAO: DOACOES_INICIAIS,
      PRODUTO: PRODUTOS_INICIAIS,
      TRIAGEM: TRIAGENS_INICIAIS,
      VENDA: VENDAS_INICIAIS,
      ITEM_VENDA: ITENS_VENDA_INICIAIS,
      PAGAMENTO: PAGAMENTOS_INICIAIS
    }

    this.salvarBanco(seed)
    return seed
  }

  static salvarBanco(store: BrechoSchemaStore): void {
    localStorage.setItem(DB_KEY, JSON.stringify(store))
  }
}
