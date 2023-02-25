/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      lato: ['Lato', 'sans-serif']
    },
    colors: {
      'light': '#EAEFF2',
      'white': '#ffffff',
      'black': '#000000',
      'cyan': '#00e0d4',
      'red': '#ff4500'
    },
    boxShadow: {
      "light-card":
        "-8px -8px 16px 0 rgba(255, 255, 255, 0.4), 12px 12px 16px 0 rgba(0, 0, 0, .15)",
      "light-field":
        "-8px -8px 8px 0 rgba(255, 255, 255, 0.4) inset, 6px 6px 8px 0 rgba(0, 0, 0, .15) inset",
      "inverted-light-field":
        "-8px -8px 8px 0 rgba(255, 255, 255, 0.4), 6px 6px 8px 0 rgba(0, 0, 0, .15)"
    },
  },
  plugins: [],
  varients: {
    boxShadow: ['active']
  }
}
