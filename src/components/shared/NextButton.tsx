"use client";

import { motion } from "framer-motion";
import { Gift } from "lucide-react";

type NextButtonProps = {
  children: string;
  onClick: () => void;
};

export function NextButton({ children, onClick }: NextButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.94 }}
      className="relative z-20 inline-flex items-center gap-2 rounded-full bg-[#141014] px-7 py-4 text-sm font-bold text-white shadow-[0_18px_45px_rgba(20,16,20,0.25)]"
    >
      <Gift size={18} />
      {children}
    </motion.button>
  );
}