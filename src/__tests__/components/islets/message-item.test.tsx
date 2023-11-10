import { Message } from "@/lib/entities/message";
import { render, screen } from "@testing-library/react";
import { composeStory } from "@storybook/react";
import Meta, {
    Default,
} from "@/components/islets/message-item/message-item.stories";
import dayjs from "dayjs";

const DefaultMessage = composeStory(Default, Meta);
const props: Message = {
    id: "1",
    authorAvatar: "https://i.pravatar.cc/150?img=1",
    authorNickname: "John Doe",
    message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, velit vel bibendum bibendum, nisl elit bibendum sapien, vel bibendum sapien elit vel sapien. Sed vel sapien vel sapien. Sed vel sapien vel sapien. Sed vel sapien vel sapien. Sed vel sapien vel sapien. Sed vel sapien vel sapien. Sed vel sapien vel sapien. Sed vel sapien vel sapien. Sed vel sapien vel sapien. Sed vel sapien vel sapien. Sed vel sapien vel sapien. Sed vel sapien vel sapien. Sed vel sapien vel sapien.",
    timestamp: Date.now(),
};
test("renders message item", () => {
    render(<DefaultMessage {...props} />);
    expect(screen.getByRole("message-item")).toBeInTheDocument();
});

test("renders message item with correct author nickname", () => {
    render(<DefaultMessage {...props} />);
    expect(screen.getByText(props.authorNickname)).toBeInTheDocument();
});

test("renders message item with correct message", () => {
    render(<DefaultMessage {...props} />);
    expect(screen.getByText(props.message)).toBeInTheDocument();
});

test("renders message item with correct timestamp", () => {
    render(<DefaultMessage {...props} />);
    const date = dayjs(props.timestamp);
    const hDiff = dayjs(Date.now()).diff(props.timestamp) / 1000 / 60 / 60;
    const expected =
        hDiff >= 23 ? date.format("MMMM D, YYYY h:mm A") : date.format("HH:mm A");
    expect(screen.getByText(expected)).toBeInTheDocument();
});
