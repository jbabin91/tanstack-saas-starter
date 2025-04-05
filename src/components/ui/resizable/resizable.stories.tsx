import type { Meta, StoryObj } from '@storybook/react';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from './resizable';

const meta = {
  component: ResizablePanelGroup,
  tags: ['autodocs'],
  title: 'UI/Resizable',
} satisfies Meta<typeof ResizablePanelGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TwoPanels: Story = {
  args: {
    direction: 'horizontal',
  },
  render: () => (
    <ResizablePanelGroup
      className="h-[400px] max-w-[800px] rounded-lg border"
      direction="horizontal"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Left Panel</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Right Panel</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const ThreePanels: Story = {
  args: {
    direction: 'horizontal',
  },
  render: () => (
    <ResizablePanelGroup
      className="h-[400px] max-w-[800px] rounded-lg border"
      direction="horizontal"
    >
      <ResizablePanel defaultSize={30}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Navigation</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={40}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Content</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={30}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Preview</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const VerticalLayout: Story = {
  args: {
    direction: 'vertical',
  },
  render: () => (
    <ResizablePanelGroup
      className="h-[500px] max-w-[800px] rounded-lg border"
      direction="vertical"
    >
      <ResizablePanel defaultSize={30}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Top Panel</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={70}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Bottom Panel</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const WithHandles: Story = {
  args: {
    direction: 'horizontal',
  },
  render: () => (
    <ResizablePanelGroup
      className="h-[400px] max-w-[800px] rounded-lg border"
      direction="horizontal"
    >
      <ResizablePanel defaultSize={30}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Left Panel</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={40}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Middle Panel</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={30}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Right Panel</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const ComplexLayout: Story = {
  args: {
    direction: 'horizontal',
  },
  render: () => (
    <ResizablePanelGroup
      className="h-[500px] max-w-[800px] rounded-lg border"
      direction="horizontal"
    >
      <ResizablePanel defaultSize={25}>
        <div className="flex h-full flex-col divide-y">
          <div className="flex h-1/2 items-center justify-center p-6">
            <span className="font-semibold">Navigation</span>
          </div>
          <div className="flex h-1/2 items-center justify-center p-6">
            <span className="font-semibold">Settings</span>
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={70}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Main Content</span>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={30}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Console</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};
