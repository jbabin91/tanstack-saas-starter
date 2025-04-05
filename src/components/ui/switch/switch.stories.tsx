import type { Meta, StoryObj } from '@storybook/react';

import { Label } from '../label';
import { Switch } from './switch';

const meta: Meta<typeof Switch> = {
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the switch is checked',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the switch is disabled',
    },
    onCheckedChange: {
      action: 'checked changed',
      description: 'Event handler called when the checked state changes',
    },
  },
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/Switch',
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {},
  render: (args) => <Switch aria-label="Toggle feature" {...args} />,
};

export const Checked: Story = {
  args: {
    checked: true,
  },
  render: (args) => <Switch aria-label="Toggle feature" {...args} />,
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => <Switch aria-label="Toggle feature (disabled)" {...args} />,
};

export const CheckedDisabled: Story = {
  args: {
    checked: true,
    disabled: true,
  },
  render: (args) => <Switch aria-label="Toggle feature (disabled)" {...args} />,
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Switch
        aria-labelledby="airplane-mode-label"
        id="airplane-mode"
        {...args}
      />
      <Label htmlFor="airplane-mode" id="airplane-mode-label">
        Airplane Mode
      </Label>
    </div>
  ),
};

export const FormGroup: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="airplane" id="airplane-label">
          Airplane Mode
        </Label>
        <Switch aria-labelledby="airplane-label" id="airplane" />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="wifi" id="wifi-label">
          Wi-Fi
        </Label>
        <Switch defaultChecked aria-labelledby="wifi-label" id="wifi" />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="bluetooth" id="bluetooth-label">
          Bluetooth
        </Label>
        <Switch aria-labelledby="bluetooth-label" id="bluetooth" />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="notifications" id="notifications-label">
          Notifications
        </Label>
        <Switch
          defaultChecked
          aria-labelledby="notifications-label"
          id="notifications"
        />
      </div>
    </div>
  ),
};
