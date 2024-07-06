export const centsToBrl = (value: number) => {
  const result = new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(value / 100)
  return result
}