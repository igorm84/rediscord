import { Meta, StoryObj } from "@storybook/react";
import NavBar from ".";
const meta = {
  title: "Layout/Mobile/Navbar",
  component: NavBar,
} as Meta;
export default meta;
type Story = StoryObj<typeof NavBar>;
export const Template: Story = {
  render: () => <NavBar />,
};
