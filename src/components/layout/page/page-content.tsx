import clsx from "@/lib/clsx";

interface PageContentProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "md" | "lg";
}
export default function PageContent({
  padding = "md",
  className,
  children,
  ...props
}: PageContentProps) {
  return (
    <div
      className={clsx("md" && "px-6 py-4", "lg" && "px-8 py-6", className)}
      {...props}
    >
      {children}
    </div>
  );
}
