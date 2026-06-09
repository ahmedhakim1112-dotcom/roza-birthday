"use client";

import { AnimatePresence, motion } from "framer-motion";

const cakeSlices = [
  { bottom: 18, width: 88, color: "#6f3f2a", delay: 0.25 },
  { bottom: 29, width: 86, color: "#c78355", delay: 0.75 },
  { bottom: 40, width: 88, color: "#6f3f2a", delay: 1.25 },
  { bottom: 51, width: 84, color: "#c78355", delay: 1.75 },
];

type CakeAnimationProps = {
  isCandleLit?: boolean;
};

export function CakeAnimation({ isCandleLit = true }: CakeAnimationProps) {
  return (
    <div className="relative mx-auto h-[105px] w-[140px]">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
        className="absolute bottom-3 left-1/2 h-[3px] w-[100px] origin-center -translate-x-1/2 rounded-full bg-white/90"
      />

      {cakeSlices.map((slice, index) => (
        <motion.div
          key={index}
          initial={{ y: -90, opacity: 0, rotate: index % 2 === 0 ? -7 : 7 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          transition={{
            delay: slice.delay,
            duration: 0.72,
            type: "spring",
            stiffness: 85,
            damping: 11,
          }}
          className="absolute left-1/2 h-[12px] -translate-x-1/2 rounded-[2px]"
          style={{
            bottom: slice.bottom,
            width: slice.width,
            backgroundColor: slice.color,
          }}
        />
      ))}

      <motion.div
        initial={{ y: -45, opacity: 0, scaleY: 0.4 }}
        animate={{ y: 0, opacity: 1, scaleY: 1 }}
        transition={{
          delay: 2.25,
          duration: 0.75,
          type: "spring",
          stiffness: 75,
          damping: 10,
        }}
        className="absolute bottom-[64px] left-1/2 h-[14px] w-[90px] origin-top -translate-x-1/2 rounded-t-[7px] bg-[#fff3e9]"
      >
        <motion.span
          initial={{ height: 0 }}
          animate={{ height: 13 }}
          transition={{ delay: 2.75, duration: 0.45, ease: "easeOut" }}
          className="absolute left-[7px] top-[9px] w-[10px] rounded-b-full bg-[#fff3e9]"
        />
        <motion.span
          initial={{ height: 0 }}
          animate={{ height: 18 }}
          transition={{ delay: 2.9, duration: 0.5, ease: "easeOut" }}
          className="absolute left-[28px] top-[9px] w-[11px] rounded-b-full bg-[#fff3e9]"
        />
        <motion.span
          initial={{ height: 0 }}
          animate={{ height: 12 }}
          transition={{ delay: 3.05, duration: 0.42, ease: "easeOut" }}
          className="absolute left-[53px] top-[9px] w-[10px] rounded-b-full bg-[#fff3e9]"
        />
        <motion.span
          initial={{ height: 0 }}
          animate={{ height: 20 }}
          transition={{ delay: 3.2, duration: 0.5, ease: "easeOut" }}
          className="absolute left-[72px] top-[9px] w-[11px] rounded-b-full bg-[#fff3e9]"
        />
      </motion.div>

      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 3.55, duration: 0.45, type: "spring" }}
        className="absolute bottom-[82px] left-1/2 h-[25px] w-[3px] -translate-x-1/2 rounded-full bg-[#ffd166]"
      >
        <AnimatePresence>
          {isCandleLit && (
            <motion.span
              key="cake-flame"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: [1, 1.25, 1], opacity: [0.75, 1, 0.75] }}
              exit={{ scale: 0.15, opacity: 0, y: -3 }}
              transition={
                isCandleLit
                  ? { duration: 0.6, repeat: Infinity }
                  : { duration: 0.25 }
              }
              className="absolute -top-[8px] left-1/2 h-[9px] w-[6px] -translate-x-1/2 rounded-full bg-[#ff9f1c]"
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!isCandleLit && (
            <motion.span
              key="cake-smoke"
              initial={{ opacity: 0, y: 0, scale: 0.45 }}
              animate={{ opacity: [0, 0.55, 0], y: -18, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.85, ease: "easeOut" }}
              className="absolute -top-[9px] left-1/2 h-[10px] w-[10px] -translate-x-1/2 rounded-full border border-white/45"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}