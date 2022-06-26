module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './containers/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      black: '#000000',
      'black-100': '#222222',
      'black-200': '#1b1f23',
      white: '#ffffff',
      'brown-100': '#e1dbca',
      'brown-200': '#988363',
      'brown-300': '#b59758',
      'brown-400': '#947342',
      'gray-100': '#979797',
      'yellow-100': '#d69d1f',
      'red-100': '#d61f1f',
      'orange-100': '#d6701f',
    },
    letterSpacing: {
      tightest: '-0.6em',
      tighter: '-0.3em',
      tight: '-0.1em',
      normal: '0',
      wide: '0.1em',
      wider: '0.3em',
      widest: '0.6em',
    },
    extend: {
      fontFamily: {
        beaufort: ['beaufort-regular', 'sans-serif'],
        'beaufort-bold': ['beaufort-bold', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
