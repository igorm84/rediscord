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
interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  rightContent?: React.ReactNode;
  children: React.ReactNode;

}
export default function PageHeader({
  children,
  rightContent,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <Header className={clsx(`sticky top-0 z-10 flex-none justify-between bg-foreground`, className)} {...props}>
      {children}
      <div className="flex relative items-center gap-6">{rightContent}</div>
    </Header>
  );
}
