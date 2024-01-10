"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import getQueryClient from "../../app/getQueryClient";
import { SessionProvider } from "next-auth/react";
import { SocketProvider } from "./SocketProvider";
import Notifications from "./Notifications";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <SocketProvider>
      <QueryClientProvider client={getQueryClient()}>
        <SessionProvider>
          {children}
          <Notifications />
        </SessionProvider>
      </QueryClientProvider>
    </SocketProvider>
  );
}
