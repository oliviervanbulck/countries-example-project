/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'man-dark-blue': 'hsl(209, 23%, 22%)',
        'man-very-dark-blue': 'hsl(207, 26%, 17%)',
        'man-very-dark-blue-text': 'hsl(200, 15%, 8%)',
        'man-dark-gray': 'hsl(0, 0%, 52%)',
        'man-very-light-gray': 'hsl(0, 0%, 98%)',
      },
    },
  },
  plugins: [],
  safelist: [
      'bg-man-very-light-gray', // Light background
      'dark:bg-man-very-dark-blue', // Dark background
  ],
}
