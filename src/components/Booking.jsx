import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ROOMS, SPA, OFFER } from '../data.js'
import { WHATSAPP_NUMBER } from '../config.js'
import { addDays, nightsBetween, today } from '../lib/dates.js'
import { buildMessage, waLink } from '../lib/whatsapp.js'
import { CheckIcon, CloseIcon, CopyIcon, WhatsAppIcon } from './Icons.jsx'

const BookingContext = createContext(null)
export const useBooking = () => useContext(BookingContext)

const firstDay = () => addDays(today(), 7)

const defaults = () => ({
  room: { room: 'Deluxe Room', checkIn: firstDay(), checkOut: addDays(firstDay(), 2), rooms: 1, adults: 2, children: 0, name: '', note: '' },
  package: { package: OFFER.name, checkIn: firstDay(), checkOut: addDays(firstDay(), 1), adults: 2, children: 0, name: '', note: '' },
  table: { venue: 'Any restaurant', date: today(), time: '19:30', people: 2, name: '', note: '' },
  spa: { treatment: SPA.treatments[0].name, duration: 80, date: addDays(today(), 1), time: '10:00', people: 1, name: '', note: '' },
  event: { eventType: 'Wedding', date: addDays(today(), 90), people: 50, name: '', note: '' },
})

const TABS = [
  { id: 'room', label: 'Stay' },
  { id: 'table', label: 'Dine' },
  { id: 'spa', label: 'Spa' },
  { id: 'event', label: 'Events' },
]

const TITLES = {
  room: 'Book a stay',
  package: `Book ${OFFER.name}`,
  table: 'Reserve a table',
  spa: 'Book a spa treatment',
  event: 'Plan an event',
}

export function BookingProvider({ children }) {
  const [open, setOpen] = useState(false)
  const [kind, setKind] = useState('room')
  const [forms, setForms] = useState(defaults)

  const openBooking = useCallback((nextKind = 'room', preset = {}) => {
    setKind(nextKind)
    setForms((f) => ({ ...f, [nextKind]: { ...f[nextKind], ...preset } }))
    setOpen(true)
  }, [])

  const update = useCallback(
    (patch) => setForms((f) => ({ ...f, [kind]: { ...f[kind], ...patch } })),
    [kind],
  )

  const value = useMemo(
    () => ({ open, kind, forms, openBooking, update, setKind, close: () => setOpen(false) }),
    [open, kind, forms, openBooking, update],
  )

  return (
    <BookingContext.Provider value={value}>
      {children}
      <BookingSheet />
    </BookingContext.Provider>
  )
}

/* ---------- form controls ---------- */

const inputCls =
  'field-dark w-full rounded-lg border border-white/15 bg-white/[0.06] px-3 py-2.5 text-[15px] text-white placeholder:text-white/40 transition-colors focus:border-lagoon focus:outline-none'

function Field({ id, label, children, className = '' }) {
  return (
    <label htmlFor={id} className={`flex min-w-0 flex-col gap-1.5 ${className}`}>
      <span className="text-[13px] font-medium text-white/70">{label}</span>
      {children}
    </label>
  )
}

function Counter({ id, label, value, min = 0, max = 20, onChange }) {
  const v = Number(value) || 0
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <span id={`${id}-label`} className="text-[13px] font-medium text-white/70">
        {label}
      </span>
      <div
        role="group"
        aria-labelledby={`${id}-label`}
        className="flex items-center justify-between rounded-lg border border-white/15 bg-white/[0.06] px-1.5 py-1"
      >
        <button
          type="button"
          onClick={() => onChange(Math.max(min, v - 1))}
          disabled={v <= min}
          className="h-8 w-8 rounded-md text-lg text-white/80 hover:bg-white/10 disabled:opacity-30"
          aria-label={`Fewer ${label.toLowerCase()}`}
        >
          −
        </button>
        <output id={id} className="tabular text-[15px] font-semibold text-white" aria-live="polite">
          {v}
        </output>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, v + 1))}
          disabled={v >= max}
          className="h-8 w-8 rounded-md text-lg text-white/80 hover:bg-white/10 disabled:opacity-30"
          aria-label={`More ${label.toLowerCase()}`}
        >
          +
        </button>
      </div>
    </div>
  )
}

function DateRange({ f, update }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Field id="bk-in" label="Check-in">
        <input
          id="bk-in"
          type="date"
          className={inputCls}
          value={f.checkIn}
          min={today()}
          onChange={(e) => {
            const checkIn = e.target.value
            const patch = { checkIn }
            if (nightsBetween(checkIn, f.checkOut) < 1) patch.checkOut = addDays(checkIn, 1)
            update(patch)
          }}
        />
      </Field>
      <Field id="bk-out" label="Check-out">
        <input
          id="bk-out"
          type="date"
          className={inputCls}
          value={f.checkOut}
          min={addDays(f.checkIn, 1)}
          onChange={(e) => update({ checkOut: e.target.value })}
        />
      </Field>
    </div>
  )
}

function Extras({ f, update }) {
  return (
    <>
      <Field id="bk-name" label="Your name">
        <input
          id="bk-name"
          className={inputCls}
          value={f.name}
          autoComplete="name"
          placeholder="So we know who we are talking to"
          onChange={(e) => update({ name: e.target.value })}
        />
      </Field>
      <Field id="bk-note" label="Anything else? (optional)">
        <textarea
          id="bk-note"
          rows={2}
          className={`${inputCls} resize-none`}
          value={f.note}
          placeholder="Airport pick-up, dietary needs, a special occasion…"
          onChange={(e) => update({ note: e.target.value })}
        />
      </Field>
    </>
  )
}

function RoomForm({ f, update }) {
  const room = ROOMS.find((r) => r.name === f.room)
  const nights = nightsBetween(f.checkIn, f.checkOut)
  const estimate = room ? room.price * nights * (Number(f.rooms) || 1) : 0
  return (
    <>
      <Field id="bk-room" label="Room">
        <select id="bk-room" className={inputCls} value={f.room} onChange={(e) => update({ room: e.target.value })}>
          {ROOMS.map((r) => (
            <option key={r.id} value={r.name} className="bg-ink">
              {r.name}, from ${r.price.toLocaleString('en-US')}
            </option>
          ))}
        </select>
      </Field>
      <DateRange f={f} update={update} />
      <div className="grid grid-cols-3 gap-3">
        <Counter id="bk-rooms" label="Rooms" value={f.rooms} min={1} max={10} onChange={(v) => update({ rooms: v })} />
        <Counter id="bk-adults" label="Adults" value={f.adults} min={1} onChange={(v) => update({ adults: v })} />
        <Counter id="bk-kids" label="Children" value={f.children} onChange={(v) => update({ children: v })} />
      </div>
      {room && nights > 0 && (
        <p className="tabular rounded-lg bg-white/[0.06] px-3 py-2 text-[13px] text-white/75">
          {nights} {nights === 1 ? 'night' : 'nights'} from about{' '}
          <span className="font-semibold text-white">${estimate.toLocaleString('en-US')}</span>. The resort confirms
          the final price on WhatsApp.
        </p>
      )}
      <Extras f={f} update={update} />
    </>
  )
}

function PackageForm({ f, update }) {
  return (
    <>
      <p className="text-[14px] text-white/75">
        {OFFER.price} package with full board, local drinks, early check-in and late check-out. Terms apply.
      </p>
      <DateRange f={f} update={update} />
      <div className="grid grid-cols-2 gap-3">
        <Counter id="bk-adults" label="Adults" value={f.adults} min={1} onChange={(v) => update({ adults: v })} />
        <Counter id="bk-kids" label="Children" value={f.children} onChange={(v) => update({ children: v })} />
      </div>
      <Extras f={f} update={update} />
    </>
  )
}

function TableForm({ f, update }) {
  return (
    <>
      <Field id="bk-venue" label="Where">
        <select id="bk-venue" className={inputCls} value={f.venue} onChange={(e) => update({ venue: e.target.value })}>
          {['Any restaurant', 'Kente Grill', 'Garden Restaurant', 'Beachside dining', 'VIP Lounge'].map((v) => (
            <option key={v} className="bg-ink">
              {v}
            </option>
          ))}
        </select>
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field id="bk-date" label="Date">
          <input id="bk-date" type="date" className={inputCls} min={today()} value={f.date} onChange={(e) => update({ date: e.target.value })} />
        </Field>
        <Field id="bk-time" label="Time">
          <input id="bk-time" type="time" className={inputCls} value={f.time} onChange={(e) => update({ time: e.target.value })} />
        </Field>
      </div>
      <Counter id="bk-people" label="Guests" value={f.people} min={1} max={60} onChange={(v) => update({ people: v })} />
      <Extras f={f} update={update} />
    </>
  )
}

function SpaForm({ f, update }) {
  return (
    <>
      <Field id="bk-treat" label="Treatment">
        <select id="bk-treat" className={inputCls} value={f.treatment} onChange={(e) => update({ treatment: e.target.value })}>
          {SPA.treatments.map((t) => (
            <option key={t.name} className="bg-ink">
              {t.name}
            </option>
          ))}
        </select>
      </Field>
      <div className="flex flex-col gap-1.5">
        <span className="text-[13px] font-medium text-white/70">Length</span>
        <div className="grid grid-cols-3 gap-2">
          {SPA.durations.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => update({ duration: d })}
              aria-pressed={f.duration === d}
              className={`tabular rounded-lg border px-3 py-2 text-[14px] transition-colors ${
                f.duration === d ? 'border-lagoon bg-lagoon/15 text-white' : 'border-white/15 text-white/75 hover:border-white/40'
              }`}
            >
              {d} min
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field id="bk-date" label="Date">
          <input id="bk-date" type="date" className={inputCls} min={today()} value={f.date} onChange={(e) => update({ date: e.target.value })} />
        </Field>
        <Field id="bk-time" label="Preferred time">
          <input id="bk-time" type="time" className={inputCls} value={f.time} onChange={(e) => update({ time: e.target.value })} />
        </Field>
      </div>
      <Counter id="bk-people" label="People" value={f.people} min={1} max={10} onChange={(v) => update({ people: v })} />
      <Extras f={f} update={update} />
    </>
  )
}

function EventForm({ f, update }) {
  return (
    <>
      <Field id="bk-type" label="Type of event">
        <select id="bk-type" className={inputCls} value={f.eventType} onChange={(e) => update({ eventType: e.target.value })}>
          {['Wedding', 'Conference', 'Board meeting', 'Birthday or party', 'Church or community programme', 'Other event'].map((v) => (
            <option key={v} className="bg-ink">
              {v}
            </option>
          ))}
        </select>
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field id="bk-date" label="Date">
          <input id="bk-date" type="date" className={inputCls} min={today()} value={f.date} onChange={(e) => update({ date: e.target.value })} />
        </Field>
        <Counter id="bk-people" label="Guests" value={f.people} min={1} max={1000} onChange={(v) => update({ people: v })} />
      </div>
      <Extras f={f} update={update} />
    </>
  )
}

const FORMS = { room: RoomForm, package: PackageForm, table: TableForm, spa: SpaForm, event: EventForm }

/* ---------- the sheet ---------- */

function useDesktop() {
  const q = '(min-width: 768px)'
  const [match, setMatch] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches)
  useEffect(() => {
    const m = window.matchMedia(q)
    const on = () => setMatch(m.matches)
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [])
  return match
}

function BookingSheet() {
  const { open, kind, forms, update, setKind, close } = useBooking()
  const desktop = useDesktop()
  const [copied, setCopied] = useState(false)
  const panelRef = useRef(null)
  const f = forms[kind]
  const message = buildMessage(kind, f)
  const Form = FORMS[kind]

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && close()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => panelRef.current?.focus(), 50)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
      clearTimeout(t)
    }
  }, [open, close])

  useEffect(() => setCopied(false), [message])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)
    } catch {
      const el = document.getElementById('bk-preview')
      if (el) {
        const range = document.createRange()
        range.selectNodeContents(el)
        const sel = window.getSelection()
        sel.removeAllRanges()
        sel.addRange(range)
      }
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-end md:items-stretch">
          <motion.button
            type="button"
            aria-label="Close booking"
            className="absolute inset-0 bg-ink/60 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="bk-title"
            className="relative flex max-h-[92svh] w-full flex-col overflow-hidden rounded-t-2xl bg-ink text-white shadow-2xl outline-none md:max-h-none md:w-[30rem] md:rounded-none"
            initial={desktop ? { x: '100%' } : { y: '100%' }}
            animate={{ x: 0, y: 0 }}
            exit={desktop ? { x: '100%' } : { y: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 320 }}
            style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
          >
            <div className="flex items-start justify-between gap-4 px-5 pb-3 pt-5 md:px-7 md:pt-7">
              <div>
                <h2 id="bk-title" className="font-display text-[28px] leading-tight">
                  {TITLES[kind]}
                </h2>
                <p className="mt-1 text-[14px] text-white/65">
                  Fill this in and WhatsApp opens with your message ready to send.
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                className="-mr-2 rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white"
                aria-label="Close"
              >
                <CloseIcon size={22} />
              </button>
            </div>

            {kind !== 'package' && (
              <div className="px-5 md:px-7" role="tablist" aria-label="What would you like to book?">
                <div className="grid grid-cols-4 gap-1 rounded-xl bg-white/[0.06] p-1">
                  {TABS.map((t) => (
                    <button
                      key={t.id}
                      role="tab"
                      type="button"
                      aria-selected={kind === t.id}
                      onClick={() => setKind(t.id)}
                      className="relative rounded-lg px-2 py-2 text-[14px] font-medium"
                    >
                      {kind === t.id && (
                        <motion.span
                          layoutId="bk-tab"
                          className="absolute inset-0 rounded-lg bg-white"
                          transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                        />
                      )}
                      <span className={`relative ${kind === t.id ? 'text-ink' : 'text-white/75'}`}>{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <form
              className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pb-5 pt-4 md:px-7"
              onSubmit={(e) => e.preventDefault()}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={kind}
                  className="flex flex-col gap-4"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.18 }}
                >
                  <Form f={f} update={update} />
                </motion.div>
              </AnimatePresence>

              <div className="mt-5">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-[13px] font-medium text-white/70">Your message</span>
                  <button
                    type="button"
                    onClick={copy}
                    className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[13px] text-white/70 hover:bg-white/10 hover:text-white"
                  >
                    {copied ? <CheckIcon size={15} /> : <CopyIcon size={15} />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <pre
                  id="bk-preview"
                  className="whitespace-pre-wrap break-words rounded-xl rounded-tl-sm bg-[#DCF8C6] px-4 py-3 font-sans text-[14px] leading-relaxed text-[#111B21]"
                >
                  {message}
                </pre>
              </div>
            </form>

            <div className="border-t border-white/10 px-5 py-4 md:px-7">
              <a
                href={waLink(message)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2.5 rounded-full bg-lantern px-6 py-3.5 text-[16px] font-semibold text-ink transition-transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <WhatsAppIcon size={22} />
                Continue on WhatsApp
              </a>
              <p className="mt-2 text-center text-[12.5px] text-white/55">
                Nothing is sent until you press send in WhatsApp. Number: +{WHATSAPP_NUMBER}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
