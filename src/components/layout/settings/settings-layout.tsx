"use client";

import { useEffect, type PropsWithChildren } from "react";
import { XCircle } from "lucide-react";
import SettingsLayoutNav from "./settings-layout-nav";
import Toaster from "@/components/ui/toaster";
import { useRouter } from "next/navigation";
import clsx from "@/lib/clsx";
import SettingsLayoutHeader from "./settings-layout-header";
import { MediaQuery } from "@/app/MediaQuery";

export default function SettingsLayout({ children }: PropsWithChildren) {
  const router = useRouter();

  useEffect(() => {
    function closeSettingsHandler(e: KeyboardEvent) {
      if (e.key === "Escape") {
        router.back();
      }
    }
    window.addEventListener("keyup", closeSettingsHandler);
    return () => window.removeEventListener("keyup", closeSettingsHandler);
  }, []);

  return (
    <div>
      <MediaQuery
        query="(max-width: 764px)"
        component={<SettingsLayoutHeader />}
      />
      <div
        className={clsx(
          "grid min-h-screen md:grid-cols-[3fr_minmax(0px,740px)_2fr]",
          "grid-cols-1 items-start",
        )}
      >
        <Toaster />
        <SettingsLayoutNav />
        <div className="bg-secondary relative mx-2 md:mx-10 rounded-xl p-4 mt-[60px]">
          {children}
        </div>
        <div
          onClick={router.back}
          className="hidden md:grid group/close mr-5 w-9 cursor-pointer gap-1 pt-[60px] text-center"
        >
          <XCircle className="h-9 w-9 text-gray-400 transition-all group-hover/close:text-white" />
          <span className="text-gray-400 transition-all group-hover/close:text-white">
            ESC
          </span>
        </div>
      </div>
    </div>
  );
}
