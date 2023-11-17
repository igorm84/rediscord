import { render, waitFor } from "@testing-library/react";
import Meta, {
  Template,
} from "@/components/islets/friends-tab-group/friends-tab-group.stories";
import { composeStory } from "@storybook/react";
import { friendsTabsProps } from "@/lib/types/friend-tab-prop";
import userEvent from "@testing-library/user-event";
const FriendsTabGroup = composeStory(Template, Meta);

describe("FriendsTabGroup", () => {
  it("tab group should render proper count of tabs", () => {
    const element = render(<FriendsTabGroup />);
    waitFor(() =>
      expect(element.getByTestId("tab-group").childNodes.length).toBe(
        Object.values(friendsTabsProps).length,
      ),
    );
  });
  it("tab group should correct render active tab", async () => {
    const element = render(<FriendsTabGroup />);
    const tabs = element.getByTestId("tab-group")
      .childNodes as unknown as Element[];
    // pick random tab
    const tab = tabs[Math.floor(Math.random() * tabs.length)];
    const prevActiveTab = element.getByTestId("active-tab");
    await userEvent.click(tab);
    waitFor(() => {
      expect(element.getByTestId("active-tab")).not.toBe(prevActiveTab);
      expect(tab).toBe(element.getByTestId("active-tab"));
    });
  });
});
