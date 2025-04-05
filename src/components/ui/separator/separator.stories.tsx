import type { Meta, StoryObj } from '@storybook/react';

import { Separator } from './separator';

const meta = {
  component: Separator,
  tags: ['autodocs'],
  title: 'UI/Separator',
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-sm">Above Separator</div>
      <Separator />
      <div className="text-sm">Below Separator</div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-[100px] items-center space-x-4">
      <div className="text-sm">Left</div>
      <Separator orientation="vertical" />
      <div className="text-sm">Right</div>
    </div>
  ),
};

export const InList: Story = {
  render: () => (
    <div className="w-[200px] space-y-4">
      <div className="text-sm font-medium">Navigation</div>
      <Separator />
      <div className="space-y-2">
        <div className="text-sm">Profile</div>
        <div className="text-sm">Settings</div>
        <div className="text-sm">Messages</div>
      </div>
      <Separator />
      <div className="text-muted-foreground text-sm">Log out</div>
    </div>
  ),
};

export const InCard: Story = {
  render: () => (
    <div className="w-[300px] space-y-4 rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <div className="font-medium">Card Title</div>
        <div className="text-muted-foreground text-sm">Action</div>
      </div>
      <Separator />
      <div className="space-y-4">
        <div className="text-sm">
          Card content that demonstrates the use of a separator in a card
          context.
        </div>
        <div className="text-muted-foreground text-sm">
          Additional information below the separator.
        </div>
      </div>
    </div>
  ),
};

export const WithCustomStyling: Story = {
  render: () => (
    <div className="space-y-4">
      <Separator className="bg-primary" />
      <div className="flex space-x-4">
        <div className="text-sm">Left</div>
        <Separator className="bg-primary" orientation="vertical" />
        <div className="text-sm">Right</div>
      </div>
    </div>
  ),
};
