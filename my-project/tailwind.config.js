/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': { 'max': '398px' },
      'md': { 'max': '663px' }
    },
    extend: {},
  },
  plugins: [],
}
