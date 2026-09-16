import { useWorkshop, useWorkshopPhotos } from '../lib/content'
import { included, images } from '../data/catalog'
import { Reveal } from './Reveal'

export function Workshops() {
  const { workshop } = useWorkshop()
  const { photos } = useWorkshopPhotos()

  return (
    <section id="workshop" className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8 lg:px-10">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <p className="eyebrow mb-4">Our workshop</p>
            <h2 className="display text-4xl md:text-5xl lg:text-6xl">
              {workshop.title}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
              {workshop.blurb ||
                'A creative, hands-on workshop where you will make a genuine leather journal from beginning to end and share the experience with a community of book lovers, journaling enthusiasts and creative minds.'}
            </p>
            <p className="mt-8 font-display text-2xl text-burgundy md:text-3xl">
              More than making a journal
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
              This isn’t only about crafting a journal. It’s a cozy gathering
              designed for people who enjoy creating, reading, journaling and
              meeting others with similar interests.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
              Around one shared table, we will create, exchange ideas, chitchat,
              listen to good music and enjoy drinks and sweet treats together. You
              don’t need any previous experience — just bring your curiosity and
              creativity.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="img-frame shadow-soft">
              <img
                src={images.workshopTable}
                alt="Aevora leather journal workshop table setup"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="panel mt-16 border-burgundy/15 bg-gradient-to-br from-cream-warm to-cream p-6 md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow mb-3">Next session</p>
                <p className="font-display text-3xl text-burgundy md:text-4xl">
                  {workshop.date}
                </p>
                <p className="mt-2 text-muted">
                  {workshop.place} · {workshop.duration} · {workshop.price} MAD ·{' '}
                  {workshop.seatsLeft} seats left
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="#book" className="btn-primary">
                  Book Your Workshop Seat
                </a>
                <a href="#compose" className="btn-ghost">
                  Preview your journal
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {photos.length > 0 && (
          <div className="mt-16">
            <Reveal>
              <p className="eyebrow mb-4">From the table</p>
              <h3 className="display text-3xl md:text-4xl">Workshop moments</h3>
            </Reveal>
            <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
              {photos.map((photo, i) => (
                <Reveal key={photo.id} delay={Math.min(i * 0.04, 0.2)} className="mb-4 break-inside-avoid">
                  <div className="img-frame">
                    <img
                      src={photo.url}
                      alt={photo.caption || `Workshop photo ${i + 1}`}
                      className="w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  {photo.caption && (
                    <p className="mt-2 text-sm text-muted">{photo.caption}</p>
                  )}
                </Reveal>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16">
          <Reveal>
            <p className="eyebrow mb-4">What is included</p>
            <h3 className="display text-3xl md:text-4xl">Everything you need</h3>
          </Reveal>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {included.map((item, i) => (
              <Reveal key={item} delay={i * 0.03}>
                <li className="flex gap-3 border-b border-line py-3 text-burgundy transition hover:pl-1">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-burgundy" />
                  {item}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal>
          <div className="mt-20 text-center">
            <p className="font-display text-3xl italic leading-tight text-burgundy md:text-5xl">
              Your ideas. Your memories. Your journal.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="#book" className="btn-primary">
                Book Your Workshop Seat
              </a>
              <a href="#contact" className="btn-ghost">
                Contact Us
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
