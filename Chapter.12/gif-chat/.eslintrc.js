module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  plugins: ['html', 'css-modules'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    indent: ['error', 2],
    semi: ['error', 'always'],
    'no-console': 0,
    'arrow-parens': ['error', 'as-needed'],
    'no-unexpected-multiline': 0,
    'prefer-destructuring': ['error', { object: true, array: false }],
    'operator-linebreak': ['error', 'after'],
    'object-shorthand': ['warn', 'always'],
    'implicit-arrow-linebreak': 0,
  },
};
