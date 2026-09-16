import { contact } from '../data/catalog'

export function Footer() {
  return (
    <footer className="bg-burgundy pb-10 pt-16 text-cream">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8 lg:px-10">
        <div className="flex flex-col gap-10 border-b border-cream/15 pb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-5xl tracking-[0.14em] md:text-7xl">
              AEVORA 97
            </p>
            <p className="mt-3 font-display text-xl italic text-cream/70">
              Built to last.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-cream/75">
            <a href="#about" className="transition hover:text-cream">
              About
            </a>
            <a href="#work" className="transition hover:text-cream">
              Work
            </a>
            <a href="#workshop" className="transition hover:text-cream">
              Workshop
            </a>
            <a href="#compose" className="transition hover:text-cream">
              Compose
            </a>
            <a href="#book" className="transition hover:text-cream">
              Book
            </a>
            <a href="#faq" className="transition hover:text-cream">
              FAQ
            </a>
            <a href="#contact" className="transition hover:text-cream">
              Contact
            </a>
            <a
              href={contact.instagram}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-cream"
            >
              Instagram
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-2 pt-6 text-xs text-cream/45 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Aevora 97</p>
          <p>Handmade in Morocco · Leather from Fez</p>
        </div>
      </div>
    </footer>
  )
}
