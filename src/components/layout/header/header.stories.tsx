import {Meta, StoryObj} from '@storybook/react';
import Header from '.';
const meta: Meta<typeof Header> = {
    title: 'Layout/Header',
    component: Header,
};
export default meta;
type Story = StoryObj<typeof Header>;
export const Template: Story = {
    render: (props) => <Header {...props} />,
    args: {
    },
    argTypes: {
    },
};