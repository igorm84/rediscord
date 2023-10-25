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
      className={clsx(
        "flex flex-1",
        padding === "md" && "px-6 pt-4",
        padding === "lg" && "px-8 pt-6",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
