"use client";

import NewAccount from "@/components/islets/auth/new-account";
import { motion } from "framer-motion";
export default function SignUpPage() {
  return (
    <motion.div
      animate={{ scale: [0, 1] }}
      exit={{ scale: [1, 0] }}

      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <NewAccount />
    </motion.div>
  );
}
