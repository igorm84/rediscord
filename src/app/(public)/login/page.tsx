import LoginForm from "@/components/auth/login-form";
import LoginHeader from "@/components/auth/login-header";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center gap-4 px-4 pt-20">
      <div className="fixed inset-x-0 top-0 rounded bg-gradient-to-r from-background/30 via-transparent to-background/30 px-2 py-1">
        <div className="mx-auto flex cursor-default justify-between text-xs font-bold text-gray-300">
          ReDiscord
          <div>
            <a
              href="https://github.com/igorm84/rediscord"
              className="hover:text-gray-100"
              target="_blank"
            >
              <BsGithub fontSize={16} />
            </a>
          </div>
        </div>
      </div>
      <div className="relative z-10 w-full max-w-sm overflow-hidden rounded-2xl bg-background shadow-2xl shadow-background/50">
        <LoginHeader />
        <div className="px-8 pb-12 pt-4">
          <LoginForm />
        </div>
      </div>
      <div className="w-full max-w-xs text-gray-100">
        Doesn&apos;t have an account yet?{" "}
        <Link href="/register" className="font-bold underline hover:text-white">
          Sign up
        </Link>
      </div>
    </div>
  );
}
