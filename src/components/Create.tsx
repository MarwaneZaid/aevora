import { galleryPics } from '../data/catalog'
import { Reveal } from './Reveal'

export function Create() {
  return (
    <section id="work" className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8 lg:px-10">
        <Reveal>
          <p className="eyebrow mb-4">What we create</p>
          <h2 className="display max-w-3xl text-4xl md:text-5xl lg:text-6xl">
            Genuine leather, practical design, personal details.
          </h2>
          <p className="mt-5 max-w-2xl text-muted md:text-lg">
            Aevora 97 journals combine genuine leather, practical design and
            personal details. Whether you choose one of our available pieces or
            request a custom journal, the final result is made to feel distinctly
            yours.
          </p>
        </Reveal>

        <div className="mt-14 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {galleryPics.map((src, i) => (
            <Reveal key={src} delay={Math.min(i * 0.04, 0.2)} className="mb-4 break-inside-avoid">
              <div className="img-frame">
                <img
                  src={src}
                  alt={`Aevora handmade journal ${i + 1}`}
                  className={`${
                    i % 5 === 0 ? 'aspect-[3/4]' : i % 3 === 0 ? 'aspect-square' : 'aspect-[4/5]'
                  } w-full object-cover`}
                  loading="lazy"
                />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 max-w-3xl text-sm leading-relaxed text-muted md:text-base">
            Leather colours and personalization options may vary according to
            availability. Custom orders are also available for anyone looking for
            a particular colour, detail or design.
          </p>
          <p className="mt-3 text-sm font-medium italic text-burgundy">
            *Personalized and custom-made orders require advance payment.*
          </p>
        </Reveal>
      </div>
    </section>
  )
}
