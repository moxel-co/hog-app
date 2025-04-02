/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        '3xl': '1920px',
        '4xl': '2560px',
        '5xl': '3840px',
      },
      spacing: {
        '0.9': '0.225rem',
        '1.35': '0.3375rem',
        '1.8': '0.45rem',
        '2.7': '0.675rem',
        '3.6': '0.9rem',
        '4.5': '1.125rem',
        '5.4': '1.35rem',
        '6.3': '1.575rem',
        '7.2': '1.8rem',
        '8.1': '2.025rem',
        '9': '2.25rem',
        '9.9': '2.475rem',
        '10.8': '2.7rem',
        '13.5': '3.375rem',
        '16.2': '4.05rem',
      },
      width: {
        '[4.725rem]': '4.725rem',
        '[7.0875rem]': '7.0875rem',
        '[9.45rem]': '9.45rem',
        '16.2': '4.05rem',
      },
      height: {
        '[4.725rem]': '4.725rem',
        '[7.0875rem]': '7.0875rem',
        '[9.45rem]': '9.45rem',
        '16.2': '4.05rem',
      },
      keyframes: {
        'slide-left': {
          '0%': { transform: 'translate(100%, -50%)', opacity: 0 },
          '100%': { transform: 'translate(0, -50%)', opacity: 1 },
        },
        'swatch-appear': {
          '0%': { 
            transform: 'translate(0px, 0px) scale(0)',
            opacity: 0 
          },
          '100%': { 
            transform: 'translate(var(--tx), var(--ty)) scale(1)',
            opacity: 1 
          },
        },
        'fade-out': {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        }
      },
      animation: {
        'slide-left': 'slide-left 0.3s ease-out forwards',
        'swatch-appear': 'swatch-appear 0.15s ease-out forwards',
        'fade-out': 'fade-out 0.3s ease-out forwards'
      },
    },
  },
  plugins: [],
};