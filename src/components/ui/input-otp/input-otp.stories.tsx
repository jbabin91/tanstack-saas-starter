import type { Meta, StoryObj } from '@storybook/react';
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
  render: () => <OTPExample />,
};

export const WithSeparators: Story = {
  args: {
    children: placeholder(6),
    maxLength: 6,
    value: '',
  },
  render: () => <OTPExample separator={true} />,
};

export const FourDigits: Story = {
  args: {
    children: placeholder(4),
    maxLength: 4,
    value: '',
  },
  render: () => <OTPExample length={4} />,
};

export const WithValue: Story = {
  args: {
    children: placeholder(6),
    maxLength: 6,
    value: '123456',
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
