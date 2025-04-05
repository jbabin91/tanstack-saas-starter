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
                  <SidebarMenuButton
                    isActive
                    aria-label="Dashboard"
                    data-testid="dashboard-button"
                  >
                    <Home />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    aria-label="Products"
                    data-testid="products-button"
                  >
                    <Package />
                    <span>Products</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    aria-label="Analytics"
                    data-testid="analytics-button"
                  >
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
                  <SidebarMenuButton
                    aria-label="Profile"
                    data-testid="profile-button"
                  >
                    <User />
                    <span>Profile</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    aria-label="Settings"
                    data-testid="settings-button"
                  >
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
                    aria-label="Dashboard"
                    data-testid="dashboard-button-badges"
                  >
                    <Home />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    aria-label="Messages"
                    data-testid="messages-button"
                  >
                    <MessageSquare />
                    <span>Messages</span>
                  </SidebarMenuButton>
                  <SidebarMenuBadge data-testid="messages-badge">
                    5
                  </SidebarMenuBadge>
                  <SidebarMenuAction
                    aria-label="Like Messages"
                    data-testid="messages-action"
                  >
                    <Heart />
                  </SidebarMenuAction>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    aria-label="Analytics"
                    data-testid="analytics-button-badges"
                  >
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
    <main className="grid grid-cols-1 gap-6" data-testid="variants-container">
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
                      <SidebarMenuButton
                        aria-label="Home"
                        data-testid="home-button-default"
                      >
                        <Home />
                        <span>Home</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        aria-label="Settings"
                        data-testid="settings-button-default"
                      >
                        <Settings />
                        <span>Settings</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <div
            aria-label="Default Variant Content"
            className="bg-background relative flex w-full flex-1 flex-col p-4"
            data-testid="sidebar-inset-default"
            role="region"
          >
            <div className="text-2xl font-bold">Default Variant</div>
            <div className="text-muted-foreground">Content area</div>
          </div>
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
                      <SidebarMenuButton
                        aria-label="Home"
                        data-testid="home-button-floating"
                      >
                        <Home />
                        <span>Home</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        aria-label="Settings"
                        data-testid="settings-button-floating"
                      >
                        <Settings />
                        <span>Settings</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <div
            aria-label="Floating Variant Content"
            className="bg-background relative flex w-full flex-1 flex-col p-4"
            data-testid="sidebar-inset-floating"
            role="region"
          >
            <div className="text-2xl font-bold">Floating Variant</div>
            <div className="text-muted-foreground">Content area</div>
          </div>
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
                      <SidebarMenuButton
                        aria-label="Home"
                        data-testid="home-button-inset"
                      >
                        <Home />
                        <span>Home</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        aria-label="Settings"
                        data-testid="settings-button-inset"
                      >
                        <Settings />
                        <span>Settings</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <div
            aria-label="Inset Variant Content"
            className="bg-background relative flex w-full flex-1 flex-col p-4"
            data-testid="sidebar-inset-inset"
            role="region"
          >
            <div className="text-2xl font-bold">Inset Variant</div>
            <div className="text-muted-foreground">Content area</div>
          </div>
        </SidebarProvider>
      </div>
    </main>
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
    <main className="grid grid-cols-1 gap-6">
      <div className="h-[300px] overflow-hidden rounded-lg border">
        <SidebarProvider defaultOpen={false}>
          <Sidebar collapsible="offcanvas">
            <SidebarHeader>
              <div className="flex items-center gap-2 p-2">
                <Package className="text-primary h-8 w-8" />
                <div className="text-foreground font-bold">
                  Offcanvas Collapsible
                </div>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        aria-label="Home"
                        className="text-foreground hover:text-foreground"
                      >
                        <Home className="text-foreground" />
                        <span className="sidebar-expanded:inline sr-only">
                          Home
                        </span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        aria-label="Settings"
                        className="text-foreground hover:text-foreground"
                      >
                        <Settings className="text-foreground" />
                        <span className="sidebar-expanded:inline sr-only">
                          Settings
                        </span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <div
            aria-label="Offcanvas Content"
            className="bg-background relative flex w-full flex-1 flex-col gap-4 p-4"
            role="region"
          >
            <div className="flex flex-col gap-2">
              <h2 className="text-foreground text-2xl font-bold">
                Offcanvas Example
              </h2>
              <p className="text-muted-foreground">
                Toggle the sidebar using the button below
              </p>
            </div>
            <Button
              aria-label="Toggle Sidebar"
              className="bg-background text-foreground hover:bg-muted hover:text-foreground focus-visible:ring-ring w-fit focus-visible:ring-2"
              variant="outline"
            >
              Toggle Sidebar
            </Button>
          </div>
        </SidebarProvider>
      </div>

      <div className="h-[300px] overflow-hidden rounded-lg border">
        <SidebarProvider defaultOpen={false}>
          <Sidebar collapsible="icon">
            <SidebarHeader>
              <div className="flex items-center gap-2 p-2">
                <Package className="text-primary h-8 w-8" />
                <span className="sr-only">Icon Collapsible</span>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        aria-label="Home"
                        className="text-foreground hover:text-foreground"
                      >
                        <Home className="text-foreground" />
                        <span className="sidebar-expanded:inline sr-only">
                          Home
                        </span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        aria-label="Settings"
                        className="text-foreground hover:text-foreground"
                      >
                        <Settings className="text-foreground" />
                        <span className="sidebar-expanded:inline sr-only">
                          Settings
                        </span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <div
            aria-label="Icon Content"
            className="bg-background relative flex w-full flex-1 flex-col gap-4 p-4"
            role="region"
          >
            <div className="flex flex-col gap-2">
              <h2 className="text-foreground text-2xl font-bold">
                Icon Example
              </h2>
              <p className="text-muted-foreground">
                The sidebar collapses to icons only
              </p>
            </div>
          </div>
        </SidebarProvider>
      </div>
    </main>
  ),
};
