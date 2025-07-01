const colors = {
  primary: {
    100: '#0B2540',
    80: '#0E3255',
    60: '#123E6A',
    40: '#467AAA',
    20: '#9DC3E8',
  },
  secondary: {
    100: '#402C0C',
    80: '#563B10',
    60: '#6B4A14',
    40: '#C19F60',
    20: '#FFEFD5',
  },
  neutral: {
    black: '#000000',
    100: '#2D2D2D',
    80: '#454545',
    60: '#737373',
    40: '#A2A2A2',
    20: '#D1D0D0',
    white: '#FFFFFF',
  },
  alert: {
    success: {
      primary: '#2DAC3E',
      secondary: '#ABDEB1',
    },
    error: {
      primary: '#DE3737',
      secondary: '#FFD2D2',
    },
  },
} as const;

export default colors;
