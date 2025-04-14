/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-rose': '#BE233D',
        'soft-gold': '#E5CD7B',
        'teal': '#73B2AC',
        'slate-lavender': '#ABBAD1',
        'steel-navy': '#718BA4',
      },
      borderRadius: {
        '2xl': '1rem',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
    fontFamily: {
      'sans': ['Poppins', 'Open Sans', 'sans-serif'],
      'serif': ['Georgia', 'serif'],
    },
  },
  plugins: [],
}
