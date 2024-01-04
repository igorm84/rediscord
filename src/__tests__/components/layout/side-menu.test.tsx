import { render, waitFor, screen } from "@testing-library/react";
import { composeStory } from "@storybook/react";
import { generateRandomFakeServers } from "@/lib/utils/mock";
import userEvent from "@testing-library/user-event";
import Meta, {
  Template,
} from "@/components/layout/sidemenu/side-menu-track.stories";
import { useViewportType } from "@/state/viewport-type";
import { act } from "react-dom/test-utils";
import SideMenu from "@/components/layout/sidemenu";
import { useSidebarStatus } from "@/state/sidebar-status";
import SideMenuWrapper from "@/components/layout/sidemenu/side-menu-wrapper";

const SideMenuTrack = composeStory(Template, Meta);

jest.mock("next/navigation", () => ({
  usePathname: () => "/me",
  useParams: () => ({ id: "someid" }),
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("SideMenuTrack", () => {
  it("should render SideMenuTrack with proper count of servers", async () => {
    const element = render(
      <SideMenuTrack servers={generateRandomFakeServers(10)} />,
    );
    expect(element.getAllByTestId("side-menu-item").length).toBe(10); // have to be 11, but 1 is always active and
    // only unactive servers has side-menu-item id.
  });
  it("should render proper active server", async () => {
    const element = render(
      <SideMenuTrack servers={generateRandomFakeServers(10)} />,
    );
    const servers = element.getAllByTestId("side-menu-item");
    // pick random server
    const server = servers[Math.floor(Math.random() * servers.length)];
    const prevActiveServer = element.getByTestId("side-menu-active-item");
    await userEvent.click(server);
    await waitFor(() => {
      expect(element.getByTestId("side-menu-active-item")).not.toBe(
        prevActiveServer,
      );
      expect(server).toBe(element.getByTestId("side-menu-active-item"));
    });
  });
  it("should render proper on mobile screen", async () => {
    const element = render(await SideMenu());
    await act(async () => {
      useViewportType.setState({ type: "mobile" });
    });
    await waitFor(() => {
      expect(
        element.queryByTestId("side-menu-wrapper"),
      ).not.toBeInTheDocument();
    });
  });
  it("should be rendered on any page on desktop screen", async () => {
    render(await SideMenu(), {wrapper: SideMenuWrapper});
    act(() => {
      useViewportType.setState({ type: "desktop" });
    });
    await waitFor(() => {
      expect(screen.getByTestId("side-menu-wrapper")).toBeInTheDocument();
    });
    act(() =>
      jest.doMock("next/navigation", () => ({
        usePathname: () => "/server/someid",
      })),
    );
    await waitFor(() => {
      expect(screen.getByTestId("side-menu-wrapper")).toBeInTheDocument();
    });
  });
  it("when sidebar is closed, it should not be rendered on mobile screen", async () => {
    act(() =>
      jest.doMock("next/navigation", () => ({
        usePathname: () => "/me",
      })),
    );
    const element = render(await SideMenu(), {wrapper: SideMenuWrapper});
    act(() => {
      useViewportType.setState({ type: "mobile" });
      useSidebarStatus.setState({ status: "closed" });
    });
    await waitFor(() => {
      expect(
        element.queryByTestId("side-menu-wrapper"),
      ).not.toBeInTheDocument();
    });
    act(() => {
      useSidebarStatus.setState({ status: "open" });
    });
    await waitFor(() => {
      expect(screen.queryByTestId("side-menu-wrapper")).toBeInTheDocument();
    });
  });
});
