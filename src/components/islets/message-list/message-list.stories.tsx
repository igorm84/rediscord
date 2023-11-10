import type { Meta, StoryObj } from '@storybook/react';
import MessageList from '.';
import { Message } from '@/lib/entities/message';
import EmptyChannel from '../server-channel-content/empty-channel';
const messages: Message[] = [
    {
        id: '1',
        authorAvatar: 'https://i.pravatar.cc/150?img=1',
        authorNickname: 'John Doe',
        message: 'Hello, world!',
        timestamp: Date.now(),
    },
];
const meta: Meta<typeof MessageList> = {
    component: MessageList,
    title: 'Islets/MessageList',
};

export default meta;
type Story = StoryObj<typeof MessageList>;

export const Default: Story = {
    render: (props) => <MessageList {...props} />,
    args: {
        messageList: messages,
    },
    argTypes: {
        greetingMessageElement: {
            control: {
                type: 'reactnode',
            },
        },
    }
};
export const WithGreetingMessage: Story = {
    render: (props) => <MessageList {...props} />,
    args: {
        messageList: messages,
        greetingMessageElement: <EmptyChannel channelTitle='Storybbok' icon='text' />,
    },
    argTypes: {
        greetingMessageElement: {
            control: {
                type: 'reactnode',
            },
        },
    }
};