const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-parisienne)', ...fontFamily.sans],
        serif: ['var(--font-lora)', ...fontFamily.serif],
      },
    },
  },
  daisyui: {
    themes: ["garden"],
  },

  plugins: [require("daisyui")],
}
