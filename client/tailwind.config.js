/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js", // <--- Add this line
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#1c1c1c",
        secondary: "#1c2030",
        tertiary: "#f85430",
        accent: "#ebebeb",
        highlight: "#dadada",
        "dark-subtle": "rgba(255, 255, 255, 0.5)",
        "light-subtle": "rgba(39, 39, 39, 0.5)",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      animation: {
        shine: "shine 1s",
        dropdown: "drop-down 1s ease",
        dropdownReverse: "drop-down-reverse 1s ease",
      },
      keyframes: {
        shine: {
          "100%": { left: "125%" },
        },
        dropdown: {
          "0%": { opacity: 0, transform: "translateY(-10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        dropdownReverse: {
          "100%": { opacity: 0, transform: "translateY(-10px)" },
          "0%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
    plugins: [require("tailwind-scrollbar")],
  },
};

/**
 * --blue: #007bff;
--indigo: #6610f2;
--purple: #6f42c1;
--pink: #e83e8c;
--red: #dc3545;
--orange: #fd7e14;
--yellow: #ffc107;
--green: #4fbf60;
--teal: #20c997;
--cyan: #17a2b8;
--white: #fff;
--gray: #6c757d;
--gray-dark: #343a40;
--primary: #007bff;
--secondary: #6c757d;
--success: #4fbf60;
--info: #17a2b8;
--warning: #ffc107;
--danger: #dc3545;
--light: #f8f9fa;
--dark: #343a40;
secondary: "#272727",
 */
