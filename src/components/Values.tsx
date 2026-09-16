import { values } from '../data/catalog'
import { Reveal } from './Reveal'

export function Values() {
  return (
    <section className="border-y border-line bg-cream-warm py-24 md:py-28">
      <div className="container-site">
        <Reveal>
          <p className="eyebrow mb-4">Our values</p>
          <h2 className="display text-4xl md:text-5xl">What we stand for</h2>
        </Reveal>
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {values.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="group h-full border-t border-burgundy/20 pt-6 transition hover:border-burgundy">
                <p className="font-display text-[11px] tracking-[0.28em] text-burgundy/35">
                  0{i + 1}
                </p>
                <p className="mt-3 font-display text-2xl text-burgundy transition duration-300 group-hover:translate-x-0.5 md:text-[1.75rem]">
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
