import type { Meta, StoryObj } from '@storybook/react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './select';

const SelectDemo = () => {
  return (
    <Select>
      <SelectTrigger aria-label="Select a fruit" className="w-[180px]">
        <SelectValue
          className="text-foreground data-[placeholder]:text-foreground/80"
          placeholder="Select a fruit"
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
          <SelectItem value="grape">Grape</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

const meta: Meta<typeof SelectDemo> = {
  component: SelectDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/Select',
};

export default meta;
type Story = StoryObj<typeof SelectDemo>;

export const Default: Story = {};

// Example with disabled state
const DisabledSelectDemo = () => {
  return (
    <Select disabled>
      <SelectTrigger
        aria-label="Disabled fruit selection"
        className="w-[180px]"
      >
        <SelectValue
          className="text-foreground data-[placeholder]:text-foreground/80"
          placeholder="Disabled select"
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export const Disabled: Story = {
  render: () => <DisabledSelectDemo />,
};

// Example with multiple groups
const GroupedSelectDemo = () => {
  return (
    <Select>
      <SelectTrigger aria-label="Select food category" className="w-[180px]">
        <SelectValue
          className="text-foreground data-[placeholder]:text-foreground/80"
          placeholder="Select food"
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Vegetables</SelectLabel>
          <SelectItem value="carrot">Carrot</SelectItem>
          <SelectItem value="broccoli">Broccoli</SelectItem>
          <SelectItem value="spinach">Spinach</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export const Grouped: Story = {
  render: () => <GroupedSelectDemo />,
};
