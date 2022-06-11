const config = {
  root: true,
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
    },
    project: [
      `${__dirname}/tsconfig.json`,
      `${__dirname}/tsconfig.api.json`,
      `${__dirname}/tsconfig.client.json`,
    ],
  },
  plugins: [
    '@typescript-eslint',
    'prettier',
    'import',
    'react',
    'jsx-a11y',
    'no-only-tests',
    'typescript-sort-keys',
  ],
  extends: [
    'airbnb-typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended',
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:eslint-comments/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'react/require-default-props': [
      'error',
      { ignoreFunctionalComponents: true },
    ],
    'no-only-tests/no-only-tests': 'error',
    'typescript-sort-keys/string-enum': 'error',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-await-in-loop': 'off',
  },
  overrides: [
    {
      files: ['**/*.test.ts', '**/test/**/*.ts', './dev-local/**/*.ts'],
      rules: {
        '@typescript-eslint/no-empty-function': 0,
        'no-underscore-dangle': 0,
        '@typescript-eslint/dot-notation': 'off',
        'import/no-extraneous-dependencies': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
    {
      files: ['*.js'],
      rules: {
        'global-require': 'off',
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        project: [
          `${__dirname}/tsconfig.json`,
          `${__dirname}/tsconfig.api.json`,
          `${__dirname}/tsconfig.client.json`,
        ],
      },
    },
  },
};

module.exports = config;
