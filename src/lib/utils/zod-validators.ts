import { type RefinementCtx, type z, ZodIssueCode } from 'zod';

import {
  isValidPhone,
  isValidPostalCode,
  isValidSubdivision,
} from './address-validation';

/**
 * Runs cross-field validation for country/state/zipCode/phone
 */
export function refineAddress(data: any, ctx: RefinementCtx) {
  const { address, phone } = data as {
    address: { country: string; state: string; zipCode: string };
    phone: string;
  };
  const country = address.country;

  // Validate subdivision (state/region)
  if (!isValidSubdivision(country, address.state)) {
    ctx.addIssue({
      code: ZodIssueCode.custom,
      message: 'Invalid state/region for selected country',
      path: ['address', 'state'],
    });
  }

  // Validate postal code
  if (!isValidPostalCode(address.zipCode, country)) {
    ctx.addIssue({
      code: ZodIssueCode.custom,
      message: 'Invalid postal code for selected country',
      path: ['address', 'zipCode'],
    });
  }

  // Validate phone number
  if (!isValidPhone(phone, country)) {
    ctx.addIssue({
      code: ZodIssueCode.custom,
      message: 'Invalid phone number for selected country',
      path: ['phone'],
    });
  }
}

/**
 * Helper to apply refineAddress on a base schema
 */
export function withAddressValidation<T extends z.ZodRawShape>(
  schema: z.ZodObject<T>,
): z.ZodEffects<typeof schema> {
  return schema.superRefine(refineAddress);
}
