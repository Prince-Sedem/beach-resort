import { MotionConfig } from 'framer-motion'
import { BookingProvider } from './components/Booking.jsx'
import { Hero, Nav } from './components/Header.jsx'
import { Facts, Offer, Stay } from './components/Stay.jsx'
import { Dining, Events, Experiences, Spa } from './components/Resort.jsx'
import { FloatingWhatsApp, Footer, Visit } from './components/Visit.jsx'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BookingProvider>
        <Nav />
        <main>
          <Hero />
          <Facts />
          <Stay />
          <Offer />
          <Experiences />
          <Dining />
          <Spa />
          <Events />
          <Visit />
        </main>
        <Footer />
        <FloatingWhatsApp />
      </BookingProvider>
    </MotionConfig>
  )
}
