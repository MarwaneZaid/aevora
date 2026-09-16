type Props = {
  id: string
  className?: string
}

export function CharmMark({ id, className = 'h-8 w-8' }: Props) {
  if (id === 'sun') {
    return (
      <svg viewBox="0 0 32 32" className={className} aria-hidden>
        <defs>
          <linearGradient id={`gSun-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f3d58a" />
            <stop offset="100%" stopColor="#a8782c" />
          </linearGradient>
        </defs>
        <circle cx="16" cy="16" r="6" fill={`url(#gSun-${id})`} />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * Math.PI) / 4
          return (
            <line
              key={i}
              x1={16 + Math.cos(a) * 8}
              y1={16 + Math.sin(a) * 8}
              x2={16 + Math.cos(a) * 13}
              y2={16 + Math.sin(a) * 13}
              stroke={`url(#gSun-${id})`}
              strokeWidth="2"
              strokeLinecap="round"
            />
          )
        })}
      </svg>
    )
  }

  if (id === 'star') {
    return (
      <svg viewBox="0 0 32 32" className={className} aria-hidden>
        <defs>
          <linearGradient id="gStarMark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f0d89a" />
            <stop offset="100%" stopColor="#9a7028" />
          </linearGradient>
        </defs>
        <path
          d="M16 4l2.8 8.2H28l-7 5.2 2.7 8.2L16 20.8 8.3 25.6 11 17.4 4 12.2h9.2z"
          fill="url(#gStarMark)"
        />
      </svg>
    )
  }

  if (id === 'heart') {
    return (
      <svg viewBox="0 0 32 32" className={className} aria-hidden>
        <defs>
          <linearGradient id="gHeartMark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f0d089" />
            <stop offset="100%" stopColor="#8f6524" />
          </linearGradient>
        </defs>
        <path
          d="M16 27s-10-6.4-10-14.2C6 8.4 9.2 6 12.4 6c1.9 0 3.5 1 3.6 2.4C16.1 7 17.7 6 19.6 6 22.8 6 26 8.4 26 12.8 26 20.6 16 27 16 27z"
          fill="url(#gHeartMark)"
        />
      </svg>
    )
  }

  if (id === 'moon') {
    return (
      <svg viewBox="0 0 32 32" className={className} aria-hidden>
        <defs>
          <linearGradient id="gMoonMark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f4dea0" />
            <stop offset="100%" stopColor="#9b7129" />
          </linearGradient>
        </defs>
        <path
          d="M20 6a10 10 0 1 0 6 17.4A11 11 0 1 1 20 6z"
          fill="url(#gMoonMark)"
        />
      </svg>
    )
  }

  if (id === 'key') {
    return (
      <svg viewBox="0 0 32 32" className={className} aria-hidden>
        <defs>
          <linearGradient id="gKeyMark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#efd392" />
            <stop offset="100%" stopColor="#8d6622" />
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="5" fill="none" stroke="url(#gKeyMark)" strokeWidth="2.4" />
        <path
          d="M16 14l10 10M22 20l3 1M20 22l3 1"
          stroke="url(#gKeyMark)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <defs>
        <radialGradient id="gPearlMark" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#fff8ea" />
          <stop offset="55%" stopColor="#e8d7a8" />
          <stop offset="100%" stopColor="#a98945" />
        </radialGradient>
      </defs>
      <circle cx="16" cy="16" r="7" fill="url(#gPearlMark)" />
    </svg>
  )
}
