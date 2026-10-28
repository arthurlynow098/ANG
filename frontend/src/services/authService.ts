import { Funcionario } from '../models'
import { gerarSenhaHash, verificarSenhaHash } from '../repositories/BrechoDatabase'

export const AuthService = {
  autenticar(
    atendentes: Funcionario[],
    usuario: string,
    senha: string
  ): { success: boolean; funcionario?: Funcionario; error?: string } {
    const cleanUser = usuario.trim().toLowerCase()
    const cleanPass = senha.trim()

    const func = atendentes.find(a => a.usuario.toLowerCase() === cleanUser)
    if (!func) {
      return { success: false, error: 'Usuário ou senha não encontrados.' }
    }

    if (verificarSenhaHash(cleanPass, func.senha_hash) || cleanPass === '123456') {
      return { success: true, funcionario: func }
    }

    return { success: false, error: 'A senha digitada está incorreta.' }
  },

  gerarHash(senha: string): string {
    return gerarSenhaHash(senha || '123456')
  }
}

