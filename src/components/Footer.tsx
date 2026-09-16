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
            <p className="mt-3 text-cream/65">Built to last.</p>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-cream/75">
            <a href="#about" className="hover:text-cream">
              About
            </a>
            <a href="#work" className="hover:text-cream">
              Work
            </a>
            <a href="#workshop" className="hover:text-cream">
              Workshop
            </a>
            <a href="#book" className="hover:text-cream">
              Book
            </a>
            <a href="#faq" className="hover:text-cream">
              FAQ
            </a>
            <a href="#contact" className="hover:text-cream">
              Contact
            </a>
            <a
              href={contact.instagram}
              target="_blank"
              rel="noreferrer"
              className="hover:text-cream"
            >
              Instagram
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-2 pt-6 text-xs text-cream/45 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Aevora 97</p>
          <p>Handmade in Morocco</p>
        </div>
      </div>
    </footer>
  )
}
