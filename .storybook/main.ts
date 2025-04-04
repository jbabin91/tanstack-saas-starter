import type { StorybookConfig } from '@storybook/react-vite';
import viteTsConfigPaths from 'vite-tsconfig-paths';

const config: StorybookConfig = {
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@chromatic-com/storybook',
    '@storybook/experimental-addon-test',
    '@storybook/addon-themes',
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
