import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function Loader() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setShow(false), 1500)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-cream"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }}
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full border border-burgundy/35 font-display text-xl tracking-wider text-burgundy"
            >
              97
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.55 }}
              className="font-display text-4xl tracking-[0.28em] text-burgundy"
            >
              AEVORA
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-2 text-[10px] uppercase tracking-[0.32em] text-burgundy/45"
            >
              Built to last
            </motion.p>
            <motion.div
              className="mx-auto mt-8 h-px w-24 origin-left bg-burgundy"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
