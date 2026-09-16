import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const leftLinks = [
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Work' },
  { href: '#workshop', label: 'Workshop' },
  { href: '#contact', label: 'Contact' },
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
      <motion.div
        className="fixed left-0 top-0 z-[70] h-[2px] origin-left bg-burgundy"
        style={{ scaleX: progress }}
      />
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-cream/92 shadow-[0_1px_0_rgba(51,10,16,0.08)] backdrop-blur-md'
            : 'bg-cream/80 backdrop-blur-sm'
        }`}
      >
        <div className="mx-auto grid max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center gap-3 px-5 py-4 md:px-8 lg:px-10">
          <nav className="hidden items-center gap-6 lg:flex">
            {leftLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] tracking-wide text-burgundy/70 transition hover:text-burgundy"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="justify-self-start text-burgundy lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Menu"
          >
            <Menu size={22} />
          </button>

          <a href="#top" className="justify-self-center text-center">
            <span className="block font-display text-[1.45rem] tracking-[0.22em] text-burgundy md:text-[1.7rem]">
              AEVORA 97
            </span>
            <span className="mt-0.5 block text-[10px] uppercase tracking-[0.28em] text-burgundy/55">
              Built to last
            </span>
          </a>

          <div className="justify-self-end">
            <a href="#book" className="btn-primary !py-2.5 !text-[12px] md:!text-[13px]">
              Book Your Workshop Seat
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
            className="fixed inset-0 z-40 bg-cream px-5 pt-24 lg:hidden"
          >
            <button
              type="button"
              className="absolute right-5 top-5 text-burgundy"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <X size={22} />
            </button>
            <div className="flex flex-col gap-5">
              {[...leftLinks, { href: '#workshop', label: 'Workshop' }, { href: '#book', label: 'Book' }].map(
                (link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i }}
                    className="display text-5xl"
                  >
                    {link.label}
                  </motion.a>
                ),
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
