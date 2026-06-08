"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";

type BalloonProps = {
  positionStyle: CSSProperties;
  delay?: number;
  bodyColor?: string;
  outlineColor?: string;
  svgHeight?: number;
  svgWidth?: number;
  stringPath?: string;
};

function Balloon({
  positionStyle,
  delay = 1.3,
  bodyColor = "#ef647b",
  outlineColor = "#9b3040",
  svgHeight = 200,
  svgWidth = 68,
  stringPath = "M34 76 C20 96 50 114 34 136 C18 158 48 172 32 205",
}: BalloonProps) {
  return (
    <motion.svg
      viewBox="0 0 68 230"
      className="pointer-events-none absolute z-10"
      style={{ ...positionStyle, height: svgHeight, width: svgWidth }}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: [0, -10, 0] }}
      transition={{
        opacity: { duration: 0.4, delay },
        y: {
          duration: 3.1,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
          repeatType: "mirror",
        },
      }}
    >
      <ellipse cx="34" cy="34" rx="28" ry="32" fill={bodyColor} />
      <ellipse
        cx="34"
        cy="34"
        rx="28"
        ry="32"
        fill="none"
        stroke={outlineColor}
        strokeWidth="2"
      />
      <ellipse cx="23" cy="20" rx="7" ry="10" fill="rgba(255,255,255,0.26)" />
      <path d="M28 65 L40 65 L34 76 Z" fill={outlineColor} />
      <path
        d={stringPath}
        fill="none"
        stroke={outlineColor}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}

export function PhotoBalloons() {
  return (
    <>
      <Balloon
        positionStyle={{
          top: "-108px",
          left: "34px",
          transform: "rotate(-4deg)",
        }}
        delay={2.95}
        bodyColor="#ff6f91"
        outlineColor="#9f3044"
        svgHeight={224}
        svgWidth={66}
        stringPath="M34 76 C24 96 48 114 35 137 C22 160 48 178 36 224"
      />

      <Balloon
        positionStyle={{
          top: "-138px",
          right: "24px",
          transform: "rotate(3deg)",
        }}
        delay={3.05}
        bodyColor="#ffcf6e"
        outlineColor="#a56b20"
        svgHeight={266}
        svgWidth={66}
        stringPath="M34 76 C46 98 22 116 34 140 C48 164 24 184 34 228"
      />

      <Balloon
        positionStyle={{
          top: "-184px",
          right: "-2px",
          transform: "rotate(6deg)",
        }}
        delay={3.15}
        bodyColor="#ff8a5c"
        outlineColor="#a44a27"
        svgHeight={318}
        svgWidth={66}
        stringPath="M34 76 C25 104 50 128 35 158 C18 190 48 202 31 228"
      />

      <Balloon
        positionStyle={{
          top: "-152px",
          left: "-2px",
          transform: "rotate(-7deg)",
        }}
        delay={3}
        bodyColor="#b7e58f"
        outlineColor="#5d8b38"
        svgHeight={272}
        svgWidth={62}
        stringPath="M34 76 C21 102 48 122 34 150 C20 178 50 196 38 228"
      />

      <Balloon
        positionStyle={{
          top: "-178px",
          left: "92px",
          transform: "rotate(2deg)",
        }}
        delay={3.12}
        bodyColor="#b9a7ff"
        outlineColor="#5f4aa3"
        svgHeight={302}
        svgWidth={64}
        stringPath="M34 76 C42 100 22 124 34 150 C48 180 24 198 33 228"
      />

      <Balloon
        positionStyle={{
          top: "-122px",
          right: "82px",
          transform: "rotate(8deg)",
        }}
        delay={3.22}
        bodyColor="#8fdde7"
        outlineColor="#347b86"
        svgHeight={246}
        svgWidth={60}
        stringPath="M34 76 C22 100 50 120 35 146 C20 174 48 194 34 228"
      />
    </>
  );
}