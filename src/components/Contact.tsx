import { contact } from '../data/catalog'
import { Reveal } from './Reveal'

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-cream-warm py-24 md:py-32">
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-burgundy/[0.04] blur-3xl" />
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

        <div className="mt-14 grid gap-8 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal>
            <p className="eyebrow mb-2">WhatsApp</p>
            <a
              href={`https://wa.me/${contact.whatsappE164}`}
              target="_blank"
              rel="noreferrer"
              className="text-burgundy underline-offset-4 transition hover:underline"
            >
              {contact.whatsapp}
            </a>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="eyebrow mb-2">Email</p>
            <a
              href={`mailto:${contact.email}`}
              className="text-burgundy underline-offset-4 transition hover:underline"
            >
              {contact.email}
            </a>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow mb-2">Instagram</p>
            <a
              href={contact.instagram}
              target="_blank"
              rel="noreferrer"
              className="text-burgundy underline-offset-4 transition hover:underline"
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
              className="text-burgundy underline-offset-4 transition hover:underline"
            >
              {contact.handle}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
