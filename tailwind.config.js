/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FDFCFA',
        cloud: '#F6F4F0',
        ink: '#171512',
        stone: '#6F6A63',
        line: '#E7E3DC',
        brass: {
          50: '#FBF3E6',
          100: '#F3E1C1',
          300: '#DDAE6C',
          500: '#BC7E33',
          600: '#9C6526',
          700: '#7C4F1E',
        },
        pine: {
          50: '#EAF0ED',
          500: '#1F4B43',
          600: '#193C36',
          700: '#132E29',
        },
      },
      fontFamily: {
        display: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 24px -8px rgba(23, 21, 18, 0.10)',
        card: '0 1px 2px rgba(23,21,18,0.06), 0 8px 24px -12px rgba(23,21,18,0.12)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}
