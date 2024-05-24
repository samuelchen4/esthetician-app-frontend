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
    },
  },
  plugins: [],
};
