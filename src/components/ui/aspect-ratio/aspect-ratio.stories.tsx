import type { Meta, StoryObj } from '@storybook/react';

import { AspectRatio } from './aspect-ratio';

const meta: Meta<typeof AspectRatio> = {
  component: AspectRatio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/AspectRatio',
};

export default meta;
type Story = StoryObj<typeof AspectRatio>;

export const Square: Story = {
  render: () => (
    <div className="w-[300px]">
      <AspectRatio ratio={1 / 1}>
        <img
          alt="Landscape"
          className="h-full w-full rounded-md object-cover"
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
        />
      </AspectRatio>
    </div>
  ),
};

export const Widescreen: Story = {
  render: () => (
    <div className="w-[300px]">
      <AspectRatio ratio={16 / 9}>
        <img
          alt="Landscape"
          className="h-full w-full rounded-md object-cover"
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
        />
      </AspectRatio>
    </div>
  ),
};

export const Portrait: Story = {
  render: () => (
    <div className="w-[300px]">
      <AspectRatio ratio={3 / 4}>
        <img
          alt="Landscape"
          className="h-full w-full rounded-md object-cover"
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
        />
      </AspectRatio>
    </div>
  ),
};

export const WithContent: Story = {
  render: () => (
    <div className="w-[300px]">
      <AspectRatio className="bg-muted rounded-md" ratio={16 / 9}>
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground">16:9 Aspect Ratio</p>
            <p className="text-muted-foreground/70 text-xs">
              Content box with fixed aspect ratio
            </p>
          </div>
        </div>
      </AspectRatio>
    </div>
  ),
};

export const Video: Story = {
  render: () => (
    <div className="w-[300px]">
      <AspectRatio ratio={16 / 9}>
        <iframe
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          className="h-full w-full rounded-md object-cover"
          sandbox=""
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="YouTube video player"
        ></iframe>
      </AspectRatio>
    </div>
  ),
};

export const Panorama: Story = {
  render: () => (
    <div className="w-[300px]">
      <AspectRatio ratio={21 / 9}>
        <img
          alt="Panoramic landscape"
          className="h-full w-full rounded-md object-cover"
          src="https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?w=800&dpr=2&q=80"
        />
      </AspectRatio>
    </div>
  ),
};
