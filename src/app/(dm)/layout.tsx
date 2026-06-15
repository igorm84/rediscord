import DMLayoutSkeleton from "@/components/islets/dm-layout/dm-layout-skeleton";
import DMLayout from "@/components/islets/dm-layout";
import DemoLoadingGate from "@/components/islets/demo-loading-gate";

export const dynamic = "error";

export default function SuspendedDMLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <DemoLoadingGate fallback={<DMLayoutSkeleton>{children}</DMLayoutSkeleton>}>
      <DMLayout>{children}</DMLayout>
    </DemoLoadingGate>
  );
}
