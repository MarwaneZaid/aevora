import { useReviews } from '../lib/content'
import { Reveal } from './Reveal'

export function Reviews() {
  const { reviews, loading } = useReviews()

  if (loading || reviews.length === 0) return null

  return (
    <section id="reviews" className="border-y border-line bg-cream-warm py-24 md:py-28">
      <div className="container-site">
        <Reveal>
          <p className="eyebrow mb-4">From our guests</p>
          <h2 className="display text-4xl md:text-5xl">Workshop reviews</h2>
          <p className="mt-4 max-w-xl lede">
            Words from people who sat at the table, made a journal, and took the
            feeling home.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <Reveal key={review.id} delay={i * 0.05}>
              <blockquote className="panel relative flex h-full flex-col p-6 md:p-7">
                <span
                  aria-hidden
                  className="font-display text-5xl leading-none text-burgundy/15"
                >
                  “
                </span>
                <p className="mt-2 font-display text-[1.65rem] leading-snug text-burgundy md:text-[1.85rem]">
                  {review.quote}
                </p>
                <div className="mt-auto pt-8">
                  <p className="text-[11px] tracking-[0.22em] text-burgundy/45">
                    {'★'.repeat(review.rating)}
                    <span className="text-burgundy/20">
                      {'★'.repeat(Math.max(0, 5 - review.rating))}
                    </span>
                  </p>
                  <footer className="mt-2 text-sm text-muted">
                    — {review.author_name}
                  </footer>
                </div>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
