// Small date helpers that work on "YYYY-MM-DD" strings in the guest's local time.

const pad = (n) => String(n).padStart(2, '0')

export const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

export const fromISO = (s) => {
  if (!s) return null
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export const addDays = (s, n) => {
  const d = fromISO(s) || new Date()
  d.setDate(d.getDate() + n)
  return toISO(d)
}

export const today = () => toISO(new Date())

export const nightsBetween = (a, b) => {
  const da = fromISO(a)
  const db = fromISO(b)
  if (!da || !db) return 0
  return Math.max(0, Math.round((db - da) / 86400000))
}

export const prettyDate = (s) => {
  const d = fromISO(s)
  if (!d) return 'not chosen yet'
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
}
