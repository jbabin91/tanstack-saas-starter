import 'react-i18next';

import { type resources } from '@/lib/i18n';

declare module 'react-i18next' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface CustomTypeOptions {
    // Use the shape of our i18next resources
    defaultNS: typeof defaultNS;
    resources: (typeof resources)['en'];
  }
}
