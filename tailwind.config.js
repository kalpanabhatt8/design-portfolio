/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    // container: {
    //   center: true,
    //   padding: {
    //     DEFAULT: '1.5rem',
    //     sm: '2rem',
    //     lg: '4rem',
    //     xl: '5rem',
    //     '2xl': '6rem',
    //   },
    // },
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
      colors: {
        light: {
          background: '#F9F9F9',
          primary: '#1C1C1E',
          secondary: '#4A4A4A',
          accent: '#FF800A',
        },
        dark: {
          background: '#030100',
          primary: '#FFFFFF',
          secondary: '#AAAAAA',
          accent: '#FF800A',
        },
      },
    },
  },
  plugins: [],
};