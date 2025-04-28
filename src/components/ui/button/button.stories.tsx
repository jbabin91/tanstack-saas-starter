import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import {
  CheckIcon,
  ChevronRightIcon,
  GithubIcon,
  Loader2Icon,
  MailIcon,
} from 'lucide-react';

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
  tags: ['autodocs', 'test'],
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    // Test initial state
    await expect(button).toHaveTextContent('Button');
    expect(button).not.toBeDisabled();
    expect(button).toHaveClass('bg-primary');

    // Test interaction
    await userEvent.click(button);
    expect(button).toHaveFocus();
  },
};

export const Destructive: Story = {
  args: {
    children: 'Destructive',
    size: 'default',
    variant: 'destructive',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    await expect(button).toHaveTextContent('Destructive');
    expect(button).toHaveClass('bg-destructive');
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    // Test disabled state
    await expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:opacity-50');

    // For disabled buttons, we don't test click interactions
    // since they are prevented by the browser
    expect(button).not.toHaveFocus();
  },
};

export const WithLeftIcon: Story = {
  args: {
    children: (
      <>
        <MailIcon className="mr-2 h-4 w-4" /> Login with Email
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    // Test icon presence
    await expect(button.querySelector('svg')).toBeInTheDocument();
    expect(button).toHaveTextContent('Login with Email');

    // Test icon positioning
    const icon = button.querySelector('svg');
    expect(icon).toHaveClass('mr-2');
  },
};

export const WithRightIcon: Story = {
  args: {
    children: (
      <>
        Next Step <ChevronRightIcon className="ml-2 h-4 w-4" />
      </>
    ),
  },
};

export const Loading: Story = {
  args: {
    children: (
      <>
        <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> Please wait
      </>
    ),
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    // Test loading state
    await expect(button).toBeDisabled();
    const loader = button.querySelector('svg');
    expect(loader).toHaveClass('animate-spin');
    expect(button).toHaveTextContent('Please wait');
  },
};

export const Success: Story = {
  args: {
    children: (
      <>
        <CheckIcon className="mr-2 h-4 w-4" /> Complete
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
        <GithubIcon className="mr-2 h-4 w-4" /> Login with GitHub
      </>
    ),
    variant: 'outline',
  },
};

export const ButtonGroup: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');

    // Test button group rendering
    await expect(buttons).toHaveLength(9);

    // Test button group interactions
    for (const button of buttons) {
      expect(button).not.toBeDisabled();
      await userEvent.click(button);
      expect(button).toHaveFocus();
    }

    // Test specific button styles
    const [defaultBtn, deleteBtn, cancelBtn] = buttons;
    expect(defaultBtn).toHaveTextContent('Default');
    expect(deleteBtn).toHaveTextContent('Delete');
    expect(deleteBtn).toHaveClass('bg-destructive');
    expect(cancelBtn).toHaveTextContent('Cancel');
    expect(cancelBtn).toHaveClass('bg-background');
  },
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
