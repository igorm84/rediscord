import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function SettingsLayoutHeader() {
  const router = useRouter();
  return (
    <motion.div
      animate={{ opacity: [0, 1] }}
      className="sticky left-0 top-0 z-20 flex w-full items-center justify-between px-5 py-1 shadow-2xl"
      transition={{ ease: "easeInOut", duration: 0.29 }}
    >
      <div className="cursor-pointer rounded-full bg-midground p-1">
        <Menu className="h-9 w-9 text-white" />
      </div>
      <X onClick={router.back} className="h-9 w-9 cursor-pointer text-white" />
    </motion.div>
  );
}
