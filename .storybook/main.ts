import type { AddonOptionsVite } from '@storybook/addon-coverage';
import type { StorybookConfig } from '@storybook/react-vite';
import viteTsConfigPaths from 'vite-tsconfig-paths';

const coverageConfig: AddonOptionsVite = {
  istanbul: {
    exclude: ['**/routes/**', '**/providers/**', '**/hooks/**', '**/lib/**'],
    include: ['**/*.stories.tsx'],
  },
};

const config: StorybookConfig = {
  addons: [
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/experimental-addon-test',
    '@storybook/addon-themes',
    '@storybook/addon-a11y',
    '@storybook/theming',
    {
      name: '@storybook/addon-coverage',
      options: coverageConfig,
    },
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  viteFinal: (config) => {
    // Add the path aliases plugin to Vite
    config.plugins = [
      ...(config.plugins ?? []),
      viteTsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
    ];

    return config;
  },
};

export default config;
