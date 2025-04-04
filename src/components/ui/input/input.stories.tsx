import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './input';

const meta: Meta<typeof Input> = {
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    type: {
      control: 'select',
      description: 'The type of input',
      options: ['text', 'password', 'email', 'number', 'search', 'tel', 'url'],
    },
  },
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/Input',
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const Email: Story = {
  args: {
    placeholder: 'Enter email...',
    type: 'email',
  },
};

export const Password: Story = {
  args: {
    placeholder: 'Enter password...',
    type: 'password',
  },
};

export const Number: Story = {
  args: {
    placeholder: 'Enter number...',
    type: 'number',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
  },
};

export const WithValue: Story = {
  args: {
    value: 'Input with value',
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="space-y-2">
      <label className="text-sm font-medium" htmlFor="input-with-label">
        Email
      </label>
      <Input id="input-with-label" placeholder="Enter your email" {...args} />
    </div>
  ),
};
