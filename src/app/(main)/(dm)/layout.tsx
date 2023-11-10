import DMLayout from "@/components/islets/dm-layout";

export default function SuspendedDMLayout({
  children,
}: React.PropsWithChildren) {
  return <DMLayout>{children}</DMLayout>;
}
