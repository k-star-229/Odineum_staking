module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'tiny': '400px',
      'sm': '480px',
      'md': '768px',
      'lg': '976px',
      'xl': '1440px',
      '2xl': '1366px',
      '3xl': '1920px'
    },
    fontSize: {
      'sm': ['13px', '15px'],
      'base': ['16px', '19.54px'],
      'md': ['18px', '20.7px'],
      '2md': ['19.07px', '23.28px'],
      'lg': ['21px', '25.64px'],
      'xl': ['27px', '32.97px'],
      '2xl': ['34px', '41.51px'],
      '3xl': ['55px', '67.15px'],
    },
    backgroundColor: theme => ({
      ...theme('colors'),
      'card': '#1f1f1f',
      'link': '#434343',
      'body': '#171717',
      'white': 'white',
      'progress': '#3A3A3A',
      'choose': '#d9e8ff',
      'choose-dark': '#162235',
      'edit': '#808080',
      'search': '#262626'
    }),
    borderColor: theme => ({
      ...theme('colors'),
      'main': '#d3d3d3',
      'create': '#515151',
      'body': '#171717',
      'yellow': '#f8dc8e',
    }),

    maxHeight: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      '4/5': '80%',
      'full': '100%',
    },
    extend: {
      colors: {
        app: {
          yellow: {
            light: '#f8dc8e',
            dark: '#916500'
          },
          cyan: {
            DEFAULT: '#0d91a9'
          }
        }
      },
      scale: {
        '175': '1.75',
      },
      lineHeight: {
        '11': '3rem',
        '12': '3.2rem',
      },
      maxWidth: {
        1920: '1920px'
      }
    },
  },
  variants: {
    extend: {
      background: ['card', 'link', 'body', 'progress', 'search'],
      color: ['white', 'edit']
    },
  },
  plugins: [],
}
