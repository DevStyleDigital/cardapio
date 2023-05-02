/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ffeded',
          100: '#ffd5d5',
          200: '#feaaaa',
          300: '#fd7474',
          400: '#fb3c3c',
          500: '#f91616',
          600: '#ea0c0c',
          700: '#c20c0c',
          800: '#9a1212',
          900: '#7c1212',
          950: '#430707',
        },
      },
    },
  },
  plugins: [],
};
