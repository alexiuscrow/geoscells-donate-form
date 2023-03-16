module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
    'plugin:jsx-a11y/recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', 'prettier'],
  rules: {
    'no-console': 'off',
    'no-nested-ternary': 'off',
    'no-underscore-dangle': 'off',
    'no-use-before-define': 'off',
    'no-prototype-builtins': 'off',
    'no-unused-vars': [
      'error',
      {
        args: 'none',
        ignoreRestSiblings: true
      }
    ],
    'react/boolean-prop-naming': 'warn',
    'react/button-has-type': 'warn',
    'react/default-props-match-prop-types': 'error',
    'react/hook-use-state': 'warn',
    'react/no-access-state-in-setstate': 'error',
    'react/no-unused-state': 'warn',
    'react/no-unused-prop-types': 'warn',
    'react/no-will-update-set-state': 'warn',
    'react/prefer-es6-class': 'warn',
    'react/prefer-exact-props': 'warn',
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true
      }
    ],
    'react/sort-comp': [
      'warn',
      {
        order: ['lifecycle', 'static-methods', '/^on.+$/', 'everything-else', 'rendering'],
        groups: {
          rendering: ['/^render.+$/', 'render']
        }
      }
    ],
    'react/jsx-boolean-value': ['warn', 'never'],
    'react/jsx-closing-tag-location': 'warn',
    'react/jsx-curly-brace-presence': ['warn', {props: 'never', children: 'never', propElementValues: 'always'}],
    'react/jsx-curly-spacing': ['warn', {when: 'never'}],
    'react/jsx-equals-spacing': ['error', 'never'],
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.js', '.jsx']
      }
    ],
    'react/jsx-no-useless-fragment': 'warn',
    'react/jsx-pascal-case': 'warn',
    'react/jsx-props-no-multi-spaces': 'warn',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-uses-vars': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',
    'jsx-a11y/no-autofocus': 'off',
    'prettier/prettier': 'error'
  }
};
