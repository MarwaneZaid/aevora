import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { faqs } from '../data/catalog'
import { Reveal } from './Reveal'

export function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="bg-cream py-24 md:py-28">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 md:grid-cols-12 md:px-8 lg:px-10">
        <Reveal className="md:col-span-4">
          <p className="eyebrow mb-4">FAQ</p>
          <h2 className="display text-4xl md:text-5xl">Before you book</h2>
        </Reveal>

        <div className="md:col-span-8">
          {faqs.map((item, i) => {
            const isOpen = open === i
            return (
              <Reveal key={item.q} delay={i * 0.04}>
                <div className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="display text-2xl md:text-3xl">{item.q}</span>
                    <Plus
                      size={20}
                      className={`shrink-0 transition ${isOpen ? 'rotate-45' : ''}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 pr-8 text-muted">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
