import type { Meta, StoryObj } from '@storybook/react';
import { Check, ChevronRight, Github, Loader2, Mail } from 'lucide-react';

import { Button } from './button';

const meta: Meta<typeof Button> = {
  argTypes: {
    asChild: {
      control: 'boolean',
      description: 'Whether to render as a child component',
    },
    size: {
      control: 'select',
      description: 'The size of the button',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    variant: {
      control: 'select',
      description: 'The visual style of the button',
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
      ],
    },
  },
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/Button',
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
    size: 'default',
    variant: 'default',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Destructive',
    size: 'default',
    variant: 'destructive',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline',
    size: 'default',
    variant: 'outline',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    size: 'default',
    variant: 'secondary',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost',
    size: 'default',
    variant: 'ghost',
  },
};

export const Link: Story = {
  args: {
    children: 'Link',
    size: 'default',
    variant: 'link',
  },
};

export const Small: Story = {
  args: {
    children: 'Small',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    children: 'Large',
    size: 'lg',
  },
};

export const Icon: Story = {
  args: {
    children: '🔍',
    size: 'icon',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
};

export const WithLeftIcon: Story = {
  args: {
    children: (
      <>
        <Mail className="mr-2 h-4 w-4" /> Login with Email
      </>
    ),
  },
};

export const WithRightIcon: Story = {
  args: {
    children: (
      <>
        Next Step <ChevronRight className="ml-2 h-4 w-4" />
      </>
    ),
  },
};

export const Loading: Story = {
  args: {
    children: (
      <>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
      </>
    ),
    disabled: true,
  },
};

export const Success: Story = {
  args: {
    children: (
      <>
        <Check className="mr-2 h-4 w-4" /> Complete
      </>
    ),
    className:
      'bg-green-50 text-green-600 border-green-300 hover:bg-green-100 hover:text-green-700',
    variant: 'outline',
  },
};

export const WithSocialIcon: Story = {
  args: {
    children: (
      <>
        <Github className="mr-2 h-4 w-4" /> Login with GitHub
      </>
    ),
    variant: 'outline',
  },
};

export const ButtonGroup: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        <Button>Default</Button>
        <Button variant="destructive">Delete</Button>
        <Button variant="outline">Cancel</Button>
      </div>
      <div className="flex gap-2">
        <Button size="sm">Save</Button>
        <Button size="sm" variant="outline">
          Reset
        </Button>
        <Button size="sm" variant="ghost">
          Preview
        </Button>
      </div>
      <div className="inline-flex rounded-md shadow-sm">
        <Button className="rounded-r-none">Previous</Button>
        <Button className="rounded-none border-r-0 border-l-0">Current</Button>
        <Button className="rounded-l-none">Next</Button>
      </div>
    </div>
  ),
};
