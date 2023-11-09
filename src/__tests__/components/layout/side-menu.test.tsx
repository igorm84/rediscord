import { render, waitFor } from '@testing-library/react';
import { composeStory } from "@storybook/react";
import Meta, { Template } from "@/components/layout/sidemenu/side-menu.stories";
import { generateRandomFakeServers } from '@/lib/utils/mock';
import userEvent from '@testing-library/user-event';

const Sidemenu = composeStory(Template, Meta);

describe('Sidemenu', () => {
    it('should render sidemenu with proper count of servers', async () => {
        const element = render(<Sidemenu servers={generateRandomFakeServers(10)} />);
        expect(element.getAllByTestId("side-menu-item").length)
            .toBe(10); // have to be 11, but 1 is always active and 
                       // only unactive servers has side-menu-item id.
    });
    it("should render proper active server", async () => {
        const element = render(<Sidemenu servers={generateRandomFakeServers(10)} />);
        const servers = element.getAllByTestId("side-menu-item");
        // pick random server
        const server = servers[Math.floor(Math.random() * servers.length)];
        const prevActiveServer = element.getByTestId("side-menu-active-item");
        await userEvent.click(server);
        await waitFor(() => {
            expect(element.getByTestId("side-menu-active-item")).not.toBe(prevActiveServer);
            expect(server).toBe(element.getByTestId("side-menu-active-item"));
        })
    })
})