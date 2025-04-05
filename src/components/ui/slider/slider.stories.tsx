import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';

import { Label } from '../label';
import { Slider } from './slider';

const meta: Meta<typeof Slider> = {
  argTypes: {
    defaultValue: {
      description: 'Default value(s) of the slider',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the slider is disabled',
    },
    max: {
      control: { type: 'number' },
      description: 'Maximum value of the slider',
    },
    min: {
      control: { type: 'number' },
      description: 'Minimum value of the slider',
    },
    onValueChange: {
      action: 'value changed',
      description: 'Event handler called when the value changes',
    },
    orientation: {
      control: { options: ['horizontal', 'vertical'], type: 'select' },
      description: 'Orientation of the slider',
    },
    step: {
      control: { type: 'number' },
      description: 'Step value of the slider',
    },
  },
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/Slider',
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {
    defaultValue: [50],
  },
  render: (args) => (
    <div className="w-[300px]">
      <Slider {...args} />
    </div>
  ),
};

export const WithSteps: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    min: 0,
    step: 10,
  },
  render: (args) => (
    <div className="w-[300px]">
      <Slider {...args} />
    </div>
  ),
};

export const Range: Story = {
  args: {
    defaultValue: [25, 75],
  },
  render: (args) => (
    <div className="w-[300px]">
      <Slider {...args} />
    </div>
  ),
};

export const WithLabel: Story = {
  args: {
    defaultValue: [50],
  },
  render: (args) => {
    const [value, setValue] = React.useState(args.defaultValue);

    return (
      <div className="w-[300px] space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="volume">Volume</Label>
          <span className="text-muted-foreground w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm">
            {value}%
          </span>
        </div>
        <Slider
          id="volume"
          max={100}
          min={0}
          step={1}
          value={value}
          onValueChange={setValue}
          {...args}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: [50],
    disabled: true,
  },
  render: (args) => (
    <div className="w-[300px]">
      <Slider {...args} />
    </div>
  ),
};

export const CustomStyles: Story = {
  args: {
    defaultValue: [40],
  },
  render: (args) => (
    <div className="w-[300px]">
      <Slider className="[&_[data-slot=slider-range]]:bg-blue-500" {...args} />
    </div>
  ),
};
