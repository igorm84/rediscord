"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import getQueryClient from "./getQueryClient";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={getQueryClient()}>
      {children}
    </QueryClientProvider>
  );
}
