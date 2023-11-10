import {Meta, StoryObj} from "@storybook/react";
import DMLayoutSkeleton from "./dm-layout-skeleton";

const meta = {
    component: DMLayoutSkeleton,
    title: 'Islets/DMLayoutSkeleton',
} as Meta;
export default meta;
type Story = StoryObj<typeof DMLayoutSkeleton>;
export const Default: Story = {
    render: () => <DMLayoutSkeleton />,
    args: {
    },
    argTypes: {
    },

};