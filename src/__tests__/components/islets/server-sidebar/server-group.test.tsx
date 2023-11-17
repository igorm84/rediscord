import Meta, { Template } from "@/components/islets/server-sidebar/server-group.stories";
import { Channel } from "@/lib/entities/channel";
import { useViewportType } from "@/state/viewport-type";
import { composeStory } from "@storybook/react";
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// mock usePathname, useRouter hook
jest.mock("next/navigation", () => ({
    usePathname: () => "/",
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

const TemplateStory = composeStory(Template, Meta);
describe('ServerGroup', () => {
    const channelList: Channel[] = [
        {
            id: '1',
            type: 'text',
            title: 'general',
            slug: 'general',
        },
        {
            id: '2',
            type: 'voice',
            title: 'general',
            slug: 'general',
        },

    ]
    it('should render server group and show server list', async () => {
        const element = render(<TemplateStory />);
        await userEvent.click(element.getByTestId("channel-group"));
        await waitFor(() => expect(element.getByTestId("channel-list")).not.toHaveStyle("height:0px"));
    });
    it('should render server group and make it "active"', async () => {
        const element = render(<TemplateStory />);
        await userEvent.click(element.getByTestId("channel-group"));
        waitFor(() => expect(element.getByTestId("channel-group-icon")).not.toHaveClass("rotate-180"))
    });
    it("should render server group and change channel", async () => {
        const element = render(<TemplateStory channelList={channelList} />);
        await userEvent.click(element.getByTestId("channel-group"));
        const channelItem = element.getByTestId("channel-list").firstElementChild as Element;
        await userEvent.click(channelItem);
        waitFor(() => {
            expect(channelItem).toHaveClass("bg-zinc-700 text-white");
        })
    })
    it("should render server group with proper count of channels", async () => {
        const element = render(<TemplateStory channelList={channelList} />);
        const elementWithoutChannels = render(<TemplateStory />); 
        waitFor(() => {
            expect(element.getByTestId("channel-list").children.length).toBe(channelList.length);
            expect(elementWithoutChannels.getByTestId("channel-list").children.length).toBe(0);
        })
    })
    
})
