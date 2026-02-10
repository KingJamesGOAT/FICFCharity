/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E85D04',
        'primary-hover': '#D94E00',
        secondary: '#1F2937',
        background: '#FAFAFA',
        surface: '#FFFFFF',
        muted: '#9CA3AF',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
      },
      boxShadow: {
        'soft': '0 8px 30px rgb(0 0 0 / 0.04)',
      },
      backgroundImage: {
        'orange-gradient': 'linear-gradient(to bottom right, #fff7ed, #ffedd5)', // orange-50 to orange-100 approximation
      }
    },
  },
  plugins: [],
}

