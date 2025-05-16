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
      spacing: {
        "025": "2px",
        "050": "4px",
        "075": "6px",
        100: "8px",
        125: "10px",
        150: "12px",
        200: "16px",
        250: "20px",
        300: "24px",
        400: "32px",
        500: "40px",
        600: "48px",
        800: "64px",
        1000: "80px",
      },
      radius: {
        0: 0,
        4: "4px",
        6: "6px",
        8: "4px",
        10: "4px",
        12: "4px",
        16: "4px",
        20: "4px",
        24: "4px",
        full: "4px",
      },
    },
  },
  plugins: [],
};
