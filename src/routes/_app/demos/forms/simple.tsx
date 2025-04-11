import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import { Card, CardContent } from '@/components/ui/card';
import { useAppForm } from '@/components/ui/form';
import { useTranslations } from '@/hooks/use-translations';

export const Route = createFileRoute('/_app/demos/forms/simple')({
  component: SimpleForm,
});

const schema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

function SimpleForm() {
  const { t } = useTranslations();
  const form = useAppForm({
    defaultValues: {
      title: '',
      description: '',
    },
    validators: {
      onBlur: schema,
    },
    onSubmit: ({ value }) => {
      console.log(value);
      // Show success message
      alert(t('common.formSubmitSuccess'));
    },
  });

  return (
    <Card className="w-full max-w-2xl">
      <CardContent>
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.AppField name="title">
            {(field) => (
              <field.TextField label={t('forms.simple.titleLabel')} />
            )}
          </form.AppField>

          <form.AppField name="description">
            {(field) => (
              <field.TextArea label={t('forms.simple.descriptionLabel')} />
            )}
          </form.AppField>

          <div className="flex justify-end">
            <form.AppForm>
              <form.SubscribeButton label={t('common.submit')} />
            </form.AppForm>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
