import { Country, State } from 'country-state-city';

// Generate list of country options with translation keys
export const countryOptions = Country.getAllCountries().map((country) => ({
  labelKey: `countries.${country.isoCode}`,
  value: country.isoCode,
}));

// Generate subdivision options (states/provinces) for a given country code
export function getSubdivisionOptions(countryCode: string) {
  return State.getStatesOfCountry(countryCode).map((sub) => ({
    labelKey: `states.${countryCode}.${sub.isoCode}`,
    value: sub.isoCode,
  }));
}
