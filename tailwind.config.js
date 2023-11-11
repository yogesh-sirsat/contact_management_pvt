/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "2xs": { max: "400px" },
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "forest",
      "black",
      "pastel",
      "wireframe",
      "luxury",
      "dracula",
      "business",
      "night",
    ],
  },
};
