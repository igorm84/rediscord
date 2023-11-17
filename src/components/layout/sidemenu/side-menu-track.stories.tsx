import {Meta, StoryObj} from '@storybook/react';
import ServerMenuTrack from "./side-menu-track"
import { generateRandomFakeServers } from '@/lib/utils/mock';
import SideMenuSkeleton from './side-menu-skeleton';

const meta = {
    component: ServerMenuTrack,
    title: 'Layout/SideMenuTrack',
} as Meta;
export default meta;
type Story = StoryObj<typeof ServerMenuTrack>;
export const Template: Story = {
    render: (props) => <ServerMenuTrack {...props} />,
    args: {
    servers: generateRandomFakeServers(10),
    },
    argTypes: {
        servers: {
            control: {
                type: 'object',
            },
        },
    },
}
export const Skeleton: Story = {
    render: () => <SideMenuSkeleton />,
}