export const formatToPrint = (date: Date, options?: Intl.DateTimeFormatOptions) => {
  const result = new Date(date).toLocaleDateString('pt-br', options)
  return result
}