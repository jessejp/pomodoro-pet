/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/interface/**/*.{ts,tsx}"],
  theme: {
    screens: {
      'short': { 'raw': '(max-height: 800px)' },
      'thin': { 'raw': '(max-width: 760px)' },	
    },
    fontSize:{
      base: "16px",
      md: '20px',
      lg: "28px",
      xl: "34px",
    },
    fontFamily:{
      'sans': ["Work Sans", "ui-sans-serif"],
    },
    extend: {
      colors: {
        orangeFlavour: "#FFC222",
        "primary-100": "#FDE2DB",
        "secondary-100": "#FFFAE4",
        "secondary-200": "#FFF5C8",
        "secondary-500": "#FFE576",
        "tertiary-300": "#EBBE8A",
        "tertiary-500": "#855824",
        "tertiary-800": "#583A18",
        "tertiary-900": "#2C1D0C",
        "accent-400": "#A3C982",
        "accent-500": "#8CBB63",
        "cool-150": "#CAE1D9",
        "cool-200": "#B9D7CD",
      },
      borderWidth: {
        6: "6px",
      },
      spacing: {
        "1/14": `${(1 / 14) * 100}%`,
        "1/20": `${(1 / 20) * 100}%`,
      },
      width: {
        128: "32rem",
      },
      height: {
        128: "32rem",
        canvasContainer: "70vh",
        menuContainer: "30vh",
        fullMobileScreen: ["100vh", "100svh"],
      },
      minHeight: {
        160: "40rem",
        170: "42.5rem",
      },
      backgroundImage: {
        "orange-circle-gradient":
          "radial-gradient(circle, var(--tw-gradient-stops))",
      },
      animation: {
        "text-bubble-appear": "textBubbleAppear 6s linear forwards",
      },
      keyframes: {
        textBubbleAppear: {
          "0%": { opacity: 0, transform: "scale(0.4)" },
          "45%": { opacity: 0, transform: "scale(0.4)" },
          "50%": { opacity: 1, transform: "scale(1)" },
          "95%": { opacity: 1, transform: "scale(1)" },
          "100%": { opacity: 0, transform: "scale(0.4)" },
        },
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
