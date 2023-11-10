import type { Meta, StoryObj } from '@storybook/react';
import MessageItem from '.';

const meta: Meta<typeof MessageItem> = {
    component: MessageItem,
    title: 'Islets/MessageItem',
};

export default meta;
type Story = StoryObj<typeof MessageItem>;

export const Default: Story = {
    render: (props) => (
        <MessageItem
            {...props}
        />
    ),
    args: {
        id: "1",
        authorAvatar: "https://i.pravatar.cc/150?img=1",
        authorNickname: "John Doe",
        message: "Hello, world!",
        timestamp: Date.now(),
    },
};