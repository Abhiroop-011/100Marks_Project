/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          dark: "#0A1128",
          midnight: "#091233",
          navy: "#1C2541",
          purple: "#311D3F",
          violet: "#522B5B",
          nebula: "#6D33A6",
          accent: "#F0433A",
          teal: "#5BC0BE",
          gray: "#C5C6C7"
        }
      },
      fontFamily: {
        futuristic: ['Orbitron', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'twinkle': 'twinkle 4s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        }
      },
      backgroundImage: {
        'stars': "url('/assets/stars-bg.png')",
        'nebula-gradient': 'linear-gradient(135deg, #0A1128 0%, #311D3F 50%, #522B5B 100%)'
      }
    },
  },
  plugins: [],
}