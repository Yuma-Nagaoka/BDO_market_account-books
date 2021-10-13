module.exports = {
    // …
    rules: {
      // …
     'react/react-in-jsx-scope': 'off',
    },
    parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: 'module',
      },
  }