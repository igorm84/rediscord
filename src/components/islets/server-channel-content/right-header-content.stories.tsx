import { Meta, StoryObj } from "@storybook/react";
import RightHeaderContent from "./right-header-content";
import BurgerMenu from "@/components/ui/burger";
const meta: Meta<typeof RightHeaderContent> = {
  component: RightHeaderContent,
  title: "Islets/RightHeaderContent",
};
export default meta;
type Story = StoryObj<typeof RightHeaderContent>;
export const Template: Story = {
  render: (props) => <RightHeaderContent />,
  args: {},
  argTypes: {},
};
export const HeaderMenuButton: Story = {
  render: (props) => <BurgerMenu>text </BurgerMenu>,
};
