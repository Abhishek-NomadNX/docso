/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        docsoGreen : '#00847f' ,
        lightGreen : '#e3f4f3' ,
        middleGreen : '#2b8580' ,
      }
    },
  },
  plugins: [],
}

