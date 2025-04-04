import '../src/styles/globals.css';

import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview, ReactRenderer } from '@storybook/react';
import { useDarkMode } from 'storybook-dark-mode';

import { ThemeProvider } from '../src/providers/theme-provider';

const preview: Preview = {
  decorators: [
    withThemeByClassName<ReactRenderer>({
      defaultTheme: 'light',
      themes: {
        dark: 'dark',
        light: 'light',
      },
    }),
    (Story) => {
      // Get the current dark mode state
      const isDarkMode = useDarkMode();

      return (
        <ThemeProvider forcedTheme={isDarkMode ? 'dark' : 'light'}>
          <Story />
        </ThemeProvider>
      );
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    darkMode: {
      classTarget: 'html',
      current: 'dark',
      darkClass: 'dark',
      lightClass: 'light',
      stylePreview: true,
    },
  },
};

export default preview;
