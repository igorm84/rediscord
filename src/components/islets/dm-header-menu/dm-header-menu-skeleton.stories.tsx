import { Meta, StoryObj } from "@storybook/react";
import DMHeaderMenuSkeleton from "./dm-header-menu-skeleton";
const meta = {
    component: DMHeaderMenuSkeleton,
    title: 'Islets/DMHeaderMenuSkeleton',
} as Meta;
export default meta;
type Story = StoryObj<typeof DMHeaderMenuSkeleton>;
export const Default: Story = {
    render: () => <div className="max-w-[400px]"><DMHeaderMenuSkeleton /></div>,
    args: {
    },
    argTypes: {
    },
};