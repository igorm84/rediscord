import { Meta, StoryObj } from "@storybook/react"
import FriendList, { FriendListProps } from "."
import { UserStatuses } from "@/lib/entities/user";
import FriendsTabGroup from "../friends-tab-group";
import FriendListSkeleton from "./friend-list-skeleton";

const meta = {
    component: FriendList,
    title: 'Islets/FriendList',
} as Meta;

export default meta;
const args: FriendListProps = {
    friends: [{ status: UserStatuses.Idle, name: "John Doe", id: "1", avatar: "https://i.pravatar.cc/150?img=3&quot;", username: "johndoe", type: "user" }],
    friendRequests: [{ status: UserStatuses.Offline, name: "semen", id: "1", avatar: "https://i.pravatar.cc/150?img=4&quot;", username: "kyeilie", type: "user" }],
    blockedFriends: [{ status: UserStatuses.Online, name: "petro", id: "1", avatar: "https://i.pravatar.cc/150?img=5&quot;", username: "pivozavr", type: "user" }],
}
const argTypes = {
    friends: { control: { type: 'object' } },
    friendRequests: { control: { type: 'object' } },
    blockedFriends: { control: { type: 'object' } },
}
type Story = StoryObj<typeof FriendList>;
export const Template: Story = {
    render: (props) => <FriendList {...props} />,
    args,
    argTypes
}
export const WithTabGroup: Story = {
    render: (props) => <FriendList {...props} />,
    decorators: [
        (Story) => (
            <div className="flex flex-col h-screen gap-5">
                <FriendsTabGroup friendRequestsCount={5} />
                <Story />
            </div>
        ),
    ],
    args,
    argTypes
}
export const Skeleton: Story = {  
    render: () => <FriendListSkeleton  />,
}