/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Sora', '"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        mint: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        coral: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        amber: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        surface: {
          light: '#FAF8F5',
          'light-card': '#FFFFFF',
          'light-subtle': '#F5F0E8',
          dark: '#0F172A',
          'dark-card': '#1E293B',
          'dark-subtle': '#334155',
        },
        status: {
          pending: '#F59E0B',
          reviewing: '#0284C7',
          in_progress: '#7C3AED',
          resolved: '#10B981',
          rejected: '#EF4444',
        }
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glass-hover': '0 14px 38px 0 rgba(31, 38, 135, 0.12)',
        'card-soft': '0 2px 12px -2px rgba(44, 34, 30, 0.05), 0 1px 3px -1px rgba(44, 34, 30, 0.03)',
        'card-elevated': '0 12px 30px -4px rgba(44, 34, 30, 0.08), 0 4px 10px -2px rgba(44, 34, 30, 0.04)',
        'glow-mint': '0 0 25px rgba(16, 185, 129, 0.25)',
        'glow-coral': '0 0 25px rgba(244, 63, 94, 0.25)',
      }
    },
  },
  plugins: [],
}
