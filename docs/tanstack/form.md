# TanStack Form

TanStack Form provides form state management with validation support for React applications.

## Key Features

- Controlled inputs with field-level validation
- Integration with schema validation libraries like Zod
- Support for complex form layouts and nested fields
- Field arrays for dynamic form elements
- Optimized rendering with minimal re-renders

## Basic Usage with Zod

```tsx
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
});

function MyForm() {
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
    },
    validators: {
      onSubmit: schema,
      onChange: schema,
    },
    onSubmit: ({ value }) => {
      // Handle form submission
      console.log(value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.Field name="name">
        {(field) => (
          <div>
            <label>Name</label>
            <input value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
            {field.state.meta.touchedErrors ?
              <em>{field.state.meta.touchedErrors}</em>
            : null}
          </div>
        )}
      </form.Field>

      <form.Field name="email">
        {(field) => (
          <div>
            <label>Email</label>
            <input value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
            {field.state.meta.touchedErrors ?
              <em>{field.state.meta.touchedErrors}</em>
            : null}
          </div>
        )}
      </form.Field>

      <button type="submit">Submit</button>
    </form>
  );
}
```

## Custom Form Components

In this project, we've created custom form components to simplify form creation:

```tsx
// Using custom field components
function SimpleForm() {
  const form = useAppForm({
    defaultValues: {
      title: '',
      description: '',
    },
    validators: {
      onBlur: schema,
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });

  return (
    <form onSubmit={form.handleSubmit}>
      <form.AppField name="title">{(field) => <field.TextField label="Title" />}</form.AppField>

      <form.AppField name="description">{(field) => <field.TextArea label="Description" />}</form.AppField>

      <form.SubscribeButton label="Submit" />
    </form>
  );
}
```

## Validation Timing

TanStack Form provides different validation timing options:

- `onChange`: Validate as the user types
- `onBlur`: Validate when the user leaves a field
- `onSubmit`: Validate only when the form is submitted
- `onTouched`: Validate once a field has been touched and then on every change

## Project Usage

In this project, TanStack Form is used for all form handling. Key integration points:

- `/src/hooks/demo.form.ts`: Custom form hooks
- `/src/components/demo.FormComponents.tsx`: Reusable form components
- `/src/routes/demo.form.simple.tsx`: Simple form example
- `/src/routes/demo.form.address.tsx`: More complex form example

## Resources

- [Official Documentation](https://tanstack.com/form/latest/docs/framework/react/overview)
- [Zod Integration](https://tanstack.com/form/latest/docs/framework/react/examples/zod)
- [Field Arrays](https://tanstack.com/form/latest/docs/framework/react/examples/field-arrays)
