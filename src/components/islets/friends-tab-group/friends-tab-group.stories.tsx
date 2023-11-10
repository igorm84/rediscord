import {Meta, StoryObj} from "@storybook/react";
import FriendsTabGroup from ".";
const meta = {
    component: FriendsTabGroup,
    title: 'Islets/FriendsTabGroup',
} as Meta;
export default meta;
type Story = StoryObj<typeof FriendsTabGroup>;
export const Template: Story = {
    render: () => <FriendsTabGroup friendRequestsCount={5} />,
};