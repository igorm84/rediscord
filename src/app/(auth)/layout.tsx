import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import Image from "next/image";
import SignInBg from "../../../public/login-bg.png";

const ParticleBg = dynamic(
  () => import("@/components/islets/auth/particle-bg"),
  { ssr: false },
);

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  if (session?.user) {
    redirect("/");
  }
  return (
    <div className="relative grid min-h-screen grid-cols-[minmax(0,460px)] items-center justify-center">
      <ParticleBg />
      {children}
      <Image
        src={SignInBg}
        fill
        alt="beatiful-bg"
        className="z-[-2] object-cover"
      />
    </div>
  );
}
