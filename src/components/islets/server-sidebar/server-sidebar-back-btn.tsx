"use client";

import { useSidebarStatus } from "@/state/sidebar-status";
import BasicGoBackBtn from "../go-back-btn";
import { useRouter } from "next/navigation";
export default function GoBackBtn() {
  const { setSidebarStatus } = useSidebarStatus();
  const router = useRouter();
  const clickHandler = () => {
    setSidebarStatus("closed");
    router.push("/");
  };
  return (
    <BasicGoBackBtn containerClassName="sm:hidden" onClick={clickHandler} />
  );
}
