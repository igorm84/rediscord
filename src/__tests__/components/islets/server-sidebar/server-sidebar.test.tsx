import ServerSidebar from "@/components/islets/server-sidebar";
import ServerSidebarWrapper from "@/components/islets/server-sidebar/server-sidebar-wrapper";
import { useSidebarStatus } from "@/state/sidebar-status";
import { useViewportType } from "@/state/viewport-type";
import { act, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("next/navigation", () => ({
  usePathname: () => "/server/someid",
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("ServerSidebarWrapper", () => {
  it("should properly render on mobile screen", async () => {
    await act(async () => {
      useSidebarStatus.setState({ status: "open" });
      useViewportType.setState({ type: "mobile" });
    });
    const element = render(await ServerSidebar(), {
      wrapper: ServerSidebarWrapper,
    });
    await waitFor(async () => {
      expect(element.getByTestId("sheet-container")).toBeInTheDocument();
    });
    await act(async () => {
      useSidebarStatus.setState({ status: "closed" });
    });
    await waitFor(() =>
      expect(element.queryByTestId("sheet-container")).not.toBeInTheDocument(),
    );
  });
  it("should be closed on mobile screen after click on go back button", async () => {
    await act(async () => {
      useSidebarStatus.setState({ status: "open" });
      useViewportType.setState({ type: "mobile" });
    });
    const element = render(await ServerSidebar(), {
      wrapper: ServerSidebarWrapper,
    });
    const goBackButton = element.getByTestId("go-back-btn");
    goBackButton.removeAttribute("sm:hidden");
    await waitFor(async () => {
      expect(element.getByTestId("sheet-container")).toBeInTheDocument();
    });
    await act(async () => {
      await userEvent.click(goBackButton);
    });
    await waitFor(() =>
        expect(element.queryByTestId("sheet-container")).not.toBeInTheDocument(),
    );
  });
});
