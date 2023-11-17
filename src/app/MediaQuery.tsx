"use client";
import useMediaQuery from "@/lib/hooks/useMediaQuery";
import { useViewportType } from "@/state/viewport-type";
import { useEffect } from "react";

type Query = {
  query: string;
  component: React.ReactNode;
};
export function MediaQuery({ query, component }: Query) {
  const isMatches = useMediaQuery(query);
  return isMatches ? component : null;
}
export function ListenViewportChanges() {
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const isMobile = useMediaQuery("(max-width: 640px)");
  const newType = isMobile ? "mobile" : isTablet ? "tablet" : "desktop";
  const { type, setViewportType } = useViewportType();

  useEffect(() => {
    if (newType !== type) {
      setViewportType(newType);
    }
  }, [newType]);
  return null;
}
