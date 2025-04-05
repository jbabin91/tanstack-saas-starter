import type { Meta, StoryObj } from '@storybook/react';

import { ScrollArea } from './scroll-area';

const meta = {
  component: ScrollArea,
  tags: ['autodocs'],
  title: 'UI/ScrollArea',
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VerticalScroll: Story = {
  render: () => (
    <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
      <div className="space-y-4">
        <h4 className="text-sm leading-none font-medium">
          Vertical Scroll Example
        </h4>
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="text-sm">
            <p>
              Item {i + 1} - Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua.
            </p>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const HorizontalScroll: Story = {
  render: () => (
    <ScrollArea className="w-[350px] rounded-md border p-4 whitespace-nowrap">
      <div className="flex space-x-4">
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i}
            className="w-[200px] shrink-0 rounded-md border border-dashed p-4"
          >
            <div className="text-sm">Horizontal Item {i + 1}</div>
            <div className="text-muted-foreground text-sm">
              Additional content for item {i + 1}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const BothScrollbars: Story = {
  render: () => (
    <ScrollArea className="h-[400px] w-[600px] rounded-md border p-4">
      <div className="w-[800px]">
        <div className="space-y-4">
          <h4 className="text-sm leading-none font-medium">
            Both Scrollbars Example
          </h4>
          {Array.from({ length: 15 }, (_, i) => (
            <div key={i} className="text-sm">
              <p>
                Item {i + 1} - Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat.
              </p>
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  ),
};

export const WithMaxHeight: Story = {
  render: () => (
    <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
      <div className="space-y-4">
        <h4 className="text-sm leading-none font-medium">Max Height Example</h4>
        <p className="text-muted-foreground text-sm">
          The scroll area will only show a scrollbar when the content exceeds
          the max height.
        </p>
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="text-sm">
            <p>
              Item {i + 1} - This is a shorter content example to demonstrate
              scrollbar behavior with limited content.
            </p>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};
