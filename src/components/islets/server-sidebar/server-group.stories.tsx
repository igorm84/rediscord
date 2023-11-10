import { Meta, StoryObj } from '@storybook/react';
import ServerGroup from './server-group';

const meta: Meta<typeof ServerGroup> = {
    component: ServerGroup,
    title: 'Islets/ServerGroup',
};
export default meta;
type Story = StoryObj<typeof ServerGroup>;
export const Template: Story = {
    render: (props) => <div className='max-w-[250px]'><ServerGroup {...props} /></div>,
    args: {
        groupTitle: 'General',
        channelList: [
            {
                id: "1",
                slug: "general",
                type: 'text',
                title: 'general',
            },
        ],
    },
    argTypes: {
        groupTitle: {
            control: {
                type: 'text',
            },
        },
        channelList: {
            control: {
                type: 'array',
            },
        },
    },
    parameters: {
        nextjs: {
          appDirectory: true,
        },
      },
};