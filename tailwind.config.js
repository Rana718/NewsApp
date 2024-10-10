/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'tint': "#FF4C4C",
        'darkGrey': '#666',
        'lightGrey': '#999',
        'softText': '#555',
      }
    },
  },
  plugins: [],
}

