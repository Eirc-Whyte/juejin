module.exports = {
  purge: [
    './src/**/*.html', './src/**/*.{tsx,ts,js,jsx}',
    // Add more here
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'mobile': {'max': '450px'},
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }
      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }
      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
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
      outline: {
        blue: '1px solid #1e80ff',
      },
      flex: {
      '3':'3 3 0%'
      }
    },
  },
  variants: {
    extend: {
      stroke:['hover'],
      fill:['hover'],
      transform: ['hover', 'focus'],
      translate: ['hover', 'focus'],
      visibility: ['hover', 'focus'],
      outline:['hover','active'],
      display: ['hover', 'focus','group-focus'],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
}
