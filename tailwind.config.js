const defaultTheme = require('tailwindcss/defaultTheme')
const windmill = require('@windmill/react-ui/config')
const { lineHeight } = require('tailwindcss/defaultTheme')

module.exports = windmill({
  purge: ['src/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Signika Negative', ...defaultTheme.fontFamily.serif],
      },
      boxShadow: {
        bottom: '0 5px 6px -7px rgba(0, 0, 0, 0.6), 0 2px 4px -5px rgba(0, 0, 0, 0.06)',
      },
      colors: {
        'cm-primary': '#b5ceff',
        'bb-primary': '#FFF3EA',
        'bb-dark': "#f78b08",
        'bb-black': "#222222",
        'bb-hover': "#f7aa08",
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '88': '22rem',
      }
    },
  },
})