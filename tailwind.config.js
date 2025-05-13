/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      zIndex: {
        '999': '999',
      }
    },
  },
  plugins: [],
}

