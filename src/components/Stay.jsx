import { useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { img } from '../config.js'
import { OFFER, ROOMS } from '../data.js'
import { useBooking } from './Booking.jsx'
import { BathIcon, BedIcon, CheckIcon, UsersIcon, WhatsAppIcon } from './Icons.jsx'

export function Facts() {
  const facts = [
    { value: '6', label: 'room and suite types, from single rooms to the Presidential Suite' },
    { value: '5', label: 'restaurants and bars, open from 6 am to 10:30 pm' },
    { value: '2', label: 'outdoor pools, including one just for children' },
    { value: '1 hr', label: 'drive west of Accra' },
  ]
  return (
    <section aria-label="The resort in numbers" className="bg-ink text-white">
      <div className="mx-auto grid max-w-page grid-cols-2 gap-x-6 gap-y-8 px-4 py-12 sm:px-6 md:grid-cols-4 md:py-14">
        {facts.map((f) => (
          <div key={f.value + f.label} className="flex min-w-0 flex-col gap-2 border-t border-white/15 pt-4">
            <span className="tabular font-display text-[44px] leading-none text-lagoon">{f.value}</span>
            <span className="max-w-[24ch] text-[14.5px] leading-snug text-white/75">{f.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'room', label: 'Rooms' },
  { id: 'suite', label: 'Suites' },
]

export function Stay() {
  const [filter, setFilter] = useState('all')
  const rooms = ROOMS.filter((r) => filter === 'all' || r.kind === filter)

  return (
    <section id="stay" className="bg-salt">
      <div className="mx-auto max-w-page px-4 py-20 sm:px-6 md:py-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-[34rem]">
            <h2 className="font-display text-[clamp(2.4rem,5vw,3.75rem)] leading-[1.02] text-ink">
              Rooms and suites
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-mist">
              Every stay includes breakfast and Wi-Fi. Check-in is from 2 pm and check-out by 11 am. Book three or
              more days ahead and save 10%.
            </p>
          </div>
          <LayoutGroup id="room-filter">
            <div role="tablist" aria-label="Filter rooms" className="flex gap-1 self-start rounded-full bg-shell p-1 md:self-auto">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  role="tab"
                  type="button"
                  aria-selected={filter === f.id}
                  onClick={() => setFilter(f.id)}
                  className="relative rounded-full px-5 py-2 text-[14.5px] font-medium"
                >
                  {filter === f.id && (
                    <motion.span layoutId="room-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: 'spring', damping: 30, stiffness: 380 }} />
                  )}
                  <span className={`relative ${filter === f.id ? 'text-white' : 'text-ink/70'}`}>{f.label}</span>
                </button>
              ))}
            </div>
          </LayoutGroup>
        </div>

        <motion.ul layout className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence initial={false} mode="popLayout">
            {rooms.map((r) => (
              <motion.li
                layout
                key={r.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
              >
                <RoomCard room={r} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  )
}

function RoomCard({ room }) {
  const { openBooking } = useBooking()
  return (
    <article className="group flex h-full flex-col">
      <div className="relative aspect-[4/3] max-w-full overflow-hidden rounded-[22px] bg-shell">
        <img
          src={img(room.photo)}
          alt={`${room.name} at Marlin Resort`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        <span className="tabular absolute bottom-3 left-3 rounded-full bg-salt/95 px-3.5 py-1.5 text-[13.5px] text-ink">
          from <strong className="font-semibold">${room.price.toLocaleString('en-US')}</strong> a night
        </span>
      </div>
      <h3 className="mt-5 font-display text-[26px] leading-tight text-ink">{room.name}</h3>
      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[14px] text-mist">
        <li className="flex items-center gap-1.5">
          <BedIcon size={16} /> {room.beds}
        </li>
        <li className="flex items-center gap-1.5">
          <BathIcon size={16} /> {room.baths}
        </li>
        <li className="flex items-center gap-1.5">
          <UsersIcon size={16} /> Sleeps {room.sleeps}
        </li>
      </ul>
      <p className="mt-3 flex-1 text-[15.5px] leading-relaxed text-ink/80">{room.blurb}</p>
      <button
        type="button"
        onClick={() => openBooking('room', { room: room.name })}
        className="mt-5 inline-flex items-center gap-2 self-start rounded-full border border-ink/20 px-5 py-2.5 text-[14.5px] font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
      >
        <div size={18} />
        Book this room
      </button>
    </article>
  )
}

export function Offer() {
  const { openBooking } = useBooking()
  return (
    <section aria-labelledby="offer-title" className="bg-salt pb-20 md:pb-28">
      <div className="mx-auto max-w-page px-4 sm:px-6">
        <div className="relative grid overflow-hidden rounded-[28px] bg-marlin text-white md:grid-cols-[1.1fr_1fr]">
          <div className="relative z-10 flex flex-col gap-5 p-7 sm:p-10 md:p-12">
            <p className="text-[14px] font-medium text-lagoon">Getaway package</p>
            <h2 id="offer-title" className="font-display text-[clamp(2.2rem,4.5vw,3.4rem)] leading-[1.02]">
              {OFFER.name}
            </h2>
            <p className="tabular font-display text-[30px] leading-none text-lantern">{OFFER.price}</p>
            <ul className="flex flex-col gap-2.5 text-[16px] text-white/90">
              {OFFER.includes.map((x) => (
                <li key={x} className="flex items-start gap-2.5">
                  <CheckIcon size={18} className="mt-0.5 shrink-0 text-lagoon" />
                  {x}
                </li>
              ))}
            </ul>
            <div className="mt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => openBooking('package')}
                className="inline-flex items-center gap-2 rounded-full bg-lantern px-6 py-3 text-[15.5px] font-semibold text-ink transition-transform hover:-translate-y-0.5"
              >
                <div size={19} />
                Ask about dates
              </button>
              <span className="text-[13px] text-white/65">Terms and conditions apply.</span>
            </div>
          </div>
          <div className="relative min-h-[260px]">
            <img
              src={img('pres.jpg')}
              alt="Two guests relaxing in robes in a suite lounge"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-marlin/60 to-transparent md:bg-gradient-to-r" />
          </div>
        </div>
      </div>
    </section>
  )
}
