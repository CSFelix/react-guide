module.exports = {
  env: {
    browser: true,
    es6: true,
  },

  extends: ['airbnb', 'prettier'],

  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },

  parser: '@babel/eslint-parser',

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },

    ecmaVersion: 2018,
    sourceType: 'module',
    requireConfigFile: false,
  },

  plugins: ['react', 'prettier'],

  rules: {

    'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.js'] }],
    'import/prefer-default-export': 'off',
    'keyword-spacing': 2,
  },
};
