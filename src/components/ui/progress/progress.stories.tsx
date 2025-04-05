import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';

import { Progress } from './progress';

const meta: Meta<typeof Progress> = {
  argTypes: {
    value: {
      control: { max: 100, min: 0, type: 'number' },
      description: 'Current progress value (0-100)',
    },
  },
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/Progress',
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    value: 40,
  },
  render: (args) => (
    <div className="w-[300px]">
      <Progress {...args} />
    </div>
  ),
};

export const NoValue: Story = {
  args: {
    value: undefined,
  },
  render: (args) => (
    <div className="w-[300px]">
      <Progress {...args} />
    </div>
  ),
};

export const Complete: Story = {
  args: {
    value: 100,
  },
  render: (args) => (
    <div className="w-[300px]">
      <Progress {...args} />
    </div>
  ),
};

export const WithLabel: Story = {
  args: {
    value: 60,
  },
  render: (args) => {
    return (
      <div className="w-[300px] space-y-2">
        <div className="flex justify-between">
          <span className="text-sm font-medium">Progress</span>
          <span className="text-sm font-medium">{args.value}%</span>
        </div>
        <Progress {...args} />
      </div>
    );
  },
};

export const CustomHeight: Story = {
  args: {
    className: 'h-4',
    value: 75,
  },
  render: (args) => (
    <div className="w-[300px]">
      <Progress {...args} />
    </div>
  ),
};

export const CustomColors: Story = {
  args: {
    value: 50,
  },
  render: (args) => (
    <div className="w-[300px] space-y-4">
      <Progress {...args} className="bg-blue-100 [&>div]:bg-blue-600" />
      <Progress {...args} className="bg-green-100 [&>div]:bg-green-600" />
      <Progress {...args} className="bg-amber-100 [&>div]:bg-amber-600" />
      <Progress {...args} className="bg-red-100 [&>div]:bg-red-600" />
    </div>
  ),
};

export const AnimatedProgress: Story = {
  render: () => {
    const [progress, setProgress] = React.useState(13);

    React.useEffect(() => {
      const timer = setTimeout(() => {
        setProgress(66);
      }, 1000);

      return () => clearTimeout(timer);
    }, []);

    return (
      <div className="w-[300px] space-y-2">
        <div className="flex justify-between">
          <span className="text-sm font-medium">Downloading...</span>
          <span className="text-sm font-medium">{progress}%</span>
        </div>
        <Progress value={progress} />
      </div>
    );
  },
};
