// tailwind.config.js
import { nextui } from "@nextui-org/react";
import twTypography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    twTypography,
    nextui({
      layout: {
        boxShadow: {
          small: "0 0px 2px 0 rgba(0, 0, 0, 0.15)",
          medium: "0 0px 4px 0 rgba(0, 0, 0, 0.15)",
          large: "0 0px 8px 0 rgba(0, 0, 0, 0.15)",
        },
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
