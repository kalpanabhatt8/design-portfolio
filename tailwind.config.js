// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}", // You can include ts,tsx only if you're using TS
    "./public/index.html"
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 10s linear infinite'
      }
    }
  },
  plugins: []
};
