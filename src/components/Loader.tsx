import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function Loader() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setShow(false), 1600)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-cream"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full border border-burgundy/40 font-display text-xl text-burgundy"
            >
              97
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="font-display text-4xl tracking-[0.28em] text-burgundy"
            >
              AEVORA
            </motion.p>
            <motion.div
              className="mx-auto mt-8 h-px w-24 origin-left bg-burgundy"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.45, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
