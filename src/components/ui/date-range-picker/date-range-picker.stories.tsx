import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';

import { Button } from '../button';
import { DateRangePicker } from './date-range-picker';

const meta = {
  component: DateRangePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/DateRangePicker',
} satisfies Meta<typeof DateRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <DateRangePicker />,
};

export const WithCustomClass: Story = {
  render: () => <DateRangePicker className="bg-muted rounded-lg p-4" />,
};

export const WithinForm: Story = {
  render: () => (
    <form className="space-y-4 rounded-lg border p-4">
      <div>
        <label className="text-sm font-medium" htmlFor="date-range">
          Date Range
        </label>
        <p className="text-muted-foreground mb-2 text-sm">
          Select a date range for your report
        </p>
        <DateRangePicker className="w-full" id="date-range" />
      </div>
      <Button
        type="submit"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          console.log('Form submitted');
        }}
      >
        Generate Report
      </Button>
    </form>
  ),
};

export const InCard: Story = {
  render: () => (
    <div className="w-[400px] space-y-4 rounded-lg border p-6">
      <div>
        <h3 className="text-lg font-semibold">Date Range Selection</h3>
        <p className="text-muted-foreground text-sm">
          Choose a date range to filter the results
        </p>
      </div>
      <DateRangePicker />
      <div className="border-t pt-4">
        <p className="text-muted-foreground text-sm">
          The selected range will be used to filter the data in your dashboard
        </p>
      </div>
    </div>
  ),
};
