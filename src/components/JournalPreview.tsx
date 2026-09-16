import { motion } from 'framer-motion'
import { CharmMark } from './CharmMark'

export type PreviewCharm = {
  id: string
  name: string
}

type Props = {
  leatherHex: string
  sizeId: string
  paper: 'lined' | 'blank' | 'dotted'
  ribbonHex: string
  ribbonId: string
  charms: PreviewCharm[]
  initials: string
}

export function JournalPreview({
  leatherHex,
  sizeId,
  paper,
  ribbonHex,
  ribbonId,
  charms,
  initials,
}: Props) {
  const scale = sizeId === 'a6' ? 0.78 : sizeId === 'a5' ? 0.9 : 1

  return (
    <div className="relative mx-auto flex w-full max-w-[340px] items-end justify-center pb-2 pt-8">
      <div className="absolute inset-x-6 bottom-0 h-10 rounded-[100%] bg-burgundy/15 blur-xl" />

      <motion.div
        key={sizeId + leatherHex}
        initial={{ opacity: 0.5, y: 18, rotate: -4 }}
        animate={{ opacity: 1, y: 0, rotate: -2 }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ scale }}
        className="relative origin-bottom"
      >
        <div className="absolute -right-2 top-3 bottom-3 w-[94%] rounded-r-[3px] bg-[#f4eee4] shadow-[4px_6px_18px_rgba(51,10,16,0.18)]">
          <div className="absolute inset-y-2 left-0 w-[2px] bg-[#e7dccb]" />
          <div className="absolute inset-y-2 left-[3px] w-px bg-[#d9cdb8]/40" />
          <PaperFill type={paper} />
        </div>

        <div
          className="relative aspect-[3/4] w-[250px] overflow-hidden rounded-[3px] shadow-[0_28px_50px_-24px_rgba(51,10,16,0.55)] sm:w-[280px]"
          style={{ background: leatherHex }}
        >
          <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-40 mix-blend-multiply">
            <filter id="leatherGrain">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.9"
                numOctaves="4"
                stitchTiles="stitch"
              />
              <feColorMatrix type="saturate" values="0" />
              <feComponentTransfer>
                <feFuncA type="table" tableValues="0 0.55" />
              </feComponentTransfer>
            </filter>
            <rect width="100%" height="100%" filter="url(#leatherGrain)" />
          </svg>

          <div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(115deg, rgba(255,255,255,0.16) 0%, transparent 34%, transparent 62%, rgba(0,0,0,0.28) 100%),
                linear-gradient(180deg, rgba(255,255,255,0.08), transparent 28%, rgba(0,0,0,0.22))
              `,
            }}
          />

          <div className="absolute inset-y-0 left-0 w-[14%] bg-gradient-to-r from-black/35 via-black/10 to-transparent" />
          <div className="absolute inset-y-[6%] left-[11%] w-px bg-black/25" />
          <div className="absolute inset-y-[8%] left-[8%] flex flex-col justify-between py-2">
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} className="h-[3px] w-[3px] rounded-full bg-black/25" />
            ))}
          </div>

          <div
            className="absolute inset-[10px] border border-dashed opacity-25"
            style={{ borderColor: 'rgba(255,255,255,0.55)' }}
          />

          <div
            className="absolute left-[8%] right-[8%] top-[18%] h-[7px] rounded-full shadow-sm"
            style={{
              background:
                ribbonId === 'cream'
                  ? `repeating-linear-gradient(90deg, ${ribbonHex}, ${ribbonHex} 6px, #e8dfd2 6px, #e8dfd2 10px)`
                  : `linear-gradient(180deg, ${lighten(ribbonHex, 18)}, ${ribbonHex} 45%, ${darken(ribbonHex, 18)})`,
              boxShadow: '0 1px 2px rgba(0,0,0,0.25)',
            }}
          />
          <div
            className="absolute bottom-[16%] left-[42%] right-[8%] h-[4px] origin-left -rotate-[8deg] rounded-full opacity-90"
            style={{ background: ribbonHex }}
          />

          <div className="absolute right-[10%] top-[18%]">
            {charms.map((charm, i) => (
              <motion.div
                key={charm.id}
                initial={{ y: -8, opacity: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, type: 'spring', stiffness: 180, damping: 14 }}
                className="relative"
                style={{ marginTop: i === 0 ? 10 : 2, marginLeft: i * 10 }}
              >
                <div
                  className="mx-auto h-4 w-px"
                  style={{
                    background: `linear-gradient(${ribbonHex}, ${darken(ribbonHex, 20)})`,
                  }}
                />
                <CharmMark
                  id={charm.id}
                  className="h-8 w-8 drop-shadow-[0_2px_3px_rgba(0,0,0,0.35)]"
                />
              </motion.div>
            ))}
          </div>

          <div className="absolute right-[18%] top-[46%] h-7 w-7 -translate-y-1/2 rounded-full border border-[#d7b56a]/70 bg-gradient-to-br from-[#f0d89a] via-[#c6a15b] to-[#8a6a2e] shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
            <div className="absolute inset-[5px] rounded-full border border-[#8a6a2e]/40 bg-[#c6a15b]/30" />
          </div>

          <div className="absolute bottom-8 left-0 right-0 text-center">
            <p className="text-[9px] uppercase tracking-[0.35em] text-white/45">Aevora 97</p>
            {initials.trim() ? (
              <motion.p
                key={initials}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 font-display text-4xl tracking-[0.28em] text-white/80"
                style={{
                  textShadow: '0 1px 0 rgba(255,255,255,0.15), 0 -1px 0 rgba(0,0,0,0.45)',
                }}
              >
                {initials.trim().toUpperCase()}
              </motion.p>
            ) : (
              <p className="mt-3 font-display text-2xl tracking-[0.08em] text-white/35">
                {sizeId.toUpperCase()}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function PaperFill({ type }: { type: 'lined' | 'blank' | 'dotted' }) {
  if (type === 'blank') {
    return <div className="absolute inset-3 bg-[#f7f1e7]/80" />
  }

  if (type === 'dotted') {
    return (
      <div
        className="absolute inset-3 opacity-50"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(51,10,16,0.28) 1px, transparent 1.2px)',
          backgroundSize: '10px 12px',
        }}
      />
    )
  }

  return (
    <div
      className="absolute inset-3 opacity-45"
      style={{
        backgroundImage:
          'repeating-linear-gradient(to bottom, transparent 0 11px, rgba(51,10,16,0.2) 11px 12px)',
      }}
    />
  )
}

function lighten(hex: string, amount: number) {
  return mix(hex, '#ffffff', amount)
}

function darken(hex: string, amount: number) {
  return mix(hex, '#000000', amount)
}

function mix(hex: string, other: string, amount: number) {
  const a = toRgb(hex)
  const b = toRgb(other)
  const t = Math.min(100, Math.max(0, amount)) / 100
  const r = Math.round(a.r + (b.r - a.r) * t)
  const g = Math.round(a.g + (b.g - a.g) * t)
  const bl = Math.round(a.b + (b.b - a.b) * t)
  return `rgb(${r}, ${g}, ${bl})`
}

function toRgb(hex: string) {
  const clean = hex.replace('#', '')
  const full =
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  }
}
