import { Meta, StoryObj } from '@storybook/react';
import SearchModal from '.';
const meta: Meta<typeof SearchModal> = {
    component: SearchModal,
    title: 'Islets/SearchModal',
};
export default meta;
type Story = StoryObj<typeof SearchModal>;
export const Default: Story = {
    render: (props) => <SearchModal {...props} />,
    args: {
        defaultOpen: false
    },
    argTypes: {
        defaultOpen: {
            control: {
                type: 'boolean',
            },
        },
    },
};