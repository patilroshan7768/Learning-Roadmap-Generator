/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // <-- This line enables dark mode
  theme: {
    extend: {
      colors: {
        secondary: '#1abc9c',
        darkBg: '#2c3e50',
        lightBg: '#f8f9fa'
      }
    },
  },
  plugins: [],
}