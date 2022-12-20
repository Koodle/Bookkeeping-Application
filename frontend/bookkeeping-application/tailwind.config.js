/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors"); // custom tailwind colors

module.exports = {
  mode: "jit", //just in time mode -> faster build time
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#202225",
        secondary: "#5865f2",
      },
    },
  },
  plugins: [],
};
