/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-black-1": "#000000",
        "custom-black-2": "#111111",
        "custom-black-3": "#191919",
        "custom-green-1": "#0AAF4A",
        "custom-green-2": "#0f6c34",
        "custom-red-1": "#FC1616",
      },
      dropShadow: {
        green: "0px 1px 4px rgba(10, 175, 74, 1)",
        black: "0px 1px 4px rgba(0, 0, 0, 0.25)",
        white: "0px 1px 4px rgba(255, 255, 255, 0.25)",
      },
    },
  },
  plugins: [],
};
