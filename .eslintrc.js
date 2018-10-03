module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // don't require .vue extension when importing
    'import/extensions': ['off', 'always', {
      js: 'never',
      vue: 'never',
    }],
    'max-len': [2, { code: 180, ignoreUrls: true }],
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex mutations
      ],
    }],
    'no-multi-spaces': ['error',
                        { exceptions: { VariableDeclarator: true, ImportDeclaration: true } },
    ],
    'object-curly-newline': 'off',
    indent: 'off',
    'vue/script-indent': ['warn', 2, {
      baseIndent: 1,
    }],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
