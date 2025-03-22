# Project Structure

This document provides an overview of the TanStack SaaS Starter project organization.

## Root Directory

- `app.config.ts` - Vinxi configuration file
- `components.json` - Component configuration
- `package.json` - Project dependencies and scripts
- `postcss.config.ts` - PostCSS configuration for TailwindCSS
- `tsconfig.json` - TypeScript configuration

## Key Directories

### `/src` - Source Code

The main application code resides here, organized into logical subdirectories:

- `/src/components` - UI components
  - `/src/components/ui` - Base UI components using Radix UI
  - `/src/components/demo.FormComponents.tsx` - Form components for demos
- `/src/data` - Mock data and data utilities
- `/src/hooks` - Custom React hooks
  - `/src/hooks/demo.form.ts` - Form hooks for demos
- `/src/integrations` - Third-party library integrations
  - `/src/integrations/tanstack-query` - TanStack Query setup
- `/src/lib` - Utility functions
  - `/src/lib/utils.ts` - General utilities like the `cn` function
- `/src/routes` - File-based routing with TanStack Router
  - `/src/routes/__root.tsx` - Root layout
  - Various demo routes

### `/public` - Static Assets

Contains public assets like favicons, logos, and the manifest file.

### `/docs` - Documentation

Contains comprehensive documentation of the tech stack:

- Core technologies: Vinxi, React, and TypeScript
- TanStack ecosystem: Router, Query, Form, and Table
- UI technologies: TailwindCSS, Radix UI
- Validation: Zod
- Testing: Vitest and Faker.js

## File Naming Conventions

- **Components**: PascalCase (e.g., `Button.tsx`)
- **Routes**: kebab-case with dots for nesting (e.g., `demo.form.simple.tsx`)
- **Utilities**: camelCase (e.g., `utils.ts`)
- **Demo files**: prefixed with `demo.` (e.g., `demo.form.ts`)

## Routing Structure

TanStack Router uses file-based routing with specific organizational patterns:

### Root Level Routes

- `__root.tsx` - Root layout that wraps all routes
- `index.tsx` - Home page

### Pathless Directory Organization

We use pathless directories (prefixed with `_`) to organize routes without affecting URLs:

- `_app/` - Core application routes

  - Mounted at root level
  - Contains authenticated/protected routes
  - Example: `_app/settings.tsx` → `/settings`

- `_public/` - Public-facing routes

  - Marketing pages, landing pages
  - No authentication required
  - Example: `_public/about.tsx` → `/about`

- `_auth/` - Authentication routes
  - Login, signup flows
  - Example: `_auth/login.tsx` → `/login`

This organization provides clear separation of concerns while maintaining clean URLs.

## Data Flow

1. **API Calls**: Made through TanStack Query for data fetching
2. **Form Handling**: Done with TanStack Form and Zod validation
3. **State Management**: Primarily through TanStack Query for server state
4. **UI Rendering**: React components styled with TailwindCSS

## API Directory Structure

The `/src/routes` directory also contains our API routes, following these conventions:

### API Route Files

API routes are organized under the `api/` directory:

```sh
src/routes/
├── api/                       # API routes directory
│   ├── health.ts             # /api/health
│   ├── auth/                 # Authentication endpoints
│   │   ├── login.ts         # /api/auth/login
│   │   ├── logout.ts        # /api/auth/logout
│   │   └── refresh.ts       # /api/auth/refresh
│   ├── users/               # User management endpoints
│   │   ├── [userId].ts     # /api/users/:userId
│   │   ├── create.ts       # /api/users/create
│   │   └── search.ts       # /api/users/search
│   └── webhooks/           # Webhook endpoints
│       ├── stripe.ts       # /api/webhooks/stripe
│       └── github.ts       # /api/webhooks/github
```

### API Route Implementation

Each API route file follows this pattern:

```ts
import { createAPIFileRoute } from '@tanstack/react-start/api';

export const APIRoute = createAPIFileRoute('/api/path')({
  // HTTP method handlers
  GET: async ({ request }) => {
    // Handle GET request
  },
  POST: async ({ request }) => {
    // Handle POST request
  },
});
```

### API Organization Benefits

1. **Discoverability**: All API routes are organized under the `api/` directory
2. **Grouping**: Related endpoints are grouped in subdirectories
3. **Versioning**: Easy to add versioned routes (e.g., `api/v1/users/`)
4. **Type Safety**: Full type safety with TanStack Start's API route types

## Development Workflow

1. Start the development server:

   ```bash
   pnpm dev
   ```

2. Build for production:

   ```bash
   pnpm build
   ```

3. Run tests:

   ```bash
   pnpm test
   ```

4. Preview production build:

   ```bash
   pnpm start
   ```
