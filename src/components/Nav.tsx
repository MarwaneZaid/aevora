import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const leftLinks = [
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Work' },
  { href: '#workshop', label: 'Workshop' },
  { href: '#contact', label: 'Contact' },
]

const mobileLinks = [
  ...leftLinks,
  { href: '#compose', label: 'Compose' },
  { href: '#book', label: 'Book' },
  { href: '#faq', label: 'FAQ' },
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <motion.div
        className="fixed left-0 top-0 z-[70] h-[2px] origin-left bg-burgundy"
        style={{ scaleX: progress }}
      />
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-cream/94 shadow-[0_1px_0_rgba(51,10,16,0.08)] backdrop-blur-md'
            : 'bg-cream/70 backdrop-blur-[2px]'
        }`}
      >
        <div className="container-site grid grid-cols-[1fr_auto_1fr] items-center gap-3 py-4">
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {leftLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-[13px] tracking-[0.04em] text-burgundy/65 transition hover:text-burgundy after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-burgundy after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="justify-self-start text-burgundy lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          <a href="#top" className="justify-self-center text-center">
            <span className="block font-display text-[1.45rem] tracking-[0.22em] text-burgundy md:text-[1.7rem]">
              AEVORA 97
            </span>
            <span className="mt-0.5 block text-[10px] uppercase tracking-[0.28em] text-burgundy/50">
              Built to last
            </span>
          </a>

          <div className="justify-self-end">
            <a
              href="#book"
              className="btn-primary !px-4 !py-2.5 !text-[12px] md:!px-5 md:!text-[13px]"
            >
              <span className="sm:hidden">Book</span>
              <span className="hidden sm:inline">Book workshop</span>
            </a>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-cream/98 px-5 pt-24 backdrop-blur-md lg:hidden"
          >
            <button
              type="button"
              className="absolute right-5 top-5 text-burgundy"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
            <div className="flex flex-col gap-4">
              {mobileLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i }}
                  className="display text-5xl"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
