import nextVitals from 'eslint-config-next/core-web-vitals'

const config = [
  ...nextVitals,
  {
    ignores: ['.next/**', '.next-playwright/**', '.git/**', '.superpowers/**', 'coverage/**', 'node_modules/**', 'playwright-report/**', 'private/**', 'test-results/**'],
  },
  {
    rules: {
      '@next/next/no-img-element': 'warn',
      'jsx-a11y/alt-text': 'warn',
      'react-hooks/preserve-manual-memoization': 'warn',
      'react-hooks/purity': 'warn',
      'react-hooks/set-state-in-effect': 'warn',
      'react/no-unescaped-entities': 'warn',
    },
  },
]

export default config
