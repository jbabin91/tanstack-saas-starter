# Storybook

This project uses [Storybook](https://storybook.js.org/) for UI component development and testing.

## Getting Started

To run Storybook:

```bash
pnpm storybook
```

This will start the Storybook server at [http://localhost:6006](http://localhost:6006).

## Writing Stories

Stories are located in the same directory as the component they document, with a `.stories.tsx` extension.

### Example Story

```tsx
// src/components/ui/button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
    size: 'default',
  },
};
```

## Theme Support

Storybook is configured to support both light and dark themes. You can toggle between themes using the theme switcher in the toolbar.

## Documentation

Storybook automatically generates documentation for your components based on the component's props and the stories you write. You can enhance this documentation by:

1. Adding JSDoc comments to your component props
2. Using the `argTypes` field in your story metadata
3. Creating MDX documentation files

## Testing

You can use Storybook for visual testing and interaction testing. The project is configured with the Storybook Test addon, which allows you to write tests for your stories.

## Best Practices

1. Create stories for all reusable UI components
2. Show different states and variations of each component
3. Use controls to make your stories interactive
4. Add documentation to explain how to use the component
5. Test your components in both light and dark themes
