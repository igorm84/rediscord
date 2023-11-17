import {Meta, StoryObj} from "@storybook/react"
import GoBackBtn from "."

const meta = {
    title: "Islets/GoBackBtn",
    component: GoBackBtn,
    } as Meta
    export default meta;
type Story = StoryObj<typeof GoBackBtn>
export const Default: Story = {
    render: () => <GoBackBtn />,
    decorators: [ 
        (Story) => (
            <div className="relative bg-gray-800">
                <Story />
            </div>
        ),
    ],
    argTypes: {
        containerClassName: {
            control: {
                type: "text"
            }
        },
        buttonClassName: {
            control: {
                type: "text"
            }
        },
    },
}