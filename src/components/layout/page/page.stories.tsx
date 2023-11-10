import { Meta, StoryObj } from '@storybook/react';
import { PageContent, PageHeader, PageHeaderSkeleton, Page } from '.';
const meta = {
    title: 'Layout/Page',
    component: Page
} as Meta;
export default meta;
type Story = StoryObj<typeof Page>;

export const WithHeader: Story = {
    render: () => <Page>
        <PageHeader>
        </PageHeader>
    </Page>
};
export const WithHeaderAndContent: Story = {
    render: () => <Page>
        <PageHeader>
        </PageHeader>
        <PageContent>
            <div className='rounded-lg shadow-md p-4'>
                <p className='text-gray-500'>Storybook content</p>
            </div>
        </PageContent>
    </Page>
};