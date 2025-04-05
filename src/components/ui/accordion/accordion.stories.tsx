import type { Meta, StoryObj } from '@storybook/react';

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
  tags: ['autodocs'],
  title: 'UI/Accordion',
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
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
          Yes. It comes with default styles that match the other components'
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
  render: () => (
    <Accordion collapsible className="w-[400px]" type="single">
      <AccordionItem
        className="mb-2 rounded-lg border border-blue-200 px-4"
        value="item-1"
      >
        <AccordionTrigger className="text-blue-600 hover:text-blue-800">
          Custom Styled Accordion
        </AccordionTrigger>
        <AccordionContent className="text-blue-700">
          This accordion item has custom styling applied using Tailwind classes.
          You can customize the appearance of all accordion elements.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        className="mb-2 rounded-lg border border-green-200 px-4"
        value="item-2"
      >
        <AccordionTrigger className="text-green-600 hover:text-green-800">
          Another Custom Style
        </AccordionTrigger>
        <AccordionContent className="text-green-700">
          Different color scheme for this accordion item to demonstrate
          flexibility.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
