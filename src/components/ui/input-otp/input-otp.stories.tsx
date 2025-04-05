import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { Fragment, useState } from 'react';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from './input-otp';

const meta = {
  component: InputOTP,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/InputOTP',
} satisfies Meta<typeof InputOTP>;

export default meta;
type Story = StoryObj<typeof meta>;

// Example usage component for a 6-digit OTP
const OTPExample = ({ length = 6, separator = false }) => {
  const [value, setValue] = useState('');

  return (
    <div className="flex flex-col items-center gap-2">
      <InputOTP maxLength={length} value={value} onChange={setValue}>
        <InputOTPGroup>
          {Array.from({ length }, (_, i) => (
            <Fragment key={i}>
              <InputOTPSlot index={i} />
              {separator && i !== length - 1 && <InputOTPSeparator />}
            </Fragment>
          ))}
        </InputOTPGroup>
      </InputOTP>
      <div className="text-muted-foreground mt-2 text-sm">
        Value: {value || 'Empty'}
      </div>
    </div>
  );
};

// Helper to create a placeholder OTP group for story args
const placeholder = (length = 6) => (
  <InputOTPGroup>
    {Array.from({ length }, (_, i) => (
      <InputOTPSlot key={i} index={i} />
    ))}
  </InputOTPGroup>
);

export const Default: Story = {
  args: {
    children: placeholder(6),
    maxLength: 6,
    value: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for component to initialize
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Test input slots
    const slots = canvas
      .getAllByRole('generic', { hidden: true })
      .filter((el) => el.getAttribute('data-slot') === 'input-otp-slot');
    await expect(slots).toHaveLength(6);

    // Test focus management
    const input = canvas.getByRole('textbox');
    await userEvent.type(input, '1');
    await expect(slots[1]).toHaveAttribute('data-active', 'true');
  },
  render: () => <OTPExample />,
};

export const WithSeparators: Story = {
  args: {
    children: placeholder(6),
    maxLength: 6,
    value: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for component to initialize
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Test input slots and separators
    const slots = canvas
      .getAllByRole('generic', { hidden: true })
      .filter((el) => el.getAttribute('data-slot') === 'input-otp-slot');
    const separators = canvas.getAllByRole('separator');
    await expect(slots).toHaveLength(6);
    await expect(separators).toHaveLength(5);
  },
  render: () => <OTPExample separator={true} />,
};

export const FourDigits: Story = {
  args: {
    children: placeholder(4),
    maxLength: 4,
    value: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for component to initialize
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Test input slots
    const slots = canvas
      .getAllByRole('generic', { hidden: true })
      .filter((el) => el.getAttribute('data-slot') === 'input-otp-slot');
    await expect(slots).toHaveLength(4);

    // Test focus management
    const input = canvas.getByRole('textbox');
    await userEvent.type(input, '1');
    await expect(slots[1]).toHaveAttribute('data-active', 'true');
  },
  render: () => <OTPExample length={4} />,
};

export const WithValue: Story = {
  args: {
    children: placeholder(6),
    maxLength: 6,
    value: '123456',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for component to initialize
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Test pre-filled values
    const input = canvas.getByRole('textbox');
    await expect(input).toHaveValue('123456');

    const slots = canvas
      .getAllByRole('generic', { hidden: true })
      .filter((el) => el.getAttribute('data-slot') === 'input-otp-slot');
    await expect(slots[0]).toHaveTextContent('1');
    await expect(slots[1]).toHaveTextContent('2');
    await expect(slots[2]).toHaveTextContent('3');
    await expect(slots[3]).toHaveTextContent('4');
    await expect(slots[4]).toHaveTextContent('5');
    await expect(slots[5]).toHaveTextContent('6');
  },
  render: function Render() {
    const [value, setValue] = useState('123456');

    return (
      <div className="flex flex-col items-center gap-2">
        <InputOTP maxLength={6} value={value} onChange={setValue}>
          <InputOTPGroup>
            {Array.from({ length: 6 }, (_, i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>
        <div className="text-muted-foreground mt-2 text-sm">Value: {value}</div>
      </div>
    );
  },
};

export const CustomStyling: Story = {
  args: {
    children: placeholder(4),
    maxLength: 4,
    value: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for component to initialize
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Test custom styles
    const slots = canvas
      .getAllByRole('generic', { hidden: true })
      .filter((el) => el.getAttribute('data-slot') === 'input-otp-slot');
    await expect(slots[0]).toHaveClass(
      'h-12',
      'w-12',
      'rounded-md',
      'border-2',
      'text-lg',
    );
  },
  render: () => (
    <InputOTP maxLength={4}>
      <InputOTPGroup className="gap-3">
        {Array.from({ length: 4 }, (_, i) => (
          <InputOTPSlot
            key={i}
            className="h-12 w-12 rounded-md border-2 text-lg"
            index={i}
          />
        ))}
      </InputOTPGroup>
    </InputOTP>
  ),
};

export const Disabled: Story = {
  args: {
    children: placeholder(6),
    disabled: true,
    maxLength: 6,
    value: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for component to initialize
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Test disabled state
    const inputs = canvas.getAllByRole('textbox');
    for (const input of inputs) {
      await expect(input).toBeDisabled();
    }
  },
  render: () => (
    <InputOTP disabled maxLength={6}>
      <InputOTPGroup>
        {Array.from({ length: 6 }, (_, i) => (
          <InputOTPSlot key={i} index={i} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  ),
};
