/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.html",
    "./assets/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'iran-yekan': ['IRANYekan', 'sans-serif'],
      },
      colors: {
        // You can extend the default color palette here
      },
    },
  },
  plugins: [],
}

