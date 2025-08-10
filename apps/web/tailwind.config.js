/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0d0f12',
        surface: '#1a1d23',
        accent: {
          teal: '#00f7d2',
          magenta: '#ff00a0',
          amber: '#ffc700'
        },
        text: {
          primary: '#e0e0e0',
          secondary: '#a0a0a0'
        }
      },
      boxShadow: {
        neon: '0 0 6px rgba(0, 247, 210, 0.6)'
      }
    }
  }
};
