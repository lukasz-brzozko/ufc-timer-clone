module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],

  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  rules: {
    'linebreak-style': [2, 'windows'],
    'react/react-in-jsx-scope': 'off',
  },
};
