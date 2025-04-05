import type { Meta, StoryObj } from '@storybook/react';
import { expect, waitFor } from '@storybook/test';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import {
  ChartContainer,
  ChartLegendContent,
  ChartTooltipContent,
} from './chart';

// Sample data
const lineData = [
  { name: 'Jan', revenue: 2400, sales: 400 },
  { name: 'Feb', revenue: 1398, sales: 300 },
  { name: 'Mar', revenue: 4000, sales: 600 },
  { name: 'Apr', revenue: 3908, sales: 800 },
  { name: 'May', revenue: 2800, sales: 500 },
  { name: 'Jun', revenue: 3800, sales: 700 },
];

const barData = [
  { amt: 2400, name: 'Page A', pv: 2400, uv: 4000 },
  { amt: 2210, name: 'Page B', pv: 1398, uv: 3000 },
  { amt: 2290, name: 'Page C', pv: 9800, uv: 2000 },
  { amt: 2000, name: 'Page D', pv: 3908, uv: 2780 },
];

const pieData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const areaData = [
  { amt: 2400, name: 'Jan', pv: 2400, uv: 4000 },
  { amt: 2210, name: 'Feb', pv: 1398, uv: 3000 },
  { amt: 2290, name: 'Mar', pv: 9800, uv: 2000 },
  { amt: 2000, name: 'Apr', pv: 3908, uv: 2780 },
  { amt: 2181, name: 'May', pv: 4800, uv: 1890 },
  { amt: 2500, name: 'Jun', pv: 3800, uv: 2390 },
];

const chartConfig = {
  'Group A': {
    label: 'Group A',
    theme: {
      dark: '#3B82F6', // blue-500
      light: '#3B82F6',
    },
  },
  'Group B': {
    label: 'Group B',
    theme: {
      dark: '#10B981', // emerald-500
      light: '#10B981',
    },
  },
  'Group C': {
    label: 'Group C',
    theme: {
      dark: '#F59E0B', // amber-500
      light: '#F59E0B',
    },
  },
  'Group D': {
    label: 'Group D',
    theme: {
      dark: '#EF4444', // red-500
      light: '#EF4444',
    },
  },
  amt: {
    label: 'AMT',
    theme: {
      dark: '#EC4899', // pink-500
      light: '#EC4899',
    },
  },
  pv: {
    label: 'PV',
    theme: {
      dark: '#8B5CF6', // violet-500
      light: '#8B5CF6',
    },
  },
  revenue: {
    label: 'Revenue',
    theme: {
      dark: '#10B981', // emerald-500
      light: '#10B981',
    },
  },
  sales: {
    label: 'Sales',
    theme: {
      dark: '#6366F1', // indigo-500
      light: '#6366F1',
    },
  },
  uv: {
    label: 'UV',
    theme: {
      dark: '#3B82F6', // blue-500
      light: '#3B82F6',
    },
  },
};

const meta: Meta<typeof ChartContainer> = {
  component: ChartContainer,
  decorators: [
    (Story) => (
      <div className="bg-background h-[400px] w-[600px] rounded-md border p-4">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/Chart',
};

export default meta;
type Story = StoryObj<typeof ChartContainer>;

export const LineChartDemo: Story = {
  render: () => (
    <ChartContainer config={chartConfig}>
      <LineChart
        data={lineData}
        margin={{ bottom: 10, left: 0, right: 10, top: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<ChartTooltipContent />} />
        <Legend content={<ChartLegendContent />} />
        <Line
          activeDot={{ r: 6 }}
          dataKey="sales"
          stroke="var(--color-sales)"
          strokeWidth={2}
          type="monotone"
        />
        <Line
          dataKey="revenue"
          stroke="var(--color-revenue)"
          strokeWidth={2}
          type="monotone"
        />
      </LineChart>
    </ChartContainer>
  ),
};

export const BarChartDemo: Story = {
  render: () => (
    <ChartContainer config={chartConfig}>
      <BarChart
        data={barData}
        margin={{ bottom: 10, left: 0, right: 10, top: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<ChartTooltipContent />} />
        <Legend content={<ChartLegendContent />} />
        <Bar dataKey="pv" fill="var(--color-pv)" />
        <Bar dataKey="uv" fill="var(--color-uv)" />
      </BarChart>
    </ChartContainer>
  ),
};

export const PieChartDemo: Story = {
  play: async ({ canvasElement }) => {
    // Wait for chart to be ready
    await waitFor(
      () => {
        const sectors = canvasElement.querySelectorAll('.recharts-pie-sector');
        expect(sectors.length).toBe(pieData.length);
      },
      { timeout: 2000 },
    );

    // Additional assertions after sectors are found
    const legend = canvasElement.querySelector('.recharts-legend-wrapper');
    expect(legend).toBeTruthy();

    // Verify the SVG surface
    const svg = canvasElement.querySelector('.recharts-surface');
    expect(svg).toBeTruthy();
    expect(svg?.tagName.toLowerCase()).toBe('svg');
  },
  render: () => (
    <ChartContainer config={chartConfig}>
      <PieChart margin={{ bottom: 10, left: 10, right: 10, top: 10 }}>
        <Pie
          cx="50%"
          cy="50%"
          data={pieData}
          dataKey="value"
          labelLine={false}
          outerRadius={80}
        >
          {pieData.map((entry) => (
            <Cell
              key={`cell-${entry.name}`}
              fill={`var(--color-${entry.name.replace(/\s+/g, '-')})`}
            />
          ))}
        </Pie>
        <Tooltip content={<ChartTooltipContent />} />
        <Legend content={<ChartLegendContent />} />
      </PieChart>
    </ChartContainer>
  ),
};

export const AreaChartDemo: Story = {
  render: () => (
    <ChartContainer config={chartConfig}>
      <AreaChart
        data={areaData}
        margin={{ bottom: 10, left: 0, right: 30, top: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<ChartTooltipContent />} />
        <Legend content={<ChartLegendContent />} />
        <Area
          dataKey="uv"
          fill="var(--color-uv)"
          fillOpacity={0.6}
          stackId="1"
          stroke="var(--color-uv)"
          type="monotone"
        />
        <Area
          dataKey="pv"
          fill="var(--color-pv)"
          fillOpacity={0.6}
          stackId="1"
          stroke="var(--color-pv)"
          type="monotone"
        />
      </AreaChart>
    </ChartContainer>
  ),
};

export const ResponsiveChartDemo: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <ChartContainer className="h-[200px]" config={chartConfig}>
        <LineChart
          data={lineData}
          margin={{ bottom: 10, left: 0, right: 10, top: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<ChartTooltipContent />} />
          <Legend content={<ChartLegendContent />} />
          <Line
            dataKey="sales"
            stroke="var(--color-sales)"
            strokeWidth={2}
            type="monotone"
          />
        </LineChart>
      </ChartContainer>
      <ChartContainer className="h-[200px]" config={chartConfig}>
        <BarChart
          data={barData}
          margin={{ bottom: 10, left: 0, right: 10, top: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<ChartTooltipContent />} />
          <Legend content={<ChartLegendContent />} />
          <Bar dataKey="pv" fill="var(--color-pv)" />
        </BarChart>
      </ChartContainer>
    </div>
  ),
};

// Theme config example with light/dark theme colors
const themeConfig = {
  revenue: {
    label: 'Revenue',
    theme: {
      // emerald-500
      dark: '#34D399',
      light: '#10B981', // emerald-400
    },
  },
  sales: {
    label: 'Sales',
    theme: {
      // indigo-500
      dark: '#818CF8',
      light: '#6366F1', // indigo-400
    },
  },
};

export const ThemedChartDemo: Story = {
  render: () => (
    <ChartContainer config={themeConfig}>
      <LineChart
        data={lineData}
        margin={{ bottom: 10, left: 0, right: 10, top: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<ChartTooltipContent />} />
        <Legend content={<ChartLegendContent />} />
        <Line
          dataKey="sales"
          stroke="var(--color-sales)"
          strokeWidth={2}
          type="monotone"
        />
        <Line
          dataKey="revenue"
          stroke="var(--color-revenue)"
          strokeWidth={2}
          type="monotone"
        />
      </LineChart>
    </ChartContainer>
  ),
};
