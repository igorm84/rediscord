"use client";

/*
 * DEMO-ONLY LOADING GATE
 *
 * Rediscord's public preview is intentionally backed by static mocked data so
 * deployment provider can serve the pages from prerendered output instead of invoking
 * serverless rendering for every request.
 * 
 * You probably don't want this for real production apps, but it's a good way to show loading states in a demo environment.
 */
import React from "react";
import { MOCK_DELAY } from "@/lib/utils/mock";

type DemoLoadingGateProps = React.PropsWithChildren<{
  fallback: React.ReactNode;
  delayMs?: number;
}>;

export default function DemoLoadingGate({
  children,
  fallback,
  delayMs = MOCK_DELAY,
}: DemoLoadingGateProps) {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timeout = window.setTimeout(() => setIsLoading(false), delayMs);
    return () => window.clearTimeout(timeout);
  }, [delayMs]);

  return isLoading ? fallback : children;
}
