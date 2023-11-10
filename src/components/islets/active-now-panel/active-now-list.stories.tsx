import { Meta, StoryObj } from "@storybook/react";
import ActiveNowList from "./active-now-list";
import { User } from "@/lib/entities/user";
import { ActivityTypes } from "@/lib/entities/activity";

const meta = {
    component: ActiveNowList,
    title: 'Islets/ActiveNowList',
} as Meta;
export default meta;
type Story = StoryObj<typeof ActiveNowList>;
export const Default: Story = {
    render: (props) => <ActiveNowList {...props} />,
    args: {
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
    },
    argTypes: {
        friends: {
            control: {
                type: "object",
            },
        },
    },
};