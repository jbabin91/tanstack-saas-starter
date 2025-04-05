import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import {
  waitForAttribute,
  waitForClass,
  waitForExpandedState,
  waitForFocus,
  waitForState,
  waitForVisibility,
} from '@/test/storybook-test-utils';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './accordion';

const meta: Meta<typeof Accordion> = {
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'test'],
  title: 'UI/Accordion',
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggers = canvas.getAllByRole('button');
    const items = canvas.getAllByRole('region', { hidden: true });

    // Test initial state
    await waitForExpandedState(triggers[0], false);
    await waitForState(items[0], 'closed');

    // Test keyboard navigation in initial state
    await userEvent.tab();
    await waitForFocus(triggers[0]);
    expect(triggers[0].textContent).toContain('Is it accessible?');

    await userEvent.tab();
    await waitForFocus(triggers[1]);
    expect(triggers[1].textContent).toContain('Is it styled?');

    await userEvent.tab();
    await waitForFocus(triggers[2]);
    expect(triggers[2].textContent).toContain('Is it animated?');

    // Test click behavior
    await userEvent.click(triggers[0]);
    await waitForExpandedState(triggers[0], true);
    await waitForState(items[0], 'open');

    // Test closing behavior
    await userEvent.click(triggers[0]);
    await waitForExpandedState(triggers[0], false);
    await waitForState(items[0], 'closed');
  },
  render: () => (
    <Accordion collapsible className="w-[400px]" type="single">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern using Radix UI
          primitives.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other components'
          aesthetic.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggers = canvas.getAllByRole('button');
    const items = canvas.getAllByRole('region', { hidden: true });

    // Test initial state
    await waitForExpandedState(triggers[0], false);
    await waitForVisibility(items[0], false);

    // Test multiple items can be opened
    await userEvent.click(triggers[0]);
    await userEvent.click(triggers[1]);
    await waitForExpandedState(triggers[0], true);
    await waitForExpandedState(triggers[1], true);
    await waitForVisibility(items[0], true);
    await waitForVisibility(items[1], true);

    // Test content visibility for multiple items
    const firstTrigger = canvas.getByRole('button', {
      name: /Can I open multiple items\?/i,
    });
    const secondTrigger = canvas.getByRole('button', {
      name: /How does it work\?/i,
    });
    await waitForVisibility(firstTrigger, true);
    await waitForVisibility(secondTrigger, true);

    // Test independent closing
    await userEvent.click(triggers[0]);
    await waitForExpandedState(triggers[0], false);
    await waitForExpandedState(triggers[1], true);
  },
  render: () => (
    <Accordion className="w-[400px]" type="multiple">
      <AccordionItem value="item-1">
        <AccordionTrigger>Can I open multiple items?</AccordionTrigger>
        <AccordionContent>
          Yes. You can open multiple items at the same time by setting the type
          to "multiple".
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>How does it work?</AccordionTrigger>
        <AccordionContent>
          The multiple type allows multiple items to be expanded at once. Each
          item can be opened and closed independently.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>Is this different from single mode?</AccordionTrigger>
        <AccordionContent>
          Yes. In single mode, opening one item will close any previously opened
          item.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const WithDefaultValue: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test initial state with defaultValue
    const triggers = canvas.getAllByRole('button');
    await waitForExpandedState(triggers[0], false);
    await waitForExpandedState(triggers[1], true);
    await waitForExpandedState(triggers[2], false);

    // Test content visibility
    const defaultContent = canvas.getByText(/expanded by default/);
    await waitForVisibility(defaultContent, true);
  },
  render: () => (
    <Accordion className="w-[400px]" defaultValue="item-2" type="single">
      <AccordionItem value="item-1">
        <AccordionTrigger>First Item</AccordionTrigger>
        <AccordionContent>This item is collapsed by default.</AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>Second Item</AccordionTrigger>
        <AccordionContent>
          This item is expanded by default because its value matches the
          defaultValue prop.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>Third Item</AccordionTrigger>
        <AccordionContent>This item is collapsed by default.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Disabled: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggers = canvas.getAllByRole('button');

    // Test disabled state
    await waitForAttribute(triggers[1], 'disabled', '');
    await waitForClass(triggers[1], 'disabled:opacity-50');

    // Test keyboard navigation skips disabled item
    await userEvent.tab();
    await waitForFocus(null, {
      contentMatch: 'Available Item',
    });

    // Verify disabled item state
    await waitForExpandedState(triggers[1], false);
  },
  render: () => (
    <Accordion collapsible className="w-[400px]" type="single">
      <AccordionItem value="item-1">
        <AccordionTrigger>Available Item</AccordionTrigger>
        <AccordionContent>
          This item can be expanded and collapsed.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger disabled>Disabled Item</AccordionTrigger>
        <AccordionContent>
          This content won't be accessible because the trigger is disabled.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>Available Item</AccordionTrigger>
        <AccordionContent>
          This item can be expanded and collapsed.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const CustomStyling: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const accordion = canvas.getByTestId('custom-accordion');
    const firstTrigger = canvas.getByRole('button', { name: /First Item/i });

    // Test custom classes
    await waitForClass(accordion, 'border-blue-200');
    await waitForClass(firstTrigger, 'text-blue-600');

    // Test interaction maintains styling
    await userEvent.click(firstTrigger);
    await waitForClass(firstTrigger, 'text-blue-600');
    const firstItem = accordion.querySelector('[data-state="closed"]');
    expect(firstItem).toBeTruthy();
  },
  render: () => (
    <Accordion
      className="border-blue-200"
      data-testid="custom-accordion"
      defaultValue="item-1"
      type="single"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-blue-600">
          First Item
        </AccordionTrigger>
        <AccordionContent>First item content</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Second Item</AccordionTrigger>
        <AccordionContent>Second item content</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
