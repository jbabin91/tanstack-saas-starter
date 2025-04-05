import type { Meta, StoryObj } from '@storybook/react';
import { addDays } from 'date-fns';
import * as React from 'react';

import { Calendar } from './calendar';

const meta: Meta<typeof Calendar> = {
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/Calendar',
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(() => new Date());
    return (
      <Calendar
        className="rounded-md border"
        mode="single"
        selected={date}
        onSelect={setDate}
      />
    );
  },
};

export const RangeSelection: Story = {
  render: () => {
    const [dateRange, setDateRange] = React.useState<{
      from: Date;
      to?: Date;
    }>(() => ({
      from: new Date(),
      to: addDays(new Date(), 7),
    }));
    return (
      <Calendar
        className="rounded-md border"
        mode="range"
        numberOfMonths={2}
        selected={dateRange}
        onSelect={(value) => setDateRange(value as { from: Date; to?: Date })}
      />
    );
  },
};

export const MultipleSelection: Story = {
  render: () => {
    const [days, setDays] = React.useState<Date[]>(() => [
      new Date(),
      addDays(new Date(), 2),
      addDays(new Date(), 5),
    ]);
    return (
      <Calendar
        required
        className="rounded-md border"
        mode="multiple"
        selected={days}
        onSelect={setDays}
      />
    );
  },
};

export const WithDisabledDates: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(() => new Date());

    // Disable weekends
    const disabledDays = (day: Date) => {
      const dayOfWeek = day.getDay();
      return dayOfWeek === 0 || dayOfWeek === 6;
    };

    return (
      <Calendar
        className="rounded-md border"
        disabled={disabledDays}
        mode="single"
        selected={date}
        onSelect={setDate}
      />
    );
  },
};

export const WithDateRange: Story = {
  render: () => {
    const today = new Date();
    const [date, setDate] = React.useState<Date | undefined>(today);

    // Allow selection only for next 30 days
    const thirtyDaysFromNow = addDays(today, 30);

    return (
      <Calendar
        className="rounded-md border"
        fromDate={today}
        mode="single"
        selected={date}
        toDate={thirtyDaysFromNow}
        onSelect={setDate}
      />
    );
  },
};

export const WithFooter: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(() => new Date());
    return (
      <div className="space-y-4">
        <Calendar
          className="rounded-md border"
          mode="single"
          selected={date}
          onSelect={setDate}
        />
        <div className="rounded-md border p-3 text-center text-sm">
          {date ? date.toDateString() : 'No date selected'}
        </div>
      </div>
    );
  },
};

export const WithYearNavigation: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(() => new Date());
    return (
      <Calendar
        className="rounded-md border"
        mode="single"
        selected={date}
        showYearSwitcher={true}
        yearRange={24}
        onSelect={setDate}
      />
    );
  },
};

export const MultipleMonths: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(() => new Date());
    return (
      <Calendar
        className="rounded-md border"
        mode="single"
        numberOfMonths={2}
        selected={date}
        onSelect={setDate}
      />
    );
  },
};
