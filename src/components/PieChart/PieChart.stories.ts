import type { Meta, StoryObj } from "@storybook/react";

import ChartComponent from "./index";

const meta = {
  title: "Example/PieChart",
  component: ChartComponent,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ChartComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Chart: Story = {
  args: {
    categories: ["Utilties", "Entertainment", "Food", "Medical Bills"],
    chartData: [1, 2, 3, 5],
  },
};
