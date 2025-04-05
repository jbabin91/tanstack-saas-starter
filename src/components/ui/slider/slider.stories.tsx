import type { Meta, StoryObj } from '@storybook/react';

import {
  expect,
  waitForAttribute,
  waitForComponentStability,
  within,
} from '@/test/storybook-test-utils';

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
    await waitForComponentStability(canvasElement);
    const utils = within(canvasElement);
    const slider = utils.getByRole('slider');
    await waitForAttribute(slider, 'aria-valuenow', '50');
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
    await waitForComponentStability(canvasElement);
    const utils = within(canvasElement);
    const thumb = utils.getByRole('slider');
    await waitForAttribute(thumb, 'aria-valuenow', '50');
    await waitForAttribute(thumb, 'aria-valuemin', '0');
    await waitForAttribute(thumb, 'aria-valuemax', '100');
    await waitForAttribute(thumb, 'aria-orientation', 'horizontal');
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
    await waitForComponentStability(canvasElement);
    const utils = within(canvasElement);
    const sliders = utils.getAllByRole('slider');
    expect(sliders).toHaveLength(2);
    await waitForAttribute(sliders[0], 'aria-valuenow', '25');
    await waitForAttribute(sliders[1], 'aria-valuenow', '75');
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
    await waitForComponentStability(canvasElement);
    const utils = within(canvasElement);
    const slider = utils.getByRole('slider');
    const label = utils.getByText('Volume');
    const value = utils.getByText('50');

    expect(slider).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(value).toBeInTheDocument();
  },
  render: (args) => (
    <div className="w-[300px]">
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="slider">Volume</Label>
          <span className="text-muted-foreground hover:border-border w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm">
            {args.defaultValue}
          </span>
        </div>
        <Slider id="slider" {...args} />
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    defaultValue: [50],
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    await waitForComponentStability(canvasElement);
    const utils = within(canvasElement);
    const slider = utils.getByRole('slider');
    const root = slider.closest('[data-slot="slider"]');
    expect(root).toHaveAttribute('data-disabled');
    expect(root).toHaveAttribute('aria-disabled', 'true');
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
    await waitForComponentStability(canvasElement);
    const utils = within(canvasElement);
    const slider = utils.getByRole('slider');
    const root = slider.closest('[data-slot="slider"]');
    expect(root).toHaveClass('[&_[data-slot=slider-range]]:bg-blue-500');
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
