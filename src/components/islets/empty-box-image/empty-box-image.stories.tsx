import { Meta, StoryObj } from "@storybook/react";
import { EmptyBox } from ".";
const meta = {
    component: EmptyBox,
    title: "Islets/EmptyBox",
} as Meta;
export default meta;
type Story = StoryObj<typeof EmptyBox>;
export const Default: Story = {
    render: (props) => <EmptyBox {...props} />,
    args: {
        alt: "empty-box",
        src: "https://via.placeholder.com/150",
        text: "This is an empty box",
    },
    argTypes: {
        alt: {
            control: {
                type: "text",
            },
        },
        src: {
            control: {
                type: "text",
            },
        },
        text: {
            control: {
                type: "text",
            },
        },
    },

};