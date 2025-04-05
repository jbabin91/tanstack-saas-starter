import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../card';
import { Input } from '../input';
import { Label } from '../label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/Tabs',
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs className="w-[400px]" defaultValue="account">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account settings here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input defaultValue="John Doe" id="name" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input defaultValue="@johndoe" id="username" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};

export const MultipleTabs: Story = {
  render: () => (
    <Tabs className="w-[400px]" defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <div className="mt-2 rounded-md border p-4">
          <h3 className="mb-2 font-medium">Overview</h3>
          <p className="text-muted-foreground text-sm">
            This is the overview tab content. You can put any information here.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="analytics">
        <div className="mt-2 rounded-md border p-4">
          <h3 className="mb-2 font-medium">Analytics</h3>
          <p className="text-muted-foreground text-sm">
            View your analytics data and performance metrics.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="reports">
        <div className="mt-2 rounded-md border p-4">
          <h3 className="mb-2 font-medium">Reports</h3>
          <p className="text-muted-foreground text-sm">
            Access and download various reports from your account.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="settings">
        <div className="mt-2 rounded-md border p-4">
          <h3 className="mb-2 font-medium">Settings</h3>
          <p className="text-muted-foreground text-sm">
            Manage your account settings and preferences.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Tabs className="w-[400px]" defaultValue="messages">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="messages">
          <svg
            className="mr-2"
            fill="none"
            height="16"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Messages
        </TabsTrigger>
        <TabsTrigger value="contacts">
          <svg
            className="mr-2"
            fill="none"
            height="16"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          Contacts
        </TabsTrigger>
        <TabsTrigger value="settings">
          <svg
            className="mr-2"
            fill="none"
            height="16"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent className="p-4" value="messages">
        <h3 className="font-medium">Messages</h3>
        <p className="text-muted-foreground mt-2 text-sm">
          Your messages will appear here.
        </p>
      </TabsContent>
      <TabsContent className="p-4" value="contacts">
        <h3 className="font-medium">Contacts</h3>
        <p className="text-muted-foreground mt-2 text-sm">
          Your contacts will appear here.
        </p>
      </TabsContent>
      <TabsContent className="p-4" value="settings">
        <h3 className="font-medium">Settings</h3>
        <p className="text-muted-foreground mt-2 text-sm">
          Your settings will appear here.
        </p>
      </TabsContent>
    </Tabs>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <Tabs className="w-[400px]" defaultValue="music">
      <TabsList className="bg-muted flex h-10 items-center justify-center rounded-md p-1">
        <TabsTrigger
          className="ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=inactive]:text-muted-foreground inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
          value="music"
        >
          Music
        </TabsTrigger>
        <TabsTrigger
          className="ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=inactive]:text-muted-foreground inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
          value="videos"
        >
          Videos
        </TabsTrigger>
      </TabsList>
      <TabsContent className="bg-card mt-2 rounded-md border p-4" value="music">
        <h3 className="text-foreground font-medium">Music</h3>
        <p className="text-muted-foreground mt-2 text-sm">
          Your music collection appears here.
        </p>
      </TabsContent>
      <TabsContent
        className="bg-card mt-2 rounded-md border p-4"
        value="videos"
      >
        <h3 className="text-foreground font-medium">Videos</h3>
        <p className="text-muted-foreground mt-2 text-sm">
          Your video collection appears here.
        </p>
      </TabsContent>
    </Tabs>
  ),
};
