/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '940px',
        xl: '940px',
        '2xl': '840px',
      },
    },
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
          foreground: '#FFFFFF',
          text: '#1C1C1E',        // High contrast body text
          muted: '#4A4A4A',        // Secondary, less emphasized
          disabled: '#969696',     // Grayed-out elements
          border: '#E4E4E7',       // Subtle divider lines
          hover: '#2F2F2F',        // Hover on light backgrounds
          accent: '#FF800A',       // Brand highlight
        },
        dark: {
          background: '#030100',
          foreground: '#1C1C1E',
          text: '#FFFFFF',         // Main text
          muted: '#AAAAAA',        // Secondary, less emphasis
          disabled: '#969696',     // Grayed-out states
          border: '#2F2F2F',       // Low-contrast border
          hover: '#F9F9F9',        // Inverse hover for dark bg
          accent: '#FF800A',       // Brand highlight
        },
      },
    },
  },
  plugins: [],
};
