/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        alexandria: ['Alexandria', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#71B2AB',
        secondary: '#E7A29C',
        'body-text-grey': '#171A1FFF',
        'blue-500': '#379AE6',
        'neutral-600': '#9095A1FF',
        'background-grey': '#f3f4f6',
        'background-grey-500': '#F3F4F6FF',
        'background-grey-400': '#FAFAFBFF',
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
      },
      // Add custom utility class for -webkit-overflow-scrolling
      webkitOverflowScrolling: {
        touch: '-webkit-overflow-scrolling: touch',
        auto: '-webkit-overflow-scrolling: auto',
      },
      keyframes: {
        slideInUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'page-loader': {
          '0%, 100%': {
            transform: 'translate(-35px)',
            boxShadow: '0 0 #F4DD51, 0 0 #E3AAD6',
          },
          '40%': {
            transform: 'translate(35px)',
            boxShadow: '-15px 0 #F4DD51, -30px 0 #E3AAD6',
          },
          '50%': {
            transform: 'translate(35px)',
            boxShadow: '0 0 #F4DD51, 0 0 #E3AAD6',
          },
          '90%': {
            transform: 'translate(-35px)',
            boxShadow: '15px 0 #F4DD51, 30px 0 #E3AAD6',
          },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0',
          },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        slideInUp: 'slideInUp 0.4s forwards',
        slideInLeft: 'slideInLeft 0.3s forwards',
        'page-loader': 'page-loader 1.5s infinite',
        fadeIn: 'fadeIn 0.7s forwards',
        fadeOut: 'fadeOut 0.7s forwards',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/aspect-ratio'),

    function ({ addUtilities }) {
      const newUtilities = {
        '.scroll-touch': {
          '-webkit-overflow-scrolling': 'touch',
        },
        '.scroll-auto': {
          '-webkit-overflow-scrolling': 'auto',
        },
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
      };

      addUtilities(newUtilities, ['responsive']);
    },
  ],
};
