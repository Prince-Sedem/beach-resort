import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { img } from '../config.js'
import { addDays, nightsBetween, today } from '../lib/dates.js'
import { useBooking } from './Booking.jsx'
import { CalendarIcon, CloseIcon, MenuIcon, UsersIcon, WhatsAppIcon } from './Icons.jsx'

const LINKS = [
  { href: '#stay', label: 'Stay' },
  { href: '#experiences', label: 'Experiences' },
  { href: '#dining', label: 'Dining' },
  { href: '#spa', label: 'Spa' },
  { href: '#events', label: 'Weddings & events' },
  { href: '#visit', label: 'Visit' },
]

export function Logo({ light = true }) {
  return (
    <a href="#top" className="flex items-center gap-2.5" aria-label="Marlin Beach Resort, back to top">
      <img src={img('logo.png')} alt="" width="34" height="33" className="h-[33px] w-[34px]" />
      <span className={`flex flex-col leading-none ${light ? 'text-white' : 'text-ink'}`}>
        <span className="font-display text-[22px] tracking-tight">Marlin</span>
        <span className="text-[10.5px] font-semibold uppercase tracking-label opacity-75">Beach Resort</span>
      </span>
    </a>
  )
}

export function Nav() {
  const { openBooking } = useBooking()
  const [solid, setSolid] = useState(false)
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        solid || menu ? 'bg-ink/95 shadow-[0_1px_0_rgba(255,255,255,0.08)] backdrop-blur' : 'bg-transparent'
      }`}
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      <div className="mx-auto flex h-[68px] max-w-page items-center justify-between gap-6 px-4 sm:px-6">
        <Logo />
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-[14.5px] font-medium text-white/85">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition-colors hover:text-lagoon">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => openBooking('room')}
            className="hidden items-center gap-2 rounded-full bg-lantern px-5 py-2.5 text-[14.5px] font-semibold text-ink transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            <WhatsAppIcon size={18} />
            Book now
          </button>
          <button
            type="button"
            className="rounded-full p-2 text-white hover:bg-white/10 lg:hidden"
            aria-expanded={menu}
            aria-controls="mobile-menu"
            aria-label={menu ? 'Close menu' : 'Open menu'}
            onClick={() => setMenu((m) => !m)}
          >
            {menu ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menu && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            className="overflow-hidden border-t border-white/10 lg:hidden"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ul className="flex flex-col px-4 py-3 sm:px-6">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setMenu(false)}
                    className="block py-3 font-display text-[24px] text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pb-2 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setMenu(false)
                    openBooking('room')
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-lantern px-5 py-3 text-[16px] font-semibold text-ink"
                >
                  <WhatsAppIcon size={20} />
                  Book on WhatsApp
                </button>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

const HEADLINE = ['Where', 'the', 'pool', 'meets', 'the', 'Atlantic.']

export function Hero() {
  const { scrollY } = useScroll()
  const imgY = useTransform(scrollY, [0, 700], [0, 120])

  return (
    <section id="top" className="relative overflow-hidden bg-ink text-white">
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <motion.img
          src={img('hero.jpg')}
          alt="The Marlin infinity pool at dusk, its far edge lined up with the ocean horizon"
          className="h-full w-full object-cover object-[50%_60%]"
          initial={{ scale: 1.14 }}
          animate={{ scale: 1.02 }}
          transition={{ duration: 2.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/35 to-ink sm:via-ink/10" />

      <div className="relative mx-auto flex min-h-[640px] max-w-page flex-col justify-end px-4 pb-10 pt-32 sm:min-h-[720px] sm:px-6 md:pb-14">
        <motion.p
          className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px] font-medium text-lagoon"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span>Gomoa Fetteh, Central Region</span>
          <span aria-hidden="true" className="hidden h-px w-8 bg-lagoon/60 sm:block" />
          <span>About an hour from Accra</span>
        </motion.p>

        <h1 className="max-w-[13ch] font-display text-[clamp(3rem,9vw,7.25rem)] leading-[0.95] tracking-[-0.02em]">
          {HEADLINE.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <motion.span
                className="inline-block"
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.35 + i * 0.07, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                {w}
                {i < HEADLINE.length - 1 ? ' ' : ''}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* the horizon line: the one drawn moment of the page */}
        <motion.div
          aria-hidden="true"
          className="mt-8 h-px origin-left bg-gradient-to-r from-lagoon via-white/70 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.9, duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
        />

        <motion.p
          className="mt-6 max-w-[46ch] text-[17px] leading-relaxed text-white/85 md:text-[18px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          An all-inclusive beach resort on Ghana’s central coast. Six room types, five restaurants and bars, a
          spa and a stretch of sand to yourself.
        </motion.p>

        <QuickBook />
      </div>
    </section>
  )
}

function QuickBook() {
  const { openBooking } = useBooking()
  const start = addDays(today(), 7)
  const [checkIn, setCheckIn] = useState(start)
  const [checkOut, setCheckOut] = useState(addDays(start, 2))
  const [adults, setAdults] = useState(2)

  const cell =
    'flex min-w-0 flex-1 flex-col gap-1 rounded-xl px-4 py-3 transition-colors focus-within:bg-white/10 hover:bg-white/[0.07]'
  const input = 'field-dark w-full bg-transparent text-[16px] font-medium text-white focus:outline-none'

  return (
    <motion.form
      className="mt-9 grid grid-cols-2 gap-1 rounded-2xl border border-white/15 bg-ink/55 p-1.5 backdrop-blur-md lg:flex lg:items-stretch"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onSubmit={(e) => {
        e.preventDefault()
        openBooking('room', { checkIn, checkOut, adults })
      }}
    >
      <label htmlFor="qb-in" className={cell}>
        <span className="flex items-center gap-1.5 text-[12.5px] text-white/65">
          <CalendarIcon size={14} /> Check-in
        </span>
        <input
          id="qb-in"
          type="date"
          className={input}
          value={checkIn}
          min={today()}
          onChange={(e) => {
            setCheckIn(e.target.value)
            if (nightsBetween(e.target.value, checkOut) < 1) setCheckOut(addDays(e.target.value, 1))
          }}
        />
      </label>
      <label htmlFor="qb-out" className={cell}>
        <span className="flex items-center gap-1.5 text-[12.5px] text-white/65">
          <CalendarIcon size={14} /> Check-out
        </span>
        <input
          id="qb-out"
          type="date"
          className={input}
          value={checkOut}
          min={addDays(checkIn, 1)}
          onChange={(e) => setCheckOut(e.target.value)}
        />
      </label>
      <label htmlFor="qb-adults" className={`${cell} col-span-2 sm:col-span-1`}>
        <span className="flex items-center gap-1.5 text-[12.5px] text-white/65">
          <UsersIcon size={14} /> Adults
        </span>
        <select id="qb-adults" className={input} value={adults} onChange={(e) => setAdults(Number(e.target.value))}>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n} className="bg-ink">
              {n} {n === 1 ? 'adult' : 'adults'}
            </option>
          ))}
        </select>
      </label>
      <button
        type="submit"
        className="col-span-2 flex items-center justify-center gap-2 rounded-xl bg-lantern px-6 py-4 sm:col-span-1 text-[15.5px] font-semibold text-ink transition-colors hover:bg-[#f5c262] lg:px-8"
      >
        <WhatsAppIcon size={20} />
        Check availability
      </button>
    </motion.form>
  )
}
