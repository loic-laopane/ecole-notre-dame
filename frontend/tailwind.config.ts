import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy:   '#1c2b45',
        gold:   '#c9a84c',
        gold2:  '#e8cf85',
        sky:    '#4e8fb8',
        rose:   '#b86070',
        sage:   '#7aaa8a',
        cream:  '#faf7f2',
        muted:  '#7a7a8a',
        border: '#e8e4dc',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body:    ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up':    'fadeUp .6s ease both',
        'fade-left':  'fadeInLeft .8s ease both',
        'fade-right': 'fadeInRight .8s ease both',
      },
      keyframes: {
        fadeUp:      { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'none' } },
        fadeInLeft:  { from: { opacity: '0', transform: 'translateX(-25px)' }, to: { opacity: '1', transform: 'none' } },
        fadeInRight: { from: { opacity: '0', transform: 'translateX(25px)' }, to: { opacity: '1', transform: 'none' } },
      },
    },
  },
  plugins: [],
}

export default config
