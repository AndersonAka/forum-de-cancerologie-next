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
        'bleu-roche': '#003F9B',
        'rose-strong': '#FF005C',
        'rose-medium': '#FF71A4',
        'rose-small': '#FFA1C7',
        'kaki': '#C6A258',
        'gray': '#777777',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 