/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        senior: {
          bg: '#FAF7F2',
          card: '#FFFFFF',
          text: '#1E293B',
          muted: '#475569',
          accent: '#EA580C',
          amber: '#D97706',
          emerald: '#059669',
          border: '#E2E8F0'
        },
        family: {
          bg: '#F8FAFC',
          card: '#FFFFFF',
          text: '#0F172A',
          sub: '#64748B',
          brand: '#3B82F6',
          indigo: '#4F46E5'
        }
      },
      fontSize: {
        'senior-body': ['1.25rem', { lineHeight: '1.8rem' }],
        'senior-lg': ['1.5rem', { lineHeight: '2.1rem' }],
        'senior-xl': ['2rem', { lineHeight: '2.5rem' }],
        'senior-2xl': ['2.5rem', { lineHeight: '3rem' }],
        'senior-3xl': ['3.25rem', { lineHeight: '3.75rem' }],
      },
      boxShadow: {
        'senior': '0 8px 30px rgba(0, 0, 0, 0.08)',
        'senior-hover': '0 12px 35px rgba(234, 88, 12, 0.2)',
        'glow-mic': '0 0 45px rgba(234, 88, 12, 0.45)',
      }
    },
  },
  plugins: [],
}
