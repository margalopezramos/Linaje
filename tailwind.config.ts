import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bone: '#FAF7F1',
        sand: '#EFDFC9',
        ink: '#2A1D12',
        charcoal: {
          DEFAULT: '#3D2B1C',
          dark: '#2A1D12',
        },
        gold: {
          light: '#EFD49F',
          DEFAULT: '#C9A265',
          dark: '#A9863F',
        },
        stone: '#8C7A65',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        prose: '68ch',
      },
    },
  },
  plugins: [],
};
export default config;
