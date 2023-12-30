import type { Config } from 'tailwindcss'
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'image-colors': "url('/img/background-color.svg')",
      },
      colors: {
        ebony: {
          50: '#e8f8ff',
          100: '#d6f0ff',
          200: '#b5e3ff',
          300: '#88cdff',
          400: '#59aaff',
          500: '#3485ff',
          600: '#115bff',
          700: '#074ffb',
          800: '#0a46c9',
          900: '#12419d',
          950: '#040d21',
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}

export default config
