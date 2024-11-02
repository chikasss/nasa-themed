/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans', 'sans-serif'],
      },
      backgroundImage: {
        'landing-main': "url('/images/landing-main.jpg')",
      },
    },
  },
  plugins: [],
}
