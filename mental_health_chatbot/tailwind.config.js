/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#d1fae5", // teal-100
          200: "#a7f3d0", // teal-200
          300: "#6ee7b7", // teal-300
          400: "#34d399", // teal-400
          500: "#10b981", // teal-500
          600: "#059669", // teal-600
          700: "#047857", // teal-700
        },
        neutral: {
          50: "#f8fafc",  // slate-50
          100: "#f1f5f9", // slate-100
          200: "#e2e8f0", // slate-200
          300: "#cbd5e1", // slate-300
          400: "#94a3b8", // slate-400
          500: "#64748b", // slate-500
          600: "#475569", // slate-600
          700: "#334155", // slate-700
          800: "#1e293b", // slate-800
        },
        // Semantic colors
        happy: "#fbbf24",    // amber-400
        calm: "#60a5fa",     // blue-400
        anxious: "#c084fc",  // purple-400
        angry: "#fb7185",    // rose-400
        low: "#818cf8",      // indigo-400
        success: "#10b981",  // emerald-500
        warning: "#f59e0b",  // amber-500
        error: "#f43f5e",    // rose-500
        info: "#0ea5e9",     // sky-500
      },
      fontFamily: {
        display: ["Quicksand", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
      gridTemplateColumns: {
        // Desktop 12-column grid
        '12': 'repeat(12, minmax(0, 1fr))',
        // Mobile 4-column grid
        '4': 'repeat(4, minmax(0, 1fr))',
      },
      spacing: {
        'grid-gutter': '16px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('tailwindcss-fluid-type'),
  ],
}