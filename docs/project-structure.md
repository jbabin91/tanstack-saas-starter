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

TanStack Router uses file-based routing with a naming convention:

- `__root.tsx` - Root layout that wraps all routes
- `index.tsx` - Home page
- `demo.*.tsx` - Demo route files
  - The `.` in filenames represents route nesting
  - Example: `demo.form.simple.tsx` becomes `/demo/form/simple`

## Data Flow

1. **API Calls**: Made through TanStack Query for data fetching
2. **Form Handling**: Done with TanStack Form and Zod validation
3. **State Management**: Primarily through TanStack Query for server state
4. **UI Rendering**: React components styled with TailwindCSS

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
   pnpm serve
   ```
