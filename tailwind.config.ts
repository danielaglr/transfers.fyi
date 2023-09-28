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
        'transfers': '#00BF78',
        'transfers-light': '#E3FAF1',
        'transfers-dark': '#00AC6D'
      },
      animation: {
        'infinite-scroll': 'infinite-scroll 30s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)', },
          to: { transform: 'translateX(-100%)', },
        },
      },
    },
  },
  plugins: [],
}
export default config
