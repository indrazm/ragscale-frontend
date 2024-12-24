// tailwind.config.js
import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      layout: {
        borderWidth: {
          small: "0.5px",
          medium: "1px",
          large: "2px",
        },
        radius: {
          small: "4px",
          medium: "6px",
          large: "12px",
        },
      },
    }),
  ],
};
