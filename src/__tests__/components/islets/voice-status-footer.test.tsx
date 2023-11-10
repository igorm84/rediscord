import Meta, { Default } from "@/components/islets/voice-status-footer/voice-status-footer.stories";
import { composeStory } from "@storybook/react";
import { render, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";

const DefaultStory = composeStory(Default, Meta);

describe('VoiceStatusFooter', () => {
    it('should render muted/unmuted buttons', async () => {
        const element = render(<DefaultStory />);
        const deafBtn = element.getByTestId("deaf-button");
        const muteBtn = element.getByTestId("mute-button");
       await userEvent.click(deafBtn);
       waitFor(() =>{
        expect(deafBtn.childNodes.length).toBe(2);
        expect(muteBtn.childNodes.length).toBe(1);
       })
    });
})
