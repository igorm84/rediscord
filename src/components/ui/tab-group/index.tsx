import { clsx } from "@/lib/utils";
import { motion } from "framer-motion";
interface TabGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: string;
}

export default function TabGroup({
  gap = "4",
  className,
  children,
  ...props
}: TabGroupProps) {

  return (
    <div
      className="horizontal-scrollbar relative h-[25px] w-full overflow-y-hidden overflow-x-auto"
      {...props}
    >
      <motion.div
        className={clsx(`flex gap-${gap} absolute left-0 top-0`, className)}
      >
        {children}
      </motion.div>
    </div>
  );
}
