import { Meta, StoryObj } from "@storybook/react";
import Button from "@/components/ui/button";
const meta: Meta = {
  title: "Islets/UI/Button",
  component: Button,
};
export default meta;
type Story = StoryObj<typeof Button>;
export const Template: Story = {
  render: (props) => <Button {...props} />,
  decorators: [
    (Story) => (
      <div className="max-w-[200px] grid items-center">
        <Story />
      </div>
    ),
  ],
  args: {
    children: "Login",
    pending: false,
    success: false,
  },
  argTypes: {
    children: {
      control: {
        type: "text",
      },
    },
    pending: {
      control: {
        type: "boolean",
      },
    },
    success: {
      control: {
        type: "boolean",
      },
    },
  },
};
