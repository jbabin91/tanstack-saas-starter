import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Label } from '../label';
import { Textarea } from './textarea';

const meta: Meta<typeof Textarea> = {
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Whether the textarea is disabled',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    rows: {
      control: { max: 20, min: 1, type: 'number' },
      description: 'Number of rows',
    },
  },
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/Textarea',
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: 'Type your message here.',
  },
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState(
      'This is a textarea with some content already filled in.',
    );
    return (
      <Textarea
        placeholder="Type your message here."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'You cannot type here...',
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="w-[300px] space-y-2">
      <Label htmlFor="message">Your message</Label>
      <Textarea id="message" placeholder="Type your message here." {...args} />
    </div>
  ),
};

export const WithLabelRequired: Story = {
  render: (args) => (
    <div className="w-[300px] space-y-2">
      <div className="flex items-center gap-1">
        <Label htmlFor="feedback">Your feedback</Label>
        <span className="text-red-500">*</span>
      </div>
      <Textarea
        id="feedback"
        placeholder="Please provide your feedback..."
        {...args}
      />
      <p className="text-muted-foreground text-xs">This field is required</p>
    </div>
  ),
};

export const ResizableWithRows: Story = {
  args: {
    placeholder: 'This textarea has 10 rows',
    rows: 10,
  },
  render: (args) => (
    <div className="w-[400px]">
      <Textarea {...args} />
    </div>
  ),
};
