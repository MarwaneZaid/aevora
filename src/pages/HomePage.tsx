import { useState } from 'react'
import { Loader } from '../components/Loader'
import { Nav } from '../components/Nav'
import { Hero } from '../components/Hero'
import { Marquee } from '../components/Marquee'
import { About } from '../components/About'
import { Story } from '../components/Story'
import { Create } from '../components/Create'
import { Values } from '../components/Values'
import { Workshops } from '../components/Workshops'
import { Reviews } from '../components/Reviews'
import { Compose } from '../components/Compose'
import { Book } from '../components/Book'
import { Faq } from '../components/Faq'
import { Contact } from '../components/Contact'
import { Footer } from '../components/Footer'

export function HomePage() {
  const [composition, setComposition] = useState('')

  return (
    <div className="min-h-screen bg-cream text-burgundy">
      <Loader />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Story />
        <Create />
        <Values />
        <Workshops />
        <Reviews />
        <Compose onCompose={setComposition} />
        <Book composition={composition} />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
