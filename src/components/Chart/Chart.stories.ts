import type { Meta, StoryObj } from "@storybook/react";

import ChartComponent from "./index";

const meta = {
  title: "Example/Chart",
  component: ChartComponent,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ChartComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Chart: Story = {};
