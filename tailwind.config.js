/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {

    fontFamily: {
      'sans': ['Montserrat', 'sans-serif']
    },
    extend: {
      colors: {
        "error": "#dc2626",
        "info": "#2563eb"
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
  ],
}