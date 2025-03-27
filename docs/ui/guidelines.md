# Component Design Guidelines

This guide outlines our component design principles and best practices.

## Core Principles

1. **Accessibility First**

   - ARIA attributes
   - Keyboard navigation
   - Screen reader support
   - Color contrast

2. **Reusability**

   - Component composition
   - Prop flexibility
   - Consistent APIs
   - Clear documentation

3. **Performance**

   - Lazy loading
   - Code splitting
   - Bundle size awareness
   - Render optimization

4. **Maintainability**
   - Clear component structure
   - Consistent patterns
   - Type safety
   - Test coverage

## Component Structure

### File Organization

```sh
components/
  button/
    button.tsx      # Component implementation with types and styles
    button.test.tsx # Component tests
```

### Component Template

```typescript
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'medium',
  isLoading,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'rounded-md font-medium transition-colors',
        {
          'bg-blue-500 text-white hover:bg-blue-600': variant === 'primary',
          'bg-gray-200 text-gray-900 hover:bg-gray-300': variant === 'secondary',
          'text-gray-900 hover:bg-gray-100': variant === 'ghost',
        },
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <LoadingSpinner /> : children}
    </button>
  );
}
```

## Component APIs

### Props Design

```typescript
// ✅ Good
interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

// ❌ Avoid
interface DialogProps {
  open?: string; // Use boolean and clear naming
  customClass?: string; // Use className from HTMLAttributes
  onDialogClose?: Function; // Use specific function type
}
```

### Component Composition

```typescript
// ✅ Good
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

function Card({ header, children, footer, className, ...props }: CardProps) {
  return (
    <div className={cn('rounded-lg border', className)} {...props}>
      {header && <div className="border-b p-4">{header}</div>}
      <div className="p-4">{children}</div>
      {footer && <div className="border-t p-4">{footer}</div>}
    </div>
  );
}

// ❌ Avoid
interface CardProps {
  title?: string;  // Too restrictive, use ReactNode
  content?: string;  // Use children from HTMLAttributes
  footerContent?: string;  // Too restrictive, use ReactNode
  customClass?: string;  // Use className from HTMLAttributes
}
```

## Styling

### CSS Classes

```typescript
// ✅ Good
interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'error' | 'success';
}

function Alert({ variant = 'info', className, children, ...props }: AlertProps) {
  return (
    <div
      className={cn(
        'rounded-lg p-4',
        {
          'bg-blue-50 text-blue-900': variant === 'info',
          'bg-red-50 text-red-900': variant === 'error',
          'bg-green-50 text-green-900': variant === 'success',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ❌ Avoid
interface AlertProps {
  type?: string;  // Use specific union type
  style?: React.CSSProperties;  // Prefer className for styling
}
```

## Accessibility

### ARIA Attributes

```typescript
// ✅ Good
function Dialog({ isOpen, onClose, title, children, ...props }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      className="fixed inset-0 z-50 flex items-center justify-center"
      {...props}
    >
      <div className="bg-white rounded-lg p-6">
        <h2 id="dialog-title" className="text-lg font-semibold">
          {title}
        </h2>
        <div id="dialog-description">{children}</div>
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4"
        >
          ×
        </button>
      </div>
    </div>
  );
}

// ❌ Avoid
function Dialog({ isOpen, onClose, title, children }) {
  return (
    <div className="dialog">
      <h2>{title}</h2>
      <div>{children}</div>
      <button onClick={onClose}>×</button>
    </div>
  );
}
```

## Performance

### Optimization

```typescript
// ✅ Good
function DataGrid({ items }) {
  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <GridItem key={item.id} {...item} />
      ))}
    </div>
  );
}

// ❌ Avoid
function DataGrid({ items }) {
  return (
    <div className="grid gap-4">
      {items.map((item, index) => (
        <GridItem key={index} {...item} /> // Don't use index as key
      ))}
    </div>
  );
}
```

## Testing

### Component Tests

```typescript
// ✅ Good
test('button handles click events and loading state', async () => {
  const user = userEvent.setup();
  const onClick = vi.fn();

  const { rerender } = render(
    <Button onClick={onClick}>Click me</Button>
  );

  await user.click(screen.getByRole('button'));
  expect(onClick).toHaveBeenCalled();

  rerender(<Button isLoading>Click me</Button>);
  expect(screen.getByRole('button')).toBeDisabled();
});

// ❌ Avoid
test('button renders', () => {
  const { container } = render(<Button>Click me</Button>);
  expect(container).toBeInTheDocument();
});
```

## Related Documentation

- [Component Utilities](./component-utilities.md) - Shared component utilities
- [Tailwind CSS](./tailwindcss.md) - Styling patterns
- [Radix UI](./radix-ui.md) - Accessible primitives
- [React](../core/react.md) - React patterns
