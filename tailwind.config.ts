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
        green: {
          300: '#C7F46D',
          100: '#F1FF8D',
        },
        blue: {
          500: '#445FC9',
          100: '#C9DBFF',
        },
        blackish: '#1C1C1C',
        grey: {
          500: '#858585',
          300: '#CCCCCC',
          100: '#E0E0E0',
        },
        whiteish: '#F9F5F2',
      },
      fontFamily: {
        gabarito: ['Gabarito', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
      },
      fontSize: {
        'heading-1': ['50px', { lineHeight: 'auto', letterSpacing: '-0.02em' }],
        'heading-2': ['32px', { lineHeight: 'auto' }],
        'heading-3': ['20px', { lineHeight: '1.5' }],
        'heading-4': ['16px', { lineHeight: '1.5' }],
        'subhead-1': ['18px', { lineHeight: 'auto' }],
        'subhead-2': ['14px', { lineHeight: 'auto' }],
        'body-1': ['16px', { lineHeight: '1.5' }],
        'body-2': ['14px', { lineHeight: '1.5' }],
        'body-3': ['12px', { lineHeight: '1.5', letterSpacing: '0.02em' }],
        'body-4': ['16px', { lineHeight: '1.5', letterSpacing: '0.02em' }],
        'button-1': ['16px', { lineHeight: '1.5' }],
        'button-2': ['14px', { lineHeight: 'auto' }],
        'button-3': ['14px', { lineHeight: 'auto' }],
        'button-4': ['16px', { lineHeight: '1.5' }],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;