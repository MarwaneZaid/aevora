import { values } from '../data/catalog'
import { Reveal } from './Reveal'

export function Values() {
  return (
    <section className="border-y border-line bg-cream-warm py-24 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8 lg:px-10">
        <Reveal>
          <p className="eyebrow mb-4">Our values</p>
          <h2 className="display text-4xl md:text-5xl">What we stand for</h2>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {values.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="border-t border-burgundy/20 pt-5">
                <p className="font-display text-2xl text-burgundy md:text-3xl">
                  {item.title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
