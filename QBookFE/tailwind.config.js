/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        'calc-100-minus-40': 'calc(100% - 40px)'
      },
      height: {
        'calc-100-minus-80': 'calc(100% - 80px)',
      }
    },
  },
  plugins: [],
}

