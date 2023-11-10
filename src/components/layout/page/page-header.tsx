import Header from "../header";
import React from "react";
import clsx from "@/lib/clsx";
import HybridButton, {
  HybridButtonProps,
} from "@/components/ui/hybrid/hybrid-button";

type PageHeaderButtonProps = HybridButtonProps;
export const PageHeaderButton = ({
  children,
  className,
  ...props
}: PageHeaderButtonProps) => (
  <HybridButton
    className={clsx("text-gray-300 hover:text-gray-200", className)}
    {...props}
  >
    {children}
  </HybridButton>
);
interface PageHeaderProps {
  rightContent?: React.ReactNode;
  children: React.ReactNode;
}
export default function PageHeader({
  children,
  rightContent,
}: PageHeaderProps) {
  return (
    <Header className="sticky top-0 z-10 flex-none justify-between bg-foreground">
      {children}
      <div className="flex items-center gap-6">{rightContent}</div>
    </Header>
  );
}
