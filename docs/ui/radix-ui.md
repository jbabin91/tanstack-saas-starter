# Radix UI

Radix UI provides unstyled, accessible UI primitives that can be styled with TailwindCSS to create a customized design system.

## Key Features

- Fully accessible components that follow WAI-ARIA standards
- Unstyled primitives that can be styled with any CSS solution
- Comprehensive keyboard navigation support
- Focus management
- Screen reader announcements
- Proper ARIA attributes

## Common Component Props

| Component | Key Props                              | Description                |
| --------- | -------------------------------------- | -------------------------- |
| Select    | `value`, `onValueChange`               | Controlled select input    |
| Switch    | `checked`, `onCheckedChange`           | Toggle switch control      |
| Slider    | `value`, `onValueChange`, `min`, `max` | Range input control        |
| Label     | `htmlFor`, `asChild`                   | Accessible label component |

## Accessibility Features

| Feature          | Implementation            | Example                       |
| ---------------- | ------------------------- | ----------------------------- |
| ARIA Labels      | Automatic ARIA attributes | `aria-label`, `aria-expanded` |
| Keyboard Nav     | Arrow key navigation      | `↑`, `↓`, `Space`, `Enter`    |
| Focus Management | Automatic focus handling  | Focus trap in modals          |
| Screen Readers   | Descriptive announcements | State changes, selections     |

## Components Used in This Project

This project uses several Radix UI components:

- **Label**: For accessible form labels
- **Select**: For dropdown selection components
- **Slider**: For range input components
- **Switch**: For toggle components
- **Slot**: For component composition

## Basic Usage Pattern

### Select Component

```tsx
import * as Select from '@radix-ui/react-select';
import { cn } from '@/lib/utils';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';

function SelectComponent({ value, onChange, options }) {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger className="flex items-center justify-between rounded-md border px-3 py-2">
        <Select.Value />
        <Select.Icon>
          <ChevronDownIcon className="h-4 w-4" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="rounded-md bg-white shadow-lg">
          <Select.Viewport>
            {options.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className="flex cursor-pointer items-center px-3 py-2 hover:bg-gray-100"
              >
                <Select.ItemText>{option.label}</Select.ItemText>
                <Select.ItemIndicator className="ml-auto">
                  <CheckIcon className="h-4 w-4" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
```

### Switch Component

```tsx
import * as Switch from '@radix-ui/react-switch';

function SwitchComponent({ checked, onChange, label }) {
  return (
    <div className="flex items-center">
      <label className="mr-2">{label}</label>
      <Switch.Root
        checked={checked}
        onCheckedChange={onChange}
        className="relative h-5 w-10 rounded-full bg-gray-300 data-[state=checked]:bg-blue-500"
      >
        <Switch.Thumb className="block h-4 w-4 translate-x-0.5 rounded-full bg-white transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-5" />
      </Switch.Root>
    </div>
  );
}
```

### Slider Component

```tsx
import * as Slider from '@radix-ui/react-slider';

function SliderComponent({ value, onChange, min = 0, max = 100 }) {
  return (
    <Slider.Root
      className="relative flex h-5 w-full items-center"
      value={[value]}
      onValueChange={(values) => onChange(values[0])}
      min={min}
      max={max}
    >
      <Slider.Track className="relative h-2 grow rounded-full bg-gray-200">
        <Slider.Range className="absolute h-full rounded-full bg-blue-500" />
      </Slider.Track>
      <Slider.Thumb
        className="block h-5 w-5 rounded-full bg-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        aria-label="Volume"
      />
    </Slider.Root>
  );
}
```

## Integration with TailwindCSS

Radix UI components work particularly well with TailwindCSS for styling:

- Use the `className` prop on Radix components for styling
- Use data attributes (like `data-state="checked"`) for state-based styling
- Combine with CVA for component variants

## Project Usage

The project uses Radix UI components in:

- `/src/components/ui/`: Base UI components using Radix primitives
- `/src/routes/demo.form.*.tsx`: Form components using Radix Label, Select, etc.

## Resources

- [Official Documentation](https://www.radix-ui.com/docs/primitives/overview/introduction)
- [Radix UI + TailwindCSS Integration](https://www.radix-ui.com/docs/primitives/guides/styling#tailwindcss)
- [Accessibility Features](https://www.radix-ui.com/docs/primitives/overview/accessibility)
