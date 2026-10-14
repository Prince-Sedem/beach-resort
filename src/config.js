// Everything a non-developer may need to change lives in this file.

// WhatsApp number that receives every booking request.
// International format, digits only: country code 233, no leading 0, no "+".
export const WHATSAPP_NUMBER = '233592024622'

export const CONTACT = {
  phones: ['059 202 4622', '059 202 4292', '059 202 4591'],
  phoneIntl: '+233592024622',
  // Check this inbox works. The old site used marlin-resort.com (no "s").
  email: 'info@marlin-resort.com',
  addressLines: ['CG-2131-5242, Gomoa Fetteh', 'Central Region, Ghana'],
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Marlin+Resort+Gomoa+Fetteh+Ghana',
  menuPdf:
    'https://marlin-resorts.com/wp-content/uploads/2024/07/bcd61daf-54e1-414d-ac90-e1aa93505593_KENTE-GRILL-RESTAURANT-low-res-1.pdf',
}

// Resolves a photo in /public/images whatever folder the site is served from.
export const img = (name) => `${import.meta.env.BASE_URL}images/${name}`
