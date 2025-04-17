import { State } from 'country-state-city';
import fs from 'fs';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import esLocale from 'i18n-iso-countries/langs/es.json';
import path from 'path';
import { fileURLToPath } from 'url';

// Directory of this script
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Register locales for country names
countries.registerLocale(enLocale);
countries.registerLocale(esLocale);

// Supported language codes
const languages = [
  { code: 'en', locale: enLocale },
  { code: 'es', locale: esLocale },
];

for (const { code } of languages) {
  // Build country name map for this language
  const countryNames = countries.getNames(code);
  const countriesJson: Record<string, string> = {};
  Object.entries(countryNames).forEach(([code, name]) => {
    countriesJson[code] = name;
  });

  // Build subdivision (state/province) map (names always English)
  const statesJson: Record<string, Record<string, string>> = {};
  Object.keys(countryNames).forEach((countryCode) => {
    const stateList = State.getStatesOfCountry(countryCode);
    if (stateList.length) {
      statesJson[countryCode] = stateList.reduce(
        (acc, state) => {
          acc[state.isoCode] = state.name;
          return acc;
        },
        {} as Record<string, string>,
      );
    }
  });

  // Output to src/locales/{lang}
  const outDir = path.resolve(__dirname, `../src/locales/${code}`);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(
    path.join(outDir, 'countries.json'),
    JSON.stringify(countriesJson, null, 2),
  );
  fs.writeFileSync(
    path.join(outDir, 'states.json'),
    JSON.stringify(statesJson, null, 2),
  );
  console.log(
    `✅ Generated ${code} countries.json and states.json in locales/${code}`,
  );
}
