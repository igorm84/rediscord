import { Suspense } from "react";
import DMLayoutSkeleton from "@/components/islets/dm-layout/dm-layout-skeleton";
import DMLayout from "@/components/islets/dm-layout";

export default function SuspendedDMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<DMLayoutSkeleton>{children}</DMLayoutSkeleton>}>
      <DMLayout>{children}</DMLayout>
    </Suspense>
  );
}
