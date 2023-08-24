import { nextui } from "@nextui-org/react";
/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-clash-display)"],
        body: ["var(--font-archivo)"],
      },
      fontSize: {
        "6xl": ["3.5rem"],
        "5xl": ["3rem"],
        "4xl": ["2.5rem"],
        "3xl": ["2em"],
      }
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#E9F1E9",
            foreground: "#1C1C1C",
            focus: "#649B64",

            primary: {
              100: "#EFFBE8",
              200: "#DCF8D2",
              300: "#BEECB5",
              400: "#9FD99A",
              500: "#76C176",
              600: "#56A55D",
              700: "#3B8A49",
              800: "#256F38",
              900: "#165C2E",
              DEFAULT: "#76C176",
              foreground: "#ffffff",
            },
            secondary: {
              100: "#FCFEFB",
              200: "#F9FDF8",
              300: "#F3F9F2",
              400: "#EBF3EA",
              500: "#E0EBE0",
              600: "#A3CAA7",
              700: "#70A97A",
              800: "#478858",
              900: "#2B7043",
              DEFAULT: "#E0EBE0",
              foreground: "#ffffff",
            },
            accent: {
              100: "#EEFAE8",
              200: "#DBF5D2",
              300: "#B9E1B1",
              400: "#93C38F",
              500: "#649B64",
              600: "#49854E",
              700: "#326F3D",
              800: "#1F592E",
              900: "#134A26",
              DEFAULT: "#649B64",
              foreground: "#ffffff",
            },
            success: {
              DEFAULT: "#2EBA6D",
              foreground: "#ffffff",
            },
            warning: {
              DEFAULT: "#FFDE3D",
              foreground: "#ffffff",
            },
            error: {
              DEFAULT: "#FF7A7A",
              foreground: "#ffffff",
            },
            info: {
              DEFAULT: "#17A9E8",
              foreground: "#ffffff",
            },
          },
        },
      },
    }),
  ],
};

export default config;
