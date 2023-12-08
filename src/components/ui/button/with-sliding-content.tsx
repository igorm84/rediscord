import { forwardRef } from "react";
import HybridButton, {
  HybridButtonProps,
  HybridButtonRef,
} from "../hybrid/hybrid-button";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import clsx from "@/lib/clsx";

type WithSlidingContentProps = HybridButtonProps;

const SlidingButton = forwardRef<HybridButtonRef, WithSlidingContentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <HybridButton
        ref={ref}
        className={clsx("relative overflow-hidden transition-all text-center", className)}
        {...props}
      >
        <AnimatePresence mode="wait">
          <motion.span
            animate={{ translateX: ["-100%", "0%"] }}
            exit={{ translateX: "100%" }}
            key={children?.toString()}
            className="absolute grid items-center justify-center w-full h-full whitespace-nowrap left-0 top-0"
            transition={{ ease: "linear", duration: 0.15 }}
          >
            {children}
          </motion.span>
        </AnimatePresence>
        <span className="opacity-0">{children}</span>
      </HybridButton>
    );
  },
);
export default SlidingButton;
