/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#6C63FF',
        success: '#22C55E',
        danger: '#EF4444',
        warning: '#F97316',
        info: '#3B82F6',
        page: '#F3F4F6',
        ink: '#111827',
        muted: '#6B7280',
      },
      boxShadow: {
        soft: '0 18px 40px rgba(17, 24, 39, 0.08)',
        glow: '0 16px 36px rgba(108, 99, 255, 0.16)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
