import type { Meta, StoryObj } from '@storybook/react';

import { Label } from '../label';
import { Checkbox } from './checkbox';

const meta: Meta<typeof Checkbox> = {
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    onCheckedChange: {
      action: 'checked changed',
      description: 'Event handler called when the checked state changes',
    },
  },
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/Checkbox',
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const CheckedDisabled: Story = {
  args: {
    checked: true,
    disabled: true,
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" {...args} />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
};

export const FormGroup: Story = {
  render: (args) => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="email" {...args} />
        <Label htmlFor="email">Email me about product updates</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox defaultChecked id="offers" {...args} />
        <Label htmlFor="offers">Email me about special offers</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="newsletter" {...args} />
        <Label htmlFor="newsletter">Subscribe to newsletter</Label>
      </div>
    </div>
  ),
};
