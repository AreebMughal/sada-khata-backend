const CLICKUP_LINK_REGEX = /https?:\/\/.*clickup\.com\/t\/[a-zA-Z0-9-]+/;

module.exports = {
  extends: ['@commitlint/config-conventional'],
  plugins: ['commitlint-plugin-function-rules'],
  rules: {
    // Commit types
    'type-enum': [
      2,
      'always',
      [
        'wip', // Work in progress
        'feat', // Feature
        'cr', // Change request
        'hotfix', // Hotfix
        'bugfix', // Bugfix
        'refactor', // Refactor
        'format', // Format
        'devex', // Developer experience
        'test', // Test
        'docs' // Documentation
      ]
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'header-max-length': [2, 'always', 50],
    'body-leading-blank': [2, 'always']

    // Custom rule: Ensure footer contains a ClickUp link
    // 'function-rules/body-min-length': [
    //   2,
    //   'always',
    //   (parsed) => {
    //     const body = parsed.body || '';
    //     const bodyElements = body.split('\n');

    //     if (!bodyElements?.[0]?.trim()) {
    //       return [false, 'Description is required in the commit message body.'];
    //     }

    //     if (bodyElements?.[1] !== '') {
    //       return [false, 'Empty Line is required before footer'];
    //     }

    //     if (!CLICKUP_LINK_REGEX.test(bodyElements?.[2])) {
    //       return [
    //         false,
    //         'Commit body must include a valid ClickUp link (e.g., https://app.clickup.com/t/task-id).'
    //       ];
    //     }

    //     return [true];
    //   }
    // ]
  }
};
