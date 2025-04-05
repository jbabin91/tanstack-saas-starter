import type { Meta, StoryObj } from '@storybook/react';

import { HoverCard, HoverCardContent, HoverCardTrigger } from './hover-card';

const meta = {
  component: HoverCard,
  tags: ['autodocs'],
  title: 'UI/HoverCard',
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="cursor-pointer underline decoration-dotted">
          Hover over me
        </span>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Basic Hover Card</h4>
          <p className="text-sm">
            This is a basic hover card that appears when you hover over the
            trigger.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const LeftAligned: Story = {
  render: () => (
    <div className="flex justify-center">
      <HoverCard>
        <HoverCardTrigger asChild>
          <span className="cursor-pointer underline decoration-dotted">
            Left-aligned content
          </span>
        </HoverCardTrigger>
        <HoverCardContent align="start">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Left Aligned Content</h4>
            <p className="text-sm">
              This hover card content is aligned to the left of the trigger.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
};

export const RightAligned: Story = {
  render: () => (
    <div className="flex justify-center">
      <HoverCard>
        <HoverCardTrigger asChild>
          <span className="cursor-pointer underline decoration-dotted">
            Right-aligned content
          </span>
        </HoverCardTrigger>
        <HoverCardContent align="end">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Right Aligned Content</h4>
            <p className="text-sm">
              This hover card content is aligned to the right of the trigger.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
};

export const CustomOffset: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="cursor-pointer underline decoration-dotted">
          Custom offset
        </span>
      </HoverCardTrigger>
      <HoverCardContent sideOffset={10}>
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Custom Offset</h4>
          <p className="text-sm">
            This hover card has a larger offset from its trigger (10px).
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};
