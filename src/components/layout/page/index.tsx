import PageContent from "./page-content";
import PageHeader from "./page-header";
import PageHeaderSkeleton from "./page-header-skeleton";

interface Page {
  children: React.ReactNode;
}
const Page = ({ children }: Page) => {
  return children;
};
export { Page, PageHeader, PageHeaderSkeleton, PageContent };
