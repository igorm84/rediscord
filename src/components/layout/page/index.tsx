import clsx from "@/lib/clsx";
import PageContent from "./page-content";
import PageHeader from "./page-header";
import PageHeaderSkeleton from "./page-header-skeleton";

const Page = ({ children, className}: React.HTMLAttributes<"div">) => {
  return (
    <div className={clsx("shadow-background/4 flex min-h-screen flex-1 flex-col bg-foreground shadow-lg", className)}>
      {children}
    </div>
  );
};
export { Page, PageHeader, PageHeaderSkeleton, PageContent };
