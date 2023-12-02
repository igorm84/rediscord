import { Meta, StoryObj } from "@storybook/react";

import Page from "./page";

const meta: Meta = {
  title: "Pages/UserSettings",
  component: Page,
};
export default meta;
type Story = StoryObj<typeof Page>;
export const Template: Story = {
  render: Page,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};
