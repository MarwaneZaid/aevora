import { useMemo, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import {
  charms,
  images,
  journalSizes,
  leatherTones,
  paperStyles,
  ribbons,
  workshopSteps,
  type WorkshopStepId,
} from '../data/catalog'
import { CharmMark } from './CharmMark'
import { JournalPreview } from './JournalPreview'
import { Reveal } from './Reveal'

type Props = {
  onCompose: (summary: string) => void
}

const stepOrder = workshopSteps.map((s) => s.id)

export function Compose({ onCompose }: Props) {
  const [step, setStep] = useState<WorkshopStepId>('leather')
  const [tone, setTone] = useState(leatherTones[0].id)
  const [size, setSize] = useState(journalSizes[1].id)
  const [paper, setPaper] = useState<'lined' | 'blank' | 'dotted'>('lined')
  const [selectedCharms, setSelectedCharms] = useState<string[]>(['sun'])
  const [ribbon, setRibbon] = useState(ribbons[0].id)
  const [initials, setInitials] = useState('')

  const stepIndex = stepOrder.indexOf(step)
  const progress = ((stepIndex + 1) / stepOrder.length) * 100

  const selectedTone = leatherTones.find((t) => t.id === tone) ?? leatherTones[0]
  const selectedSize = journalSizes.find((s) => s.id === size) ?? journalSizes[1]
  const selectedPaper = paperStyles.find((p) => p.id === paper) ?? paperStyles[0]
  const selectedRibbon = ribbons.find((r) => r.id === ribbon) ?? ribbons[0]
  const activeCharms = charms.filter((c) => selectedCharms.includes(c.id))

  const summary = useMemo(() => {
    const charmNames = activeCharms.map((c) => c.name).join(', ') || 'no charms'
    const mark = initials.trim()
      ? ` · initials “${initials.trim().toUpperCase()}”`
      : ''
    return `${selectedSize.label} · ${selectedTone.name} · ${selectedPaper.name} · ${selectedRibbon.name} · ${charmNames}${mark}`
  }, [
    activeCharms,
    initials,
    selectedPaper.name,
    selectedRibbon.name,
    selectedSize.label,
    selectedTone.name,
  ])

  const toggleCharm = (id: string) => {
    setSelectedCharms((prev) => {
      if (prev.includes(id)) return prev.filter((c) => c !== id)
      if (prev.length >= 3) return [...prev.slice(1), id]
      return [...prev, id]
    })
  }

  const goNext = () => {
    if (stepIndex < stepOrder.length - 1) setStep(stepOrder[stepIndex + 1])
  }

  const goBack = () => {
    if (stepIndex > 0) setStep(stepOrder[stepIndex - 1])
  }

  const finish = () => {
    onCompose(summary)
    document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="compose" className="relative overflow-hidden bg-cream py-24 md:py-32">
      <div className="absolute inset-0 opacity-[0.07]">
        <img
          src={images.workshopTable}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream/95 to-cream-warm" />

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 lg:px-10">
        <Reveal>
          <p className="eyebrow mb-4">Live workshop</p>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="display max-w-2xl text-4xl md:text-5xl lg:text-6xl">
              Customize like you’re at the table.
            </h2>
            <p className="max-w-sm text-muted">
              Watch a real journal take shape — leather grain, pages, cord, and
              gold charms update as you choose.
            </p>
          </div>
        </Reveal>

        <div className="mt-10">
          <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-muted">
            <span>
              Step {stepIndex + 1} / {stepOrder.length}
            </span>
            <span>{workshopSteps[stepIndex].hint}</span>
          </div>
          <div className="h-[2px] w-full bg-cream-deep">
            <motion.div
              className="h-full bg-burgundy"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {workshopSteps.map((item, i) => {
              const done = i < stepIndex
              const current = i === stepIndex
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setStep(item.id)}
                  className={`shrink-0 border px-3 py-1.5 text-xs uppercase tracking-[0.16em] transition ${
                    current
                      ? 'border-burgundy bg-burgundy text-cream'
                      : done
                        ? 'border-burgundy/30 text-burgundy'
                        : 'border-line text-muted'
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-12 lg:gap-8">
          <div className="border border-line/80 bg-cream/85 p-5 shadow-lift backdrop-blur-md md:p-7 lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                {step === 'leather' && (
                  <StepBlock title="Choose your leather" copy="Each hide takes light differently.">
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {leatherTones.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setTone(item.id)}
                          className={`group relative overflow-hidden border p-2.5 text-left transition ${
                            tone === item.id
                              ? 'border-burgundy'
                              : 'border-line hover:border-burgundy/35'
                          }`}
                        >
                          <span
                            className="relative mb-3 block aspect-[4/5] w-full overflow-hidden"
                            style={{ background: item.hex }}
                          >
                            <span className="absolute inset-0 bg-gradient-to-br from-white/15 to-black/30" />
                            <span className="absolute inset-0 opacity-30 mix-blend-multiply bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 120 120%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.55%22/%3E%3C/svg%3E')]" />
                          </span>
                          <span className="block text-sm text-burgundy">{item.name}</span>
                          {tone === item.id && (
                            <span className="absolute right-2 top-2 grid h-5 w-5 place-items-center bg-cream text-burgundy">
                              <Check size={12} />
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </StepBlock>
                )}

                {step === 'size' && (
                  <StepBlock title="Pick the size" copy="See the real scale change on the bench.">
                    <div className="grid gap-3">
                      {journalSizes.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setSize(item.id)}
                          className={`flex items-center justify-between border px-4 py-4 text-left transition ${
                            size === item.id
                              ? 'border-burgundy bg-cream-warm'
                              : 'border-line hover:border-burgundy/35'
                          }`}
                        >
                          <span>
                            <span className="block font-display text-3xl text-burgundy">
                              {item.label}
                            </span>
                            <span className="text-sm text-muted">{item.detail}</span>
                          </span>
                          <span
                            className="border border-black/10 shadow-sm"
                            style={{
                              width: item.id === 'a6' ? 34 : item.id === 'a5' ? 42 : 50,
                              height: item.id === 'a6' ? 46 : item.id === 'a5' ? 56 : 66,
                              background: selectedTone.hex,
                            }}
                          />
                        </button>
                      ))}
                    </div>
                  </StepBlock>
                )}

                {step === 'paper' && (
                  <StepBlock title="Choose the paper" copy="Pages peek from the folio as you switch.">
                    <div className="grid gap-3">
                      {paperStyles.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setPaper(item.id)}
                          className={`border px-4 py-4 text-left transition ${
                            paper === item.id
                              ? 'border-burgundy bg-cream-warm'
                              : 'border-line hover:border-burgundy/35'
                          }`}
                        >
                          <span className="block font-display text-2xl text-burgundy">
                            {item.name}
                          </span>
                          <span className="text-sm text-muted">{item.detail}</span>
                          <PaperCard type={item.id} />
                        </button>
                      ))}
                    </div>
                  </StepBlock>
                )}

                {step === 'charms' && (
                  <StepBlock
                    title="Decorate the cover"
                    copy="Up to three gold charms and a wrapping cord."
                  >
                    <p className="mb-3 text-sm text-burgundy">Charms</p>
                    <div className="mb-6 grid grid-cols-3 gap-3">
                      {charms.map((item) => {
                        const on = selectedCharms.includes(item.id)
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => toggleCharm(item.id)}
                            className={`border px-3 py-4 text-center transition ${
                              on
                                ? 'border-burgundy bg-cream-warm'
                                : 'border-line hover:border-burgundy/35'
                            }`}
                          >
                            <span className="mx-auto grid place-items-center">
                              <CharmMark id={item.id} className="h-9 w-9" />
                            </span>
                            <span className="mt-2 block text-xs text-burgundy">
                              {item.name}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                    <p className="mb-3 text-sm text-burgundy">Cord / ribbon</p>
                    <div className="grid grid-cols-2 gap-3">
                      {ribbons.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setRibbon(item.id)}
                          className={`flex items-center gap-3 border px-3 py-3 text-left transition ${
                            ribbon === item.id
                              ? 'border-burgundy'
                              : 'border-line hover:border-burgundy/35'
                          }`}
                        >
                          <span
                            className="h-2.5 w-12 rounded-full shadow-sm"
                            style={{
                              background:
                                item.id === 'cream'
                                  ? `repeating-linear-gradient(90deg, ${item.hex}, ${item.hex} 5px, #e8dfd2 5px, #e8dfd2 9px)`
                                  : item.hex,
                            }}
                          />
                          <span className="text-sm text-burgundy">{item.name}</span>
                        </button>
                      ))}
                    </div>
                  </StepBlock>
                )}

                {step === 'mark' && (
                  <StepBlock title="Make it yours" copy="Embossed initials on the cover.">
                    <label className="block">
                      <span className="mb-3 block text-sm text-burgundy">
                        Initials (max 3)
                      </span>
                      <input
                        value={initials}
                        onChange={(e) =>
                          setInitials(
                            e.target.value.replace(/[^a-zA-Z]/g, '').slice(0, 3),
                          )
                        }
                        placeholder="e.g. AK"
                        className="field font-display text-3xl tracking-[0.24em] uppercase"
                        maxLength={3}
                      />
                    </label>
                    <p className="mt-4 text-sm text-muted">
                      Leave blank for a clean cover — you can still note gifts in
                      the order form.
                    </p>
                  </StepBlock>
                )}

                {step === 'review' && (
                  <StepBlock
                    title="Your workshop piece"
                    copy="Ready? Send this build into the order."
                  >
                    <ul className="space-y-3 text-sm text-burgundy">
                      <ReviewRow label="Leather" value={selectedTone.name} />
                      <ReviewRow label="Size" value={selectedSize.label} />
                      <ReviewRow label="Paper" value={selectedPaper.name} />
                      <ReviewRow label="Ribbon" value={selectedRibbon.name} />
                      <ReviewRow
                        label="Charms"
                        value={activeCharms.map((c) => c.name).join(', ') || 'None'}
                      />
                      <ReviewRow
                        label="Initials"
                        value={initials.trim().toUpperCase() || 'None'}
                      />
                    </ul>
                  </StepBlock>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-between gap-3 border-t border-line pt-5">
              <button
                type="button"
                onClick={goBack}
                disabled={stepIndex === 0}
                className="btn-ghost !py-2.5 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowLeft size={16} />
                Back
              </button>
              {step === 'review' ? (
                <button type="button" onClick={finish} className="btn-primary !py-2.5">
                  Use in order
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button type="button" onClick={goNext} className="btn-primary !py-2.5">
                  Next
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative overflow-hidden border border-line bg-[#ebe3d6] shadow-soft">
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage: `
                    radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.55), transparent 45%),
                    radial-gradient(ellipse at 70% 80%, rgba(51,10,16,0.08), transparent 50%)
                  `,
                }}
              />
              <div className="relative px-5 pb-8 pt-6 md:px-10 md:pb-10 md:pt-8">
                <div className="mb-2 flex items-center justify-between">
                  <p className="eyebrow">Bench preview</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted">
                    {selectedSize.label} · {selectedTone.name}
                  </p>
                </div>

                <JournalPreview
                  leatherHex={selectedTone.hex}
                  sizeId={selectedSize.id}
                  paper={paper}
                  ribbonHex={selectedRibbon.hex}
                  ribbonId={selectedRibbon.id}
                  charms={activeCharms}
                  initials={initials}
                />

                <div className="mx-auto mt-8 max-w-md border border-burgundy/10 bg-cream/75 px-4 py-3 backdrop-blur-sm">
                  <p className="eyebrow">Current build</p>
                  <p className="mt-2 text-sm leading-relaxed text-burgundy">{summary}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StepBlock({
  title,
  copy,
  children,
}: {
  title: string
  copy: string
  children: ReactNode
}) {
  return (
    <div>
      <h3 className="display text-3xl md:text-4xl">{title}</h3>
      <p className="mb-6 mt-2 text-sm text-muted">{copy}</p>
      {children}
    </div>
  )
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex items-center justify-between gap-4 border-b border-line pb-3">
      <span className="text-muted">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </li>
  )
}

function PaperCard({ type }: { type: 'lined' | 'blank' | 'dotted' }) {
  return (
    <div className="mt-3 h-14 border border-line bg-[#f7f1e7]">
      {type === 'lined' && (
        <div
          className="h-full opacity-50"
          style={{
            backgroundImage:
              'repeating-linear-gradient(to bottom, transparent 0 10px, rgba(51,10,16,0.25) 10px 11px)',
          }}
        />
      )}
      {type === 'dotted' && (
        <div
          className="h-full opacity-50"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(51,10,16,0.3) 1px, transparent 1.2px)',
            backgroundSize: '10px 12px',
          }}
        />
      )}
    </div>
  )
}
