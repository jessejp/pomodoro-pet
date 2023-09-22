/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/interface/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        orangeFlavour: "#FFC222",
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
    safelist: [
      {
        pattern: /scale-./,
      },
    ],
  },
  plugins: [],
};
