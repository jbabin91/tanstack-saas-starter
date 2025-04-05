import type { Meta, StoryObj } from '@storybook/react';
import { toast } from 'sonner';

import { Button } from '../button';
import { Toaster } from './sonner';

const meta: Meta<typeof Toaster> = {
  component: Toaster,
  decorators: [
    (Story) => (
      <div className="w-full">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/Sonner',
};

export default meta;
type Story = StoryObj<typeof Toaster>;

export const Default: Story = {
  render: () => {
    return (
      <>
        <Toaster />
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            onClick={() => toast('This is a normal toast')}
          >
            Show Toast
          </Button>
        </div>
      </>
    );
  },
};

export const WithTitle: Story = {
  render: () => {
    return (
      <>
        <Toaster />
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            onClick={() =>
              toast('This is a toast with title', {
                description: 'Additional details about this notification',
              })
            }
          >
            Toast with Description
          </Button>
        </div>
      </>
    );
  },
};

export const Success: Story = {
  render: () => {
    return (
      <>
        <Toaster />
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            onClick={() =>
              toast.success('Operation completed successfully', {
                description: 'Your changes have been saved',
              })
            }
          >
            Success Toast
          </Button>
        </div>
      </>
    );
  },
};

export const Error: Story = {
  render: () => {
    return (
      <>
        <Toaster />
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            onClick={() =>
              toast.error('Operation failed', {
                description: 'There was an error processing your request',
              })
            }
          >
            Error Toast
          </Button>
        </div>
      </>
    );
  },
};

export const Warning: Story = {
  render: () => {
    return (
      <>
        <Toaster />
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            onClick={() =>
              toast.warning('Please review information', {
                description: 'Some fields require your attention',
              })
            }
          >
            Warning Toast
          </Button>
        </div>
      </>
    );
  },
};

export const Info: Story = {
  render: () => {
    return (
      <>
        <Toaster />
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            onClick={() =>
              toast.info('Did you know?', {
                description: 'You can customize these toast notifications',
              })
            }
          >
            Info Toast
          </Button>
        </div>
      </>
    );
  },
};

export const WithAction: Story = {
  render: () => {
    return (
      <>
        <Toaster />
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            onClick={() =>
              toast('Item moved to trash', {
                action: {
                  label: 'Undo',
                  onClick: () => toast.success('Action undone'),
                },
                description: 'The item will be permanently deleted in 7 days',
              })
            }
          >
            Toast with Action
          </Button>
        </div>
      </>
    );
  },
};

export const Persistent: Story = {
  render: () => {
    return (
      <>
        <Toaster />
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            onClick={() =>
              toast('This toast will not dismiss automatically', {
                description: 'Click the X button to dismiss',
                duration: Infinity,
              })
            }
          >
            Persistent Toast
          </Button>
        </div>
      </>
    );
  },
};

export const Custom: Story = {
  render: () => {
    return (
      <>
        <Toaster />
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            onClick={() =>
              toast(
                <div className="flex items-center gap-2">
                  <span className="bg-primary h-6 w-6 rounded-full" />
                  <div className="flex flex-col">
                    <span className="font-semibold">Custom Component</span>
                    <span className="text-muted-foreground text-xs">
                      Toasts support custom content
                    </span>
                  </div>
                </div>,
              )
            }
          >
            Custom Toast
          </Button>
        </div>
      </>
    );
  },
};

export const Multiple: Story = {
  render: () => {
    return (
      <>
        <Toaster />
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            onClick={() => {
              toast.success('First toast');
              setTimeout(() => {
                toast.info('Second toast');
              }, 1000);
              setTimeout(() => {
                toast.warning('Third toast');
              }, 2000);
              setTimeout(() => {
                toast.error('Fourth toast');
              }, 3000);
            }}
          >
            Show Multiple Toasts
          </Button>
        </div>
      </>
    );
  },
};
