module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'unicorn', 'import'],
  extends: [
    'plugin:unicorn/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  root: true,
  env: {
    node: true,
    jest: true
  },
  ignorePatterns: ['.eslintrc.js', 'commitlint.config.js'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'function',
        format: ['camelCase']
      },
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow'
      },
      {
        selector: 'classProperty',
        format: ['camelCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow'
      },
      {
        selector: 'method',
        format: ['camelCase']
      }
    ],

    // Import Rules
    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index'
        ],
        'newlines-between': 'always'
      }
    ],

    'prefer-const': 'error',
    'no-var': 'error',
    'unicorn/prefer-ternary': 'error', // Suggest using ternary if applicable
    'unicorn/consistent-function-scoping': 'warn', // Avoid unnecessary scope changes
    'unicorn/no-null': 'off',

    // Single-line block enforcement
    curly: ['error', 'multi-line'],
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],

    // Custom Rule to enforce one-liner for if statements
    'no-lonely-if': 'error', // Prevent lonely if blocks

    // Avoid unnecessary multi-line blocks (use concise one-liners)
    'no-multi-assign': 'error', // Disallow multiple assignments in one statement

    // Enforce single-line if statements to be on the same line without curly braces
    'no-lonely-if': 'error', // Avoid `if` statements that are written alone inside another `if`

    'arrow-body-style': ['error', 'as-needed'] // Enforce concise arrow function bodies for single-line functions
  }
};
