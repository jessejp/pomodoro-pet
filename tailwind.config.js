/** @type {import('tailwindcss').Config} */

import scrollbarplugin from "tailwind-scrollbar";

export default {
  content: ["./index.html", "./src/interface/**/*.{ts,tsx}"],
  theme: {
    screens: {
      short: { raw: "(max-height: 800px)" },
      xshort: { raw: "(max-height: 560px)" },
      thin: { raw: "(max-width: 990px)" },
      xl: "1280px",
      "2xl": "1536px",
    },
    fontSize: {
      sm: "16px",
      md: "20px",
      lg: "28px",
      xl: "34px",
      "2xl": "40px",
    },
    fontFamily: {
      sans: ["Work Sans", "ui-sans-serif"],
    },
    extend: {
      colors: {
        orangeFlavour: "#FFC222",
        "primary-100": "#FDE2DB",
        "primary-200": "#FBC5B8",
        "secondary-100": "#FFFAE4",
        "secondary-200": "#FFF5C8",
        "secondary-500": "#FFE576",
        "tertiary-200": "#F1D3B1",
        "tertiary-300": "#EBBE8A",
        "tertiary-600": "#B17530",
        "tertiary-700": "#855824",
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
        screen: ["100vh", "100svh"],
        128: "32rem",
        canvasContainer: "70vh",
        menuContainer: "30vh",
        fullMobileScreen: ["100vh", "100svh"],
      },
      minHeight: {
        160: "40rem",
        170: "42.5rem",
      },
      gridTemplateColumns: {
        sessionlog: "6rem 16rem minmax(2rem, 6rem)",
        sessionlogMobile: "6rem minmax(8rem, 16rem) minmax(2rem, 6rem)",
        startScreenBg: "1fr 32rem 1fr",
      },
      gridTemplateRows: {
        startScreenInputs: "repeat(3, minmax(auto, 1fr))",
      },
      backgroundImage: {
        "orange-circle-gradient":
          "radial-gradient(circle, var(--tw-gradient-stops))",
      },
      animation: {
        "text-bubble-appear": "textBubbleAppear 6s linear forwards",
        "pulsate-active-round-color":
          "pulsateActiveRoundColor 5.25s ease-in-out infinite",
      },
      keyframes: {
        textBubbleAppear: {
          "0%": { opacity: 0, transform: "scale(0.4)" },
          "45%": { opacity: 0, transform: "scale(0.4)" },
          "50%": { opacity: 1, transform: "scale(1)" },
          "95%": { opacity: 1, transform: "scale(1)" },
          "100%": { opacity: 0, transform: "scale(0.4)" },
        },
        pulsateActiveRoundColor: {
          "0%": { backgroundColor: "hsla(11, 90%, 93%, 1)" },
          "50%": { backgroundColor: "hsla(11, 90%, 85%, 1)" },
          "100%": { backgroundColor: "hsla(11, 90%, 93%, 1)" },
        },
      },
      boxShadow: {
        radioButtonInset: "inset 1em 1em var(--tw-shadow-color)",
      },
    },
  },
  plugins: [
    "prettier-plugin-tailwindcss",
    scrollbarplugin({ nocompatible: true }),
  ],
};
