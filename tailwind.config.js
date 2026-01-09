/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // VEGA Design System Colors
        primary: {
          50: '#e6f7f7',
          100: '#b3e8e8',
          200: '#80d9d9',
          300: '#4dcaca',
          400: '#1abbbb',
          500: '#00D4D4', // VEGA Cyan
          600: '#00a8a8',
          700: '#007c7c',
          800: '#005050',
          900: '#002424',
        },
        secondary: {
          50: '#e6fff5',
          100: '#b3ffe0',
          200: '#80ffcb',
          300: '#4dffb6',
          400: '#1affa1',
          500: '#00FF88', // VEGA Emerald
          600: '#00cc6d',
          700: '#009952',
          800: '#006637',
          900: '#00331c',
        },
        accent: {
          50: '#fef9e7',
          100: '#fcefc2',
          200: '#fae59d',
          300: '#f8db78',
          400: '#f6d153',
          500: '#D4AF37', // Gold
          600: '#aa8c2c',
          700: '#806921',
          800: '#554616',
          900: '#2b230b',
        },
        dark: {
          bg: '#0A0A0A',
          card: '#1A1A1A',
          border: '#2A2A2A',
        },
      },
      fontFamily: {
        heading: ['Orbitron', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        // Fibonacci spacing
        'fib-1': '8px',
        'fib-2': '13px',
        'fib-3': '21px',
        'fib-4': '34px',
        'fib-5': '55px',
        'fib-6': '89px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.3', boxShadow: '0 0 20px rgba(0, 212, 212, 0.3)' },
          '50%': { opacity: '0.6', boxShadow: '0 0 40px rgba(0, 212, 212, 0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
}
