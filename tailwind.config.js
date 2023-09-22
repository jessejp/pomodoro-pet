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
  plugins: [],
};
