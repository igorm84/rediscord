import { render, screen } from '@testing-library/react';
import {userEvent} from '@testing-library/user-event';
import Meta, { Default } from "@/components/islets/search-modal/search-modal.stories";
import { composeStory } from "@storybook/react";

const DefaultStory = composeStory(Default, Meta);
describe('SearchModal', () => {
    it('should render search modal and close it', async () => {
        render(<DefaultStory defaultOpen />);
        await userEvent.type(screen.getByRole("search-dialog-content"), "{esc}"); 
        setTimeout(() => expect(screen.getByRole("search-dialog-content")).not.toBeInTheDocument())
    });
    it('should render search modal with default open', () => {
        render(<DefaultStory defaultOpen={true} />);
        expect(screen.getByRole("search-dialog-content")).toBeInTheDocument();
    });
    it('should render search modal with default close', () => {
        render(<DefaultStory defaultOpen={false} />);
        expect(screen.queryByRole("search-dialog-content")).not.toBeInTheDocument();
    })
})