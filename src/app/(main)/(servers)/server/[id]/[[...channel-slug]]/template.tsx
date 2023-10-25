"use client";

import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

export default function Template({ children }: PropsWithChildren) {
  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: [1, 0.3, 1], scale: [1, 0.99, 1] }}
      transition={{ duration: 0.35 }}
    >
      {children}
    </motion.div>
  );
}
