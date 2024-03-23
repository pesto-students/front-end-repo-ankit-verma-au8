import type { Meta, StoryObj } from "@storybook/react";

import ChartComponent from "./index";

const meta = {
  title: "Example/BarChart",
  component: ChartComponent,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ChartComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Chart: Story = {
  args: {
    data: [
      {
        startDate: "2024-03-23",
        endDate: "2024-03-23",
        data: [],
      },
    ],
  },
};
