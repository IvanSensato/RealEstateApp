module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sensato-blue': '#103FD5',
        "bgcard": "#252525"
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}