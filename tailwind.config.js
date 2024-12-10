/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg_primary: "var(--color-bg-default)",
        bg_sidebar: "var(--color-sidebar-bg)",
        bg_mainarea_mid: "var(--color-main-areaMid)",
        theme_switch_ball: "var(--color-theme-switch-ball)",
      },
    },
  },
  plugins: [],
};
