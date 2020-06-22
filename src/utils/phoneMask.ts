const phoneMask = (value: string): string => {
  if (value.length > 15) return value.substring(0, value.length - 1)
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/g, '($1) $2')
    .replace(/(\d)(\d{4})$/, '$1-$2')
}

export default phoneMask
