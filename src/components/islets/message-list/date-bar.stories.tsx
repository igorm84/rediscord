import {Meta, StoryObj} from '@storybook/react';
import DateBar from './date-bar';
import dayjs from 'dayjs';

const meta: Meta<typeof DateBar> = {
    component: DateBar,
    title: 'Islets/DateBar',
};
export default meta;
type Story = StoryObj<typeof DateBar>;
export const DateBarTemplate: Story = {
    render: (props) => <DateBar {...props} />,
    args: {
        date: dayjs().format('DD MMM YYYY'),
    },
    argTypes: {
        date: {
            control: {
                type: 'date',
            },
        },
    },
};