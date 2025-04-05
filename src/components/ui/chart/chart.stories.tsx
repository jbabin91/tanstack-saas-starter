import type { Meta, StoryObj } from '@storybook/react';
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
  'Group A': { color: '#3B82F6' },
  // blue-500
  'Group B': { color: '#10B981' },

  // emerald-500
  'Group C': { color: '#8B5CF6' },

  // violet-500
  'Group D': { color: '#EC4899' },

  amt: {
    color: '#EC4899',
    label: 'AMT', // pink-500
  },

  pv: {
    color: '#8B5CF6',
    label: 'PV', // violet-500
  },

  revenue: {
    color: '#10B981',
    label: 'Revenue', // emerald-500
  },

  sales: {
    color: '#6366F1',
    label: 'Sales', // indigo-500
  },
  uv: {
    color: '#3B82F6',
    label: 'UV', // blue-500
  }, // pink-500
};

const meta: Meta<typeof ChartContainer> = {
  component: ChartContainer,
  decorators: [
    (Story) => (
      <div className="h-[400px] w-[600px] rounded-md border bg-white p-4">
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
  render: () => (
    <ChartContainer config={chartConfig}>
      <PieChart margin={{ bottom: 10, left: 10, right: 10, top: 10 }}>
        <Pie
          cx="50%"
          cy="50%"
          data={pieData}
          dataKey="value"
          fill="#8884d8"
          labelLine={false}
          outerRadius={80}
        >
          {pieData.map((entry) => (
            <Cell
              key={`cell-${entry.name}`}
              fill={`var(--color-${entry.name})`}
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
