/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        '2xs': {'max': '400px'},
      }
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark", "emerald", "forest"],
  },
}

