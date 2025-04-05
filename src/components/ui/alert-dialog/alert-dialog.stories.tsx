import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/components/ui/button';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './alert-dialog';

const meta: Meta<typeof AlertDialog> = {
  component: AlertDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/AlertDialog',
};

export default meta;
type Story = StoryObj<typeof AlertDialog>;

export const Default: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const WithCustomTrigger: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>
          <span className="mr-2">🚨</span> Open Alert
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Important Notice</AlertDialogTitle>
          <AlertDialogDescription>
            Please read this information carefully before proceeding.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Dismiss</AlertDialogCancel>
          <AlertDialogAction>Acknowledge</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const DestructiveConfirmation: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete Files</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Selected Files</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to delete 5 files. This action cannot be undone. These
            files will be permanently removed from the server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="destructive">Delete Files</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const WithCustomContent: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Show Terms of Service</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[600px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Terms of Service</AlertDialogTitle>
          <AlertDialogDescription>
            Please read and accept our terms of service before continuing.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="my-4 max-h-[300px] overflow-auto rounded-md border p-4 text-sm">
          <h3 className="mb-2 font-medium">1. Introduction</h3>
          <p className="mb-2">
            These terms and conditions govern your use of our website and
            services. By accessing or using our service, you agree to be bound
            by these terms.
          </p>

          <h3 className="mt-4 mb-2 font-medium">2. Privacy Policy</h3>
          <p className="mb-2">
            Our privacy policy describes how we collect, use, and protect your
            personal information. Please review our privacy policy to understand
            our practices.
          </p>

          <h3 className="mt-4 mb-2 font-medium">3. User Accounts</h3>
          <p className="mb-2">
            When you create an account with us, you must provide information
            that is accurate, complete, and current at all times. You are
            responsible for maintaining the confidentiality of your account and
            password.
          </p>

          <h3 className="mt-4 mb-2 font-medium">4. Intellectual Property</h3>
          <p className="mb-2">
            The service and its original content, features, and functionality
            are and will remain the exclusive property of our company. The
            service is protected by copyright, trademark, and other laws.
          </p>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Decline</AlertDialogCancel>
          <AlertDialogAction>Accept Terms</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const WithMultipleActions: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>File Options</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>File Actions</AlertDialogTitle>
          <AlertDialogDescription>
            Choose what you want to do with document.pdf
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="my-4 flex flex-col gap-2">
          <Button className="w-full justify-start" variant="outline">
            <span className="mr-2">📋</span> Copy to clipboard
          </Button>
          <Button className="w-full justify-start" variant="outline">
            <span className="mr-2">💾</span> Download file
          </Button>
          <Button className="w-full justify-start" variant="outline">
            <span className="mr-2">📤</span> Share with others
          </Button>
          <Button
            className="w-full justify-start text-red-500 hover:text-red-600"
            variant="outline"
          >
            <span className="mr-2">🗑️</span> Delete file
          </Button>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};
