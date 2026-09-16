import { contact } from '../data/catalog'
import { Reveal } from './Reveal'

export function Contact() {
  return (
    <section id="contact" className="bg-cream-warm py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8 lg:px-10">
        <Reveal>
          <p className="eyebrow mb-4">Contact</p>
          <h2 className="display max-w-3xl text-4xl md:text-5xl">
            Let’s create together
          </h2>
          <p className="mt-5 max-w-2xl text-muted md:text-lg">
            Have a question about our journals or workshops? Interested in hosting
            an Aevora 97 workshop at your coffee shop, concept store, company or
            private event? Contact us to discuss a personalized creative
            experience.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal>
            <p className="eyebrow mb-2">WhatsApp</p>
            <p className="text-burgundy">{contact.whatsapp || '[number]'}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="eyebrow mb-2">Email</p>
            <p className="text-burgundy">{contact.email || '[email]'}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow mb-2">Instagram</p>
            <a
              href={contact.instagram}
              target="_blank"
              rel="noreferrer"
              className="text-burgundy transition hover:opacity-70"
            >
              {contact.handle}
            </a>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="eyebrow mb-2">TikTok</p>
            <a
              href={contact.tiktok}
              target="_blank"
              rel="noreferrer"
              className="text-burgundy transition hover:opacity-70"
            >
              @aevora97
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
