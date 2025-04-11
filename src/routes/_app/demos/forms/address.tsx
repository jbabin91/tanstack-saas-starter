import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod'; // Import Zod

// import { z } from 'zod'; // Note: Zod validation might be needed later
import { Card, CardContent } from '@/components/ui/card';
import { useAppForm } from '@/components/ui/form';
import { useTranslations } from '@/hooks/use-translations';

// Define Zod schema for the address form
const addressSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().min(1).email(),
  address: z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    zipCode: z
      .string()
      .min(1)
      .regex(/^\d{5}(-\d{4})?$/),
    country: z.string().min(1),
  }),
  phone: z
    .string()
    .min(1)
    .regex(/^(\+\d{1,3})?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/),
});

export const Route = createFileRoute('/_app/demos/forms/address')({
  component: AddressForm,
});

function AddressForm() {
  const { t } = useTranslations();
  const form = useAppForm({
    defaultValues: {
      fullName: '',
      email: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
      },
      phone: '',
    },
    validators: {
      onBlur: addressSchema,
      onSubmit: addressSchema,
    },
    onSubmit: ({ value }) => {
      console.log(value);
      // Show success message
      alert(t('common.formSubmitSuccess'));
    },
  });

  return (
    <Card>
      <CardContent>
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.AppField name="fullName">
            {(field) => (
              <field.TextField label={t('forms.address.fullNameLabel')} />
            )}
          </form.AppField>

          <form.AppField name="email">
            {(field) => <field.TextField label={t('auth.email')} />}
          </form.AppField>

          <form.AppField name="address.street">
            {(field) => (
              <field.TextField label={t('forms.address.streetLabel')} />
            )}
          </form.AppField>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <form.AppField name="address.city">
              {(field) => (
                <field.TextField label={t('forms.address.cityLabel')} />
              )}
            </form.AppField>
            <form.AppField name="address.state">
              {(field) => (
                <field.TextField label={t('forms.address.stateLabel')} />
              )}
            </form.AppField>
            <form.AppField name="address.zipCode">
              {(field) => (
                <field.TextField label={t('forms.address.zipCodeLabel')} />
              )}
            </form.AppField>
          </div>

          <form.AppField name="address.country">
            {(field) => (
              <field.Select
                label={t('forms.address.countryLabel')}
                placeholder={t('forms.address.countryPlaceholder')}
                values={[
                  { label: t('countries.us'), value: 'US' },
                  { label: t('countries.ca'), value: 'CA' },
                  { label: t('countries.uk'), value: 'UK' },
                  { label: t('countries.au'), value: 'AU' },
                  { label: t('countries.de'), value: 'DE' },
                  { label: t('countries.fr'), value: 'FR' },
                  { label: t('countries.jp'), value: 'JP' },
                ]}
              />
            )}
          </form.AppField>

          <form.AppField name="phone">
            {(field) => (
              <field.TextField
                label={t('forms.address.phoneLabel')}
                placeholder={t('forms.address.phonePlaceholder')}
              />
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
