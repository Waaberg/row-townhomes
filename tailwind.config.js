/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        charcoal:     '#1F1F1F',
        'deep-slate': '#2C3138',
        taupe:        '#A89887',
        'taupe-dark': '#7A6852',
        'soft-gray':  '#D9D5CF',
        'off-white':  '#F5F2EC',
        champagne:    '#C9A97A',
        gold:         '#B08D57',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}