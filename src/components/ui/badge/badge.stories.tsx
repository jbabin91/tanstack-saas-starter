import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from './badge';

const meta: Meta<typeof Badge> = {
  argTypes: {
    asChild: {
      control: 'boolean',
      description: 'Whether to render as a child component',
    },
    variant: {
      control: 'select',
      description: 'The visual style of the badge',
      options: ['default', 'destructive', 'outline', 'secondary'],
    },
  },
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/Badge',
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Destructive',
    variant: 'destructive',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};

export const WithIcon: Story = {
  render: () => (
    <Badge>
      <svg
        fill="none"
        height="16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2v20" />
        <path d="m17 5-5-3-5 3" />
      </svg>
      New Release
    </Badge>
  ),
};

export const Multiple: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Badge 1</Badge>
      <Badge variant="secondary">Badge 2</Badge>
      <Badge variant="outline">Badge 3</Badge>
      <Badge variant="destructive">Badge 4</Badge>
    </div>
  ),
};
