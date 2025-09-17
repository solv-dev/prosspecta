export function formatPhoneNumber(phone: string): string {
  const phoneWithCode = `55${phone}`
  const cleaned = phoneWithCode.replace(/\D/g, '')

  const countryCode = cleaned.slice(0, 2)
  const areaCode = cleaned.slice(2, 4)
  const ninthDigit = cleaned.slice(4, 5)
  const firstPart = cleaned.slice(5, 9)
  const secondPart = cleaned.slice(9, 13)

  return `+${countryCode} (${areaCode}) ${ninthDigit} ${firstPart}-${secondPart}`
}
