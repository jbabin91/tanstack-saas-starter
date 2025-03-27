import { createFileRoute } from '@tanstack/react-router';
import { format } from 'date-fns';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DatePicker } from '@/components/ui/date-picker';
import { useAppForm } from '@/hooks/use-app-form';

export const Route = createFileRoute('/_app/demos/forms/date-picker')({
  component: DatePickerForm,
});

function DatePickerForm() {
  const form = useAppForm({
    defaultValues: {
      eventName: '',
      eventDate: null as Date | null,
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

        if (!value.eventDate) {
          errors.fields.eventDate = 'Please select a date';
        }

        return errors;
      },
    },
    onSubmit: ({ value }) => {
      if (!value.eventDate) return;
      console.log(value);
      alert(
        `Event "${value.eventName}" scheduled for ${format(value.eventDate, 'PPP')}`,
      );
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Schedule an Event</CardTitle>
          <CardDescription>
            Use the form below to schedule your event with our new calendar
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

            <form.AppField name="eventDate">
              {(field) => (
                <DatePicker
                  error={field.state.meta.errors?.[0]}
                  label="Date"
                  value={field.state.value ?? undefined}
                  onChange={(date) => field.setValue(date ?? null)}
                />
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
    </div>
  );
}
