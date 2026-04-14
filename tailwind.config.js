/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
       primary: {
        50:  '#f6f8f3', // warna asli kamu
        100: '#e7ebe1',
        200: '#cfd7c3',
        300: '#b7c3a5',
        400: '#9faf87',
        500: '#879b69',
        600: '#6c7c54',
        700: '#515d3f',
        800: '#363e2a',
        900: '#1b1f15',
      },
      },
    },
  },
  plugins: [],
};
