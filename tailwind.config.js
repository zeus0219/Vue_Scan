/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}', 
  ],
  theme: {
    extend: {
      fontSize: {
        custom: 'calc(1.41vw + 1.41vh + 1.41vmin)',
      },
    },
  },
  plugins: [],
}

