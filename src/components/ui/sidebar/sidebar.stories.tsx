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
  parameters: {
    test: {
      setup: () => {
        // Add any necessary test setup here
      },
    },
  },
  render: () => (
    <SidebarProvider data-testid="sidebar-provider">
      <Sidebar data-testid="sidebar">
        <SidebarHeader data-testid="sidebar-header">
          <div className="flex items-center gap-2 p-2">
            <div className="bg-primary h-8 w-8 rounded-md"></div>
            <div className="font-bold">My App</div>
          </div>
        </SidebarHeader>
        <SidebarContent data-testid="sidebar-content">
          <SidebarGroup data-testid="sidebar-group">
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive data-testid="dashboard-button">
                    <Home />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton data-testid="products-button">
                    <Package />
                    <span>Products</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton data-testid="analytics-button">
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
                  <SidebarMenuButton data-testid="profile-button">
                    <User />
                    <span>Profile</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton data-testid="settings-button">
                    <Settings />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter data-testid="sidebar-footer">
          <div className="p-2">
            <Button
              className="w-full"
              data-testid="logout-button"
              variant="outline"
            >
              Logout
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="p-4" data-testid="sidebar-inset">
        <div className="text-2xl font-bold">Dashboard</div>
        <p className="text-muted-foreground">Welcome to your dashboard</p>
      </SidebarInset>
    </SidebarProvider>
  ),
};

// Sidebar with badges and actions
export const WithBadgesAndActions: Story = {
  parameters: {
    test: {
      setup: () => {
        // Add any necessary test setup here
      },
    },
  },
  render: () => (
    <SidebarProvider data-testid="sidebar-provider-badges">
      <Sidebar data-testid="sidebar-badges">
        <SidebarHeader data-testid="sidebar-header-badges">
          <div className="flex items-center gap-2 p-2">
            <div className="bg-primary h-8 w-8 rounded-md"></div>
            <div className="font-bold">My App</div>
          </div>
        </SidebarHeader>
        <SidebarContent data-testid="sidebar-content-badges">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive
                    data-testid="dashboard-button-badges"
                  >
                    <Home />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton data-testid="messages-button">
                    <MessageSquare />
                    <span>Messages</span>
                  </SidebarMenuButton>
                  <SidebarMenuBadge data-testid="messages-badge">
                    5
                  </SidebarMenuBadge>
                  <SidebarMenuAction data-testid="messages-action">
                    <Heart />
                  </SidebarMenuAction>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton data-testid="analytics-button-badges">
                    <BarChart />
                    <span>Analytics</span>
                  </SidebarMenuButton>
                  <SidebarMenuBadge data-testid="analytics-badge">
                    New
                  </SidebarMenuBadge>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="p-4" data-testid="sidebar-inset-badges">
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
    test: {
      setup: () => {
        // Add any necessary test setup here
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-1 gap-6" data-testid="variants-container">
      <div className="h-[300px] overflow-hidden rounded-lg border">
        <SidebarProvider data-testid="sidebar-provider-default">
          <Sidebar data-testid="sidebar-default" variant="sidebar">
            <SidebarHeader data-testid="sidebar-header-default">
              <div className="p-2 font-bold">Default Variant</div>
            </SidebarHeader>
            <SidebarContent data-testid="sidebar-content-default">
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton data-testid="home-button-default">
                        <Home />
                        <span>Home</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton data-testid="settings-button-default">
                        <Settings />
                        <span>Settings</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <SidebarInset className="p-4" data-testid="sidebar-inset-default">
            Content area
          </SidebarInset>
        </SidebarProvider>
      </div>

      <div className="h-[300px] overflow-hidden rounded-lg border">
        <SidebarProvider data-testid="sidebar-provider-floating">
          <Sidebar data-testid="sidebar-floating" variant="floating">
            <SidebarHeader data-testid="sidebar-header-floating">
              <div className="p-2 font-bold">Floating Variant</div>
            </SidebarHeader>
            <SidebarContent data-testid="sidebar-content-floating">
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton data-testid="home-button-floating">
                        <Home />
                        <span>Home</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton data-testid="settings-button-floating">
                        <Settings />
                        <span>Settings</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <SidebarInset className="p-4" data-testid="sidebar-inset-floating">
            Content area
          </SidebarInset>
        </SidebarProvider>
      </div>

      <div className="h-[300px] overflow-hidden rounded-lg border">
        <SidebarProvider data-testid="sidebar-provider-inset">
          <Sidebar data-testid="sidebar-inset-variant" variant="inset">
            <SidebarHeader data-testid="sidebar-header-inset">
              <div className="p-2 font-bold">Inset Variant</div>
            </SidebarHeader>
            <SidebarContent data-testid="sidebar-content-inset">
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton data-testid="home-button-inset">
                        <Home />
                        <span>Home</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton data-testid="settings-button-inset">
                        <Settings />
                        <span>Settings</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <SidebarInset className="p-4" data-testid="sidebar-inset-inset">
            Content area
          </SidebarInset>
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
