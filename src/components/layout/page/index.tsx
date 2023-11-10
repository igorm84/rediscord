import PageContent from "./page-content";
import PageHeader from "./page-header";
import PageHeaderSkeleton from "./page-header-skeleton";

const Page = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="shadow-background/4 ml-[310px] flex min-h-screen flex-1 flex-col bg-foreground shadow-lg">
      {children}
    </div>
  );
};
export { Page, PageHeader, PageHeaderSkeleton, PageContent };
