import { colors } from './src/global/colors';
import { fontFamily } from './src/global/fontFamily';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/app/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors,
      fontFamily,
    },
  },
  plugins: [],
};
