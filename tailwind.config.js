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
      },
      minHeight: {
        160: "40rem",
        170: "42.5rem",
      },
      backgroundImage: {
        "orange-circle-gradient":
          "radial-gradient(circle, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
