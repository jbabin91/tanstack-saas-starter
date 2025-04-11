import { createFileRoute } from '@tanstack/react-router';

// import { z } from 'zod'; // Note: Zod validation might be needed later
import { Card, CardContent } from '@/components/ui/card';
import { useAppForm } from '@/components/ui/form';
import { useTranslations } from '@/hooks/use-translations';

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
      onBlur: ({ value }) => {
        const errors = {
          fields: {},
        } as {
          fields: Record<string, string>;
        };
        if (value.fullName.trim().length === 0) {
          errors.fields.fullName = 'Full name is required'; // Deferred: Validation
        }
        return errors;
      },
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

          <form.AppField
            name="email"
            validators={{
              onBlur: ({ value }) => {
                if (!value || value.trim().length === 0) {
                  return 'Email is required'; // Deferred: Validation
                }
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return t('errors.invalidEmail'); // Use existing key
                }
                return undefined;
              },
            }}
          >
            {(field) => <field.TextField label={t('auth.email')} />}
          </form.AppField>

          <form.AppField
            name="address.street"
            validators={{
              onBlur: ({ value }) => {
                if (!value || value.trim().length === 0) {
                  return 'Street address is required'; // Deferred: Validation
                }
                return undefined;
              },
            }}
          >
            {(field) => (
              <field.TextField label={t('forms.address.streetLabel')} />
            )}
          </form.AppField>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <form.AppField
              name="address.city"
              validators={{
                onBlur: ({ value }) => {
                  if (!value || value.trim().length === 0) {
                    return 'City is required'; // Deferred: Validation
                  }
                  return undefined;
                },
              }}
            >
              {(field) => (
                <field.TextField label={t('forms.address.cityLabel')} />
              )}
            </form.AppField>
            <form.AppField
              name="address.state"
              validators={{
                onBlur: ({ value }) => {
                  if (!value || value.trim().length === 0) {
                    return 'State is required'; // Deferred: Validation
                  }
                  return undefined;
                },
              }}
            >
              {(field) => (
                <field.TextField label={t('forms.address.stateLabel')} />
              )}
            </form.AppField>
            <form.AppField
              name="address.zipCode"
              validators={{
                onBlur: ({ value }) => {
                  if (!value || value.trim().length === 0) {
                    return 'Zip code is required'; // Deferred: Validation
                  }
                  if (!/^\d{5}(-\d{4})?$/.test(value)) {
                    return 'Invalid zip code format'; // Deferred: Validation
                  }
                  return undefined;
                },
              }}
            >
              {(field) => (
                <field.TextField label={t('forms.address.zipCodeLabel')} />
              )}
            </form.AppField>
          </div>

          <form.AppField
            name="address.country"
            validators={{
              onBlur: ({ value }) => {
                if (!value || value.trim().length === 0) {
                  return 'Country is required'; // Deferred: Validation
                }
                return undefined;
              },
            }}
          >
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

          <form.AppField
            name="phone"
            validators={{
              onBlur: ({ value }) => {
                if (!value || value.trim().length === 0) {
                  return 'Phone number is required'; // Deferred: Validation
                }
                if (
                  !/^(\+\d{1,3})?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(
                    value,
                  )
                ) {
                  return 'Invalid phone number format'; // Deferred: Validation
                }
                return undefined;
              },
            }}
          >
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
