const items = [
  'Built to Last',
  'Handmade in Morocco',
  'Leather from Fez',
  'Make your own journal',
  'Book a workshop',
  'Personal to you',
]

export function Marquee() {
  const row = [...items, ...items]

  return (
    <section
      aria-label="Brand highlights"
      className="overflow-hidden border-y border-burgundy bg-burgundy py-3.5 text-cream"
    >
      <div className="mask-fade-x flex whitespace-nowrap">
        <div className="flex min-w-full animate-marquee items-center gap-10 pr-10">
          {row.map((item, i) => (
            <span key={`${item}-${i}`} className="flex items-center gap-10">
              <span className="font-display text-xl tracking-[0.04em] md:text-2xl">
                {item}
              </span>
              <span className="h-1 w-1 rounded-full bg-cream/35" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
