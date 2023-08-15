import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "rgb(var(--color-black))",
        gray: {
          "50": "#f7f8f8",
          "100": "#edeef1",
          "200": "#d8dbdf",
          "300": "#b6bac3",
          "400": "#8e95a2",
          "500": "#6b7280",
          "600": "#5b616e",
          "700": "#4a4e5a",
          "800": "#40444c",
          "900": "#383a42",
          "950": "#25272c",
        },
        background: "rgb(var(--color-background) / <alpha-value>)",
        semibackground: "rgb(var(--color-semibackground) / <alpha-value>)",
        midground: "rgb(var(--color-midground) / <alpha-value>)",
        foreground: "rgb(var(--color-foreground) / <alpha-value>)",
        primary: "rgb(var(--color-primary) / <alpha-value>)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [require("@tailwindcss/forms"), require("tailwindcss-animate")],
};
export default config;
