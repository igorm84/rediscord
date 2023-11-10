import { Meta, StoryObj } from "@storybook/react";
import { MessageTypeEmojiBtn, MessageTypeItemBtn } from "./message-type-item-btn";
import { AiFillGift } from "react-icons/ai";

const meta = {
    component: MessageTypeItemBtn,
    title: 'Islets/MessageTypeItemBtn',

} as Meta;
export default meta;
type Story = StoryObj<typeof MessageTypeItemBtn>;
export const Default: Story = {
    render: (props) => <MessageTypeItemBtn {...props} />,
    args: {
        children:
            <AiFillGift fontSize={24} />
        ,
    },
    argTypes: {
    },

};
export const Emoji: Story = {
    render: () => <MessageTypeEmojiBtn />,
    args: {
    },
    argTypes: {
    },

};