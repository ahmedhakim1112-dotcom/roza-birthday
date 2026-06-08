"use client";

import { motion } from "framer-motion";

export function HeartIntro() {
  const squarePath = "M95 72H165V142H95Z";
  const bottomPath = "M78 118L130 174L182 118";

  const finalHeartPath =
    "M130 176C95 145 70 122 70 92C70 67 87 52 109 52C121 52 130 59 130 72C130 59 139 52 151 52C173 52 190 67 190 92C190 122 165 145 130 176Z";

  const strokeColor = "#fff3f4";

  return (
    <svg
      viewBox="0 0 260 220"
      className="h-full w-full overflow-visible"
      aria-hidden="true"
    >
      <motion.g
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 1, 0.72, 0] }}
        transition={{
          delay: 4.6,
          duration: 1.2,
          ease: "easeOut",
        }}
      >
        <motion.path
          d="M130 72V142"
          fill="none"
          stroke={strokeColor}
          strokeWidth="2.4"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        />

        <motion.path
          d={squarePath}
          fill="none"
          stroke={strokeColor}
          strokeWidth="2.4"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.42, duration: 0.85, ease: "easeInOut" }}
        />

        <motion.circle
          cx="130"
          cy="107"
          r="35"
          fill="none"
          stroke={strokeColor}
          strokeWidth="2.4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 1.25, duration: 0.85, ease: "easeInOut" }}
        />

        <motion.circle
          cx="108"
          cy="88"
          r="43"
          fill="none"
          stroke={strokeColor}
          strokeWidth="2.4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 2.05, duration: 0.9, ease: "easeInOut" }}
        />

        <motion.circle
          cx="152"
          cy="88"
          r="43"
          fill="none"
          stroke={strokeColor}
          strokeWidth="2.4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 2.65, duration: 0.9, ease: "easeInOut" }}
        />

        <motion.path
          d={bottomPath}
          fill="none"
          stroke={strokeColor}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 3.35, duration: 0.78, ease: "easeInOut" }}
        />
      </motion.g>

      <motion.path
        d={finalHeartPath}
        fill="#7f0010"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{
          opacity: [0, 0, 0.16, 0.28],
          scale: [0.94, 0.96, 1.03, 1],
        }}
        transition={{ delay: 4.75, duration: 1.2, ease: "easeOut" }}
        style={{
          transformOrigin: "center",
          filter: "blur(10px)",
        }}
      />

      <motion.path
        d={finalHeartPath}
        fill="#b10017"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{
          opacity: [0, 0.08, 0.32, 0.52],
          scale: [0.96, 0.98, 1.02, 1],
        }}
        transition={{ delay: 4.95, duration: 1.15, ease: "easeOut" }}
        style={{
          transformOrigin: "center",
          filter: "drop-shadow(0 0 14px rgba(80,0,10,0.18))",
        }}
      />

      <motion.path
        d={finalHeartPath}
        fill="none"
        stroke="#d80023"
        strokeWidth="2.2"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{
          opacity: [0, 0.36, 0.22],
          pathLength: 1,
        }}
        transition={{ delay: 4.95, duration: 1, ease: "easeInOut" }}
      />

      <motion.path
        d={finalHeartPath}
        fill="none"
        stroke="#ff8e9a"
        strokeWidth="1"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{
          opacity: [0, 0.45, 0],
          pathLength: [0, 1, 1],
        }}
        transition={{ delay: 5.2, duration: 0.72, ease: "easeInOut" }}
      />
    </svg>
  );
}

export function TinyWhiteHeart({ size = 10 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 58"
      aria-hidden="true"
      className="drop-shadow-[0_0_4px_rgba(255,255,255,0.22)]"
    >
      <path
        d="M32 54C13 38 4 28 4 16C4 7 10 2 18 2C25 2 30 7 32 13C34 7 39 2 46 2C54 2 60 7 60 16C60 28 51 38 32 54Z"
        fill="#fff8fb"
        fillOpacity="0.92"
      />
    </svg>
  );
}

export function SmallHeart({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 58"
      className={className}
      aria-hidden="true"
      overflow="visible"
    >
      <path
        d="M32 54C13 38 4 28 4 16C4 7 10 2 18 2C25 2 30 7 32 13C34 7 39 2 46 2C54 2 60 7 60 16C60 28 51 38 32 54Z"
        fill="#e52043"
        stroke="#9a1228"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}