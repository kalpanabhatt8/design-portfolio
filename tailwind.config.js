/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 4s linear infinite'
      },
      backgroundImage: {
        'hero-pattern': "url('/Textures/grid-texture.png')",
      },
      fontFamily: {
        heading: ['"Bricolage Grotesque"', 'sans-serif'],
        body: ['"General Sans"', 'sans-serif'],
      },
      fontSize: {
        'hero-heading': ['4.5rem', { lineHeight: '1.1' }],
      },
      textShadow: {
        'strong': '2px 2px 0 #000',
      },
    },
  },
  plugins: [],
};