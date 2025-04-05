import type { Meta, StoryObj } from '@storybook/react';
import {
  BarChart,
  Heart,
  Home,
  MessageSquare,
  Package,
  Settings,
  User,
} from 'lucide-react';

import { Button } from '../button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
} from './sidebar';

const meta: Meta<typeof SidebarProvider> = {
  component: SidebarProvider,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  title: 'UI/Sidebar',
};

export default meta;
type Story = StoryObj<typeof SidebarProvider>;

// Basic sidebar demo
export const Default: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <div className="bg-primary h-8 w-8 rounded-md"></div>
            <div className="font-bold">My App</div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive>
                    <Home />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Package />
                    <span>Products</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <BarChart />
                    <span>Analytics</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator />
          <SidebarGroup>
            <SidebarGroupLabel>Settings</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <User />
                    <span>Profile</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Settings />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="p-2">
            <Button className="w-full" variant="outline">
              Logout
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="p-4">
        <div className="text-2xl font-bold">Dashboard</div>
        <p className="text-muted-foreground">Welcome to your dashboard</p>
      </SidebarInset>
    </SidebarProvider>
  ),
};

// Sidebar with badges and actions
export const WithBadgesAndActions: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <div className="bg-primary h-8 w-8 rounded-md"></div>
            <div className="font-bold">My App</div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive>
                    <Home />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <MessageSquare />
                    <span>Messages</span>
                  </SidebarMenuButton>
                  <SidebarMenuBadge>5</SidebarMenuBadge>
                  <SidebarMenuAction>
                    <Heart />
                  </SidebarMenuAction>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <BarChart />
                    <span>Analytics</span>
                  </SidebarMenuButton>
                  <SidebarMenuBadge>New</SidebarMenuBadge>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="p-4">
        <div className="text-2xl font-bold">Dashboard</div>
        <p className="text-muted-foreground">
          Sidebar with badges and actions example
        </p>
      </SidebarInset>
    </SidebarProvider>
  ),
};

// Sidebar with different variants
export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The sidebar can be configured with different variants: default, floating, or inset.',
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-1 gap-6">
      <div className="h-[300px] overflow-hidden rounded-lg border">
        <SidebarProvider>
          <Sidebar variant="sidebar">
            <SidebarHeader>
              <div className="p-2 font-bold">Default Variant</div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <Home />
                        <span>Home</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <Settings />
                        <span>Settings</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <SidebarInset className="p-4">Content area</SidebarInset>
        </SidebarProvider>
      </div>

      <div className="h-[300px] overflow-hidden rounded-lg border">
        <SidebarProvider>
          <Sidebar variant="floating">
            <SidebarHeader>
              <div className="p-2 font-bold">Floating Variant</div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <Home />
                        <span>Home</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <Settings />
                        <span>Settings</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <SidebarInset className="p-4">Content area</SidebarInset>
        </SidebarProvider>
      </div>

      <div className="h-[300px] overflow-hidden rounded-lg border">
        <SidebarProvider>
          <Sidebar variant="inset">
            <SidebarHeader>
              <div className="p-2 font-bold">Inset Variant</div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <Home />
                        <span>Home</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <Settings />
                        <span>Settings</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <SidebarInset className="p-4">Content area</SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  ),
};

// Collapsible sidebar examples
export const Collapsible: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The sidebar can be collapsible in different ways: offcanvas, icon, or none.',
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-1 gap-6">
      <div className="h-[300px] overflow-hidden rounded-lg border">
        <SidebarProvider defaultOpen={false}>
          <Sidebar collapsible="offcanvas">
            <SidebarHeader>
              <div className="p-2 font-bold">Offcanvas Collapsible</div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <Home />
                        <span>Home</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <Settings />
                        <span>Settings</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <SidebarInset className="flex flex-col gap-2 p-4">
            <div>Offcanvas collapsible example</div>
            <Button className="w-fit" variant="outline">
              Toggle Sidebar
            </Button>
          </SidebarInset>
        </SidebarProvider>
      </div>

      <div className="h-[300px] overflow-hidden rounded-lg border">
        <SidebarProvider defaultOpen={false}>
          <Sidebar collapsible="icon">
            <SidebarHeader>
              <div className="p-2 font-bold">Icon Collapsible</div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <Home />
                        <span>Home</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <Settings />
                        <span>Settings</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <SidebarInset className="p-4">Icon collapsible example</SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  ),
};
