/** @type {import('tailwindcss').Config} */

import scrollbarplugin from "tailwind-scrollbar";

export default {
  content: [
    "./index.html",
    "./src/interface/**/*.{ts,tsx}",
    "./src/routes/**/*.{ts,tsx}",
    "./src/App.tsx",
  ],
  theme: {
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
        "primary-150": "#FCCFC5",
        "primary-200": "#FBC5B8",
        "primary-300": "#FAA794",
        "primary-400": "#F88A71",
        "primary-500": "#F66D4D",
        "primary-700": "#9E442F",
        "secondary-100": "#FFFAE4",
        "secondary-200": "#FFF5C8",
        "secondary-300": "#FFEFAD",
        "secondary-500": "#FFE576",
        "secondary-600": "#DBC45E",
        "tertiary-200": "#F1D3B1",
        "tertiary-300": "#EBBE8A",
        "tertiary-350": "#ECB679",
        "tertiary-400": "#E4A863",
        "tertiary-500": "#DD923C",
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
      width: {
        1.5: "0.38rem",
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
        innerBlur: "inset 0px 0px 8px 0px var(--tw-shadow-color)",
      },
    },
  },
  plugins: [
    "prettier-plugin-tailwindcss",
    scrollbarplugin({ nocompatible: true }),
  ],
};
