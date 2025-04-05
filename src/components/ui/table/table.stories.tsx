import type { Meta, StoryObj } from '@storybook/react';

import { cn } from '@/lib/utils';

import { Label } from '../label';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './table';

const meta = {
  component: Table,
  tags: ['autodocs'],
  title: 'UI/Table',
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const invoices = [
  {
    invoice: 'INV001',
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
  },
  {
    invoice: 'INV002',
    paymentMethod: 'PayPal',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
  },
  {
    invoice: 'INV003',
    paymentMethod: 'Bank Transfer',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
  },
  {
    invoice: 'INV004',
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
  },
  {
    invoice: 'INV005',
    paymentMethod: 'PayPal',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
  },
];

export const Basic: Story = {
  render: () => (
    <Table>
      <TableCaption className="text-muted-foreground">
        A list of your recent invoices.
      </TableCaption>
      <TableHeader>
        <TableRow className="hover:bg-muted/50">
          <TableHead className="text-foreground">Invoice</TableHead>
          <TableHead className="text-foreground">Status</TableHead>
          <TableHead className="text-foreground">Method</TableHead>
          <TableHead className="text-foreground text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow
            key={invoice.invoice}
            className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors"
          >
            <TableCell className="text-foreground font-medium">
              {invoice.invoice}
            </TableCell>
            <TableCell className="text-foreground">
              {invoice.paymentStatus}
            </TableCell>
            <TableCell className="text-foreground">
              {invoice.paymentMethod}
            </TableCell>
            <TableCell className="text-foreground text-right">
              {invoice.totalAmount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-muted/50">
          <TableHead className="text-foreground">Invoice</TableHead>
          <TableHead className="text-foreground">Status</TableHead>
          <TableHead className="text-foreground">Method</TableHead>
          <TableHead className="text-foreground text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.slice(0, 3).map((invoice) => (
          <TableRow
            key={invoice.invoice}
            className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors"
          >
            <TableCell className="text-foreground font-medium">
              {invoice.invoice}
            </TableCell>
            <TableCell className="text-foreground">
              {invoice.paymentStatus}
            </TableCell>
            <TableCell className="text-foreground">
              {invoice.paymentMethod}
            </TableCell>
            <TableCell className="text-foreground text-right">
              {invoice.totalAmount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter className="bg-muted/50">
        <TableRow className="hover:bg-muted data-[state=selected]:bg-muted border-b transition-colors">
          <TableCell className="text-foreground font-medium" colSpan={3}>
            Total
          </TableCell>
          <TableCell className="text-foreground text-right font-medium">
            $750.00
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

export const WithSelection: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-muted/50">
          <TableHead className="w-[50px]">
            <div className="flex items-center">
              <input
                aria-label="Select all rows"
                className="size-4"
                id="select-all"
                type="checkbox"
              />
              <Label className="sr-only" htmlFor="select-all">
                Select all rows
              </Label>
            </div>
          </TableHead>
          <TableHead className="text-foreground">Invoice</TableHead>
          <TableHead className="text-foreground">Status</TableHead>
          <TableHead className="text-foreground">Method</TableHead>
          <TableHead className="text-foreground text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow
            key={invoice.invoice}
            className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors"
          >
            <TableCell>
              <div className="flex items-center">
                <input
                  aria-label={`Select invoice ${invoice.invoice}`}
                  className="size-4"
                  id={`select-${invoice.invoice}`}
                  type="checkbox"
                />
                <Label
                  className="sr-only"
                  htmlFor={`select-${invoice.invoice}`}
                >
                  Select invoice {invoice.invoice}
                </Label>
              </div>
            </TableCell>
            <TableCell className="text-foreground font-medium">
              {invoice.invoice}
            </TableCell>
            <TableCell className="text-foreground">
              {invoice.paymentStatus}
            </TableCell>
            <TableCell className="text-foreground">
              {invoice.paymentMethod}
            </TableCell>
            <TableCell className="text-foreground text-right">
              {invoice.totalAmount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const WithStatusIndicator: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-muted/50">
          <TableHead className="text-foreground">Invoice</TableHead>
          <TableHead className="text-foreground">Status</TableHead>
          <TableHead className="text-foreground">Method</TableHead>
          <TableHead className="text-foreground text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow
            key={invoice.invoice}
            className="hover:bg-muted/50 border-b transition-colors"
          >
            <TableCell className="text-foreground font-medium">
              {invoice.invoice}
            </TableCell>
            <TableCell className="text-foreground">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    'size-2 rounded-full',
                    invoice.paymentStatus === 'Paid' ? 'bg-green-500'
                    : invoice.paymentStatus === 'Pending' ? 'bg-yellow-500'
                    : 'bg-red-500',
                  )}
                />
                {invoice.paymentStatus}
              </div>
            </TableCell>
            <TableCell className="text-foreground">
              {invoice.paymentMethod}
            </TableCell>
            <TableCell className="text-foreground text-right">
              {invoice.totalAmount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};
