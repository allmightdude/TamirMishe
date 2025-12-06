export const useDate = () => {
  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`)
  const toFaDigits = (s: string) => s.replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)])
  const formatDate = (value: string | number | Date) => {
    const dt = new Date(value)
    const y = dt.getUTCFullYear()
    const m = dt.getUTCMonth() + 1
    const d = dt.getUTCDate()
    const iso = `${y}/${pad(m)}/${pad(d)}`
    return toFaDigits(iso)
  }
  return { formatDate }
}
