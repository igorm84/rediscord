"use client";

import Login from "@/components/islets/auth/login";
import { motion } from "framer-motion";
export default function SignInPage() {
  return (
    <motion.div
    animate={{scale: [0, 1]}}
      exit={{ scale: [1, 0] }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <Login />
    </motion.div>
  );
}
