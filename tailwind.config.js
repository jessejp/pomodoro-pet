/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/interface/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        orangeFlavour: "#FFC222",
      },
      width: {
        128: "32rem",
      },
      height: {
        128: "32rem",
      },
    },
  },
  plugins: [],
};
