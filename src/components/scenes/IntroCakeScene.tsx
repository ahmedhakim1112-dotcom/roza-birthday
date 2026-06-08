"use client";

import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { CakeAnimation } from "@/components/animations/CakeAnimation";

type IntroCakeSceneProps = {
  onNext: () => void;
};

export function IntroCakeScene({ onNext }: IntroCakeSceneProps) {
  const handleStart = () => {
    confetti({
      particleCount: 120,
      spread: 105,
      origin: { x: 0.16, y: 0.22 },
    });

    confetti({
      particleCount: 120,
      spread: 105,
      origin: { x: 0.86, y: 0.22 },
    });

    setTimeout(onNext, 700);
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#ed5f8e]">
      <motion.span
        initial={{ x: -90, y: -40, scale: 0.8, opacity: 0 }}
        animate={{
          x: [-90, 0, 0],
          y: [-40, 0, -4],
          scale: [0.8, 1, 1.02],
          opacity: [0, 1, 1],
        }}
        transition={{ duration: 5.8, times: [0, 0.35, 1], ease: "easeInOut" }}
        className="absolute left-[6%] top-[13%] h-16 w-16 rounded-full bg-[#d93655]"
      />

      <motion.span
        initial={{ x: 70, y: -35, scale: 0.7, opacity: 0 }}
        animate={{
          x: [70, 0, 0],
          y: [-35, 0, 5],
          scale: [0.7, 1, 1.05],
          opacity: [0, 1, 1],
        }}
        transition={{
          duration: 6,
          delay: 0.1,
          times: [0, 0.35, 1],
          ease: "easeInOut",
        }}
        className="absolute right-[15%] top-[28%] h-6 w-6 rounded-full bg-[#d93655]"
      />

      <motion.span
        initial={{ x: 90, scale: 0.8, opacity: 0 }}
        animate={{ x: [90, 0, -5], scale: [0.8, 1, 1.02], opacity: [0, 1, 1] }}
        transition={{
          duration: 6.1,
          delay: 0.2,
          times: [0, 0.35, 1],
          ease: "easeInOut",
        }}
        className="absolute right-[-26px] top-[44%] h-16 w-16 rounded-full bg-white/35"
      />

      <motion.span
        initial={{ y: 150, scale: 0.85, opacity: 0 }}
        animate={{
          y: [150, 0, -8],
          scale: [0.85, 1, 1.01],
          opacity: [0, 1, 1],
        }}
        transition={{
          duration: 6.2,
          delay: 0.15,
          times: [0, 0.38, 1],
          ease: "easeInOut",
        }}
        className="absolute bottom-[-90px] left-[18%] h-64 w-64 rounded-full bg-white/20"
      />

      <motion.span
        initial={{ y: -60, scale: 0.5, opacity: 0 }}
        animate={{ y: [-60, 0, 5], scale: [0.5, 1, 1.08], opacity: [0, 1, 1] }}
        transition={{
          duration: 5.9,
          delay: 0.35,
          times: [0, 0.36, 1],
          ease: "easeInOut",
        }}
        className="absolute left-[33%] top-[10%] h-5 w-5 rounded-full bg-white/45"
      />

      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.45 }}
        className="relative z-10 flex flex-col items-center"
      >
        <CakeAnimation />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.15, duration: 0.75 }}
          className="mt-5 flex flex-col items-center font-serif italic"
        >
          <p className="text-[22px] text-[#7f2435]">Happy 25th Birthday</p>

          <button
            type="button"
            onClick={handleStart}
            className="relative mt-1 cursor-pointer text-[25px] font-bold italic text-[#9f1733] outline-none"
          >
            <span>Raza</span>

            <span className="relative inline-block pr-[2px]">
              n
              <span className="pointer-events-none absolute right-[-3px] top-[4px] h-[10px] w-[10px] rotate-[24deg]">
                <span className="absolute left-1/2 top-0 h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-[#b21f3a]" />
                <span className="absolute bottom-0 left-1/2 h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-[#b21f3a]" />
                <span className="absolute left-0 top-1/2 h-[5px] w-[5px] -translate-y-1/2 rounded-full bg-[#b21f3a]" />
                <span className="absolute right-0 top-1/2 h-[5px] w-[5px] -translate-y-1/2 rounded-full bg-[#b21f3a]" />
                <span className="absolute left-1/2 top-1/2 h-[3px] w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffd7e2]" />
              </span>
            </span>

            <span className="absolute -bottom-1 left-1/2 h-[1px] w-20 -translate-x-1/2 bg-[#9f1733]/65" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
