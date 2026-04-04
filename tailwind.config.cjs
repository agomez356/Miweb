/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,vue,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'space-bg':        '#0d112a',
        'primary':         '#667eea',
        'primary-light':   '#b9c3ff',
        'secondary':       '#ec4899',
        'secondary-light': '#ffb0cd',
        'tertiary':        '#fbbf24',
        'star':            '#fbbf24',
        'aurora':          '#10b981',
        'background':      '#0d112a',
        'text-primary':    '#f9fafb',
        'text-secondary':  '#9ca3af',
        'text-muted':      '#6b7280',
        'surface':         '#1a1e37',
        'surface-high':    '#242842',
      },
      fontFamily: {
        space: ['Space Grotesk', 'sans-serif'],
        body:  ['Manrope', 'sans-serif'],
      },
      borderRadius: {
        'celestial':    '8px',
        'celestial-lg': '16px',
        'celestial-xl': '24px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
