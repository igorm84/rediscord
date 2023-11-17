import { Meta, StoryObj } from "@storybook/react"
import LoadingScreen from "."

const meta = {
    title: "Islets/LoadingScreen",
    component: LoadingScreen,
} as Meta
export default meta;
type Story = StoryObj<typeof LoadingScreen>;

export const Template: Story = {
    render: () => <LoadingScreen />,
}