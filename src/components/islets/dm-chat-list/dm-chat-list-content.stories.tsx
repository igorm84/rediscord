import {Meta, StoryObj} from "@storybook/react";
import DMChatListContent from "./dm-chat-list-content";
import { generateRandomFakeChats } from "@/lib/utils/mock";
const meta  = {
    component: DMChatListContent,
    title: 'Islets/DMChatListContent',
} as Meta;
export default meta;
type Story = StoryObj<typeof DMChatListContent>;
export const Default: Story = {
    render: (props) => <DMChatListContent {...props} />,
    args: {
       channels:  generateRandomFakeChats(10),
    },
    argTypes: {
        channels: {
            control: {
                type: "object",
            },
        },
    },
    parameters: {
        nextjs: {
            appDirectory: true,
        },
    },
};