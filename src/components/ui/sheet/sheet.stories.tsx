import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/components/ui/button';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './sheet';

const meta = {
  component: Sheet,
  tags: ['autodocs'],
  title: 'UI/Sheet',
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Right: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Right Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile settings here.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <div className="text-muted-foreground text-sm">
            Sheet content goes here. You can add form elements, settings, or any
            other content.
          </div>
        </div>
        <SheetFooter>
          <Button>Save Changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const Left: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Left Sheet</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation Menu</SheetTitle>
          <SheetDescription>
            Quick access to different sections.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-2 py-4">
          {['Dashboard', 'Profile', 'Settings', 'Help'].map((item) => (
            <Button key={item} className="justify-start" variant="ghost">
              {item}
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const Top: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Top Sheet</Button>
      </SheetTrigger>
      <SheetContent className="h-[40vh]" side="top">
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>
            Your recent notifications will appear here.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-2 py-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center gap-4 rounded-lg border p-4"
            >
              <div className="bg-primary size-2 rounded-full" />
              <div className="flex-1">
                <div className="font-medium">Notification {i}</div>
                <div className="text-muted-foreground text-sm">
                  This is a sample notification message.
                </div>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const Bottom: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Bottom Sheet</Button>
      </SheetTrigger>
      <SheetContent className="h-[40vh]" side="bottom">
        <SheetHeader>
          <SheetTitle>Music Player</SheetTitle>
          <SheetDescription>
            Currently playing track information.
          </SheetDescription>
        </SheetHeader>
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <div className="bg-muted size-16 rounded-lg" />
            <div>
              <div className="font-medium">Song Title</div>
              <div className="text-muted-foreground text-sm">Artist Name</div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="icon" variant="ghost">
              ⏮
            </Button>
            <Button size="icon">▶</Button>
            <Button size="icon" variant="ghost">
              ⏭
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Edit Settings</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Settings</SheetTitle>
          <SheetDescription>Adjust your application settings.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="name">
              Name
            </label>
            <input
              className="border-input bg-background flex h-10 w-full rounded-md border px-3 py-2 text-sm"
              id="name"
              placeholder="Enter your name"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              className="border-input bg-background flex h-10 w-full rounded-md border px-3 py-2 text-sm"
              id="email"
              placeholder="Enter your email"
              type="email"
            />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">Save Changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};
