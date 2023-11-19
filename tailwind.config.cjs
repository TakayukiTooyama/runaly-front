/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/app/**/*.{ts,tsx}', './src/ui/**/*.{ts,tsx}'],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        'media-brand': 'rgb(var(--media-brand) / <alpha-value>)',
        'media-focus': 'rgb(var(--media-focus) / <alpha-value>)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@vidstack/react/tailwind.cjs')({
      prefix: 'media',
    }),
    customVariants,
  ],
}

function customVariants({ addVariant, matchVariant }) {
  // Strict version of `.group` to help with nesting.
  matchVariant('parent-data', (value) => `.parent[data-${value}] > &`)

  addVariant('hocus', ['&:hover', '&:focus-visible'])
  addVariant('group-hocus', ['.group:hover &', '.group:focus-visible &'])
}
