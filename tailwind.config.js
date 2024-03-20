/* eslint-disable global-require */
import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-clash-display)'],
        body: ['var(--font-archivo)'],
      },
      fontSize: {
        '6xl': ['3.5rem'],
        '5xl': ['3rem'],
        '4xl': ['2.5rem'],
        '3xl': ['2em'],
      },
      keyframes: {
        'infinite-scroll-x': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },
      animation: {
        'infinite-scroll-x': 'infinite-scroll-x 30s linear infinite',
        'infinite-scroll-x-reverse':
          'infinite-scroll-x 30s linear infinite reverse -3s',
        scroll:
          'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/typography'),
    nextui({
      layout: {
        radius: {
          medium: '24px',
        },
      },
      themes: {
        light: {
          colors: {
            foreground: '#1C1C1C',
            focus: '#649B64',
            highlight: '#E9F1E9',

            primary: {
              100: '#EFFBE8',
              200: '#DCF8D2',
              300: '#BEECB5',
              400: '#9FD99A',
              500: '#76C176',
              600: '#56A55D',
              700: '#3B8A49',
              800: '#256F38',
              900: '#165C2E',
              DEFAULT: '#76C176',
              foreground: '#ffffff',
            },
            secondary: {
              100: '#FCFEFB',
              200: '#F9FDF8',
              300: '#F3F9F2',
              400: '#EBF3EA',
              500: '#E0EBE0',
              600: '#A3CAA7',
              700: '#70A97A',
              800: '#478858',
              900: '#2B7043',
              DEFAULT: '#E0EBE0',
              foreground: '#ffffff',
            },
            accent: {
              100: '#e8f0e8',
              200: '#d2e1d1',
              300: '#adc9ac',
              400: '#7fa97f',
              500: '#5e8a5d',
              600: '#466c46',
              700: '#3c593c',
              800: '#324933',
              900: '#2b3c2c',
              DEFAULT: '#466c46',
              foreground: '#ffffff',
            },
            success: {
              DEFAULT: '#2EBA6D',
              foreground: '#ffffff',
            },
            warning: {
              DEFAULT: '#FFDE3D',
              foreground: '#ffffff',
            },
            error: {
              DEFAULT: '#FF7A7A',
              foreground: '#ffffff',
            },
            info: {
              DEFAULT: '#17A9E8',
              foreground: '#ffffff',
            },
          },
        },
      },
    }),
  ],
};

export default config;
