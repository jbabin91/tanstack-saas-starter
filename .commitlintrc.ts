import { defineConfig, type UserConfig } from 'cz-git';

const SCOPES = [
  'ui',
  'api',
  'docs',
  'test',
  'forms',
  'router',
  'query',
  'deps',
  'config',
  'auth',
  'types',
];

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  prompt: {
    alias: {
      b: 'chore(deps): 🔨 update dependencies',
    },
    allowBreakingChanges: ['feat', 'fix'],
    allowCustomIssuePrefix: false,
    allowEmptyIssuePrefix: false,
    enableMultipleScopes: true,
    maxSubjectLength: 100,
    messages: {
      body: 'Provide a longer description of the change (optional):\n',
      breaking: 'List any breaking changes (optional):\n',
      footerPrefix: 'Refs:',
      scope: 'Select the scope of this change (optional):',
      subject: 'Write a short, imperative mood description of the change:\n',
      type: "Select the type of change you're committing:",
    },
    scopeEnumSeparator: ',',
    scopes: SCOPES,
    skipQuestions: ['footer'],
    types: [
      { emoji: '✨', name: 'feat:     ✨ A new feature', value: 'feat' },
      { emoji: '🐛', name: 'fix:      🐛 A bug fix', value: 'fix' },
      {
        emoji: '📝',
        name: 'docs:     📝 Documentation only changes',
        value: 'docs',
      },
      { emoji: '💄', name: 'style:    💄 Styles update', value: 'style' },
      {
        emoji: '♻️',
        name: 'refactor: ♻️  A code change that neither fixes a bug nor adds a feature',
        value: 'refactor',
      },
      {
        emoji: '⚡️',
        name: 'perf:     ⚡️ A code change that improves performance',
        value: 'perf',
      },
      {
        emoji: '✅',
        name: 'test:     ✅ Adding missing tests or correcting existing tests',
        value: 'test',
      },
      {
        emoji: '📦',
        name: 'build:    📦 Changes that affect the build system or dependencies',
        value: 'build',
      },
      {
        emoji: '👷',
        name: 'ci:       👷 Changes to CI configuration files and scripts',
        value: 'ci',
      },
      {
        emoji: '🔨',
        name: 'chore:    🔨 Other changes that do not modify src or test files',
        value: 'chore',
      },
      {
        emoji: '⏪️',
        name: 'revert:   ⏪️ Reverts a previous commit',
        value: 'revert',
      },
    ],
    useEmoji: true,
  },
  rules: {
    'scope-enum': [2, 'always', SCOPES],
    'subject-empty': [2, 'never'],
    'subject-min-length': [2, 'always', 2],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
      ],
    ],
  },
};

export default defineConfig(config);
