import type { Meta, StoryObj } from "@storybook/react";

import SignupFormComponent from "./index";

const meta = {
  title: "Example/SignupForm",
  component: SignupFormComponent,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof SignupFormComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SignupForm: Story = {};
