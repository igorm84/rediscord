import { Meta, StoryObj } from "@storybook/react";

import Page from "./page";

const meta: Meta = {
  title: "Pages/UserSettings",
  component: Page,
};
export default meta;
type Story = StoryObj<typeof Page>;
export const Template: Story = {
  render: (props) => <Page  />,
  args: {
    open: true,
  },
  argTypes: {
    open: {
      control: {
        type: "boolean",
      },
    },
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};
