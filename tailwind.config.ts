import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      'white': '#FFFFFF',
      'black': '#1E1E1E',
      'primary': '#7B3DFF',
      'danger': {
        400 : '#FFEFEF',
        800 : '#FF5353'
      },
      'light-gray': '#E0E0E0',
    }
  },
  plugins: [],
}
export default config
