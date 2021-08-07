module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    // Add more here
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minWidth: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
      '700' : '700px',
      '20r' : '20rem'
    },
    stroke: theme => ({
      'blue': theme('textColor.blue'),
    }),
    fill: theme => ({
      'blue': theme('textColor.blue'),
      'grey': theme('textColor.grey')
    }),
    extend: {
      textColor:{
        'grey' : '#86909c',
        'blue' : '#1e80ff',
        'sky-blue' : '#e8f3ff',
      },
    },
  },
  variants: {
    extend: {
      stroke:['hover'],
      fill:['hover'],
      transform: ['hover', 'focus'],
      translate: ['hover', 'focus'],
      visibility: ['hover', 'focus'],
    },
  },
  plugins: [],
}
