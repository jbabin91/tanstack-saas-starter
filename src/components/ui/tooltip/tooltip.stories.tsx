import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../button';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/Tooltip',
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This is a tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const WithSideOffset: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover with offset</Button>
      </TooltipTrigger>
      <TooltipContent sideOffset={10}>
        <p>10px away from the trigger</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const WithCustomStyling: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Custom styled</Button>
      </TooltipTrigger>
      <TooltipContent className="bg-blue-600 text-white">
        <p>Custom styled tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size="icon" variant="outline">
          <span>?</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This tooltip appears on an icon button</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const MultipleLines: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Longer tooltip</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This tooltip has multiple lines of content.</p>
        <p>It demonstrates how larger tooltips look.</p>
      </TooltipContent>
    </Tooltip>
  ),
};
