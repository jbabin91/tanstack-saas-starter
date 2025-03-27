import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import { Card, CardContent } from '@/components/ui/card';
import { useAppForm } from '@/hooks/use-app-form';

export const Route = createFileRoute('/_app/demos/forms/simple')({
  component: SimpleForm,
});

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
});

function SimpleForm() {
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
      alert('Form submitted successfully!');
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center">
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
              {(field) => <field.TextField label="Title" />}
            </form.AppField>

            <form.AppField name="description">
              {(field) => <field.TextArea label="Description" />}
            </form.AppField>

            <div className="flex justify-end">
              <form.AppForm>
                <form.SubscribeButton label="Submit" />
              </form.AppForm>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
