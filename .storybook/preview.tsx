import '../src/styles/globals.css';

import { withThemeByClassName } from '@storybook/addon-themes';
import { DocsContainer } from '@storybook/blocks';
import type { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';

import { ThemeProvider } from '../src/providers/theme-provider';

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      defaultTheme: 'dark',
      themes: {
        dark: 'dark bg-background',
        light: 'light bg-background',
      },
    }),
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    actions: {
      // Remove argTypesRegex as it's not recommended with visual test addon
      // Instead, use explicit actions in your stories with fn from @storybook/test
    },
    backgrounds: {
      disable: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      container: ({ children, context }: any) => {
        // Get the current theme from globals
        const currentTheme = context?.store?.globals?.globals?.theme ?? 'dark';

        return (
          <DocsContainer
            context={context}
            theme={currentTheme === 'dark' ? themes.dark : themes.light}
          >
            {children}
          </DocsContainer>
        );
      },
    },
  },
};

export default preview;
