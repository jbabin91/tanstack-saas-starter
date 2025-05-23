import { createFileRoute } from '@tanstack/react-router';
import { toast } from 'sonner';
import { z } from 'zod';

import { Card, CardContent } from '@/components/ui/card';
import { useAppForm } from '@/components/ui/form';
import { useTranslations } from '@/hooks/use-translations';
import {
  countryOptions,
  getSubdivisionOptions,
} from '@/lib/constants/country-options';
import { withAddressValidation } from '@/lib/utils/zod-validators';

// Define Zod schema for the address form with cross-field validation
const addressSchema = withAddressValidation(
  z.object({
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
  }),
);

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
      onChange: addressSchema,
      onBlur: addressSchema,
      onSubmit: addressSchema,
    },
    onSubmit: ({ value }) => {
      console.log(value);
      // Show success message
      toast.success(t('common.formSubmitSuccess'));
    },
  });

  return (
    <Card className="max-w-xl">
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
              <field.TextField
                label={t('forms.address.fullNameLabel')}
                placeholder={t('forms.address.fullNamePlaceholder')}
              />
            )}
          </form.AppField>

          <form.AppField name="email">
            {(field) => (
              <field.TextField
                label={t('auth.email')}
                placeholder={t('forms.address.emailPlaceholder')}
              />
            )}
          </form.AppField>

          <form.AppField name="address.street">
            {(field) => (
              <field.TextField
                label={t('forms.address.streetLabel')}
                placeholder={t('forms.address.streetPlaceholder')}
              />
            )}
          </form.AppField>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <form.AppField name="address.city">
              {(field) => (
                <field.TextField
                  label={t('forms.address.cityLabel')}
                  placeholder={t('forms.address.cityPlaceholder')}
                />
              )}
            </form.AppField>
            <form.Subscribe selector={(state) => state.values.address.country}>
              {(countryCode) => (
                <form.AppField name="address.state">
                  {(field) => (
                    <field.Select
                      label={t('forms.address.stateLabel')}
                      placeholder={t('forms.address.statePlaceholder')}
                      values={getSubdivisionOptions(countryCode).map(
                        ({ labelKey, value }) => ({
                          label: t(labelKey as any),
                          value,
                        }),
                      )}
                    />
                  )}
                </form.AppField>
              )}
            </form.Subscribe>
            <form.AppField name="address.zipCode">
              {(field) => (
                <field.TextField
                  label={t('forms.address.zipCodeLabel')}
                  placeholder={t('forms.address.zipCodePlaceholder')}
                />
              )}
            </form.AppField>
          </div>

          <form.AppField name="address.country">
            {(field) => (
              <field.Select
                label={t('forms.address.countryLabel')}
                placeholder={t('forms.address.countryPlaceholder')}
                values={countryOptions.map(({ labelKey, value }) => ({
                  label: t(labelKey as any),
                  value,
                }))}
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
