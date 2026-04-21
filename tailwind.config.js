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
        'brutalist-orange': '#FF4D00',
        'brutalist-cream': '#FDFCF0',
        'brutalist-black': '#121212',
      },
      fontFamily: {
        'space': ['"Space Grotesk"', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'brutalist': '4px 4px 0px 0px rgba(0,0,0,1)',
        'brutalist-hover': '8px 8px 0px 0px rgba(0,0,0,1)',
      }
    },
  },
  plugins: [],
}

