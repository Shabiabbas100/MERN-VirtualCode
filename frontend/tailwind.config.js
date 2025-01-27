/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { screens: {
      'above-850': '850px', // Custom breakpoint for 850px
    },},
  },
  plugins: [],
}

