import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/components/ui/button';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card';

const meta: Meta<typeof Card> = {
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/Card',
};

export default meta;
type Story = StoryObj<typeof Card>;

// Simple card with header, content, and footer
export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>
          Card description that explains what this card is about.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          This is the main content area of the card where you can add any
          content.
        </p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  ),
};

// Card with interactive elements
export const WithInteractiveElements: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Newsletter</CardTitle>
        <CardDescription>
          Get updates on our latest features and releases.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-medium" htmlFor="name">
                Name
              </label>
              <input
                className="rounded-md border px-3 py-2"
                id="name"
                placeholder="Enter your name"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-medium" htmlFor="email">
                Email
              </label>
              <input
                className="rounded-md border px-3 py-2"
                id="email"
                placeholder="Enter your email"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost">Cancel</Button>
        <Button>Subscribe</Button>
      </CardFooter>
    </Card>
  ),
};

// Card with action in header
export const WithHeaderAction: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
        <CardAction>
          <Button size="sm" variant="outline">
            Mark all as read
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="bg-muted/50 rounded-md p-3">
            <p className="font-medium">New feature released</p>
            <p className="text-muted-foreground text-sm">
              Check out our latest update.
            </p>
          </div>
          <div className="bg-muted/50 rounded-md p-3">
            <p className="font-medium">Your subscription</p>
            <p className="text-muted-foreground text-sm">
              Your trial ends in 7 days.
            </p>
          </div>
          <div className="bg-muted/50 rounded-md p-3">
            <p className="font-medium">Security alert</p>
            <p className="text-muted-foreground text-sm">
              Please update your password.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="link">
          View all notifications
        </Button>
      </CardFooter>
    </Card>
  ),
};

// Card with image
export const WithImage: Story = {
  render: () => (
    <Card className="w-[350px] overflow-hidden">
      <div className="bg-muted aspect-video w-full">
        <div className="flex h-full items-center justify-center bg-slate-200">
          <p className="text-sm text-slate-500">Card Image</p>
        </div>
      </div>
      <CardHeader>
        <CardTitle>Card with Image</CardTitle>
        <CardDescription>Cards can include images at the top.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          This card demonstrates how to include an image in a card component.
        </p>
      </CardContent>
      <CardFooter className="justify-end">
        <Button>Read More</Button>
      </CardFooter>
    </Card>
  ),
};

// Simple card with no header or footer
export const Simple: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardContent className="pt-6">
        <p>This is a simple card with only content and no header or footer.</p>
      </CardContent>
    </Card>
  ),
};

// Card with horizontal layout
export const Horizontal: Story = {
  render: () => (
    <Card className="flex w-[500px] flex-row">
      <div className="bg-muted flex w-1/3 items-center justify-center">
        <p className="text-muted-foreground text-sm">Image</p>
      </div>
      <div className="w-2/3">
        <CardHeader>
          <CardTitle>Horizontal Card</CardTitle>
          <CardDescription>A card with horizontal layout</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card demonstrates a horizontal layout variation.</p>
        </CardContent>
        <CardFooter>
          <Button size="sm">Learn More</Button>
        </CardFooter>
      </div>
    </Card>
  ),
};
