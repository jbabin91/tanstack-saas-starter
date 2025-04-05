/* eslint-disable react-hooks/rules-of-hooks */
import '../src/styles/globals.css';

import { DocsContainer } from '@storybook/addon-docs';
import { withThemeByClassName } from '@storybook/addon-themes';
import { addons } from '@storybook/preview-api';
import type { Preview, ReactRenderer } from '@storybook/react';
import { themes } from '@storybook/theming';
import { useEffect, useState } from 'react';
import { DARK_MODE_EVENT_NAME, useDarkMode } from 'storybook-dark-mode';

import { ThemeProvider } from '../src/providers/theme-provider';

const channel = addons.getChannel();

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
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    darkMode: {
      classTarget: 'html',
      current: 'dark',
      dark: { ...themes.dark },
      darkClass: 'dark',
      light: { ...themes.light },
      lightClass: 'light',
      stylePreview: true,
    },
    docs: {
      container: (props: any) => {
        const [, setDark] = useState();

        useEffect(() => {
          channel.on(DARK_MODE_EVENT_NAME, setDark);
          return () => channel.removeListener(DARK_MODE_EVENT_NAME, setDark);
        }, [channel, setDark]);

        return (
          <div>
            <DocsContainer {...props} />
          </div>
        );
      },
    },
  },
};

export default preview;
