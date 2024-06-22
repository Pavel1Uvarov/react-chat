/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    function ({ addUtilities, e, theme, variants }) {
      const newUtilities = {
        ".scrollbar-thin": {
          "scrollbar-width": "thin",
        },
        ".scrollbar-none": {
          "scrollbar-width": "none",
        },
        ".scrollbar": {
          "scrollbar-color": `${theme("colors.scrollbar-thumb")} ${theme(
            "colors.scrollbar-bg"
          )}`,
          "scrollbar-width": "auto",
        },
        ".scrollbar-thumb": {
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme("colors.scrollbar-thumb"),
            borderRadius: "10px",
          },
        },
        ".scrollbar-thumb-hover": {
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: theme("colors.scrollbar-thumb-hover"),
          },
        },
        ".scrollbar-track": {
          "&::-webkit-scrollbar-track": {
            backgroundColor: theme("colors.scrollbar-bg"),
          },
        },
        ".scrollbar-rounded": {
          "&::-webkit-scrollbar-thumb": {
            borderRadius: "10px",
          },
        },
      };

      addUtilities(newUtilities, variants("scrollbar"));
    },
    require("tailwindcss-animate"),
  ],
};
