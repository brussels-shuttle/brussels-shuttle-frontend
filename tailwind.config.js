/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#38bdf8",

          "secondary": "#1f2937",

          "accent": "#0f766e",

          "neutral": "#38bdf8",

          "base-100": "#ffffff",

          "info": "#0ea5e9",

          "success": "#22c55e",

          "warning": "#facc15",

          "error": "#dc2626",
        },
      },
    ]
  },
}

