import { WHATSAPP_NUMBER } from '../config.js'
import { nightsBetween, prettyDate } from './dates.js'

export const waLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`

const guestsLine = (f) => {
  const parts = [plural(Number(f.adults) || 0, 'adult', 'adults')]
  if (Number(f.children) > 0) parts.push(plural(Number(f.children), 'child', 'children'))
  return parts.join(', ')
}

const signOff = (f) => {
  const lines = []
  if (f.name?.trim()) lines.push(`Name: ${f.name.trim()}`)
  if (f.note?.trim()) lines.push(`Note: ${f.note.trim()}`)
  return lines
}

// Builds the pre-filled WhatsApp message for each kind of request.
export function buildMessage(kind, f) {
  const lines = ['Hello Marlin Resort,']

  if (kind === 'room') {
    const n = nightsBetween(f.checkIn, f.checkOut)
    lines.push(
      `I'd like to book ${f.room ? `the ${f.room}` : 'a room'}.`,
      '',
      `Check-in: ${prettyDate(f.checkIn)}`,
      `Check-out: ${prettyDate(f.checkOut)}${n ? ` (${plural(n, 'night', 'nights')})` : ''}`,
      `Rooms: ${f.rooms || 1}`,
      `Guests: ${guestsLine(f)}`,
      ...signOff(f),
      '',
      'Please confirm availability and the total price. Thank you.',
    )
  }

  if (kind === 'package') {
    const n = nightsBetween(f.checkIn, f.checkOut)
    lines.push(
      `I'm interested in the ${f.package} package.`,
      '',
      `Check-in: ${prettyDate(f.checkIn)}`,
      `Check-out: ${prettyDate(f.checkOut)}${n ? ` (${plural(n, 'night', 'nights')})` : ''}`,
      `Guests: ${guestsLine(f)}`,
      ...signOff(f),
      '',
      'Is it available for these dates? Thank you.',
    )
  }

  if (kind === 'table') {
    lines.push(
      `I'd like to reserve a table${f.venue && f.venue !== 'Any restaurant' ? ` at ${f.venue}` : ''}.`,
      '',
      `Date: ${prettyDate(f.date)}`,
      `Time: ${f.time || 'flexible'}`,
      `Guests: ${f.people || 2}`,
      ...signOff(f),
      '',
      'Thank you.',
    )
  }

  if (kind === 'spa') {
    lines.push(
      `I'd like to book a spa treatment: ${f.treatment}${f.duration ? `, ${f.duration} minutes` : ''}.`,
      '',
      `Date: ${prettyDate(f.date)}`,
      `Preferred time: ${f.time || 'flexible'}`,
      `People: ${f.people || 1}`,
      ...signOff(f),
      '',
      'Please let me know what times are free and the price. Thank you.',
    )
  }

  if (kind === 'event') {
    lines.push(
      `I'm planning ${f.eventType ? `a ${f.eventType.toLowerCase()}` : 'an event'} at the resort.`,
      '',
      `Date: ${prettyDate(f.date)}`,
      `Expected guests: ${f.people || 'not sure yet'}`,
      ...signOff(f),
      '',
      'Could you send me your packages and prices? Thank you.',
    )
  }

  if (kind === 'general') {
    lines.push("I have a question about staying at Marlin Resort.", ...signOff(f))
  }

  return lines.join('\n')
}
