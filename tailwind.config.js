/** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./src//*.{html,ts}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };          
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'Helvetica Neue', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
