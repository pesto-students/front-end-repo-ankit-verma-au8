import type { Meta, StoryObj } from "@storybook/react";

import LoginForm from "./index";

const meta = {
  title: "Example/LoginForm",
  component: LoginForm,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof LoginForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LoginForm: Story = {};
