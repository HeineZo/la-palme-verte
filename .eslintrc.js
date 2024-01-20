const { resolve } = require('node:path');

const project = resolve(__dirname, 'tsconfig.json');

module.exports = {
    root: true,
    extends: [
      require.resolve('@vercel/style-guide/eslint/node'),
      require.resolve('@vercel/style-guide/eslint/typescript'),
    ],
    parserOptions: {
      project,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project,
        },
      },
    },
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'import/no-default-export': 'off',
      'unicorn/filename-case': 'off',
      'tsdoc/syntax': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'import/no-extraneous-dependencies': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'import/order': 'off',
    },
}
