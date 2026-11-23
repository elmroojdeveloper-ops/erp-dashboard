/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2578A2",
        "primary-dark": "#004D6C",
        surface: "#ECF4F8",
        muted: "#4D5461",
        deep: "#2B2B2B",
        soft: "#BFC7CF",
        warm: "#C6E7FF",
        rich: "#15AEDD",
        gray: "#6D717F",
        "cool-gray": "#E6E8EC",
        danger: "#BA1A1A",
        warning: "#C0824A",
      },
      fontFamily: {
        cairo: ["var(--font-cairo)", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 20px rgba(37, 120, 162, 0.08)",
      },
    },
  },
  plugins: [],
};
