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
import { useTranslations } from '@/hooks/use-translations';

export const Route = createFileRoute('/_app/demos/forms/date-range-picker')({
  component: DateRangePickerForm,
});

function DateRangePickerForm() {
  const { t } = useTranslations();
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
          errors.fields.eventName = 'errors.required';
        }

        if (!value.dateRange?.from || !value.dateRange?.to) {
          errors.fields.dateRange = 'errors.dateRangeRequired';
        }

        return errors;
      },
    },
    onSubmit: ({ value }) => {
      if (!value.dateRange) return;
      console.log(value);
      alert(
        t('forms.dateRangePicker.successMessage', {
          eventName: value.eventName,
          startDate: value.dateRange.from.toLocaleDateString(),
          endDate: value.dateRange.to.toLocaleDateString(),
        }),
      );
    },
  });

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>{t('forms.dateRangePicker.title')}</CardTitle>
        <CardDescription>
          {t('forms.dateRangePicker.description')}
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
            {(field) => (
              <field.TextField label={t('forms.datePicker.eventNameLabel')} />
            )}
          </form.AppField>

          <form.AppField name="dateRange">
            {(field) => (
              <div className="space-y-2">
                <label
                  className="text-sm leading-none font-medium"
                  htmlFor="date-range-picker"
                >
                  {t('forms.dateRangePicker.dateRangeLabel')}
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
