/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
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
      keyframes: {
        slideInUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        slideInUp: 'slideInUp 0.5s forwards',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),

    function ({ addUtilities }) {
      const newUtilities = {
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none,',
        },
      };

      addUtilities(newUtilities);
    },
  ],
};
