import Header from "../header";

export default function PageHeaderSkeleton() {
  return (
    <Header className="justify-between">
      <div className="flex items-center gap-2">
        <div className="h-5 w-5 animate-pulse rounded-full bg-gray-700" />
        <div className="h-3 w-32 animate-pulse rounded-md bg-gray-700" />
      </div>
    </Header>
  );
}
