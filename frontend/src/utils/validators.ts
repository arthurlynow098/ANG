/**
 * Utilitários de validação e formatação para o sistema ANG
 */

export function cleanDigits(value: string): string {
  return value.replace(/\D/g, '')
}

/**
 * Formata CPF: 000.000.000-00
 */
export function formatCPF(value: string): string {
  const digits = cleanDigits(value).slice(0, 11)
  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`
}

/**
 * Validação do algoritmo oficial do CPF brasileiro
 */
export function validateCPF(cpf: string): boolean {
  const digits = cleanDigits(cpf)
  if (digits.length !== 11) return false

  // Bloqueia CPFs com todos os dígitos iguais (ex: 111.111.111-11)
  if (/^(\d)\1{10}$/.test(digits)) return false

  // Primeiro dígito verificador
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(digits.charAt(i), 10) * (10 - i)
  }
  let rest = 11 - (sum % 11)
  const dv1 = rest === 10 || rest === 11 ? 0 : rest
  if (dv1 !== parseInt(digits.charAt(9), 10)) return false

  // Segundo dígito verificador
  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(digits.charAt(i), 10) * (11 - i)
  }
  rest = 11 - (sum % 11)
  const dv2 = rest === 10 || rest === 11 ? 0 : rest
  if (dv2 !== parseInt(digits.charAt(10), 10)) return false

  return true
}

/**
 * Formata telefone/celular: (00) 0000-0000 ou (00) 00000-0000
 */
export function formatPhone(value: string): string {
  const digits = cleanDigits(value).slice(0, 11)
  if (digits.length <= 2) return digits.length ? `(${digits}` : ''
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

/**
 * Validação de telefone (10 ou 11 dígitos)
 */
export function validatePhone(phone: string): boolean {
  const digits = cleanDigits(phone)
  return digits.length === 10 || digits.length === 11
}

/**
 * Validação de endereço de e-mail
 */
export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email.trim())
}

