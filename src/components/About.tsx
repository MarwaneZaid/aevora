import { images } from '../data/catalog'
import { Reveal } from './Reveal'

export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0">
        <img
          src={images.fezTannery}
          alt="Traditional leather tannery in Fez, Morocco"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-cream/88" />
        <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/80 to-cream/55" />
      </div>

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-12 px-5 md:grid-cols-2 md:gap-16 md:px-8 lg:px-10">
        <Reveal>
          <p className="eyebrow mb-4">About us</p>
          <h2 className="display text-4xl md:text-5xl">Aevora 97</h2>
          <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
            Aevora 97 is a Moroccan brand creating genuine leather journals
            designed to hold your thoughts, memories, dreams and everyday
            stories.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            We believe a journal should feel as personal as everything written
            inside it. That is why our pieces combine local craftsmanship,
            thoughtful design and details chosen by you.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <img
            src={images.swatchesLogo}
            alt="Aevora 97 leather colour swatches — Built to Last"
            className="aspect-[4/5] w-full object-cover shadow-soft"
          />
        </Reveal>
      </div>
    </section>
  )
}
