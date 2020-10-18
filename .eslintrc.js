module.exports = {
  env: {
    browser: true,
    jest: true,
  },
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },

  plugins: ['import', '@typescript-eslint', 'react-hooks'],
  rules: {
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/prefer-interface': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error', {
        argsIgnorePattern: '^_',
      }
    ],
    'no-return-assign': 0,
    'no-console': 2,
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.setup.{js,ts}',
          '**/*.config.{js,ts}',
          '**/*.spec.{ts,tsx}',
          '**/.storybook/**/*.{ts,tsx}',
          '**/*.stories.{ts,tsx}',
          '**/__fixtures__/**/*.{ts,tsx}',
        ],
        peerDependencies: false,
      },
    ],
    'import/order': ['error', {
      groups: [
        'builtin',
        'external',
        'internal',
        'index',
        'sibling',
        'parent',
      ],
      'newlines-between': 'always',
    }],
    'import/no-named-export': 0,
    'import/newline-after-import': 2,
    'import/named': 0, // ref: https://github.com/benmosher/eslint-plugin-import/issues/1282
    'import/prefer-default-export': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'react/display-name': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'react/prop-types': 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
