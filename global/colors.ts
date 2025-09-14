import { black, transparent, white } from 'tailwindcss/colors';

const colors = {
  primary: {
    100: '#1654A2',
    80: '#4576B5',
    60: '#7398C7',
    40: '#A2BBDA',
    20: '#D0DDEC',
  },
  neutral: {
    100: '#2D2D2D',
    80: '#454545',
    60: '#737373',
    40: '#A2A2A2',
    20: '#D0D0D0',
    placeholder: '#E5E5E5',
    background: '#F5F5F5',
    black,
    white,
  },
  alert: {
    success: '#2DAC3E',
    error: '#DE3737',
  },
  transparent,
} as const;

export default colors;
