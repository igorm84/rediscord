import { Meta, StoryObj } from '@storybook/react';
import RightHeaderContent, {HeaderMenuPopover} from './right-header-content';

const meta: Meta<typeof RightHeaderContent> = {
    component: RightHeaderContent,
    title: 'Islets/RightHeaderContent',
};
export default meta;
type Story = StoryObj<typeof RightHeaderContent>;
export const Template: Story = {
    render: (props) => <RightHeaderContent />,
    args: {

    },
    argTypes: {

    },
};
export const HeaderMenuButton: Story = {
    render: (props) => <HeaderMenuPopover />,
    args: {

    },
    argTypes: {

    },
};