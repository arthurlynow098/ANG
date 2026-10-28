import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  Cliente,
  Funcionario,
  Produto,
  Categoria,
  Doacao,
  Triagem,
  Venda,
  ItemVenda,
  Pagamento,
  PaginaApp
} from '../types'
import {
  BrechoRepository,
  gerarSenhaHash
} from '../repositories'
import { AuthService, TriagemService, VendaService } from '../services'

export interface NovaPecaDoacaoInput {
  nome: string
  descricao: string
  tamanho: string
  marca: string
  estado: string
}

export interface NotificacaoSistema {
  id: number
  titulo: string
  detalhe?: string
  tipo: 'sucesso' | 'aviso' | 'erro'
}

export interface ResumoVendaConcluida {
  vendaId: number
  clienteNome: string
  atendenteNome: string
  data: string
  metodoPagamento: string
  valorTotal: number
  somaOriginal: number
  itens: {
    id: number
    nome: string
    precoOriginal: number
    precoVendido: number
  }[]
}

interface BrechoContextType {
  usuarioLogado: Funcionario | null
  login: (usuario: string, senha: string) => { success: boolean; error?: string }
  logout: () => void
  paginaAtual: PaginaApp
  go: (pagina: PaginaApp) => void

  // Feedback Visual (Toasts e Comprovante de Venda)
  notificacoes: NotificacaoSistema[]
  mostrarNotificacao: (titulo: string, tipo?: 'sucesso' | 'aviso' | 'erro', detalhe?: string) => void
  fecharNotificacao: (id: number) => void
  resumoUltimaVenda: ResumoVendaConcluida | null
  fecharResumoVenda: () => void

  // As 9 Tabelas Estritas do DER
  categorias: Categoria[]
  doacoes: Doacao[]
  produtos: Produto[]
  triagens: Triagem[]
  clientes: Cliente[]
  atendentes: Funcionario[]
  vendas: Venda[]
  itensVenda: ItemVenda[]
  pagamentos: Pagamento[]

  // Consultas Relacionais (JOINs)
  obterNomeCategoria: (categoria_id: number | null) => string

  // Operações de DOACAO + TRIAGEM + PRODUTO
  receberDoacao: (dados: {
    data_recebimento: string
    origem: string
    observacao: string
    funcionario_id: number
    pecas: NovaPecaDoacaoInput[]
  }) => boolean
  aprovarTriagem: (dados: {
    triagem_id: number
    categoria_id: number
    preco: number
    tamanho: string
    marca: string
    estado: string
    localizacao: string
    observacao: string
  }) => boolean
  reprovarTriagem: (triagem_id: number, observacao: string) => boolean
  reavaliarTriagem: (triagem_id: number) => boolean
  excluirTriagem: (triagem_id: number) => boolean

  // Operações de VENDA + ITEM_VENDA + PAGAMENTO
  carrinhoIds: number[]
  precosNegociados: Record<number, number>
  valorFinalNegociado: number | null
  setValorFinalNegociado: (valor: number | null) => void
  alterarPrecoItemCarrinho: (produtoId: number, novoPreco: number) => void
  modoClienteAtual: 'cadastrado' | 'avulso'
  setModoClienteAtual: (modo: 'cadastrado' | 'avulso') => void
  clienteSelecionadoId: number | null
  setClienteSelecionadoId: (id: number | null) => void
  clienteAvulsoNome: string
  setClienteAvulsoNome: (n: string) => void
  clienteAvulsoNumero: string
  setClienteAvulsoNumero: (num: string) => void
  formaPagamento: string
  setFormaPagamento: (f: string) => void
  filtroProdutoTexto: string
  setFiltroProdutoTexto: (t: string) => void
  filtroProdutoCategoriaId: number | null
  setFiltroProdutoCategoriaId: (id: number | null) => void
  cadastrarProduto: (dados: {
    categoria_id: number
    nome: string
    descricao: string
    tamanho: string
    marca: string
    estado: string
    preco: number
    localizacao: string
  }) => boolean
  abrirVenda: (produtoId: number) => void
  adicionarItemVenda: (produtoId: number) => void
  removerItemCarrinho: (produtoId: number) => void
  finalizarVenda: () => boolean

  // Operações de CLIENTE
  clienteSelecionado: Cliente | null
  abrirCliente: (id: number) => void
  cadastrarCliente: (dados: Omit<Cliente, 'id'>) => boolean
  atualizarCliente: (id: number, dados: Omit<Cliente, 'id'>) => boolean
  excluirCliente: (id: number) => boolean

  // Operações de FUNCIONARIO
  cadastrarAtendente: (dados: Omit<Funcionario, 'id'>) => { success: boolean; message?: string }
  atualizarAtendente: (id: number, dados: Omit<Funcionario, 'id'>) => { success: boolean; message?: string }
  excluirAtendente: (id: number) => { success: boolean; message?: string }
}

const BrechoContext = createContext<BrechoContextType | undefined>(undefined)

export const BrechoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const bancoInicial = BrechoRepository.carregarBanco()

  const [usuarioLogado, setUsuarioLogado] = useState<Funcionario | null>(() => {
    const salvo = localStorage.getItem('brecho_usuario_strict_v1')
    return salvo ? JSON.parse(salvo) : null
  })

  const [paginaAtual, setPaginaAtual] = useState<PaginaApp>('inicio')

  const [categorias] = useState<Categoria[]>(bancoInicial.CATEGORIA)
  const [doacoes, setDoacoes] = useState<Doacao[]>(bancoInicial.DOACAO)
  const [produtos, setProdutos] = useState<Produto[]>(bancoInicial.PRODUTO)
  const [triagens, setTriagens] = useState<Triagem[]>(bancoInicial.TRIAGEM)
  const [clientes, setClientes] = useState<Cliente[]>(bancoInicial.CLIENTE)
  const [atendentes, setAtendentes] = useState<Funcionario[]>(bancoInicial.FUNCIONARIO)
  const [vendas, setVendas] = useState<Venda[]>(bancoInicial.VENDA)
  const [itensVenda, setItensVenda] = useState<ItemVenda[]>(bancoInicial.ITEM_VENDA)
  const [pagamentos, setPagamentos] = useState<Pagamento[]>(bancoInicial.PAGAMENTO)

  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null)
  const [carrinhoIds, setCarrinhoIds] = useState<number[]>([])
  const [precosNegociados, setPrecosNegociados] = useState<Record<number, number>>({})
  const [valorFinalNegociado, setValorFinalNegociado] = useState<number | null>(null)
  const [modoClienteAtual, setModoClienteAtual] = useState<'cadastrado' | 'avulso'>('cadastrado')
  const [clienteSelecionadoId, setClienteSelecionadoId] = useState<number | null>(null)
  const [clienteAvulsoNome, setClienteAvulsoNome] = useState('')
  const [clienteAvulsoNumero, setClienteAvulsoNumero] = useState('')
  const [formaPagamento, setFormaPagamento] = useState<string>('Pix')

  const [filtroProdutoTexto, setFiltroProdutoTexto] = useState('')
  const [filtroProdutoCategoriaId, setFiltroProdutoCategoriaId] = useState<number | null>(null)

  const [notificacoes, setNotificacoes] = useState<NotificacaoSistema[]>([])
  const [resumoUltimaVenda, setResumoUltimaVenda] = useState<ResumoVendaConcluida | null>(null)

  const mostrarNotificacao = (
    titulo: string,
    tipo: 'sucesso' | 'aviso' | 'erro' = 'sucesso',
    detalhe?: string
  ) => {
    const id = Date.now() + Math.floor(Math.random() * 1000)
    setNotificacoes(prev => [...prev, { id, titulo, detalhe, tipo }])
    setTimeout(() => {
      setNotificacoes(prev => prev.filter(n => n.id !== id))
    }, 4500)
  }

  const fecharNotificacao = (id: number) => {
    setNotificacoes(prev => prev.filter(n => n.id !== id))
  }

  const fecharResumoVenda = () => {
    setResumoUltimaVenda(null)
  }

  useEffect(() => {
    if (usuarioLogado) {
      localStorage.setItem('brecho_usuario_strict_v1', JSON.stringify(usuarioLogado))
    } else {
      localStorage.removeItem('brecho_usuario_strict_v1')
    }
  }, [usuarioLogado])

  useEffect(() => {
    BrechoRepository.salvarBanco({
      CLIENTE: clientes,
      FUNCIONARIO: atendentes,
      CATEGORIA: categorias,
      DOACAO: doacoes,
      PRODUTO: produtos,
      TRIAGEM: triagens,
      VENDA: vendas,
      ITEM_VENDA: itensVenda,
      PAGAMENTO: pagamentos
    })
  }, [clientes, atendentes, categorias, doacoes, produtos, triagens, vendas, itensVenda, pagamentos])

  const obterNomeCategoria = (categoria_id: number | null): string => {
    if (categoria_id === null) return 'Sem categoria'
    const c = categorias.find(cat => cat.id === categoria_id)
    return c ? c.nome : 'Sem categoria'
  }

  const login = (u: string, s: string): { success: boolean; error?: string } => {
    const resultado = AuthService.autenticar(atendentes, u, s)
    if (resultado.success && resultado.funcionario) {
      setUsuarioLogado(resultado.funcionario)
      setPaginaAtual('inicio')
      return { success: true }
    }
    return { success: false, error: resultado.error }
  }

  const logout = () => {
    setUsuarioLogado(null)
    setPaginaAtual('inicio')
    setCarrinhoIds([])
    setPrecosNegociados({})
    setValorFinalNegociado(null)
  }

  const go = (pag: PaginaApp) => {
    setPaginaAtual(pag)
    window.scrollTo(0, 0)
  }

  // 1. DOACAO + PRODUTO + TRIAGEM
  const receberDoacao = (dados: {
    data_recebimento: string
    origem: string
    observacao: string
    funcionario_id: number
    pecas: NovaPecaDoacaoInput[]
  }): boolean => {
    if (!dados.origem.trim() || dados.pecas.length === 0) return false

    const { novaDoacao, novosProdutos, novasTriagens } =
      TriagemService.criarRegistrosDoacao(dados)

    setDoacoes(prev => [novaDoacao, ...prev])
    setProdutos(prev => [...novosProdutos, ...prev])
    setTriagens(prev => [...novasTriagens, ...prev])
    mostrarNotificacao(
      'Doação anotada na triagem!',
      'sucesso',
      `${dados.pecas[0]?.nome || 'Peça'} foi enviada para avaliação.`
    )
    return true
  }

  const aprovarTriagem = (dados: {
    triagem_id: number
    categoria_id: number
    preco: number
    tamanho: string
    marca: string
    estado: string
    localizacao: string
    observacao: string
  }): boolean => {
    const triagemAtual = triagens.find(t => t.id === dados.triagem_id)
    if (!triagemAtual) return false

    const prodAlvo = produtos.find(p => p.id === triagemAtual.produto_id)
    const hoje = new Date().toISOString().slice(0, 10)
    const funcId = usuarioLogado?.id || triagemAtual.funcionario_id

    setTriagens(prev =>
      prev.map(t =>
        t.id === dados.triagem_id
          ? {
              ...t,
              funcionario_id: funcId,
              data_triagem: hoje,
              status: 'Aprovado',
              observacao: dados.observacao.trim() || 'Aprovado para venda'
            }
          : t
      )
    )

    setProdutos(prev =>
      prev.map(p =>
        p.id === triagemAtual.produto_id
          ? {
              ...p,
              categoria_id: dados.categoria_id,
              preco: dados.preco,
              tamanho: dados.tamanho.trim() || p.tamanho,
              marca: dados.marca.trim() || p.marca,
              estado: dados.estado,
              localizacao: dados.localizacao.trim() || 'Loja',
              status: 'disponivel'
            }
          : p
      )
    )

    mostrarNotificacao(
      'Peça aprovada e enviada para a loja!',
      'sucesso',
      `${prodAlvo?.nome || 'Peça'} disponível por R$ ${dados.preco.toFixed(2).replace('.', ',')}.`
    )
    return true
  }

  const reprovarTriagem = (triagem_id: number, observacao: string): boolean => {
    const triagemAtual = triagens.find(t => t.id === triagem_id)
    if (!triagemAtual) return false

    const prodAlvo = produtos.find(p => p.id === triagemAtual.produto_id)
    const hoje = new Date().toISOString().slice(0, 10)
    const funcId = usuarioLogado?.id || triagemAtual.funcionario_id

    setTriagens(prev =>
      prev.map(t =>
        t.id === triagem_id
          ? {
              ...t,
              funcionario_id: funcId,
              data_triagem: hoje,
              status: 'Reprovado',
              observacao: observacao.trim()
            }
          : t
      )
    )

    setProdutos(prev =>
      prev.map(p =>
        p.id === triagemAtual.produto_id
          ? {
              ...p,
              status: 'reprovado',
              localizacao: 'Descarte'
            }
          : p
      )
    )

    mostrarNotificacao(
      'Peça descartada na triagem',
      'aviso',
      `${prodAlvo?.nome || 'Peça'} foi marcada como descartada.`
    )
    return true
  }

  const reavaliarTriagem = (triagem_id: number): boolean => {
    const triagemAtual = triagens.find(t => t.id === triagem_id)
    if (!triagemAtual) return false

    const prodAlvo = produtos.find(p => p.id === triagemAtual.produto_id)
    const hoje = new Date().toISOString().slice(0, 10)

    setTriagens(prev =>
      prev.map(t =>
        t.id === triagem_id
          ? {
              ...t,
              data_triagem: hoje,
              status: 'Pendente',
              observacao: 'Em nova avaliação'
            }
          : t
      )
    )

    setProdutos(prev =>
      prev.map(p =>
        p.id === triagemAtual.produto_id
          ? {
              ...p,
              status: 'aguardando_triagem',
              localizacao: 'Mesa de Triagem'
            }
          : p
      )
    )

    mostrarNotificacao(
      'Peça devolvida para avaliação',
      'sucesso',
      `${prodAlvo?.nome || 'Peça'} voltou para a fila de triagem.`
    )
    return true
  }

  const excluirTriagem = (triagem_id: number): boolean => {
    const triagemAtual = triagens.find(t => t.id === triagem_id)
    if (!triagemAtual) return false

    setTriagens(prev => prev.filter(t => t.id !== triagem_id))
    setProdutos(prev => prev.filter(p => p.id !== triagemAtual.produto_id))
    mostrarNotificacao('Registro removido da triagem', 'aviso')
    return true
  }

  const cadastrarProduto = (dados: {
    categoria_id: number
    nome: string
    descricao: string
    tamanho: string
    marca: string
    estado: string
    preco: number
    localizacao: string
  }): boolean => {
    const hoje = new Date().toISOString().slice(0, 10)
    const baseId = Date.now()
    const funcId = usuarioLogado?.id || 1

    const doacaoAuto: Doacao = {
      id: baseId,
      data_recebimento: hoje,
      origem: 'Doação Balcão',
      observacao: 'Entrada direta'
    }

    const novoProduto: Produto = {
      id: baseId + 1,
      categoria_id: dados.categoria_id,
      nome: dados.nome,
      descricao: dados.descricao,
      tamanho: dados.tamanho || 'Único',
      marca: dados.marca || 'Diversos',
      estado: dados.estado || 'Bom',
      preco: dados.preco,
      status: 'disponivel',
      localizacao: dados.localizacao || 'Loja'
    }

    const novaTriagem: Triagem = {
      id: baseId + 2,
      doacao_id: doacaoAuto.id,
      produto_id: novoProduto.id,
      funcionario_id: funcId,
      data_triagem: hoje,
      status: 'Aprovado',
      observacao: 'Aprovado no cadastro'
    }

    setDoacoes(prev => [doacaoAuto, ...prev])
    setProdutos(prev => [novoProduto, ...prev])
    setTriagens(prev => [novaTriagem, ...prev])
    mostrarNotificacao(
      'Produto cadastrado com sucesso!',
      'sucesso',
      `${dados.nome} já está disponível na loja.`
    )
    go('produtos')
    return true
  }

  const abrirVenda = (produtoId: number) => {
    const p = produtos.find(x => x.id === produtoId)
    if (!p || p.status !== 'disponivel') return

    setCarrinhoIds([p.id])
    setPrecosNegociados({ [p.id]: p.preco })
    setValorFinalNegociado(null)
    setModoClienteAtual('cadastrado')
    setClienteSelecionadoId(null)
    setClienteAvulsoNome('')
    setClienteAvulsoNumero('')
    setFormaPagamento('Pix')
    go('nova-venda')
  }

  const adicionarItemVenda = (produtoId: number) => {
    const p = produtos.find(x => x.id === produtoId)
    if (!p || p.status !== 'disponivel') return

    setCarrinhoIds(prev => (prev.includes(produtoId) ? prev : [...prev, produtoId]))
    setPrecosNegociados(prev => ({
      ...prev,
      [produtoId]: prev[produtoId] !== undefined ? prev[produtoId] : p.preco
    }))
    setValorFinalNegociado(null)
    mostrarNotificacao('Peça incluída na venda', 'sucesso', `${p.nome} foi adicionada à lista.`)
  }

  const removerItemCarrinho = (produtoId: number) => {
    const p = produtos.find(x => x.id === produtoId)
    setCarrinhoIds(prev => prev.filter(id => id !== produtoId))
    setPrecosNegociados(prev => {
      const next = { ...prev }
      delete next[produtoId]
      return next
    })
    setValorFinalNegociado(null)
    if (p) {
      mostrarNotificacao('Peça retirada da venda', 'aviso', `${p.nome} foi removida da lista.`)
    }
  }

  const alterarPrecoItemCarrinho = (produtoId: number, novoPreco: number) => {
    const valorSeguro = Number.isFinite(novoPreco) && novoPreco >= 0 ? novoPreco : 0
    setPrecosNegociados(prev => ({
      ...prev,
      [produtoId]: valorSeguro
    }))
    setValorFinalNegociado(null)
  }

  const finalizarVenda = (): boolean => {
    const pecasCarrinho = produtos.filter(
      p => carrinhoIds.includes(p.id) && p.status === 'disponivel'
    )
    if (!pecasCarrinho.length) return false

    let clienteFinalId = clienteSelecionadoId
    let nomeClienteVenda = 'Cliente'

    if (modoClienteAtual === 'cadastrado') {
      if (!clienteFinalId) return false
      const cliEncontrado = clientes.find(c => c.id === clienteFinalId)
      if (cliEncontrado) nomeClienteVenda = cliEncontrado.nome
    } else {
      const nome = clienteAvulsoNome.trim()
      const telefone = clienteAvulsoNumero.trim()
      if (!nome || !telefone) return false

      const novoCliId = Date.now() - 10
      const novoCliente: Cliente = {
        id: novoCliId,
        nome,
        telefone,
        email: '',
        observacoes: ''
      }
      setClientes(prev => [novoCliente, ...prev])
      clienteFinalId = novoCliId
      nomeClienteVenda = nome
    }

    const { somaOriginal, total } = VendaService.calcularTotais(
      pecasCarrinho,
      precosNegociados,
      valorFinalNegociado
    )

    const funcId = usuarioLogado?.id || 2
    const { novaVenda, novosItensVenda, novoPagamento, data, vendaId } =
      VendaService.gerarEntidadesVenda({
        clienteId: clienteFinalId,
        funcionarioId: funcId,
        formaPagamento,
        pecasCarrinho,
        precosNegociados,
        total
      })

    // 4. PRODUTO.status = 'vendido'
    setProdutos(prev =>
      prev.map(p =>
        carrinhoIds.includes(p.id)
          ? { ...p, status: 'vendido', localizacao: 'Vendido' }
          : p
      )
    )

    setVendas(prev => [novaVenda, ...prev])
    setItensVenda(prev => [...novosItensVenda, ...prev])
    setPagamentos(prev => [novoPagamento, ...prev])

    setResumoUltimaVenda({
      vendaId,
      clienteNome: nomeClienteVenda,
      atendenteNome: usuarioLogado?.nome || 'Atendente',
      data,
      metodoPagamento: formaPagamento,
      valorTotal: total,
      somaOriginal,
      itens: pecasCarrinho.map(p => ({
        id: p.id,
        nome: p.nome,
        precoOriginal: p.preco,
        precoVendido: precosNegociados[p.id] !== undefined ? precosNegociados[p.id] : p.preco
      }))
    })

    mostrarNotificacao(
      'Venda realizada com sucesso!',
      'sucesso',
      `Total de R$ ${total.toFixed(2).replace('.', ',')} recebido via ${formaPagamento}.`
    )

    setCarrinhoIds([])
    setPrecosNegociados({})
    setValorFinalNegociado(null)
    setClienteSelecionadoId(null)
    setClienteAvulsoNome('')
    setClienteAvulsoNumero('')
    go('produtos')
    return true
  }

  // CLIENTE { id, nome, telefone, email, observacoes }
  const abrirCliente = (id: number) => {
    const cli = clientes.find(c => c.id === id) || null
    if (cli) {
      setClienteSelecionado(cli)
      go('cliente-detalhe')
    }
  }

  const cadastrarCliente = (dados: Omit<Cliente, 'id'>): boolean => {
    const novoCliente: Cliente = {
      id: Date.now(),
      nome: dados.nome.trim(),
      telefone: dados.telefone.trim(),
      email: dados.email.trim(),
      observacoes: dados.observacoes.trim()
    }
    setClientes(prev => [novoCliente, ...prev])
    mostrarNotificacao(
      'Cliente cadastrado com sucesso!',
      'sucesso',
      `${novoCliente.nome} foi adicionado à lista de clientes.`
    )
    return true
  }

  const atualizarCliente = (id: number, dados: Omit<Cliente, 'id'>): boolean => {
    const atualizado: Cliente = {
      id,
      nome: dados.nome.trim(),
      telefone: dados.telefone.trim(),
      email: dados.email.trim(),
      observacoes: dados.observacoes.trim()
    }
    setClientes(prev => prev.map(c => (c.id === id ? atualizado : c)))
    if (clienteSelecionado?.id === id) {
      setClienteSelecionado(atualizado)
    }
    mostrarNotificacao(
      'Dados do cliente atualizados!',
      'sucesso',
      `As informações de ${atualizado.nome} foram salvas.`
    )
    return true
  }

  const excluirCliente = (id: number): boolean => {
    const cli = clientes.find(c => c.id === id)
    setClientes(prev => prev.filter(c => c.id !== id))
    if (clienteSelecionado?.id === id) {
      setClienteSelecionado(null)
    }
    mostrarNotificacao(
      'Cliente apagado',
      'aviso',
      cli ? `O cadastro de ${cli.nome} foi removido.` : 'O cadastro foi removido.'
    )
    return true
  }

  // FUNCIONARIO { id, nome, cargo, telefone, usuario, senha_hash }
  const cadastrarAtendente = (
    dados: Omit<Funcionario, 'id'>
  ): { success: boolean; message?: string } => {
    const userClean = dados.usuario.trim().toLowerCase()
    if (atendentes.some(a => a.usuario.toLowerCase() === userClean)) {
      return { success: false, message: 'Já existe um funcionário com este usuário.' }
    }

    const novo: Funcionario = {
      id: Date.now(),
      nome: dados.nome.trim(),
      cargo: dados.cargo.trim(),
      telefone: dados.telefone.trim(),
      usuario: userClean,
      senha_hash: gerarSenhaHash(dados.senha_hash || '123456')
    }
    setAtendentes(prev => [...prev, novo])
    mostrarNotificacao(
      'Funcionário cadastrado com sucesso!',
      'sucesso',
      `${novo.nome} (${novo.cargo}) já pode acessar o sistema.`
    )
    return { success: true }
  }

  const atualizarAtendente = (
    id: number,
    dados: Omit<Funcionario, 'id'>
  ): { success: boolean; message?: string } => {
    const userClean = dados.usuario.trim().toLowerCase()
    if (atendentes.some(a => a.id !== id && a.usuario.toLowerCase() === userClean)) {
      return { success: false, message: 'Já existe outro funcionário com este usuário.' }
    }

    const atualizado: Funcionario = {
      id,
      nome: dados.nome.trim(),
      cargo: dados.cargo.trim(),
      telefone: dados.telefone.trim(),
      usuario: userClean,
      senha_hash: gerarSenhaHash(dados.senha_hash || '123456')
    }

    setAtendentes(prev => prev.map(a => (a.id === id ? atualizado : a)))
    mostrarNotificacao(
      'Funcionário atualizado com sucesso!',
      'sucesso',
      `Os dados de ${atualizado.nome} foram salvos.`
    )
    return { success: true }
  }

  const excluirAtendente = (id: number): { success: boolean; message?: string } => {
    const alvo = atendentes.find(a => a.id === id)
    if (!alvo) return { success: false, message: 'Funcionário não encontrado.' }
    if (usuarioLogado && usuarioLogado.id === id) {
      return { success: false, message: 'Você não pode apagar o próprio usuário.' }
    }

    setAtendentes(prev => prev.filter(a => a.id !== id))
    mostrarNotificacao(
      'Funcionário removido',
      'aviso',
      `O acesso de ${alvo.nome} foi removido do sistema.`
    )
    return { success: true }
  }

  return (
    <BrechoContext.Provider
      value={{
        usuarioLogado,
        login,
        logout,
        paginaAtual,
        go,
        notificacoes,
        mostrarNotificacao,
        fecharNotificacao,
        resumoUltimaVenda,
        fecharResumoVenda,
        categorias,
        doacoes,
        produtos,
        triagens,
        clientes,
        atendentes,
        vendas,
        itensVenda,
        pagamentos,
        obterNomeCategoria,
        receberDoacao,
        aprovarTriagem,
        reprovarTriagem,
        reavaliarTriagem,
        excluirTriagem,
        carrinhoIds,
        precosNegociados,
        valorFinalNegociado,
        setValorFinalNegociado,
        alterarPrecoItemCarrinho,
        modoClienteAtual,
        setModoClienteAtual,
        clienteSelecionadoId,
        setClienteSelecionadoId,
        clienteAvulsoNome,
        setClienteAvulsoNome,
        clienteAvulsoNumero,
        setClienteAvulsoNumero,
        formaPagamento,
        setFormaPagamento,
        filtroProdutoTexto,
        setFiltroProdutoTexto,
        filtroProdutoCategoriaId,
        setFiltroProdutoCategoriaId,
        cadastrarProduto,
        abrirVenda,
        adicionarItemVenda,
        removerItemCarrinho,
        finalizarVenda,
        clienteSelecionado,
        abrirCliente,
        cadastrarCliente,
        atualizarCliente,
        excluirCliente,
        cadastrarAtendente,
        atualizarAtendente,
        excluirAtendente
      }}
    >
      {children}
    </BrechoContext.Provider>
  )
}

export const useBrecho = () => {
  const ctx = useContext(BrechoContext)
  if (!ctx) throw new Error('useBrecho must be used within BrechoProvider')
  return ctx
}
