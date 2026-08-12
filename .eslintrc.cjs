module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    // This JavaScript project relies on API response shapes rather than
    // runtime PropTypes. Data is normalized at component boundaries.
    'react/prop-types': 'off',
    // Supported by modern browsers but not yet recognized by this ESLint
    // plugin version. React forwards the lowercase HTML attribute.
    'react/no-unknown-property': ['error', { ignore: ['fetchpriority'] }],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
