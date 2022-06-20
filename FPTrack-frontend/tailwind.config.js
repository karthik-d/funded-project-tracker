/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  screens: {
    sm: "480px",
    md: "768px",
    lg: "976px",
    xl: "1440px",
  },
  theme: {
    //https://www.hexcolortool.com/#345ca8
    extend: {
      colors: {
        ocean_darkblue: "hsla(219, 53%, 43%, 1)",
        ocean_blue: "hsla(205, 54%, 50%, 1)",
        ocean_lightblue: "hsla(197, 69%, 58%, 1)",
        ocean_yellow: "hsla(27, 53%, 87%, 1)",
        sunset_blue: "hsla(208, 40%, 35%, 1)",
        sunset_purple: "hsla(285, 15%, 42%, 1)",
        sunset_pink: "hsla(342, 43%, 60%, 1)",
        sunset_orange: "hsla(354, 100%, 73%, 1)",
      },
    },
  },
  plugins: [],
};
