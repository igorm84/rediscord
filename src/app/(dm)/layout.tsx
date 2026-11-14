import DMLayoutSkeleton from "@/components/islets/dm-layout/dm-layout-skeleton";
import DMLayout from "@/components/islets/dm-layout";
import DemoLoadingGate from "@/components/islets/demo-loading-gate";

export const dynamic = "error";

export default function SuspendedDMLayout({
  children,
}: React.PropsWithChildren) {
  // Only the sidebar is gated here. The page stays at a stable position in the
  // tree so it is not remounted when the gate opens; otherwise the page's own
  // DemoLoadingGate would restart its timer and double the first-load delay.
  return (
    <>
      <DemoLoadingGate fallback={<DMLayoutSkeleton />}>
        <DMLayout />
      </DemoLoadingGate>
      {children}
    </>
  );
}
