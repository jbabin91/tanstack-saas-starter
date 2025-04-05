import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './pagination';

const meta = {
  component: Pagination,
  tags: ['autodocs'],
  title: 'UI/Pagination',
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test navigation elements
    await expect(canvas.getByRole('navigation')).toBeInTheDocument();
    await expect(
      canvas.getByRole('link', { name: /previous/i }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole('link', { name: /next/i }),
    ).toBeInTheDocument();
    await expect(canvas.getAllByRole('link')).toHaveLength(5);

    // Test active page
    const activeLink = canvas.getByRole('link', { name: '2' });
    await expect(activeLink).toHaveAttribute('aria-current', 'page');

    // Test keyboard navigation
    const firstLink = canvas.getByRole('link', { name: /previous/i });
    await userEvent.tab();
    await expect(firstLink).toHaveFocus();

    await userEvent.tab();
    await expect(canvas.getByRole('link', { name: '1' })).toHaveFocus();
  },
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive href="#">
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};

export const WithEllipsis: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test ellipsis presence using screen reader text
    const ellipses = canvas.getAllByText('More pages', {
      selector: '.sr-only',
    });
    await expect(ellipses).toHaveLength(2);

    // Test navigation order
    const links = canvas.getAllByRole('link');
    await expect(links[0]).toHaveAccessibleName(/previous/i);
    await expect(links[links.length - 1]).toHaveAccessibleName(/next/i);

    // Test active page
    const activeLink = canvas.getByRole('link', { name: '5' });
    await expect(activeLink).toHaveAttribute('aria-current', 'page');

    // Test ellipsis structure
    const ellipsisContainers = canvas.getAllByTestId('pagination-ellipsis');
    await expect(ellipsisContainers).toHaveLength(2);
    for (const container of ellipsisContainers) {
      await expect(container).toHaveAttribute('aria-hidden', 'true');
      await expect(container).toHaveAttribute(
        'data-slot',
        'pagination-ellipsis',
      );
    }
  },
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis data-testid="pagination-ellipsis" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">4</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive href="#">
            5
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">6</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis data-testid="pagination-ellipsis" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">10</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};

export const Disabled: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test total number of links
    const allLinks = canvas.getAllByRole('link');
    await expect(allLinks).toHaveLength(4);

    // Test disabled links (Previous, 2, Next)
    const disabledLinks = allLinks.filter(
      (link) => link.getAttribute('aria-disabled') === 'true',
    );
    await expect(disabledLinks).toHaveLength(3);

    // Test active page (1)
    const activeLink = canvas.getByRole('link', { name: '1' });
    await expect(activeLink).toHaveAttribute('aria-current', 'page');
    await expect(activeLink).not.toHaveAttribute('aria-disabled');

    // Test ARIA attributes
    await expect(canvas.getByRole('navigation')).toHaveAttribute(
      'aria-label',
      'pagination',
    );
  },
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            aria-disabled="true"
            className="pointer-events-none opacity-50"
            href="#"
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive href="#">
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            aria-disabled="true"
            className="pointer-events-none opacity-50"
            href="#"
          >
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            aria-disabled="true"
            className="pointer-events-none opacity-50"
            href="#"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};
