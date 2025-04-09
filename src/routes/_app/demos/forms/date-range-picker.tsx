import { createFileRoute } from '@tanstack/react-router';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { useAppForm } from '@/components/ui/form';

export const Route = createFileRoute('/_app/demos/forms/date-range-picker')({
  component: DateRangePickerForm,
});

function DateRangePickerForm() {
  const form = useAppForm({
    defaultValues: {
      eventName: '',
      dateRange: null as { from: Date; to: Date } | null,
      description: '',
    },
    validators: {
      onBlur: ({ value }) => {
        const errors = {
          fields: {},
        } as {
          fields: Record<string, string>;
        };

        if (!value.eventName?.trim()) {
          errors.fields.eventName = 'Event name is required';
        }

        if (!value.dateRange?.from || !value.dateRange?.to) {
          errors.fields.dateRange = 'Please select a date range';
        }

        return errors;
      },
    },
    onSubmit: ({ value }) => {
      if (!value.dateRange) return;
      console.log(value);
      alert(
        `Event "${value.eventName}" scheduled from ${value.dateRange.from.toLocaleDateString()} to ${value.dateRange.to.toLocaleDateString()}`,
      );
    },
  });

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Schedule an Event Range</CardTitle>
        <CardDescription>
          Use the form below to schedule your event with our new date range
          picker.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.AppField name="eventName">
            {(field) => <field.TextField label="Event Name" />}
          </form.AppField>

          <form.AppField name="dateRange">
            {(field) => (
              <div className="space-y-2">
                <label
                  className="text-sm leading-none font-medium"
                  htmlFor="date-range-picker"
                >
                  Date Range
                </label>
                <DateRangePicker
                  className={
                    field.state.meta.errors?.[0] ? 'border-destructive' : ''
                  }
                  id="date-range-picker"
                />
                {field.state.meta.errors?.[0] && (
                  <p className="text-destructive text-sm">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.AppField>

          <form.AppField name="description">
            {(field) => <field.TextArea label="Description" rows={4} />}
          </form.AppField>

          <div className="flex justify-end">
            <form.AppForm>
              <form.SubscribeButton label="Schedule Event" />
            </form.AppForm>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
