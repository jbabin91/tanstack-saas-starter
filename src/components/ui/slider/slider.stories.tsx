import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for slider to initialize
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Test slider elements
    const slider = canvas.getByRole('slider');
    await expect(slider).toBeInTheDocument();
    await expect(slider).toHaveAttribute('aria-valuenow', '50');
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
    step: 10,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const thumb = canvas.getByRole('slider');

    // Check that the thumb has the correct ARIA attributes
    await expect(thumb).toHaveAttribute('aria-valuenow', '50');
    await expect(thumb).toHaveAttribute('aria-valuemin', '0');
    await expect(thumb).toHaveAttribute('aria-valuemax', '100');
    await expect(thumb).toHaveAttribute('aria-orientation', 'horizontal');
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for slider to initialize
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Test range sliders
    const sliders = canvas.getAllByRole('slider');
    await expect(sliders).toHaveLength(2);
    await expect(sliders[0]).toHaveAttribute('aria-valuenow', '25');
    await expect(sliders[1]).toHaveAttribute('aria-valuenow', '75');
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for slider to initialize
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Test label and value display
    await expect(canvas.getByText('Volume')).toBeInTheDocument();
    await expect(canvas.getByText('50%')).toBeInTheDocument();

    // Test slider
    const slider = canvas.getByRole('slider');
    await expect(slider).toHaveAttribute('aria-valuenow', '50');
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for slider to initialize
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Test disabled state
    const root = canvas.getByRole('slider').closest('[data-slot="slider"]');
    await expect(root).toHaveAttribute('data-disabled');
    await expect(root).toHaveAttribute('aria-disabled', 'true');
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for slider to initialize
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Test custom styles
    const slider = canvas.getByRole('slider').closest('[data-slot="slider"]');
    await expect(slider).toHaveClass(
      '[&_[data-slot=slider-range]]:bg-blue-500',
    );
  },
  render: (args) => (
    <div className="w-[300px]">
      <Slider
        className="[&_[data-slot=slider-range]]:bg-blue-500"
        data-testid="slider-range"
        {...args}
      />
    </div>
  ),
};
