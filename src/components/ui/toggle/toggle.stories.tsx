import type { Meta, StoryObj } from '@storybook/react';
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
} from 'lucide-react';
import * as React from 'react';

import { Toggle } from './toggle';

const meta: Meta<typeof Toggle> = {
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Whether the toggle is disabled',
    },
    pressed: {
      control: 'boolean',
      description: 'Whether the toggle is pressed',
    },
    size: {
      control: 'select',
      description: 'The size of the toggle',
      options: ['sm', 'default', 'lg'],
    },
    variant: {
      control: 'select',
      description: 'The visual style of the toggle',
      options: ['default', 'outline'],
    },
  },
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/Toggle',
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    children: 'Toggle',
  },
};

export const Outline: Story = {
  args: {
    children: 'Toggle',
    variant: 'outline',
  },
};

export const Small: Story = {
  args: {
    children: 'Toggle',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    children: 'Toggle',
    size: 'lg',
  },
};

export const Pressed: Story = {
  args: {
    children: 'Toggle',
    pressed: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Toggle',
    disabled: true,
  },
};

export const WithIcon: Story = {
  render: (args) => (
    <Toggle {...args}>
      <BoldIcon className="h-4 w-4" />
      <span>Bold</span>
    </Toggle>
  ),
};

export const IconOnly: Story = {
  render: (args) => (
    <Toggle {...args} aria-label="Toggle bold">
      <BoldIcon className="h-4 w-4" />
    </Toggle>
  ),
};

export const TextFormatting: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Toggle aria-label="Toggle bold">
        <BoldIcon className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Toggle italic">
        <ItalicIcon className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Toggle underline">
        <UnderlineIcon className="h-4 w-4" />
      </Toggle>
    </div>
  ),
};

export const TextAlignment: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Toggle aria-label="Align left" variant="outline">
        <AlignLeftIcon className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Align center" variant="outline">
        <AlignCenterIcon className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Align right" variant="outline">
        <AlignRightIcon className="h-4 w-4" />
      </Toggle>
    </div>
  ),
};

export const WithPress: Story = {
  render: () => {
    const [pressed, setPressed] = React.useState(false);
    return (
      <Toggle pressed={pressed} onPressedChange={setPressed}>
        {pressed ? 'Enabled' : 'Disabled'}
      </Toggle>
    );
  },
};

export const ToggleGroup: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string | null>(null);

    const handleToggle = (value: string) => {
      if (selected === value) {
        setSelected(null);
      } else {
        setSelected(value);
      }
    };

    return (
      <div className="flex items-center space-x-2">
        <Toggle
          pressed={selected === 'comments'}
          variant="outline"
          onClick={() => handleToggle('comments')}
        >
          Comments
        </Toggle>
        <Toggle
          pressed={selected === 'notifications'}
          variant="outline"
          onClick={() => handleToggle('notifications')}
        >
          Notifications
        </Toggle>
        <Toggle
          pressed={selected === 'settings'}
          variant="outline"
          onClick={() => handleToggle('settings')}
        >
          Settings
        </Toggle>
      </div>
    );
  },
};
