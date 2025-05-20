/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: "class", // این قسمت مهمه! اجازه می‌دهد که ما کلاس 'dark' را به دلخواست اضافه کنیم
};
