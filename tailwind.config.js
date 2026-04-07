/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        display: ['Georgia', 'serif'],
      },
      colors: {
        brand: {
          black:  '#0a0a0a',
          white:  '#fafafa',
          gray:   '#6b6b6b',
          light:  '#f2f0ee',
          accent: '#c9a96e',
        },
      },
      letterSpacing: {
        widest2: '0.25em',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 18s linear infinite',
      },
    },
  },
  plugins: [],
}

