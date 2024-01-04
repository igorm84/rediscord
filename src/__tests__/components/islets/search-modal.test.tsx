import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Meta, {
  Default,
} from "@/components/islets/search-modal/search-modal.stories";
import { composeStory } from "@storybook/react";
import { ComponentProps } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const DefaultStory = composeStory(Default, Meta);

const WithWrapper = (props: ComponentProps<typeof DefaultStory>) => (
  <QueryClientProvider client={new QueryClient()}>
    <DefaultStory {...props} />
  </QueryClientProvider>
);

describe("SearchModal", () => {
  it("should render search modal and close it", async () => {
    render(<WithWrapper defaultOpen />);
    await userEvent.type(screen.getByRole("search-dialog-content"), "{esc}");
    setTimeout(() =>
      expect(screen.getByRole("search-dialog-content")).not.toBeInTheDocument(),
    );
  });
  it("should render search modal with default open", () => {
    render(<WithWrapper defaultOpen={true} />);
    expect(screen.getByRole("search-dialog-content")).toBeInTheDocument();
  });
  it("should render search modal with default close", () => {
    render(<WithWrapper defaultOpen={false} />);
    expect(screen.queryByRole("search-dialog-content")).not.toBeInTheDocument();
  });
});
