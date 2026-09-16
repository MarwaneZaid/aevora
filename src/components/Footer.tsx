import { contact } from '../data/catalog'

export function Footer() {
  return (
    <footer className="bg-burgundy pb-10 pt-16 text-cream">
      <div className="container-site">
        <div className="flex flex-col gap-10 border-b border-cream/15 pb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-5xl tracking-[0.14em] md:text-7xl">
              AEVORA 97
            </p>
            <p className="mt-3 font-display text-xl italic text-cream/70">
              Built to last.
            </p>
          </div>
          <nav
            aria-label="Footer"
            className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-cream/70"
          >
            {[
              ['#about', 'About'],
              ['#work', 'Work'],
              ['#workshop', 'Workshop'],
              ['#compose', 'Compose'],
              ['#book', 'Book'],
              ['#faq', 'FAQ'],
              ['#contact', 'Contact'],
            ].map(([href, label]) => (
              <a key={href} href={href} className="transition hover:text-cream">
                {label}
              </a>
            ))}
            <a
              href={contact.instagram}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-cream"
            >
              Instagram
            </a>
          </nav>
        </div>
        <div className="flex flex-col gap-2 pt-6 text-xs text-cream/45 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Aevora 97 · All rights reserved</p>
          <p>Handmade in Morocco · Leather from Fez</p>
        </div>
      </div>
    </footer>
  )
}
