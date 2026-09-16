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
    <section className="overflow-hidden border-y border-burgundy bg-burgundy py-4 text-cream">
      <div className="mask-fade-x flex whitespace-nowrap">
        <div className="flex min-w-full animate-marquee items-center gap-10 pr-10">
          {row.map((item, i) => (
            <span key={`${item}-${i}`} className="flex items-center gap-10">
              <span className="font-display text-2xl tracking-wide md:text-3xl">
                {item}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-cream/40" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
