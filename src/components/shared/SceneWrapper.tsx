"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type SceneWrapperProps = {
  children: ReactNode;
  className?: string;
};

export function SceneWrapper({ children, className = "" }: SceneWrapperProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className={`relative min-h-screen overflow-hidden px-5 py-8 ${className}`}
    >
      {children}
    </motion.section>
  );
}