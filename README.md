# Marlin Beach Resort website

A one-page site for Marlin Resort, Gomoa Fetteh, built with React 18, Tailwind CSS 3 and Framer Motion on Vite.
Every booking button opens a short form and then WhatsApp with the request already written out.

## Run it

You need Node.js 18 or newer.

```bash
npm install
npm run dev      # local preview at http://localhost:5173
npm run build    # production files in /dist
```

Upload the contents of `dist/` to any static host (Netlify, Vercel, Cloudflare Pages, or your cPanel `public_html`).

## Things to change before launch

All in `src/config.js` and `src/data.js`:

- `WHATSAPP_NUMBER`: the number that receives bookings, digits only with country code (`233592024622`).
- `CONTACT.email`: the old site used `info@marlin-resort.com` while the website is `marlin-resorts.com`. Use whichever inbox actually works.
- Room prices (`ROOMS`): copied from the old site in US dollars. Confirm them, or switch to cedis.
- The Lovers Gate Reloaded package (`OFFER`): remove it if the promotion has ended.
- Photos live in `public/images/`. Replace a file with the same name to swap a picture.

## How WhatsApp booking works

`src/lib/whatsapp.js` turns the form into a message and builds a `https://wa.me/<number>?text=...` link.
On phones this opens the WhatsApp app; on computers it opens WhatsApp Web or the desktop app.
Nothing is sent until the guest presses send.

Booking types: room stay, the getaway package, restaurant table, spa treatment, and events.

## Structure

```
src/
  config.js            WhatsApp number, phones, email, address
  data.js              rooms, activities, dining, spa, events, offer
  lib/whatsapp.js      pre-filled message builder
  lib/dates.js         date helpers
  components/
    Booking.jsx        booking panel (shared by every "Book" button)
    Header.jsx         navigation, hero and quick availability bar
    Stay.jsx           numbers strip, rooms with filter, package offer
    Resort.jsx         activities, dining, spa, weddings and events
    Visit.jsx          location, contact, footer, floating WhatsApp button
```

Animations respect the visitor's "reduce motion" setting.
