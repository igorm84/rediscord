import { render, waitFor } from "@testing-library/react";

import { composeStory } from "@storybook/react";
import Meta, { Emoji, Default } from "@/components/islets/input-message-box/message-type-btn.stories";
import userEvent from "@testing-library/user-event";

const DefaultStory = composeStory(Default, Meta);
const EmojiStory = composeStory(Emoji, Meta);

describe('MessageTypeItemBtn', () => {
    it('should render icon as children', () => {
        const iconToRender = <div data-testid="icon-to-render"></div>;
        const element = render(<DefaultStory>{iconToRender}</DefaultStory>);
        expect(element.getByTestId("icon-to-render")).toBeTruthy();
    })
    it('emoji button should change emoji on hover', async () => {
        const element = render(<EmojiStory />);
        const emojiBtn = element.getByTestId("message-type-emoji-btn");
        const prevEmoji = emojiBtn.innerHTML;
        await userEvent.hover(emojiBtn);
        waitFor(() => {
            expect(emojiBtn.innerHTML).not.toBe(prevEmoji);
        })
    });
});