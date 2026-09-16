import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { images } from '../data/catalog'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.4])

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] items-end overflow-hidden"
    >
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src={images.hero}
          alt="Stack of handmade Aevora leather journals"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/88 to-cream/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-cream/40" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pb-20 pt-32 md:px-8 md:pb-28 lg:px-10"
      >
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="eyebrow mb-5"
        >
          Aevora 97 · Morocco
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="display max-w-3xl text-[clamp(3rem,8vw,5.8rem)] leading-[0.95]"
        >
          Real leather journals
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-4 max-w-xl font-display text-2xl italic text-burgundy/80 md:text-3xl"
        >
          A journal made by you, for your story.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-6 max-w-lg text-base leading-relaxed text-muted md:text-lg"
        >
          Create a genuine leather journal that feels completely yours. Join us
          for a cozy creative experience filled with craftsmanship, conversations
          and beautiful little details.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.62, duration: 0.7 }}
          className="mt-9"
        >
          <a href="#book" className="btn-primary">
            Book your seat
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
