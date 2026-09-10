/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          800: '#112240',
          850: '#0c1b33',
          900: '#071226',
          950: '#030914',
        },
        ocean: {
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
        },
        marine: {
          accent: '#06b6d4',
          safe: '#10b981',
          warning: '#f59e0b',
          danger: '#ef4444',
          surface: '#0f172a',
          card: '#1e293b',
          border: '#334155'
        }
      }
    },
  },
  plugins: [],
};
