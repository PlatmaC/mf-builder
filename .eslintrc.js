module.exports = {
  root: true,
  ignorePatterns: ['/node_modules/', '/plugins/'],
  overrides: [
    {
      files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
      env: {
        browser: true,
        amd: true,
        es2021: true,
        node: true,
        'jest/globals': true,
      },
      extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          configFile: './.babelrc',
        },
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
      },
      plugins: ['react', 'prettier', 'jest', '@typescript-eslint'],
      rules: {
        'react/react-in-jsx-scope': 'off',
        'no-empty-function': 'off',
        '@typescript-eslint/no-empty-function': 'warn',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
        ],
        'no-console': ['warn', { allow: ['info', 'error', 'warn'] }],
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-this-alias': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        'prettier/prettier': [
          'warn',
          {
            endOfLine: 'auto',
            semi: true,
            trailingComma: 'es5',
            printWidth: 120,
            singleQuote: true,
            arrowParens: 'always',
            proseWrap: 'preserve',
          },
        ],
        'react/prop-types': 0,
        'react/display-name': 'off',
        'react/no-deprecated': 0,
        'no-prototype-builtins': 0,
        'jest/no-disabled-tests': 'warn',
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/prefer-to-have-length': 'warn',
        'jest/valid-expect': 'error',
        'import/no-unresolved': [
          'error',
          {
            ignore: ['^@/', 'react-hot-toast', 'react-i18next', 'react-loading-skeleton', 'tinycolor2', 'react-spring'],
          },
        ],
        'react/no-unknown-property': 'off',
      },
      settings: {
        react: {
          version: 'detect',
        },
        'import/resolver': 'webpack',
      },
      globals: {
        path: true,
        fetch: true,
        process: true,
        module: true,
        __dirname: true,
      },
    },
  ],
  extends: ['plugin:storybook/recommended'],
};
