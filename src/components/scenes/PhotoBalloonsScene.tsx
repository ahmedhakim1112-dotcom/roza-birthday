"use client";

import { motion } from "framer-motion";
import { PhotoBalloons } from "@/components/animations/BalloonAnimation";

function PhotoButton() {
  return (
    <button
      type="button"
      className="absolute -bottom-5 left-1/2 z-30 w-[158px] -translate-x-1/2 rounded-[14px] border-[2px] border-[#d7354d] bg-[#ff6578] py-[8px] text-[12.5px] font-bold italic text-[#7b1c28] shadow-[0_5px_0_#9e2336] active:translate-y-[2px] active:shadow-[0_3px_0_#9e2336] max-sm:-bottom-4 max-sm:w-[128px] max-sm:rounded-[12px] max-sm:py-[6px] max-sm:text-[10.5px] sm:max-md:w-[142px] sm:max-md:py-[7px] sm:max-md:text-[11.5px]"
    >
      Dear Razan
    </button>
  );
}

export default function PhotoBalloonsScene() {
  return (
    <motion.div
  initial={{ opacity: 0, y: 560, scale: 0.94 }}
  animate={{ opacity: [0, 0.25, 0.65, 1], y: 0, scale: 1 }}
  transition={{
    opacity: {
      delay: 4.2,
      duration: 2.2,
      times: [0, 0.3, 0.7, 1],
      ease: "easeOut",
    },
    y: {
      delay: 4.2,
      duration: 7.2,
      ease: "linear",
    },
    scale: {
      delay: 4.2,
      duration: 7.2,
      ease: "linear",
    },
  }}
      className="relative ml-auto mr-[3%] mt-[-2%] origin-center max-md:ml-0 max-md:mr-0 max-md:mt-6 max-md:scale-[0.76] max-sm:mt-3 max-sm:scale-[0.62]"
    >
      <PhotoBalloons />

      <div className="relative z-20 h-[clamp(260px,26vw,340px)] w-[clamp(260px,26vw,340px)] overflow-hidden rounded-full border-[5px] border-[#1e1b24] bg-[#f7adc4] max-sm:h-[220px] max-sm:w-[220px] max-sm:border-[4px] sm:max-md:h-[260px] sm:max-md:w-[260px]">
        <img
          src="/images/memories/memory-1.jpg"
          alt="Razan"
          className="h-full w-full object-cover object-center"
          draggable={false}
        />
      </div>

      <PhotoButton />
    </motion.div>
  );
}