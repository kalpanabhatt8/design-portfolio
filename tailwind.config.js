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
      fontFamily: {
        heading: ['"Bricolage Grotesque"', 'sans-serif'],
        body: ['"Outfit"', 'sans-serif'],
      },
        animation: {
    'fade-in': 'fadeIn 0.8s ease-out forwards',
  },
  keyframes: {
    fadeIn: {
      '0%': { opacity: 0, transform: 'translateY(10px)' },
      '100%': { opacity: 1, transform: 'translateY(0)' },
    },
  },
    animation: {
    'soft-in': 'softFade 0.8s ease-out forwards',
  },
  keyframes: {
    softFade: {
      '0%': { opacity: 0, transform: 'translateY(10px) scale(0.95)' },
      '100%': { opacity: 1, transform: 'translateY(0) scale(1)' },
    },
  },
    },
  },
  plugins: [],
};