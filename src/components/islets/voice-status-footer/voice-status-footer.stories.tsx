import { Meta, StoryObj } from '@storybook/react';
import VoiceStatusFooter from '.';
const meta: Meta<typeof VoiceStatusFooter> = {
    component: VoiceStatusFooter,
    title: 'Islets/VoiceStatusFooter',
};
export default meta;
type Story = StoryObj<typeof VoiceStatusFooter>;
export const Default: Story = {
    render: (props) => <div className='max-w-[290px]'><VoiceStatusFooter /></div>,
    args: {
    },
    argTypes: {

    },
};