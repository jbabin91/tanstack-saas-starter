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
import { useAppForm } from '@/components/ui/form';
import { useTranslations } from '@/hooks/use-translations';

export const Route = createFileRoute('/_app/demos/forms/date-picker')({
  component: DatePickerForm,
});

function DatePickerForm() {
  const { t } = useTranslations();
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
        t('forms.datePicker.successMessage', {
          eventName: value.eventName,
          eventDate: format(value.eventDate, 'PPP'),
        }),
      );
    },
  });

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>{t('forms.datePicker.title')}</CardTitle>
        <CardDescription>{t('forms.datePicker.description')}</CardDescription>
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
            {(field) => (
              <field.TextField label={t('forms.datePicker.eventNameLabel')} />
            )}
          </form.AppField>

          <form.AppField name="eventDate">
            {(field) => (
              <DatePicker
                error={field.state.meta.errors?.[0]}
                label={t('forms.datePicker.dateLabel')}
                value={field.state.value ?? undefined}
                onChange={(date) => field.setValue(date ?? null)}
              />
            )}
          </form.AppField>

          <form.AppField name="description">
            {(field) => (
              <field.TextArea
                label={t('forms.datePicker.descriptionLabel')}
                rows={4}
              />
            )}
          </form.AppField>

          <div className="flex justify-end">
            <form.AppForm>
              <form.SubscribeButton
                label={t('forms.datePicker.submitButtonLabel')}
              />
            </form.AppForm>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
