import { render, screen } from '@testing-library/react';
import Meta, {Default}  from "@/components/islets/message-list/message-list.stories";
import {composeStory} from "@storybook/react";

const DefaultStory = composeStory(Default, Meta);
describe('MessageList', () => {
    it('should render message list', () => {
        render(<DefaultStory />);
        expect(screen.getByText('Hello, world!')).toBeInTheDocument();
    });
    it('should render greeting message', () => {
        render(<DefaultStory greetingMessageElement={<div>greeting message</div>} />);
        expect(screen.getByText('greeting message')).toBeInTheDocument();
    });
})