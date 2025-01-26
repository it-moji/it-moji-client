/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      variables: {
        'mantine-breakpoint-xs': '20rem',
        'mantine-breakpoint-sm': '30rem',
        'mantine-breakpoint-md': '48rem',
        'mantine-breakpoint-lg': '64rem',
        'mantine-breakpoint-xl': '80rem',
      },
    },
  },
}

export default config
