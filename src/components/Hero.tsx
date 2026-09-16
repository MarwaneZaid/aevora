import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowDownRight } from 'lucide-react'
import { images } from '../data/catalog'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.06])
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.2])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] items-end overflow-hidden"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src={images.hero}
          alt="Stack of handmade Aevora leather journals"
          className="h-full w-full object-cover object-[center_30%]"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/88 to-cream/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/30 to-transparent" />
      </motion.div>

      <motion.div
        style={{ opacity, y: textY }}
        className="container-site relative z-10 pb-16 pt-32 md:pb-24"
      >
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.35, duration: 0.6 }}
          className="eyebrow mb-5"
        >
          Morocco · Handmade atelier
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.45, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="display text-balance text-[clamp(3.6rem,11vw,7.5rem)] leading-[0.88] tracking-[0.08em]"
        >
          AEVORA 97
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.65, duration: 0.7 }}
          className="mt-6 max-w-xl font-display text-2xl italic leading-snug text-burgundy/80 md:text-[2rem]"
        >
          A journal made by you, for your story.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.7 }}
          className="mt-5 max-w-md lede"
        >
          Create a genuine leather journal that feels completely yours — craft,
          conversation, and beautiful little details around one shared table.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.95, duration: 0.7 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <a href="#book" className="btn-primary">
            Book Your Workshop Seat
            <ArrowDownRight size={16} />
          </a>
          <a href="#compose" className="btn-ghost">
            Preview your journal
          </a>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-burgundy/40 md:flex"
      >
        <span className="block h-10 w-px origin-top animate-pulse bg-burgundy/25" />
        Scroll
      </motion.a>
    </section>
  )
}
