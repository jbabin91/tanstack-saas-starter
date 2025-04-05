import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { Progress } from './progress';

const meta = {
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/Progress',
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 45,
  },
};

export const Small: Story = {
  args: {
    className: 'h-1',
    value: 60,
  },
};

export const Large: Story = {
  args: {
    className: 'h-3',
    value: 80,
  },
};

// Interactive example with loading simulation
export const Loading: Story = {
  render: function Render() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const timer = setTimeout(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            return 0;
          }
          return prevProgress + 5;
        });
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    }, [progress]);

    return (
      <div className="w-full max-w-sm">
        <Progress className="mb-2" value={progress} />
        <div className="text-center text-sm">{progress}% complete</div>
      </div>
    );
  },
};

export const CustomColors: Story = {
  args: {
    className: 'bg-gray-200 [&>div]:bg-blue-500',
    value: 50,
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <div className="mb-1 flex justify-between text-sm">
        <span>Progress</span>
        <span>75%</span>
      </div>
      <Progress value={75} />
    </div>
  ),
};
