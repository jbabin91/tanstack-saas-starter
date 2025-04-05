import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Label } from '../label';
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
    'aria-label': 'Default input',
    placeholder: 'Enter text...',
  },
};

export const Email: Story = {
  args: {
    'aria-label': 'Email input',
    placeholder: 'Enter email...',
    type: 'email',
  },
};

export const Password: Story = {
  args: {
    'aria-label': 'Password input',
    placeholder: 'Enter password...',
    type: 'password',
  },
};

export const Number: Story = {
  args: {
    'aria-label': 'Number input',
    placeholder: 'Enter number...',
    type: 'number',
  },
};

export const Disabled: Story = {
  args: {
    'aria-label': 'Disabled input',
    disabled: true,
    placeholder: 'Disabled input',
  },
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState('Input with value');
    return (
      <div className="space-y-2">
        <Label
          className="text-foreground font-medium"
          htmlFor="input-with-value"
        >
          Sample Input
        </Label>
        <Input
          className="[&:not(:disabled)]:text-foreground font-medium"
          id="input-with-value"
          placeholder="Type something..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    );
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="space-y-2">
      <Label htmlFor="input-with-label">Email</Label>
      <Input id="input-with-label" placeholder="Enter your email" {...args} />
    </div>
  ),
};
