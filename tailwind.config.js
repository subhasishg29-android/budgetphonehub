/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#6366f1',
        'brand-primary-hover': '#4f46e5',
        'brand-accent': '#10b981',
        'brand-amber': '#f59e0b',
        'bg-primary': '#0b0f19',
        'bg-surface': '#151c2e',
        'bg-surface-elevated': '#1e293b',
        'bg-glass': 'rgba(21, 28, 46, 0.75)',
        'text-primary': '#f8fafc',
        'text-secondary': '#94a3b8',
        'text-muted': '#64748b',
        'text-inverse': '#0f172a',
        'border-color': 'rgba(255, 255, 255, 0.08)',
        'border-hover': 'rgba(99, 102, 241, 0.4)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
        'brand-glow': 'radial-gradient(circle, rgba(99, 102, 241, 0.35) 0%, transparent 100%)',
      },
      boxShadow: {
        'glow': '0 0 24px rgba(99, 102, 241, 0.35)',
        'glass': '0 4px 16px rgba(0, 0, 0, 0.35)',
      },
      backdropBlur: {
        'glass': '12px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        'full': '9999px',
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
