import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { Avatar, AvatarFallback, AvatarImage } from './avatar';

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/Avatar',
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for image to load
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Test avatar elements
    await expect(canvas.getByRole('img')).toBeInTheDocument();
    await expect(canvas.getByAltText('@shadcn')).toBeInTheDocument();
  },
  render: () => (
    <Avatar>
      <AvatarImage alt="@shadcn" src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

export const WithFallback: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for fallback to show
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Test fallback
    const fallback = canvas.getByText('JD');
    await expect(fallback).toBeInTheDocument();
    await expect(fallback).toBeVisible();
  },
  render: () => (
    <Avatar>
      <AvatarImage alt="John Doe" src="/nonexistent-image.jpg" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};

export const CustomSizes: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for images to load
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Test size classes
    const avatars = canvas.getAllByRole('img');
    await expect(avatars[0].closest('[data-slot="avatar"]')).toHaveClass(
      'size-6',
    );
    await expect(avatars[2].closest('[data-slot="avatar"]')).toHaveClass(
      'size-12',
    );
    await expect(avatars[3].closest('[data-slot="avatar"]')).toHaveClass(
      'size-16',
    );
  },
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar className="size-6">
        <AvatarImage alt="@shadcn" src="https://github.com/shadcn.png" />
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage alt="@shadcn" src="https://github.com/shadcn.png" />
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar className="size-12">
        <AvatarImage alt="@shadcn" src="https://github.com/shadcn.png" />
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
      <Avatar className="size-16">
        <AvatarImage alt="@shadcn" src="https://github.com/shadcn.png" />
        <AvatarFallback>XL</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const WithCustomColor: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test color classes
    const fallbacks = canvas.getAllByTestId('avatar-fallback');
    await expect(fallbacks[0]).toHaveClass('bg-blue-500', 'text-white');
    await expect(fallbacks[1]).toHaveClass('bg-green-500', 'text-white');
    await expect(fallbacks[2]).toHaveClass('bg-purple-500', 'text-white');
    await expect(fallbacks[3]).toHaveClass('bg-amber-500', 'text-white');
  },
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarFallback
          className="bg-blue-500 text-white"
          data-testid="avatar-fallback"
        >
          BL
        </AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback
          className="bg-green-500 text-white"
          data-testid="avatar-fallback"
        >
          GR
        </AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback
          className="bg-purple-500 text-white"
          data-testid="avatar-fallback"
        >
          PR
        </AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback
          className="bg-amber-500 text-white"
          data-testid="avatar-fallback"
        >
          AM
        </AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const Group: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for images to load
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Test group structure
    const avatars = canvas.getAllByRole('img', { hidden: true });
    await expect(avatars).toHaveLength(3);
    await expect(canvas.getByText('+3')).toBeInTheDocument();
  },
  render: () => (
    <div className="flex -space-x-2">
      <Avatar className="border-background border-2">
        <AvatarImage alt="User 1" src="https://github.com/shadcn.png" />
        <AvatarFallback>U1</AvatarFallback>
      </Avatar>
      <Avatar className="border-background border-2">
        <AvatarImage alt="User 2" src="https://github.com/shadcn.png" />
        <AvatarFallback>U2</AvatarFallback>
      </Avatar>
      <Avatar className="border-background border-2">
        <AvatarImage alt="User 3" src="https://github.com/shadcn.png" />
        <AvatarFallback>U3</AvatarFallback>
      </Avatar>
      <Avatar className="border-background border-2">
        <AvatarFallback>+3</AvatarFallback>
      </Avatar>
    </div>
  ),
};
