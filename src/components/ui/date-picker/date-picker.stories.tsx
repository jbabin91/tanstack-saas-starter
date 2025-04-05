import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';

import { DatePicker } from './date-picker';

const meta = {
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/DatePicker',
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <DatePicker />,
};

export const WithLabel: Story = {
  render: () => <DatePicker label="Select Date" />,
};

export const WithPlaceholder: Story = {
  render: () => <DatePicker placeholder="Choose your date" />,
};

export const WithError: Story = {
  render: () => (
    <DatePicker
      error="Please select a valid date"
      label="Birth Date"
      placeholder="Select birth date"
    />
  ),
};

export const Controlled: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date>();

    return (
      <div className="flex flex-col gap-4">
        <DatePicker label="Controlled Date" value={date} onChange={setDate} />
        <p className="text-muted-foreground text-sm">
          Selected date: {date ? date.toLocaleDateString() : 'None'}
        </p>
      </div>
    );
  },
};

export const WithPreselectedDate: Story = {
  render: () => {
    const preselectedDate = new Date(2024, 0, 1); // January 1, 2024
    return (
      <DatePicker
        label="Event Date"
        value={preselectedDate}
        onChange={(date) => console.log('Date changed:', date)}
      />
    );
  },
};
