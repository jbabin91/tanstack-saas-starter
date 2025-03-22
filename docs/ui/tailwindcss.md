# TailwindCSS

TailwindCSS is a utility-first CSS framework that allows you to build custom designs without leaving your HTML.

## Key Features

- Utility-first approach for rapid UI development
- JIT (Just-In-Time) compiler for faster build times
- Responsive design utilities
- Dark mode support
- Fully customizable with themes
- Integrated animations and transitions

## Basic Usage

```html
<!-- Using utility classes for styling -->
<button
  class="bg-primary text-primary-foreground hover:bg-primary/90 rounded px-4 py-2 font-bold"
>
  Submit
</button>
```

## Configuration

This project uses TailwindCSS v4, which uses a new CSS-based configuration approach. Configuration is done directly in your CSS:

```css
/* styles.css */
@import 'tailwindcss';
@plugin "tailwindcss-animate";

/* Custom dark mode variant */
@custom-variant dark (&:is(.dark *));

/* Theme configuration using modern color spaces */
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.141 0.005 285.823);
  --primary: oklch(0.21 0.006 285.885);
  --primary-foreground: oklch(0.985 0 0);
  /* ... other color tokens ... */
}

/* Dark mode overrides */
.dark {
  --background: oklch(0.141 0.005 285.823);
  --foreground: oklch(0.985 0 0);
  /* ... other dark mode colors ... */
}

/* Theme configuration */
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  /* ... other theme mappings ... */
}

/* Base styles */
@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

Key differences in v4:

- Uses `@import 'tailwindcss'` instead of `@tailwind` directives
- Plugins are added with `@plugin` syntax
- Dark mode uses new `@custom-variant` syntax
- Modern color spaces (oklch) for better color handling and consistent display across browsers
- Theme configuration uses `@theme inline` block
- Direct CSS variable usage for design tokens

Note: The `oklch()` color format is used for better color perception and consistency across different displays. For example, `oklch(1 0 0)` represents pure white, while `oklch(0.141 0.005 285.823)` represents a precise shade with controlled lightness, chroma, and hue values.

## TailwindCSS with React

In React components, Tailwind is used directly in className props:

```tsx
function Button({ variant = 'primary', children }) {
  const baseStyles =
    'px-4 py-2 rounded-md font-medium focus:outline-none transition-colors';

  const variantStyles = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    destructive:
      'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  };

  return (
    <button className={`${baseStyles} ${variantStyles[variant]}`}>
      {children}
    </button>
  );
}
```

## Using with Class Variance Authority (CVA)

This project combines TailwindCSS with CVA for component variants:

```tsx
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-12 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export function Button({ variant, size, className, ...props }) {
  return (
    <button
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  );
}
```

## Utility Functions

The project includes utility functions for merging Tailwind classes:

```tsx
// src/lib/utils.ts
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Usage
<div
  className={cn(
    'base-style',
    active && 'active-style',
    className, // passed from props
  )}
/>;
```

## Project Usage

In this project, TailwindCSS is used throughout all components for styling:

- `/src/components/ui/*.tsx`: UI components styled with Tailwind
- `/src/routes/*.tsx`: Page components using Tailwind for layout and styling
- `/src/styles.css`: Global styles and Tailwind directives

## Resources

- [Official Documentation](https://tailwindcss.com/docs)
- [TailwindCSS v4 Changes](https://tailwindcss.com/blog/tailwindcss-v4)
- [Utility-First Fundamentals](https://tailwindcss.com/docs/utility-first)
