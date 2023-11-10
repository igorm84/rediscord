import {Meta, StoryObj} from '@storybook/react';
import ServerChannelItem from './server-channel-item';

const meta: Meta<typeof ServerChannelItem> = {
    title: 'Islets/ServerSidebar/ServerChannelItem',
    component: ServerChannelItem,
};
export default meta;
type Story = StoryObj<typeof ServerChannelItem>;
export const Template: Story = {
    render: (props) => <ServerChannelItem {...props} />,
    args: {
        type: 'text',
        active: false,
        title: 'general',
        onClick: () => {},
    },
    argTypes: {
        type: {
            control: {
                type: 'select',
                options: ['text', 'voice'],
            },
        },
        active: {
            control: {
                type: 'boolean',
            },
        },
        onClick: {
            action: 'clicked',
        },
        title: {
            control: {
                type: 'text',
            },
        },
    },
};