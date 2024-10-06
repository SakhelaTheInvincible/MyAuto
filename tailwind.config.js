/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        mainxl: "1050px",
      },
    },
    fontFamily: {
      'Noto': ['Noto Sans Georgian'],
      'helvetica': ['Helvetica Neue LT GEO', 'Arial', 'sans-serif']
    },
  },
  variants: {
    scrollbar: ["rounded-md", "dark"],
  },
  plugins: [
    require("tailwind-scrollbar"), // Enable scrollbar plugin
  ],
};
