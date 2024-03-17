/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          gray: "#cccccc",
          red: "#DC2626",
          gold: "#EFA63A",
          purple: "#4F46E5",
          blue: '#2563EB',
          peach: "#FF4DA6",
          green: "#00D675",
        },
        secondary: "#282828",
        "gray-200": "#EAECF0",
        "gray-300": "#D0D5DD",
        "gray-500": "#667085",
        "gray-600": "#475467",
        "gray-700": "#344054",
        "gray-900": "#101828",
        "white-100": "#F4F4F4",
        "white-200": "#EDF0F8",
        "black-100": "#3D4258",
        "neutral-black": "#23263B",
      },
    },
  },
  plugins: [],
}