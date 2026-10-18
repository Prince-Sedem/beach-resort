import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CONTACT, img } from '../config.js'
import { DINING, EVENTS, EXPERIENCES, SPA } from '../data.js'
import { useBooking } from './Booking.jsx'
import { ArrowIcon, ClockIcon, WhatsAppIcon } from './Icons.jsx'

/* ---------- Experiences: pick an activity, the panel changes ---------- */

export function Experiences() {
  const [active, setActive] = useState(EXPERIENCES[0].id)
  const current = EXPERIENCES.find((e) => e.id === active)

  return (
    <section id="experiences" className="bg-ink text-white">
      <div className="mx-auto grid max-w-page gap-10 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
        <div className="min-w-0">
          <h2 className="font-display text-[clamp(2.4rem,5vw,3.75rem)] leading-[1.02]">Days at Marlin</h2>
          <p className="mt-4 max-w-[40ch] text-[17px] leading-relaxed text-white/70">
            Stay a week and it feels like a day. Choose an activity to see what it’s like.
          </p>
          <ul className="mt-10 flex flex-col" role="tablist" aria-label="Activities">
            {EXPERIENCES.map((e) => {
              const on = e.id === active
              return (
                <li key={e.id} className="border-t border-white/12 last:border-b">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-controls="exp-panel"
                    onClick={() => setActive(e.id)}
                    onMouseEnter={() => setActive(e.id)}
                    className="group flex w-full items-center justify-between gap-4 py-4 text-left"
                  >
                    <span
                      className={`font-display text-[clamp(1.45rem,2.6vw,1.9rem)] leading-tight transition-colors ${
                        on ? 'text-white' : 'text-white/45 group-hover:text-white/80'
                      }`}
                    >
                      {e.name}
                    </span>
                    <motion.span
                      aria-hidden="true"
                      className="h-px bg-lagoon"
                      animate={{ width: on ? 48 : 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        <div id="exp-panel" role="tabpanel" className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <div className="relative aspect-[4/5] max-w-full overflow-hidden rounded-[28px] bg-deep sm:aspect-[5/4] lg:aspect-[4/5]">
            <AnimatePresence initial={false}>
              <motion.div
                key={current.id}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {current.photo ? (
                  <img src={img(current.photo)} alt={current.name} className="h-full w-full object-cover" />
                ) : (
                  <Tide />
                )}
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.id}
                className="absolute inset-x-0 bottom-0 p-6 sm:p-8"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-display text-[30px] leading-tight">{current.name}</h3>
                <p className="mt-2 max-w-[44ch] text-[16px] leading-relaxed text-white/85">{current.text}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

// Quiet animated water for activities without a photo yet.
function Tide() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-b from-deep to-ink">
      {[0, 1, 2, 3].map((i) => (
        <motion.svg
          key={i}
          viewBox="0 0 800 80"
          preserveAspectRatio="none"
          className="absolute left-0 h-16 w-[200%]"
          style={{ top: `${30 + i * 12}%`, opacity: 0.12 + i * 0.08 }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 14 + i * 4, repeat: Infinity, ease: 'linear' }}
          aria-hidden="true"
        >
          <path
            d="M0 40 Q 50 10 100 40 T 200 40 T 300 40 T 400 40 T 500 40 T 600 40 T 700 40 T 800 40"
            fill="none"
            stroke="#8FD6E4"
            strokeWidth="2"
          />
        </motion.svg>
      ))}
    </div>
  )
}

/* ---------- Dining ---------- */

export function Dining() {
  const { openBooking } = useBooking()
  return (
    <section id="dining" className="bg-salt">
      <div className="mx-auto max-w-page px-4 py-20 sm:px-6 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div className="flex min-w-0 flex-col">
            <h2 className="font-display text-[clamp(2.4rem,5vw,3.75rem)] leading-[1.02] text-ink">
              Five places to eat and drink
            </h2>
            <p className="mt-4 max-w-[42ch] text-[17px] leading-relaxed text-mist">
              Grilled seafood at the Kente Grill, long lunches in the garden and dinner on the sand under the lights.
              Each has its own setting, so you can eat somewhere different every day of your stay.
            </p>

            <dl className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
              {DINING.meals.map((m) => (
                <div key={m.name} className="flex items-baseline justify-between gap-4 py-3.5">
                  <dt className="text-[16px] font-medium text-ink">{m.name}</dt>
                  <dd className="tabular text-[15.5px] text-mist">{m.time}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 flex items-center gap-2 text-[14px] text-mist">
              <ClockIcon size={16} /> Restaurants and bars open {DINING.hours}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <button
                type="button"
                onClick={() => openBooking('table')}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[15.5px] font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                <div size={19} />
                Reserve a table
              </button>
              <a
                href={CONTACT.menuPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[15px] font-medium text-marlin underline decoration-marlin/30 underline-offset-4 hover:decoration-marlin"
              >
                Kente Grill menu (PDF)
                <ArrowIcon size={16} />
              </a>
            </div>
          </div>

          <div className="grid min-w-0 grid-cols-2 gap-3 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] sm:grid-rows-2 sm:gap-4">
            <figure className="col-span-2 aspect-[16/10] max-w-full overflow-hidden rounded-[22px] bg-shell sm:col-span-1">
              <img src={img('wa2.jpg')} alt="Tables set on the beach under string lights at dusk" loading="lazy" className="h-full w-full object-cover" />
            </figure>
            <figure className="aspect-[3/4] max-w-full overflow-hidden rounded-[22px] bg-shell sm:row-span-2 sm:aspect-auto">
              <img src={img('wed1.jpg')} alt="Breakfast served on a sea-view balcony" loading="lazy" className="h-full w-full object-cover" />
            </figure>
            <figure className="aspect-[3/4] max-w-full overflow-hidden rounded-[22px] bg-shell sm:aspect-[16/10]">
              <img src={img('seafood.jpg')} alt="Grilled prawns with tomato and lime on a blue plate" loading="lazy" className="h-full w-full object-cover" />
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Spa ---------- */

export function Spa() {
  const { openBooking } = useBooking()
  return (
    <section id="spa" className="bg-shell">
      <div className="mx-auto grid max-w-page gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16">
        <div className="min-w-0">
          <h2 className="font-display text-[clamp(2.4rem,5vw,3.75rem)] leading-[1.02] text-ink">Spa and wellness</h2>
          <p className="mt-4 max-w-[40ch] text-[17px] leading-relaxed text-ink/70">
            Unwind after a day in the sun. Every treatment comes in 50, 80 or 110 minute sessions, and you can book
            for one or for a group.
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-6">
            <div>
              <dt className="text-[13.5px] text-ink/60">Open</dt>
              <dd className="mt-1 text-[16px] font-medium text-ink">{SPA.hours}</dd>
            </div>
            <div>
              <dt className="text-[13.5px] text-ink/60">Prices</dt>
              <dd className="tabular mt-1 text-[16px] font-medium text-ink">{SPA.range}</dd>
            </div>
          </dl>
        </div>

        <ul className="min-w-0 divide-y divide-ink/12 border-y border-ink/12">
          {SPA.treatments.map((t) => (
            <li key={t.name}>
              <button
                type="button"
                onClick={() => openBooking('spa', { treatment: t.name })}
                className="group flex w-full items-center justify-between gap-6 py-5 text-left"
              >
                <span className="min-w-0">
                  <span className="block font-display text-[24px] leading-tight text-ink">{t.name}</span>
                  <span className="mt-1 block text-[15px] text-ink/65">{t.note}</span>
                </span>
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-ink/20 px-4 py-2 text-[14px] font-semibold text-ink transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                  <div size={16} />
                  Book
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ---------- Weddings and events ---------- */

export function Events() {
  const { openBooking } = useBooking()
  return (
    <section id="events" className="bg-salt">
      <div className="mx-auto max-w-page px-4 py-20 sm:px-6 md:py-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-[36rem]">
            <h2 className="font-display text-[clamp(2.4rem,5vw,3.75rem)] leading-[1.02] text-ink">
              Weddings, meetings and celebrations
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-mist">
              From a beach wedding for 90 guests to a board meeting for 8. Tell us the date and numbers and our events
              team will send you options.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openBooking('event')}
            className="inline-flex items-center gap-2 self-start rounded-full bg-ink px-6 py-3 text-[15.5px] font-semibold text-white transition-transform hover:-translate-y-0.5 md:self-auto"
          >
            <div size={19} />
            Plan an event
          </button>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {EVENTS.map((e) => (
            <li key={e.id} className="min-w-0">
              <button
                type="button"
                onClick={() =>
                  openBooking('event', {
                    eventType: e.id === 'wedding' ? 'Wedding' : e.id === 'conference' ? 'Conference' : 'Board meeting',
                    people: e.id === 'wedding' ? 50 : e.id === 'conference' ? 100 : 10,
                  })
                }
                className="group flex w-full flex-col text-left"
              >
                <span className="relative block aspect-[4/3] max-w-full overflow-hidden rounded-[22px] bg-deep">
                  {e.photo ? (
                    <img
                      src={img(e.photo)}
                      alt={e.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    />
                  ) : (
                    <span className="flex h-full w-full flex-col justify-end p-6 text-white">
                      <span className="tabular font-display text-[72px] leading-none text-lagoon">{e.capacity}</span>
                      <span className="mt-2 text-[15px] text-white/75">people around one table</span>
                    </span>
                  )}
                </span>
                <span className="mt-5 flex items-center justify-between gap-3">
                  <span className="font-display text-[26px] leading-tight text-ink">{e.name}</span>
                  <ArrowIcon size={20} className="shrink-0 text-ink/40 transition-colors group-hover:text-marlin" />
                </span>
                <span className="mt-2 block text-[15.5px] leading-relaxed text-ink/75">{e.text}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
