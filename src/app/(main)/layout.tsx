import CommonLayout from "@/components/layout/common-layout";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <CommonLayout />
      {children}
    </>
  );
}
