"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import RoundedButton from "../button/rounded-button";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
interface BurgerMenuProps {
  children: React.ReactNode;
}
export default function BurgerMenu({ children }: BurgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover open={isOpen}>
      <PopoverTrigger asChild>
        <RoundedButton
          key={+isOpen}
          onClick={() => setIsOpen((v) => !v)}
          className="animate-[pulse-rotate_0.5s] text-sm transition-all sm:text-[16px]"
        >
          {isOpen ? <IoClose /> : <RxHamburgerMenu />}
        </RoundedButton>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="center" asChild>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, ease: "linear" }}
          className="grid gap-2 rounded-lg bg-midground p-4"
        >
          {children}
        </motion.div>
      </PopoverContent>
    </Popover>
  );
}
