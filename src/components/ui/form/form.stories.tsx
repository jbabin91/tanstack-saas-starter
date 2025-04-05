import type { Meta, StoryObj } from '@storybook/react';
import { z } from 'zod';

import { useAppForm } from './form';

const meta = {
  component: () => null,
  // Stories focus on form composition rather than individual components
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/Form',
} satisfies Meta<typeof useAppForm>;

export default meta;
type Story = StoryObj<typeof meta>;

const BasicFormSchema = z.object({
  bio: z.string().min(10, 'Bio must be at least 10 characters'),
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

export const BasicForm: Story = {
  render: () => {
    const form = useAppForm({
      defaultValues: {
        bio: '',
        email: '',
        name: '',
      },
      onSubmit: ({ value }) => {
        console.log('Form submitted:', value);
      },
      validators: {
        onBlur: BasicFormSchema,
      },
    });

    return (
      <div className="w-[400px] space-y-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.AppField name="name">
            {(field) => (
              <field.TextField label="Name" placeholder="Enter your name" />
            )}
          </form.AppField>

          <form.AppField name="email">
            {(field) => (
              <field.TextField label="Email" placeholder="Enter your email" />
            )}
          </form.AppField>

          <form.AppField name="bio">
            {(field) => <field.TextArea label="Bio" rows={4} />}
          </form.AppField>

          <div className="mt-6">
            <form.AppForm>
              <form.SubscribeButton label="Submit" />
            </form.AppForm>
          </div>
        </form>
      </div>
    );
  },
};

const AllFieldTypesSchema = z.object({
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  isActive: z.boolean(),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  priority: z.number().min(1, 'Priority must be at least 1'),
});

export const AllFieldTypes: Story = {
  render: () => {
    const form = useAppForm({
      defaultValues: {
        category: '',
        description: '',
        isActive: false,
        name: '',
        priority: 50,
      },
      onSubmit: ({ value }) => {
        console.log('Form submitted:', value);
      },
      validators: {
        onBlur: AllFieldTypesSchema,
      },
    });

    return (
      <div className="w-[400px] space-y-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.AppField name="name">
            {(field) => (
              <field.TextField label="Name" placeholder="Enter name" />
            )}
          </form.AppField>

          <form.AppField name="description">
            {(field) => <field.TextArea label="Description" rows={3} />}
          </form.AppField>

          <form.AppField name="category">
            {(field) => (
              <field.Select
                label="Category"
                placeholder="Select a category"
                values={[
                  { label: 'Personal', value: 'personal' },
                  { label: 'Work', value: 'work' },
                  { label: 'Shopping', value: 'shopping' },
                ]}
              />
            )}
          </form.AppField>

          <form.AppField name="priority">
            {(field) => (
              <field.TextField
                label="Priority"
                placeholder="Enter priority (1-100)"
              />
            )}
          </form.AppField>

          <form.AppField name="isActive">
            {(field) => (
              <field.TextField label="Active" placeholder="true or false" />
            )}
          </form.AppField>

          <div className="mt-6">
            <form.AppForm>
              <form.SubscribeButton label="Submit" />
            </form.AppForm>
          </div>
        </form>
      </div>
    );
  },
};
