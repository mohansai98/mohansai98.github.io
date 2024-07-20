/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'postman-orange': '#FF6C37',
        'postman-dark-gray': '#2E2E2E',
      },
    },
  },
  plugins: [],
}

