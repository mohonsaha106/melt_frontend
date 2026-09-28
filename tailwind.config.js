/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FAF8F5',
          100: '#F5F1E8',
          200: '#E8E2D3', // Primary brand background
          300: '#DDD5C3',
          400: '#C8BEA6',
          500: '#9C9177',
          600: '#6E6550',
          700: '#4A4333',
          800: '#2A261D',
          900: '#14120E',
          950: '#0A0A0A',
        },
        theme: {
          bg: '#E8E2D3',
          card: '#F2EDE2',
          surface: '#DFD8C7',
          border: '#D3CBBA',
          dark: '#111111',
        },
        accent: {
          DEFAULT: '#D4AF37', // Gold for artisan resin sparkle
          light: '#F5E6B3',
          dark: '#AA881E',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#F3E5AB',
          dark: '#AA7C11',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
        bengali: ['"Hind Siliguri"', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'card': '0 10px 30px -5px rgba(0, 0, 0, 0.08)',
        'drawer': '-10px 0 30px rgba(0, 0, 0, 0.15)',
        'glow': '0 0 25px rgba(249, 115, 22, 0.3)',
      },
      animation: {
        'marquee': 'marquee 28s linear infinite',
        'marquee-reverse': 'marquee-reverse 28s linear infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.85 },
        },
      },
    },
  },
  plugins: [],
};
