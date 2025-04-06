import { drizzle } from 'drizzle-orm/node-postgres';
import { seed } from 'drizzle-seed';

import * as schema from './schema';

async function main() {
  const db = drizzle(process.env.DATABASE_URL!, {
    schema,
  });

  await seed(db, schema, { seed: 123 }).refine((f) => ({
    users: {
      columns: {
        created_at: f.date({ maxDate: new Date() }),
        email: f.email(),
        locale: f.valuesFromArray({
          isUnique: false,
          values: ['en', 'es', 'fr', 'de'],
        }),
        metadata: f.valuesFromArray({
          values: [
            {
              values: [
                JSON.stringify({
                  address: {
                    city: f.city(),
                    country: f.country(),
                    state: f.state(),
                    street: f.streetAddress(),
                    zip: f.postcode(),
                  },
                  avatar: f.string(),
                  company: f.companyName({ isUnique: true }),
                  phone: f.phoneNumber(),
                  title: f.jobTitle(),
                }),
              ],
              weight: 1,
            },
          ],
        }),
        name: f.fullName({ isUnique: true }),
      },
      count: 50,
    },
    subscriptions: {
      columns: {
        end_date: f.date({ minDate: new Date() }),
        metadata: f.default({
          defaultValue: () => {
            const features = [
              'api_access',
              'team_members',
              'custom_domain',
              'analytics',
              'support',
              'priority_support',
              'custom_branding',
              'audit_logs',
              'sso',
              'advanced_security',
            ];
            // Random number of features between 3 and 7
            const numFeatures = 3 + Math.floor(Math.random() * 5);
            const selectedFeatures = features
              .sort(() => Math.random() - 0.5)
              .slice(0, numFeatures);

            return JSON.stringify({
              paymentMethod: ['card', 'paypal', 'bank_transfer'][
                Math.floor(Math.random() * 3)
              ],
              cardLast4: String(Math.floor(Math.random() * 10000)).padStart(
                4,
                '0',
              ),
              trialEnds: new Date(
                Date.now()
                  + (Math.floor(Math.random() * 30) + 1) * 24 * 60 * 60 * 1000,
              ).toISOString(), // Random 1-30 days from now
              features: selectedFeatures,
            });
          },
        }),
        plan: f.valuesFromArray({
          isUnique: false,
          values: ['free', 'pro', 'enterprise'],
        }),
        start_date: f.date({
          maxDate: new Date(),
          minDate: '2023-01-01',
        }),
        status: f.valuesFromArray({
          isUnique: false,
          values: ['active', 'canceled', 'past_due'],
        }),
        // We'll let Drizzle handle the user_id relationship automatically
      },
      count: 60, // Slightly more than users to ensure some users get multiple subscriptions
    },
  }));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
