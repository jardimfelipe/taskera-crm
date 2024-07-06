export const formatToPrint = (date: Date) => {
  const result = new Date(date).toLocaleDateString('pt-br')
  return result
}