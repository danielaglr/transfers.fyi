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
      }
    },
  },
  plugins: [],
}
export default config
