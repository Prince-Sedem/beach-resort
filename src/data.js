// Content taken from the current marlin-resorts.com pages.
// Prices are in US dollars per night as listed there; confirm before launch.

export const ROOMS = [
  {
    id: 'standard-single',
    name: 'Standard Single Room',
    kind: 'room',
    price: 125,
    beds: '1 bed',
    baths: '1 bathroom',
    sleeps: 1,
    photo: 'single.jpg',
    blurb: 'A quiet, air-conditioned room for one, with breakfast and Wi-Fi included.',
  },
  {
    id: 'standard-double',
    name: 'Standard Double Room',
    kind: 'room',
    price: 150,
    beds: '1 bed',
    baths: '1 bathroom',
    sleeps: 2,
    photo: 'double.jpg',
    blurb: 'Cosy and bright, with in-room entertainment and a balcony looking out over the grounds.',
  },
  {
    id: 'deluxe',
    name: 'Deluxe Room',
    kind: 'room',
    price: 173,
    beds: 'King bed',
    baths: '1 bathroom',
    sleeps: 2,
    photo: 'deluxe.jpg',
    blurb:
      'A king-size bed in soft blues and sand tones, with a sitting area for taking in the view.',
  },
  {
    id: 'marlin-suite',
    name: 'Marlin Suite',
    kind: 'suite',
    price: 267,
    beds: 'King bed',
    baths: '1 bathroom',
    sleeps: 2,
    photo: 'marlin.jpg',
    blurb:
      'Wake up to the Atlantic and the infinity pool through wide windows. Rainfall shower and a sitting area for two.',
  },
  {
    id: 'ambassadorial-suite',
    name: 'Ambassadorial Suite',
    kind: 'suite',
    price: 500,
    beds: '1 bed',
    baths: '2 bathrooms',
    sleeps: 2,
    photo: 'ambassador.jpg',
    blurb: 'A separate living room and dining area, so you can host friends or spread out for a longer stay.',
  },
  {
    id: 'presidential-suite',
    name: 'Presidential Suite',
    kind: 'suite',
    price: 1250,
    beds: '2 beds',
    baths: '2 bathrooms',
    sleeps: 4,
    photo: 'presidential.jpg',
    blurb:
      'Our largest suite: living and sitting areas, a dining room, a private board room, mini bar and a master bedroom with en-suite.',
  },
]

export const EXPERIENCES = [
  {
    id: 'pool',
    name: 'Infinity pool',
    photo: 'aerial.jpg',
    text: 'From the foyer, the pool’s edge seems to run straight into the ocean. Lie back on the loungers or dip your feet in the warm water. A smaller pool next to it is just for children.',
  },
  {
    id: 'beach',
    name: 'Beachfront and cabanas',
    photo: 'wa1.jpg',
    text: 'Blue-curtained cabanas, sand underfoot and the sound of the waves. Stay out after dark when the lights come on along the shore.',
  },
  {
    id: 'quads',
    name: 'Quad bikes and horses',
    photo: 'wed2.jpg',
    text: 'Ride the length of the beach on a quad bike, or take it slower on one of our trained horses.',
  },
  {
    id: 'vip',
    name: 'VIP lounge',
    text: 'On the top floor, with its own bar, a private menu and a view down over the resort and the sea.',
  },
  {
    id: 'golf',
    name: 'Digital golf',
    text: 'An interactive golf course that anyone can pick up in minutes and still want to beat their friends at.',
  },
  {
    id: 'archery',
    name: 'Archery',
    text: 'Learn the basics with our instructors and see how close to the centre you can get by the end of the afternoon.',
  },
  {
    id: 'beach-games',
    name: 'Beach volleyball and football',
    text: 'Pick-up games on the clean stretch of sand in front of the resort.',
  },
]

export const DINING = {
  hours: '06:00 to 22:30, every day',
  meals: [
    { name: 'Breakfast', time: '08:30 – 11:00' },
    { name: 'Lunch', time: '12:00 – 14:30' },
    { name: 'Dinner', time: '19:00 – 22:30' },
  ],
  venues: ['Kente Grill', 'Garden Restaurant', 'Beachside dining', 'VIP Lounge'],
}

export const SPA = {
  hours: '06:00 to 22:30, every day',
  range: '$50 to $450',
  treatments: [
    { name: 'Massage and body treatments', note: 'Signature massage with our own essential oils' },
    { name: 'La Vidorra body glow', note: 'A full-body scrub and glow treatment' },
    { name: 'Skin care', note: 'Facial and skin treatments' },
    { name: 'Beauty boosts', note: 'Short treatments before a night out or an event' },
    { name: 'Yoga and meditation', note: 'Guided sessions with our wellness team' },
  ],
  durations: [50, 80, 110],
}

export const EVENTS = [
  {
    id: 'wedding',
    name: 'Weddings on the lawn',
    text: 'Say your vows on our beachside lawn with the ocean behind you. Packages are planned around 30, 50 or 90 guests.',
    photo: 'decor.jpg',
  },
  {
    id: 'conference',
    name: 'Conference hall',
    text: 'Tiered seating for conferences, product launches, church programmes and award nights.',
    photo: 'ballroom.jpg',
  },
  {
    id: 'boardroom',
    name: 'Board room',
    text: 'A private room for 8 to 10 people with Wi-Fi, a screen with HDMI, and coffee-break packages.',
    capacity: '8–10',
  },
]

export const OFFER = {
  name: 'Lovers Gate Reloaded',
  price: 'GHC 2,450',
  includes: [
    'Full board: breakfast, lunch and dinner',
    'Assorted local drinks',
    'Early check-in from 12 noon',
    'Late check-out at 2 pm',
  ],
}
