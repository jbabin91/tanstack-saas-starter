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
      aria-label="Two panel layout"
      className="h-[400px] max-w-[800px] rounded-lg border"
      direction="horizontal"
      role="group"
    >
      <ResizablePanel defaultSize={50} id="left-panel">
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Left Panel</span>
        </div>
      </ResizablePanel>
      <ResizableHandle
        aria-controls="left-panel right-panel"
        aria-label="Resize panels"
        aria-valuemax={80}
        aria-valuemin={20}
        aria-valuenow={50}
      />
      <ResizablePanel defaultSize={50} id="right-panel">
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
      aria-label="Three panel layout"
      className="h-[400px] max-w-[800px] rounded-lg border"
      direction="horizontal"
      role="group"
    >
      <ResizablePanel defaultSize={30} id="nav-panel">
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Navigation</span>
        </div>
      </ResizablePanel>
      <ResizableHandle
        aria-controls="nav-panel content-panel"
        aria-label="Resize navigation and content"
        aria-valuemax={40}
        aria-valuemin={20}
        aria-valuenow={30}
      />
      <ResizablePanel defaultSize={40} id="content-panel">
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Content</span>
        </div>
      </ResizablePanel>
      <ResizableHandle
        aria-controls="content-panel preview-panel"
        aria-label="Resize content and preview"
        aria-valuemax={50}
        aria-valuemin={30}
        aria-valuenow={40}
      />
      <ResizablePanel defaultSize={30} id="preview-panel">
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
      aria-label="Vertical panel layout"
      className="h-[500px] max-w-[800px] rounded-lg border"
      direction="vertical"
      role="group"
    >
      <ResizablePanel defaultSize={30} id="top-panel">
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Top Panel</span>
        </div>
      </ResizablePanel>
      <ResizableHandle
        aria-controls="top-panel bottom-panel"
        aria-label="Resize vertical panels"
        aria-valuemax={80}
        aria-valuemin={20}
        aria-valuenow={30}
      />
      <ResizablePanel defaultSize={70} id="bottom-panel">
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
      aria-label="Three panel layout with visible handles"
      className="h-[400px] max-w-[800px] rounded-lg border"
      direction="horizontal"
      role="group"
    >
      <ResizablePanel defaultSize={30} id="left-handle-panel">
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Left Panel</span>
        </div>
      </ResizablePanel>
      <ResizableHandle
        withHandle
        aria-controls="left-handle-panel middle-handle-panel"
        aria-label="Resize left and middle panels"
        aria-valuemax={40}
        aria-valuemin={20}
        aria-valuenow={30}
      />
      <ResizablePanel defaultSize={40} id="middle-handle-panel">
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Middle Panel</span>
        </div>
      </ResizablePanel>
      <ResizableHandle
        withHandle
        aria-controls="middle-handle-panel right-handle-panel"
        aria-label="Resize middle and right panels"
        aria-valuemax={50}
        aria-valuemin={30}
        aria-valuenow={40}
      />
      <ResizablePanel defaultSize={30} id="right-handle-panel">
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
      aria-label="Complex panel layout with nested groups"
      className="h-[500px] max-w-[800px] rounded-lg border"
      direction="horizontal"
      role="group"
    >
      <ResizablePanel defaultSize={25} id="sidebar-panel">
        <div className="flex h-full flex-col divide-y">
          <div className="flex h-1/2 items-center justify-center p-6">
            <span className="font-semibold">Navigation</span>
          </div>
          <div className="flex h-1/2 items-center justify-center p-6">
            <span className="font-semibold">Settings</span>
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle
        withHandle
        aria-controls="sidebar-panel main-content-panel"
        aria-label="Resize sidebar and main content"
        aria-valuemax={40}
        aria-valuemin={20}
        aria-valuenow={25}
      />
      <ResizablePanel defaultSize={75} id="main-content-panel">
        <ResizablePanelGroup
          aria-label="Main content vertical layout"
          direction="vertical"
          role="group"
        >
          <ResizablePanel defaultSize={70} id="content-area-panel">
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Main Content</span>
            </div>
          </ResizablePanel>
          <ResizableHandle
            withHandle
            aria-controls="content-area-panel console-panel"
            aria-label="Resize content and console areas"
            aria-valuemax={80}
            aria-valuemin={50}
            aria-valuenow={70}
          />
          <ResizablePanel defaultSize={30} id="console-panel">
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Console</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};
