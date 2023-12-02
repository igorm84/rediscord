import { Meta, StoryObj } from "@storybook/react";
import AuthButton from "./auth-button";

const meta: Meta = {
  title: "Islets/Auth/AuthButton",
  component: AuthButton,
};
export default meta;
type Story = StoryObj<typeof AuthButton>;
export const Template: Story = {
  render: (props) => <AuthButton {...props} />,
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
