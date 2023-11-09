import { Meta, StoryObj } from "@storybook/react";
import ActiveNowPanel from "."
import { useFriendStore } from "@/state/friend-list";
import { User } from "@/lib/entities/user";
import { ActivityTypes } from "@/lib/entities/activity";


const meta = {
    component: ActiveNowPanel,
    title: 'Islets/ActiveNowPanel',
    decorators: [
        (Story) => {
            useFriendStore.setState({ friends: null })
            useFriendStore.setState({
                friends: [
                    {
                        id: "1",
                        avatar: "https://avatars.githubusercontent.com/u/1?v=4",
                        name: "mojombo",
                        username: "mojombo",
                        status: "online",
                        type: "user",
                        activity: {
                            type: ActivityTypes.Playing,
                            name: "Playing",
                        },
                    } as User,
                ]
            })
            return <Story />
        },
    ],
} as Meta;

export default meta;
type Story = StoryObj<typeof ActiveNowPanel>;
export const Default: Story = {
    render: () => <ActiveNowPanel />,
    args: {},
};