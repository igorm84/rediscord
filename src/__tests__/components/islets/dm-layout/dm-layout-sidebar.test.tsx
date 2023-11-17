import DMLayoutSidebar from "@/components/islets/dm-layout/dm-layout-sidebar";
import { useSidebarStatus } from "@/state/sidebar-status";
import { useViewportType } from "@/state/viewport-type";
import { render, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";

describe("DMLayoutSidebar", () => {
  it("should render properly", async () => {
    const element = render(<DMLayoutSidebar>test</DMLayoutSidebar>);
    await act(async () => {
      useViewportType.setState({ type: "desktop" });
    });
    await waitFor(() => {
      expect(element.queryByTestId("dm-layout-sidebar")).toHaveStyle({
        width: "240px",
      });
    });
    await act(async () => {
      useViewportType.setState({ type: "mobile" });
      useSidebarStatus.setState({ status: "open" });
    });
    await waitFor(() => {
      expect(element.queryByTestId("dm-layout-sidebar")).toHaveStyle({
        width: "100vw",
      });
    });
  });
});
