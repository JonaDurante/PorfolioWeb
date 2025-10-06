module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,cjs}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#f8fafc",
        foreground: "#22223b",
      },
      keyframes: {
        "star-movement-bottom": {
          "0%": { transform: "translate(0%, 0%)", opacity: "1" },
          "100%": { transform: "translate(-100%, 0%)", opacity: "0" },
        },
        "star-movement-top": {
          "0%": { transform: "translate(0%, 0%)", opacity: "1" },
          "100%": { transform: "translate(100%, 0%)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
