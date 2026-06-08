"use client";

import { AnimatePresence, motion } from "framer-motion";

export { BirthdayBookPopup } from "./MemoryBookScene";

type EnvelopeMessageProps = {
  isOpen: boolean;
  onToggle: () => void;
};

export function EnvelopeMessage({ isOpen, onToggle }: EnvelopeMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 34, scale: 0.75 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: 3.9,
        duration: 0.7,
        type: "spring",
        stiffness: 120,
        damping: 11,
      }}
      className="absolute z-40"
      style={{
        bottom: "6%",
        left: "48%",
      }}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.82 }}
            animate={{ opacity: 1, y: -86, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.85 }}
            transition={{
              duration: 0.55,
              type: "spring",
              stiffness: 120,
              damping: 13,
            }}
            className="absolute bottom-[28px] left-1/2 w-[240px] -translate-x-1/2 rounded-[4px] bg-[#f5eecb] px-5 py-4 text-left text-[#7b6d47] shadow-sm"
          >
            <p className="mb-3 text-[12px] font-bold">To Razan...</p>

            <p className="text-[11px] leading-[1.7]">
              Razan, I love you more than I can say. You are my favorite person,
              my sweetest feeling, and the one who makes everything feel warmer
              and more beautiful. Having you in my life is something I will
              always be thankful for.
            </p>

            <p className="mt-4 text-[11px]">Hakim</p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={onToggle}
        className="relative h-[46px] w-[58px] cursor-pointer border-0 bg-transparent p-0"
      >
        <span className="absolute inset-0 bg-[#f23f50]" />

        <motion.span
          initial={false}
          animate={{
            rotateX: isOpen ? 180 : 0,
            y: isOpen ? -7 : 0,
          }}
          transition={{
            duration: 0.45,
            type: "spring",
            stiffness: 160,
            damping: 14,
          }}
          className="absolute left-0 top-0 h-0 w-0 origin-top border-l-[29px] border-r-[29px] border-t-[30px] border-l-transparent border-r-transparent border-t-[#e93245]"
        />

        <span className="absolute bottom-0 left-0 h-0 w-0 border-b-[26px] border-r-[29px] border-b-[#f23f50] border-r-transparent" />
        <span className="absolute bottom-0 right-0 h-0 w-0 border-b-[26px] border-l-[29px] border-b-[#f23f50] border-l-transparent" />

        <span className="absolute bottom-[8px] right-[8px] text-[12px] text-white">
          ✦
        </span>
      </button>
    </motion.div>
  );
}
