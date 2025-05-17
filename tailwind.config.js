/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neutral: {
          900: "#141D2F",
          800: "#1E2A47",
          700: "#2B3442",
          500: "#4B6A9B",
          300: "#697C9A",
          200: "#90A4D4",
          100: "#F6F8FF",
          0: "#FFFFFF",
        },
        blue: {
          300: "#60ABFF",
          500: "#0079FF",
        },
        red: {
          500: "#F74646",
        },
      },
      fontFamily: {
        mono: ["Space Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
