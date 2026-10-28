import React from 'react'
import { BrechoProvider, useBrecho } from './context/BrechoContext'
import { Login, Topbar, FeedbackUI } from './components'
import {
  InicioView,
  ClientesView,
  ClienteDetalheView,
  ProdutosView,
  CadastroProdutoView,
  NovaVendaView,
  EstoqueView,
  RelatoriosView,
  AtendentesView,
  TriagemView
} from './views'

const AppMain: React.FC = () => {
  const { usuarioLogado, paginaAtual } = useBrecho()

  if (!usuarioLogado) {
    return <Login />
  }

  return (
    <div className="app">
      <Topbar />
      <FeedbackUI />
      <main className="main">
        {paginaAtual === 'inicio' && <InicioView />}
        {paginaAtual === 'triagem' && <TriagemView />}
        {paginaAtual === 'clientes' && <ClientesView />}
        {paginaAtual === 'cliente-detalhe' && <ClienteDetalheView />}
        {paginaAtual === 'produtos' && <ProdutosView />}
        {paginaAtual === 'cadastro-produto' && <CadastroProdutoView />}
        {paginaAtual === 'nova-venda' && <NovaVendaView />}
        {paginaAtual === 'estoque' && <EstoqueView />}
        {paginaAtual === 'relatorios' && <RelatoriosView />}
        {paginaAtual === 'atendentes' && <AtendentesView />}
      </main>
    </div>
  )
}

export function App() {
  return (
    <BrechoProvider>
      <AppMain />
    </BrechoProvider>
  )
}

export default App
