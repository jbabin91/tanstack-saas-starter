import type { Meta, StoryObj } from '@storybook/react';
import {
  AlertCircleIcon,
  CheckCircleIcon,
  InfoIcon,
  XCircleIcon,
} from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from './alert';

const meta: Meta<typeof Alert> = {
  argTypes: {
    variant: {
      control: 'select',
      description: 'The visual style of the alert',
      options: ['default', 'destructive'],
    },
  },
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/Alert',
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  render: () => (
    <Alert>
      <AlertTitle>Default Alert</AlertTitle>
      <AlertDescription>
        This is a default alert — check it out!
      </AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive">
      <AlertTitle>Destructive Alert</AlertTitle>
      <AlertDescription>
        This is a destructive alert — careful!
      </AlertDescription>
    </Alert>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Alert>
      <InfoIcon />
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>
        This alert includes an icon to draw attention.
      </AlertDescription>
    </Alert>
  ),
};

export const WithDestructiveIcon: Story = {
  render: () => (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>
        This destructive alert includes a warning icon.
      </AlertDescription>
    </Alert>
  ),
};

export const TitleOnly: Story = {
  render: () => (
    <Alert>
      <InfoIcon />
      <AlertTitle>This alert only has a title with an icon</AlertTitle>
    </Alert>
  ),
};

export const DescriptionOnly: Story = {
  render: () => (
    <Alert>
      <AlertDescription>
        This alert only has a description without a title.
      </AlertDescription>
    </Alert>
  ),
};

export const SuccessAlert: Story = {
  render: () => (
    <Alert className="border-green-500 bg-green-50 text-green-800">
      <CheckCircleIcon className="text-green-500" />
      <AlertTitle>Success</AlertTitle>
      <AlertDescription className="text-green-700">
        Your changes have been saved successfully.
      </AlertDescription>
    </Alert>
  ),
};

export const ErrorAlert: Story = {
  render: () => (
    <Alert className="border-red-500 bg-red-50 text-red-800">
      <XCircleIcon className="text-red-500" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription className="text-red-700">
        There was a problem with your request. Please try again.
      </AlertDescription>
    </Alert>
  ),
};

export const MultipleParagraphs: Story = {
  render: () => (
    <Alert>
      <InfoIcon />
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>
        <p>This alert contains multiple paragraphs for longer content.</p>
        <p>
          You can include as many paragraphs as needed to convey your message.
        </p>
        <p>Each paragraph is styled consistently with proper spacing.</p>
      </AlertDescription>
    </Alert>
  ),
};

export const CustomWidth: Story = {
  render: () => (
    <div className="w-[400px]">
      <Alert>
        <InfoIcon />
        <AlertTitle>Custom Width</AlertTitle>
        <AlertDescription>
          This alert has a custom width set on a parent container. This shows
          how the alert adapts to different container sizes.
        </AlertDescription>
      </Alert>
    </div>
  ),
};
