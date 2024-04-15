/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      width: {
        w60: "60px",
        w45: "45px",
      },
      height: {
        h60: "60px",
        180: "180px",
      },
      backgroundColor: {
        overview: "rgba(0,0,0,0.5)",
      },
      margin: {
        300: "300px",
      },
    },
  },
  plugins: [],
};
