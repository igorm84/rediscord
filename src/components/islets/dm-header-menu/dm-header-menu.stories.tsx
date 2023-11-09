import { Meta, StoryObj } from "@storybook/react";
import DMHeaderMenu from ".";
const meta = {
    component: DMHeaderMenu,
    title: 'Islets/DMHeaderMenu',
} as Meta;
export default meta;
type Story = StoryObj<typeof DMHeaderMenu>;
export const Default: Story = {
    render: () => <div className="max-w-[400px]"><DMHeaderMenu /></div>,
    args: {
    },
    argTypes: {
    },
};