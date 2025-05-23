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
        'hero-pattern': "url('public/Textures/sandpaper.png')",
      },
    },
  },
  plugins: [],
};