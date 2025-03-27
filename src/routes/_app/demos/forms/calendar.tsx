import { createFileRoute } from '@tanstack/react-router';
import { addDays } from 'date-fns';
import * as React from 'react';

import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const Route = createFileRoute('/_app/demos/forms/calendar')({
  component: CalendarDemo,
});

function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(() =>
    addDays(new Date(), 2),
  );

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Calendar Component</CardTitle>
          <CardDescription>
            A standalone calendar component with various selection modes and
            customization options.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Single Date Selection</h3>
            <Calendar
              className="rounded-md border"
              mode="single"
              selected={date}
              onSelect={setDate}
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Multiple Months</h3>
            <Calendar
              className="rounded-md border"
              mode="single"
              numberOfMonths={2}
              selected={date}
              onSelect={setDate}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
