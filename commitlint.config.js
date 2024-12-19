module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation changes
        'style', // Code style changes (formatting, no logic changes)
        'refactor', // Code refactoring (neither fixes a bug nor adds a feature)
        'test', // Adding or updating tests
        'chore', // Other changes (build process, auxiliary tools, etc.)
        'revert', // Reverting previous commits
        'update' // Updating code or dependencies
      ]
    ],
    'subject-case': [0, 'always'],
    'header-max-length': [2, 'always', 200]
  }
};
