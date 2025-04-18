import {
  type CountryCode,
  parsePhoneNumberFromString,
} from 'libphonenumber-js';
import {
  postcodeValidator,
  postcodeValidatorExistsForCountry,
} from 'postcode-validator';

import { getSubdivisionOptions } from '@/lib/constants/country-options';

/**
 * Check if a phone number is valid for the given country (ISO 3166-1 alpha-2)
 */
export function isValidPhone(phone: string, country: string): boolean {
  if (!phone) return false;
  try {
    const pn = parsePhoneNumberFromString(
      phone,
      country.toUpperCase() as CountryCode,
    );
    return pn?.isValid() ?? false;
  } catch {
    return false;
  }
}

/**
 * Check if a postal code is valid for the given country (ISO 3166-1 alpha-2)
 */
export function isValidPostalCode(
  postalCode: string,
  country: string,
): boolean {
  if (!postalCode) return false;
  return postcodeValidator(postalCode, country.toUpperCase());
}

/**
 * Check if a postal code validation exists for the given country
 */
export function isPostalCodeSupported(country: string): boolean {
  return postcodeValidatorExistsForCountry(country.toUpperCase());
}

/**
 * Check if a subdivision (state/region) is valid for the given country
 */
export function isValidSubdivision(country: string, state: string): boolean {
  const options = getSubdivisionOptions(country);
  return options.some((o) => o.value === state);
}
