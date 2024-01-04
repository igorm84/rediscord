import { QueryClient } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import { useSession } from "next-auth/react";
import type * as ReactDom from "react-dom";

jest.mock("react-dom", () => ({
  ...jest.requireActual<typeof ReactDom>("react-dom"),
  preload: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(
    (): ReturnType<typeof useSession> => ({
      data: {
        user: {
          id: "",
          status: "IDLE",
          lastSeen: new Date(),
          username: "",
          avatar: "",
          accountId: "",
        },
        expires: new Date().toString(),
      },
      update: jest.fn(),
      status: "authenticated",
    }),
  ),
}));

const queryClient = new QueryClient();

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQueryClient: () => queryClient,
}));

global.ResizeObserver = class ResizeObserver {
  observe() {
    // do nothing
  }
  unobserve() {
    // do nothing
  }
  disconnect() {
    // do nothing
  }
};
