import type { Meta, StoryObj } from "@storybook/react";

import LoginFormComponent from "./index";

const meta = {
  title: "Example/LoginForm",
  component: LoginFormComponent,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof LoginFormComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LoginForm: Story = {};
