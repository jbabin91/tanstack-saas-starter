import type { Meta, StoryObj } from '@storybook/react';
import { FileText, Settings, User } from 'lucide-react';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './navigation-menu';

const meta = {
  component: NavigationMenu,
  tags: ['autodocs'],
  title: 'UI/NavigationMenu',
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink className="cursor-pointer">
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className="cursor-pointer">
            About
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className="cursor-pointer">
            Contact
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const WithDropdowns: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[400px] gap-3 p-4">
              <NavigationMenuLink className="cursor-pointer">
                <div className="flex items-center gap-2">
                  <FileText className="size-4" />
                  <div>
                    <h3 className="mb-1 text-sm font-medium">Product One</h3>
                    <p className="text-muted-foreground text-sm">
                      Description for product one goes here
                    </p>
                  </div>
                </div>
              </NavigationMenuLink>
              <NavigationMenuLink className="cursor-pointer">
                <div className="flex items-center gap-2">
                  <Settings className="size-4" />
                  <div>
                    <h3 className="mb-1 text-sm font-medium">Product Two</h3>
                    <p className="text-muted-foreground text-sm">
                      Description for product two goes here
                    </p>
                  </div>
                </div>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[200px] gap-3 p-4">
              <NavigationMenuLink className="cursor-pointer">
                Documentation
              </NavigationMenuLink>
              <NavigationMenuLink className="cursor-pointer">
                Tutorials
              </NavigationMenuLink>
              <NavigationMenuLink className="cursor-pointer">
                Blog
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className="cursor-pointer">
            Contact
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink className="cursor-pointer">
            <div className="flex items-center gap-2">
              <FileText className="size-4" />
              Documents
            </div>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className="cursor-pointer">
            <div className="flex items-center gap-2">
              <Settings className="size-4" />
              Settings
            </div>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className="cursor-pointer">
            <div className="flex items-center gap-2">
              <User className="size-4" />
              Profile
            </div>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const WithoutViewport: Story = {
  render: () => (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Dropdown</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[200px] gap-3 p-4">
              <NavigationMenuLink className="cursor-pointer">
                Option 1
              </NavigationMenuLink>
              <NavigationMenuLink className="cursor-pointer">
                Option 2
              </NavigationMenuLink>
              <NavigationMenuLink className="cursor-pointer">
                Option 3
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className="cursor-pointer">
            Link
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};
