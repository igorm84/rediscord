import { Meta, StoryObj } from "@storybook/react";
import InputMessageBox from ".";
const meta = {
    component: InputMessageBox,
    title: 'Islets/InputMessageBox',
    decorators: [
        Story => {
            return (
                <div className="grid items-end min-h-screen pb-20">
                    <Story />
                </div>)
        }
    ],
} as Meta;

export default meta;

type Story = StoryObj<typeof InputMessageBox>;

export const Default: Story = {
    render: () => <InputMessageBox />,
    args: {
    },
    argTypes: {

    },

};