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
        // Browns pulled from logo
        brown:        '#2C2016',   // dark brown — replaces charcoal
        'brown-mid':  '#4A3728',   // mid brown — hover states, cards
        'brown-light':'#7A5C3A',   // warm medium brown
        taupe:        '#A89060',   // warm taupe/gold — labels, accents
        champagne:    '#C9A97A',   // champagne — CTA buttons
        'off-white':  '#F5F2EC',   // page background
        'cream-warm': '#EDE7D9',   // feature card background
        'soft-gray':  '#D9D5CF',   // borders, dividers
        charcoal:     '#1F1F1F',   // keep for text
        'deep-slate': '#2C3138',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}