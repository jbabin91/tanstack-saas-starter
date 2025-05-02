import type { Meta, StoryObj } from '@storybook/react';
import { ChevronDownIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '../button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './collapsible';

const meta = {
  component: Collapsible,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/Collapsible',
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Collapsible className="w-[350px] space-y-2">
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">What is a Collapsible?</h4>
        <CollapsibleTrigger asChild>
          <Button className="w-9 p-0" size="sm" variant="ghost">
            <ChevronDownIcon className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-3 font-mono text-sm">
          A collapsible is a component that can be expanded or collapsed to show
          or hide content. It's useful for creating accordions, FAQs, and other
          interactive content.
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const WithDefaultOpen: Story = {
  render: () => (
    <Collapsible defaultOpen className="w-[350px] space-y-2">
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">Default Open Example</h4>
        <CollapsibleTrigger asChild>
          <Button className="w-9 p-0" size="sm" variant="ghost">
            <ChevronDownIcon className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-3 font-mono text-sm">
          This collapsible starts in an open state by default. You can control
          this behavior using the defaultOpen prop.
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <Collapsible
        className="w-[350px] space-y-2"
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">Controlled Example</h4>
          <CollapsibleTrigger asChild>
            <Button className="w-9 p-0" size="sm" variant="ghost">
              <ChevronDownIcon className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border px-4 py-3 font-mono text-sm">
            This is a controlled collapsible component. The open state is
            managed externally using React state.
          </div>
        </CollapsibleContent>
        <div className="px-4">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? 'Close' : 'Open'} from outside
          </Button>
        </div>
      </Collapsible>
    );
  },
};
