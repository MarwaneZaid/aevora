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
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {values.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="group h-full border border-transparent border-t-burgundy/25 pt-6 transition hover:border-burgundy/15 hover:bg-cream/60 hover:px-4 hover:pb-4">
                <p className="font-display text-[11px] tracking-[0.28em] text-burgundy/40">
                  0{i + 1}
                </p>
                <p className="mt-3 font-display text-2xl text-burgundy transition group-hover:translate-x-1 md:text-3xl">
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
