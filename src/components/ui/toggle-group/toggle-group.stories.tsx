import type { Meta, StoryObj } from '@storybook/react';
import { BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-react';

import { ToggleGroup, ToggleGroupItem } from './toggle-group';

const meta = {
  component: ToggleGroup,
  tags: ['autodocs'],
  title: 'UI/ToggleGroup',
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'multiple',
  },
  render: () => (
    <ToggleGroup type="multiple">
      <ToggleGroupItem aria-label="Toggle bold" value="bold">
        <BoldIcon className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Toggle italic" value="italic">
        <ItalicIcon className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Toggle underline" value="underline">
        <UnderlineIcon className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const SingleSelect: Story = {
  args: {
    defaultValue: 'center',
    type: 'single',
  },
  render: () => (
    <ToggleGroup defaultValue="center" type="single">
      <ToggleGroupItem aria-label="Left aligned" value="left">
        <div className="grid size-4 place-items-center">L</div>
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Center aligned" value="center">
        <div className="grid size-4 place-items-center">C</div>
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Right aligned" value="right">
        <div className="grid size-4 place-items-center">R</div>
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const WithLabels: Story = {
  args: {
    defaultValue: 'list',
    type: 'single',
  },
  render: () => (
    <ToggleGroup defaultValue="list" type="single">
      <ToggleGroupItem aria-label="List view" value="list">
        <div className="flex items-center gap-2">
          <div className="grid size-4 place-items-center">📝</div>
          List
        </div>
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Grid view" value="grid">
        <div className="flex items-center gap-2">
          <div className="grid size-4 place-items-center">🔲</div>
          Grid
        </div>
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Columns view" value="columns">
        <div className="flex items-center gap-2">
          <div className="grid size-4 place-items-center">📊</div>
          Columns
        </div>
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Sizes: Story = {
  args: {
    type: 'multiple',
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <ToggleGroup size="sm" type="multiple">
        <ToggleGroupItem aria-label="Toggle bold" value="bold">
          <BoldIcon className="size-3" />
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="Toggle italic" value="italic">
          <ItalicIcon className="size-3" />
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="Toggle underline" value="underline">
          <UnderlineIcon className="size-3" />
        </ToggleGroupItem>
      </ToggleGroup>

      <ToggleGroup type="multiple">
        <ToggleGroupItem aria-label="Toggle bold" value="bold">
          <BoldIcon className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="Toggle italic" value="italic">
          <ItalicIcon className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="Toggle underline" value="underline">
          <UnderlineIcon className="size-4" />
        </ToggleGroupItem>
      </ToggleGroup>

      <ToggleGroup size="lg" type="multiple">
        <ToggleGroupItem aria-label="Toggle bold" value="bold">
          <BoldIcon className="size-5" />
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="Toggle italic" value="italic">
          <ItalicIcon className="size-5" />
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="Toggle underline" value="underline">
          <UnderlineIcon className="size-5" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
};

export const Variants: Story = {
  args: {
    type: 'multiple',
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <ToggleGroup type="multiple" variant="default">
        <ToggleGroupItem aria-label="Toggle bold" value="bold">
          <BoldIcon className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="Toggle italic" value="italic">
          <ItalicIcon className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="Toggle underline" value="underline">
          <UnderlineIcon className="size-4" />
        </ToggleGroupItem>
      </ToggleGroup>

      <ToggleGroup type="multiple" variant="outline">
        <ToggleGroupItem aria-label="Toggle bold" value="bold">
          <BoldIcon className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="Toggle italic" value="italic">
          <ItalicIcon className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="Toggle underline" value="underline">
          <UnderlineIcon className="size-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
};
