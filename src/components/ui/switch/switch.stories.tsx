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
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const CheckedDisabled: Story = {
  args: {
    checked: true,
    disabled: true,
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" {...args} />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
};

export const FormGroup: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="airplane">Airplane Mode</Label>
        <Switch id="airplane" />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="wifi">Wi-Fi</Label>
        <Switch defaultChecked id="wifi" />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="bluetooth">Bluetooth</Label>
        <Switch id="bluetooth" />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="notifications">Notifications</Label>
        <Switch defaultChecked id="notifications" />
      </div>
    </div>
  ),
};
