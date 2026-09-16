/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: 'var(--cream)',
        'cream-warm': 'var(--cream-warm)',
        'cream-deep': 'var(--cream-deep)',
        burgundy: 'var(--burgundy)',
        'burgundy-soft': 'var(--burgundy-soft)',
        muted: 'var(--muted)',
        line: 'var(--line)',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Figtree"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        brand: '0.22em',
      },
      boxShadow: {
        soft: '0 30px 80px -40px rgba(51, 10, 16, 0.35)',
        lift: '0 18px 50px -28px rgba(51, 10, 16, 0.28)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
