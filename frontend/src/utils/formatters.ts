/**
 * Formata um valor numérico para moeda Real (R$ 0,00)
 */
export function formatCurrency(valor: number): string {
  const num = Number.isFinite(valor) ? valor : 0
  return `R$ ${num.toFixed(2).replace('.', ',')}`
}

/**
 * Formata uma data ISO (YYYY-MM-DD) para DD/MM/AAAA
 */
export function formatDateBR(isoDate: string): string {
  if (!isoDate || !isoDate.includes('-')) return isoDate
  const [ano, mes, dia] = isoDate.split('-')
  if (!ano || !mes || !dia) return isoDate
  return `${dia}/${mes}/${ano}`
}

