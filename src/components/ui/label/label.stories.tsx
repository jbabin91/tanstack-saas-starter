import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from '../checkbox/checkbox';
import { Input } from '../input/input';
import { Label } from './label';

const meta = {
  component: Label,
  tags: ['autodocs'],
  title: 'UI/Label',
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <Label>Basic Label</Label>,
};

export const WithInput: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input id="email" placeholder="Enter your email" type="email" />
    </div>
  ),
};

export const WithCheckbox: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label
        className="after:ml-0.5 after:text-red-500 after:content-['*']"
        htmlFor="username"
      >
        Username
      </Label>
      <Input required id="username" placeholder="Enter username" type="text" />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div
      className="group grid w-full max-w-sm items-center gap-1.5"
      data-disabled={true}
    >
      <Label htmlFor="disabled-input">Disabled Field</Label>
      <Input
        disabled
        id="disabled-input"
        placeholder="This field is disabled"
        type="text"
      />
    </div>
  ),
};

export const WithCustomIcon: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label className="flex items-center gap-2" htmlFor="search">
        <svg
          className="h-4 w-4"
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
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        Search
      </Label>
      <Input id="search" placeholder="Search..." type="search" />
    </div>
  ),
};
