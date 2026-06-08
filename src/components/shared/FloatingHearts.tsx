"use client";

import { motion } from "framer-motion";

import { floatingHearts } from "@/data/love-heart-data";
import { TinyWhiteHeart } from "@/components/animations/HeartAnimation";

const hearts = ["♡", "♥", "♡", "♥", "♡", "♥", "♡", "♥"];

export function FloatingHearts() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((heart, index) => (
        <motion.span
          key={index}
          initial={{ y: "110vh", opacity: 0, scale: 0.7 }}
          animate={{
            y: "-15vh",
            opacity: [0, 1, 1, 0],
            x: [0, index % 2 === 0 ? 35 : -35, 0],
            rotate: [0, index % 2 === 0 ? 18 : -18, 0],
          }}
          transition={{
            duration: 7 + index,
            repeat: Infinity,
            delay: index * 0.65,
            ease: "easeInOut",
          }}
          className="absolute text-2xl text-[#ff6f9f]"
          style={{ left: `${10 + index * 11}%` }}
        >
          {heart}
        </motion.span>
      ))}
    </div>
  );
}

export function LoveFloatingHearts({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <>
      {floatingHearts.map((heart, index) => (
        <motion.div
          key={`${heart.left}-${index}`}
          className="pointer-events-none absolute z-[8]"
          style={{
            left: heart.left,
            top: "-12vh",
            willChange: "transform, opacity",
          }}
          initial={{
            y: "-12vh",
            x: 0,
            opacity: 0,
            scale: 0.86,
          }}
          animate={{
            y: ["-12vh", "114vh"],
            x: [0, heart.drift, heart.drift * -0.55, heart.drift * 0.28],
            opacity: [0, 0.86, 0.9, 0.72, 0],
            scale: [0.86, 1, 0.96, 0.9],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
        >
          <TinyWhiteHeart size={heart.size} />
        </motion.div>
      ))}
    </>
  );
}