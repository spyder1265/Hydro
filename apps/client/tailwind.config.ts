import type { Config } from 'tailwindcss'

const {
  default: flattenColorPalette
} = require('tailwindcss/lib/util/flattenColorPalette')

const config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {}
  },
  plugins: [addVariablesForColors]
} satisfies Config

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme('colors'))
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  )

  addBase({
    ':root': newVars
  })
}

export default config
