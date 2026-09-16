import { useReviews } from '../lib/content'
import { Reveal } from './Reveal'

export function Reviews() {
  const { reviews, loading } = useReviews()

  if (loading || reviews.length === 0) return null

  return (
    <section id="reviews" className="border-y border-line bg-cream-warm py-24 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8 lg:px-10">
        <Reveal>
          <p className="eyebrow mb-4">From our guests</p>
          <h2 className="display text-4xl md:text-5xl">Workshop reviews</h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <Reveal key={review.id} delay={i * 0.05}>
              <blockquote className="h-full border border-burgundy/10 bg-cream p-6">
                <p className="font-display text-sm tracking-[0.2em] text-burgundy/50">
                  {'★'.repeat(review.rating)}
                  {'☆'.repeat(Math.max(0, 5 - review.rating))}
                </p>
                <p className="mt-4 font-display text-2xl leading-snug text-burgundy md:text-3xl">
                  “{review.quote}”
                </p>
                <footer className="mt-6 text-sm text-muted">— {review.author_name}</footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
