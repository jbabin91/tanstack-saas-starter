import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../button';
import { Input } from '../input';
import { Label } from '../label';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

const meta: Meta<typeof Popover> = {
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/Popover',
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="leading-none font-medium">Dimensions</h4>
          <p className="text-muted-foreground text-sm">
            Set the dimensions for the layer.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Update dimensions</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">Dimensions</h4>
            <p className="text-muted-foreground text-sm">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Width</Label>
              <Input className="col-span-2" defaultValue="100%" id="width" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Height</Label>
              <Input className="col-span-2" defaultValue="25px" id="height" />
            </div>
          </div>
          <div className="flex justify-end">
            <Button size="sm">Apply</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const WithDifferentAlignments: Story = {
  render: () => (
    <div className="flex items-center justify-center space-x-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Left</Button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <div className="px-1">
            <p>This popover is aligned to the left.</p>
          </div>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Center</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="px-1">
            <p>This popover is aligned to the center.</p>
          </div>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Right</Button>
        </PopoverTrigger>
        <PopoverContent align="end">
          <div className="px-1">
            <p>This popover is aligned to the right.</p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

export const WithCustomStyling: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Custom Styling</Button>
      </PopoverTrigger>
      <PopoverContent className="border-blue-600 bg-blue-500 text-white">
        <p>This popover has custom styling applied.</p>
        <p className="mt-2 text-sm text-blue-100">
          You can customize the appearance using Tailwind classes.
        </p>
      </PopoverContent>
    </Popover>
  ),
};
