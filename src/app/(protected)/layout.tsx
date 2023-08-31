import CommonLayout from "@/components/layout/common-layout";

export default function SuspendedDMLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <>
      <CommonLayout />
      {children}
    </>
  );
}
