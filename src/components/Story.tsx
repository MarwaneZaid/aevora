import { images } from '../data/catalog'
import { Reveal } from './Reveal'

export function Story() {
  return (
    <section className="bg-cream-warm py-24 md:py-32">
      <div className="mx-auto grid max-w-[1400px] items-start gap-12 px-5 md:grid-cols-12 md:gap-10 md:px-8 lg:px-10">
        <Reveal className="md:col-span-4">
          <img
            src={images.craftHands}
            alt="Hands crafting a leather journal"
            className="aspect-square w-full object-cover shadow-lift"
          />
        </Reveal>
        <Reveal delay={0.08} className="md:col-span-8">
          <p className="eyebrow mb-4">Our story</p>
          <h2 className="display text-4xl md:text-5xl">How Aevora began</h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted md:text-lg">
            <p>
              Aevora 97 began with something we were searching for ourselves: a
              beautiful and durable leather cover that could truly protect the
              journals and books we value so deeply.
            </p>
            <p>
              As passionate readers and journaling lovers, we know that these
              objects are more than paper — they carry our thoughts, memories,
              favourite words and different chapters of our lives.
            </p>
            <p>
              When we couldn’t find the cover we imagined, we decided to create
              it ourselves. We source genuine Moroccan leather from Fez and bring
              it together with the expertise of local artisans, our own creativity
              and carefully selected materials.
            </p>
            <p>
              The result is a collection of meaningful, long-lasting pieces made
              with love and offered at accessible prices — from book and journal
              lovers, for those who share the same passion.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
