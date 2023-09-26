/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        gradient: "url('./src/assets/images/bg-image-authenticate.png')",
      },
      color: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
      },
    },
    screens: {
      'xs': '400px',
      // => @media (min-width: 400px) { ... }
      'sm': '576px',
      // => @media (min-width: 576px) { ... }
      'md': '1024px',
      // => @media (min-width: 960px) { ... }
      'lg': '1440px',
      // => @media (min-width: 1440px) { ... }
    },
  },
  plugins: [],
};
