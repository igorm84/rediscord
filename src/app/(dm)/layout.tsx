import { Suspense } from "react";
import DMLayoutSkeleton from "@/components/islets/dm-layout/dm-layout-skeleton";
import DMLayout from "@/components/islets/dm-layout";

export const revalidate = 0;

export default function SuspendedDMLayout({
  children,
}:  React.PropsWithChildren) {
  return (
    <Suspense fallback={<DMLayoutSkeleton>{children}</DMLayoutSkeleton>}>
      <DMLayout>{children}</DMLayout>
    </Suspense>
  );
}
