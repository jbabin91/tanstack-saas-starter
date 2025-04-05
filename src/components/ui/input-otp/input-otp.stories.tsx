import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from '@storybook/test';
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
      <label
        className="text-foreground text-sm font-medium"
        htmlFor="otp-input"
      >
        Enter verification code
      </label>
      <InputOTP
        className="bg-background"
        id="otp-input"
        maxLength={length}
        value={value}
        onChange={setValue}
      >
        <InputOTPGroup
          aria-label="Enter verification code"
          className="gap-2"
          role="group"
        >
          {Array.from({ length }, (_, i) => (
            <Fragment key={i}>
              <InputOTPSlot
                aria-label={`Digit ${i + 1}`}
                className="border-input bg-background text-foreground focus:border-ring"
                data-testid={`otp-slot-${i}`}
                index={i}
                role="textbox"
              />
              {separator && i !== length - 1 && (
                <InputOTPSeparator className="text-muted-foreground" />
              )}
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
  <InputOTPGroup
    aria-label="Enter verification code"
    className="gap-2"
    role="group"
  >
    {Array.from({ length }, (_, i) => (
      <InputOTPSlot
        key={i}
        aria-label={`Digit ${i + 1}`}
        className="border-input bg-background text-foreground focus:border-ring"
        data-testid={`otp-slot-${i}`}
        index={i}
        role="textbox"
      />
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

    // Test input slots using test IDs
    const slots = Array.from({ length: 6 }, (_, i) =>
      canvas.getByTestId(`otp-slot-${i}`),
    );
    await expect(slots).toHaveLength(6);

    // Get the hidden input that handles actual input
    const input = canvas.getByRole('textbox', {
      name: /enter verification code/i,
    });

    // Focus and trigger events in proper sequence
    input.focus();
    input.dispatchEvent(new Event('focus', { bubbles: true }));
    input.dispatchEvent(new Event('focusin', { bubbles: true }));

    // Wait for the active state to be applied
    await waitFor(
      () => {
        expect(slots[0]).toHaveAttribute('data-active', 'true');
      },
      { timeout: 1000 },
    );

    // Type first digit and verify second slot becomes active
    await userEvent.type(input, '1');

    await waitFor(() => {
      expect(slots[0]).toHaveTextContent('1');
      expect(slots[1]).toHaveAttribute('data-active', 'true');
      expect(slots[0]).toHaveAttribute('data-active', 'false');
    });
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

    // Test input slots and separators using test IDs
    const slots = Array.from({ length: 6 }, (_, i) =>
      canvas.getByTestId(`otp-slot-${i}`),
    );
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

    // Test input slots using test IDs
    const slots = Array.from({ length: 4 }, (_, i) =>
      canvas.getByTestId(`otp-slot-${i}`),
    );
    await expect(slots).toHaveLength(4);

    // Get the hidden input that handles actual input
    const input = canvas.getByRole('textbox', {
      name: /enter verification code/i,
    });

    // Focus and trigger events in proper sequence
    input.focus();
    input.dispatchEvent(new Event('focus', { bubbles: true }));
    input.dispatchEvent(new Event('focusin', { bubbles: true }));

    // Wait for the active state to be applied
    await waitFor(
      () => {
        expect(slots[0]).toHaveAttribute('data-active', 'true');
      },
      { timeout: 1000 },
    );

    // Type first digit and verify second slot becomes active
    await userEvent.type(input, '1');

    await waitFor(() => {
      expect(slots[0]).toHaveTextContent('1');
      expect(slots[1]).toHaveAttribute('data-active', 'true');
      expect(slots[0]).toHaveAttribute('data-active', 'false');
    });
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

    // Get the hidden input using data attribute instead of role
    const input = canvas.getByDisplayValue('123456');
    await expect(input).toHaveValue('123456');

    // Test visible slots using test IDs
    const slots = Array.from({ length: 6 }, (_, i) =>
      canvas.getByTestId(`otp-slot-${i}`),
    );
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
        <label
          className="text-foreground text-sm font-medium"
          htmlFor="value-otp-input"
        >
          Enter verification code
        </label>
        <InputOTP
          className="bg-background"
          id="value-otp-input"
          maxLength={6}
          value={value}
          onChange={setValue}
        >
          <InputOTPGroup
            aria-label="Enter verification code"
            className="gap-2"
            role="group"
          >
            {Array.from({ length: 6 }, (_, i) => (
              <InputOTPSlot
                key={i}
                aria-label={`Digit ${i + 1}`}
                className="border-input bg-background text-foreground focus:border-ring"
                data-testid={`otp-slot-${i}`}
                index={i}
                role="textbox"
              />
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

    // Test custom styles using test IDs
    const slots = Array.from({ length: 4 }, (_, i) =>
      canvas.getByTestId(`otp-slot-${i}`),
    );
    await expect(slots[0]).toHaveClass(
      'h-12',
      'w-12',
      'rounded-md',
      'border-2',
      'text-lg',
    );
  },
  render: () => {
    const [value, setValue] = useState('');

    return (
      <div>
        <label
          className="text-foreground text-sm font-medium"
          htmlFor="custom-otp-input"
        >
          Enter verification code
        </label>
        <InputOTP
          className="bg-background"
          id="custom-otp-input"
          maxLength={4}
          value={value}
          onChange={setValue}
        >
          <InputOTPGroup
            aria-label="Enter verification code"
            className="gap-3"
            role="group"
          >
            {Array.from({ length: 4 }, (_, i) => (
              <InputOTPSlot
                key={i}
                aria-label={`Digit ${i + 1}`}
                className="border-input bg-background text-foreground focus:border-ring h-12 w-12 rounded-md border-2 text-lg"
                data-testid={`otp-slot-${i}`}
                index={i}
                role="textbox"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>
    );
  },
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

    // Test disabled state using data-testid
    const slots = Array.from({ length: 6 }, (_, i) =>
      canvas.getByTestId(`otp-slot-${i}`),
    );

    // Test that each slot has proper disabled attributes and styling
    for (const slot of slots) {
      await expect(slot).toHaveAttribute('aria-disabled', 'true');
      await expect(slot).toHaveClass('text-muted-foreground', 'opacity-50');
    }

    // Test that the hidden input is disabled using data-input-otp attribute
    const input = canvas.getByRole('textbox', {
      hidden: true,
      name: /enter verification code/i,
    });
    await expect(input).toHaveAttribute('disabled');
    await expect(input).toHaveAttribute('data-input-otp', 'true');
    await expect(input).toHaveClass('disabled:cursor-not-allowed');
  },
  render: () => (
    <div>
      <label
        className="text-foreground text-sm font-medium"
        htmlFor="disabled-otp-input"
      >
        Enter verification code
      </label>
      <InputOTP
        disabled
        className="bg-background"
        id="disabled-otp-input"
        maxLength={6}
      >
        <InputOTPGroup
          aria-disabled="true"
          aria-label="Enter verification code"
          className="gap-2"
          role="group"
        >
          {Array.from({ length: 6 }, (_, i) => (
            <InputOTPSlot
              key={i}
              aria-disabled="true"
              aria-label={`Digit ${i + 1}`}
              className="border-input bg-background text-muted-foreground opacity-50"
              data-testid={`otp-slot-${i}`}
              index={i}
              role="spinbutton"
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
    </div>
  ),
};
