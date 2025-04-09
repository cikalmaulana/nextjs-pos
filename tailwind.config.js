/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/toolbox/**/*.{js,ts,jsx,tsx,mdx}',
    './src/library/**/*.{js,ts,jsx,tsx,mdx}',
    './src/registry/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'paw-blue': '#4070ED',
        'paw-blue-light': '#7595E0',
        'paw-blue-dark': '#2A4D99',
        'paw-grey': '#959595',
        'paw-grey-light': '#F5F5F5',
        'paw-bg-primary': '#F7FBFE',
        'paw-danger': '#EF4444',
        'background': '#ffffff',
        'foreground': '#171717',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

module.exports = config
