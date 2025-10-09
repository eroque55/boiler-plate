import { colors } from './src/global/colors';
import { fontFamily } from './src/global/fontFamily';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./components/**/*.{js,jsx,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors,
      fontFamily,
    },
  },
  plugins: [],
};
