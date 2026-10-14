import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CONTACT, WHATSAPP_NUMBER, img } from '../config.js'
import { buildMessage, waLink } from '../lib/whatsapp.js'
import { useBooking } from './Booking.jsx'
import { Logo } from './Header.jsx'
import { ArrowIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from './Icons.jsx'

export function Visit() {
  const { openBooking } = useBooking()
  return (
    <section id="visit" className="relative overflow-hidden bg-ink text-white">
      <img
        src={img('aerial.jpg')}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/60" />
      <div className="relative mx-auto grid max-w-page gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-2">
        <div className="min-w-0">
          <h2 className="font-display text-[clamp(2.4rem,5vw,3.75rem)] leading-[1.02]">Getting here</h2>
          <p className="mt-4 max-w-[42ch] text-[17px] leading-relaxed text-white/75">
            Marlin is in Gomoa Fetteh, about an hour’s drive west of Accra. Ask us about airport pick-up when you book.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={CONTACT.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-[15px] font-semibold transition-colors hover:border-white hover:bg-white hover:text-ink"
            >
              <PinIcon size={18} />
              Open in Google Maps
              <ArrowIcon size={16} />
            </a>
            <button
              type="button"
              onClick={() => openBooking('room')}
              className="inline-flex items-center gap-2 rounded-full bg-lantern px-5 py-2.5 text-[15px] font-semibold text-ink transition-transform hover:-translate-y-0.5"
            >
              <WhatsAppIcon size={18} />
              Book your stay
            </button>
          </div>
        </div>

        <dl className="grid min-w-0 gap-8 sm:grid-cols-2">
          <div className="flex min-w-0 flex-col gap-2">
            <dt className="flex items-center gap-2 text-[13.5px] text-lagoon">
              <PinIcon size={16} /> Address
            </dt>
            <dd className="text-[16px] leading-relaxed text-white/90">
              Marlin Resort
              {CONTACT.addressLines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </dd>
          </div>
          <div className="flex min-w-0 flex-col gap-2">
            <dt className="flex items-center gap-2 text-[13.5px] text-lagoon">
              <WhatsAppIcon size={16} /> WhatsApp
            </dt>
            <dd className="text-[16px] text-white/90">
              <a
                href={waLink(buildMessage('general', {}))}
                target="_blank"
                rel="noopener noreferrer"
                className="tabular select-all underline decoration-white/30 underline-offset-4 hover:decoration-white"
              >
                +{WHATSAPP_NUMBER.replace(/^(\d{3})(\d{2})(\d{3})(\d{4})$/, '$1 $2 $3 $4')}
              </a>
            </dd>
          </div>
          <div className="flex min-w-0 flex-col gap-2">
            <dt className="flex items-center gap-2 text-[13.5px] text-lagoon">
              <PhoneIcon size={16} /> Phone
            </dt>
            <dd className="tabular flex flex-col gap-1 text-[16px] text-white/90">
              {CONTACT.phones.map((p) => (
                <a key={p} href={`tel:+233${p.replace(/\s/g, '').slice(1)}`} className="select-all hover:text-lagoon">
                  {p}
                </a>
              ))}
            </dd>
          </div>
          <div className="flex min-w-0 flex-col gap-2">
            <dt className="flex items-center gap-2 text-[13.5px] text-lagoon">
              <MailIcon size={16} /> Email
            </dt>
            <dd className="min-w-0 break-words text-[16px] text-white/90">
              <a href={`mailto:${CONTACT.email}`} className="select-all hover:text-lagoon">
                {CONTACT.email}
              </a>
            </dd>
          </div>
          <div className="flex min-w-0 flex-col gap-2 sm:col-span-2">
            <dt className="text-[13.5px] text-lagoon">House rules</dt>
            <dd className="text-[16px] leading-relaxed text-white/90">
              Check-in from 2 pm. Check-out by 11 am. All rooms are non-smoking.
            </dd>
          </div>
        </dl>
      </div>
    </section>
  )
}

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-white/10 bg-ink text-white/70">
      <div className="mx-auto flex max-w-page flex-col gap-8 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <Logo />
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[14.5px]">
            {[
              ['#stay', 'Rooms'],
              ['#dining', 'Dining'],
              ['#spa', 'Spa'],
              ['#events', 'Weddings & events'],
              ['#visit', 'Contact'],
            ].map(([h, l]) => (
              <li key={h}>
                <a href={h} className="hover:text-white">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="tabular text-[13.5px]">© {year} Marlin Resort. All rights reserved.</p>
      </div>
    </footer>
  )
}

// Floating WhatsApp button, shown once the visitor scrolls past the hero.
export function FloatingWhatsApp() {
  const { openBooking, open } = useBooking()
  const [show, setShow] = useState(false)
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <AnimatePresence>
      {show && !open && (
        <motion.button
          type="button"
          onClick={() => openBooking('room')}
          className="fixed bottom-5 right-4 z-30 flex items-center gap-2 rounded-full bg-[#25D366] py-3 pl-3.5 pr-5 text-[15px] font-semibold text-[#06351B] shadow-[0_10px_30px_-8px_rgba(15,34,56,0.55)] sm:right-6"
          style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          whileHover={{ y: -2 }}
          aria-label="Book on WhatsApp"
        >
          <WhatsAppIcon size={24} />
          <span>Book on WhatsApp</span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
