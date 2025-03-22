# Component Utilities

This project uses several utility libraries for component styling and composition. These utilities help create a consistent, maintainable UI system.

## Class Variance Authority (CVA)

CVA is a utility for creating variant components with type safety. It's particularly useful when combined with TailwindCSS.

### Key Features

- Type-safe component variants
- Simplified variant definition
- Compound variants for complex combinations
- Default variants

### Basic Usage

```tsx
import { cva } from 'class-variance-authority';

// Define button variants
const buttonVariants = cva('inline-flex items-center justify-center rounded-md text-sm font-medium', {
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline',
    },
    size: {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 px-3',
      lg: 'h-11 px-8',
      icon: 'h-10 w-10',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

// Use in components
function Button({ variant, size, className, ...props }) {
  return <button className={buttonVariants({ variant, size, className })} {...props} />;
}
```

## clsx & tailwind-merge

These utilities help manage conditional class names and properly merge TailwindCSS classes.

### Key Features

- **clsx**: Conditionally join class names
- **tailwind-merge**: Resolve TailwindCSS class conflicts

### Basic Usage

```tsx
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// utils.ts
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Usage
<div
  className={cn(
    'base-style',
    active && 'active-style',
    disabled && 'disabled-style',
    className, // passed from props
  )}
/>;
```

## Lucide React

Lucide React provides a set of customizable SVG icons for use in React applications.

### Key Features

- Simple API
- Customizable icons
- TypeScript support

### Basic Usage

```tsx
import { Home, Settings, User } from 'lucide-react';

function IconDemo() {
  return (
    <div className="flex gap-4">
      <Home className="h-6 w-6 text-blue-500" />
      <Settings className="h-6 w-6 text-gray-500" />
      <User className="h-6 w-6 text-green-500" />
    </div>
  );
}
```

## Project Integration

These utilities are used throughout the project:

- `/src/lib/utils.ts`: Contains the `cn` utility function
- `/src/components/ui/*.tsx`: UI components using CVA for variants
- Various components that use Lucide icons

## Resources

- [Class Variance Authority Documentation](https://cva.style/docs)
- [clsx Documentation](https://github.com/lukeed/clsx)
- [tailwind-merge Documentation](https://github.com/dcastil/tailwind-merge)
- [Lucide React Documentation](https://lucide.dev/guide/packages/lucide-react)
