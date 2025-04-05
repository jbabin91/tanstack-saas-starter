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
    <ScrollArea
      aria-label="Vertical scroll content"
      className="focus-visible:ring-ring h-[200px] w-[350px] rounded-md border p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      role="region"
      tabIndex={0}
    >
      <div className="space-y-4">
        <h4
          className="text-foreground text-sm font-medium"
          id="vertical-scroll-title"
        >
          Vertical Scroll Example
        </h4>
        <div className="space-y-1" role="menu">
          {Array.from({ length: 10 }, (_, i) => (
            <button
              key={i}
              className="bg-background hover:bg-accent focus:bg-accent text-foreground w-full rounded px-2 py-2 text-left text-sm"
              role="menuitem"
              type="button"
            >
              <p>
                Item {i + 1} - Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </p>
            </button>
          ))}
        </div>
      </div>
    </ScrollArea>
  ),
};

export const HorizontalScroll: Story = {
  render: () => (
    <ScrollArea
      aria-label="Horizontal scroll content"
      className="focus-visible:ring-ring w-[350px] rounded-md border p-4 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      role="region"
      tabIndex={0}
    >
      <div className="flex space-x-4" role="menu">
        {Array.from({ length: 10 }, (_, i) => (
          <button
            key={i}
            className="bg-background hover:bg-accent focus:bg-accent text-foreground w-[200px] shrink-0 rounded-md border border-dashed p-4 text-left"
            role="menuitem"
            type="button"
          >
            <div className="text-sm">Horizontal Item {i + 1}</div>
            <div className="text-muted-foreground text-sm">
              Additional content for item {i + 1}
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const BothScrollbars: Story = {
  render: () => (
    <ScrollArea
      aria-label="Content with both vertical and horizontal scroll"
      className="focus-visible:ring-ring h-[400px] w-[600px] rounded-md border p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      role="region"
      tabIndex={0}
    >
      <div className="w-[800px]">
        <div className="space-y-4">
          <h4
            className="text-foreground text-sm font-medium"
            id="both-scroll-title"
          >
            Both Scrollbars Example
          </h4>
          <div className="space-y-1" role="menu">
            {Array.from({ length: 15 }, (_, i) => (
              <button
                key={i}
                className="bg-background hover:bg-accent focus:bg-accent text-foreground w-full rounded px-2 py-2 text-left text-sm"
                role="menuitem"
                type="button"
              >
                <p>
                  Item {i + 1} - Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat.
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  ),
};

export const WithMaxHeight: Story = {
  render: () => (
    <ScrollArea
      aria-label="Content with maximum height"
      className="focus-visible:ring-ring h-[200px] w-[350px] rounded-md border p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      role="region"
      tabIndex={0}
    >
      <div className="space-y-4">
        <h4
          className="text-foreground text-sm font-medium"
          id="max-height-title"
        >
          Max Height Example
        </h4>
        <p className="text-muted-foreground text-sm">
          The scroll area will only show a scrollbar when the content exceeds
          the max height.
        </p>
        <div className="space-y-1" role="menu">
          {Array.from({ length: 5 }, (_, i) => (
            <button
              key={i}
              className="bg-background hover:bg-accent focus:bg-accent text-foreground w-full rounded px-2 py-2 text-left text-sm"
              role="menuitem"
              type="button"
            >
              <p>
                Item {i + 1} - This is a shorter content example to demonstrate
                scrollbar behavior with limited content.
              </p>
            </button>
          ))}
        </div>
      </div>
    </ScrollArea>
  ),
};
