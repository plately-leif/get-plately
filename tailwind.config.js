/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        accent: {
          DEFAULT: '#FE644D',
          dark: '#FE644D',
        },
        primary: {
          DEFAULT: '#0B3954',
          dark: '#0B3954',
        },
        text: {
          DEFAULT: '#111827',
          dark: '#F9FAFB',
        },
        'secondary-text': {
          DEFAULT: '#6B7280',
          dark: '#9CA3AF',
        },
        border: {
          DEFAULT: '#E5E7EB',
          dark: '#374151',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};