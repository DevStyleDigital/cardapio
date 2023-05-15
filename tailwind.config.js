/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        go: {
          '0%': { left: '-200px' },
          '100%': { left: '0' },
        },
      },
      animation: {
        go: 'go .5s ease-in-out',
      },
      colors: {
        primary: {
          50: '#ffeded',
          100: '#ffd5d5',
          200: '#feaaaa',
          300: '#fd7474',
          400: '#fb3c3c',
          500: '#f91616',
          600: '#DC0000',
          700: '#c20c0c',
          800: '#9a1212',
          900: '#7c1212',
          950: '#430707',
        },
        golden: {
          400: '#cdab61',
          500: '##cdab6150',
        },
        fundo: {
          400: '#1E1E1E',
        },
      },
      letterSpacing: {
        1: '0em',
        2: '0.1em',
        3: '0.15em',
        4: '0.3rem',
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
