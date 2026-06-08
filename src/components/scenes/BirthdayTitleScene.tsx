"use client";

import confetti from "canvas-confetti";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import {
  BirthdayBookPopup,
  EnvelopeMessage,
} from "@/components/scenes/EnvelopeLettersScene";
import { LoveHeartScene } from "@/components/scenes/LoveHeartScene";
import MusicButton from "@/components/shared/MusicButton";
import { PhotoBalloons } from "@/components/animations/BalloonAnimation";

type BirthdayTitleSceneProps = {
  onNext: () => void;
};

const happy = "Happy".split("");
const birthday = "Birthday".split("");

function CornerFlags({ side }: { side: "left" | "right" }) {
  const flags = Array.from({ length: 8 }, (_, index) => ({
    x: 14 + index * 30,
  }));

  return (
    <motion.div
      initial={{
        y: -50,
        opacity: 0,
        rotate: side === "left" ? -9 : 9,
      }}
      animate={{
        y: 0,
        opacity: 1,
        rotate: side === "left" ? -9 : 9,
      }}
      transition={{
        y: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.35 },
        rotate: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
      }}
      className="pointer-events-none absolute top-[8px] z-30"
      style={{
        left: side === "left" ? -6 : "auto",
        right: side === "right" ? -6 : "auto",
        transformOrigin: side === "left" ? "top left" : "top right",
      }}
    >
      <svg
        width="265"
        height="58"
        viewBox="0 0 265 58"
        className={side === "right" ? "-scale-x-100" : ""}
        overflow="visible"
      >
        <path
          d="M-6 8 L268 8"
          fill="none"
          stroke="#cf2f4f"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {flags.map((flag, index) => (
          <motion.polygon
            key={index}
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.18 + index * 0.045,
              duration: 0.32,
              ease: "easeOut",
            }}
            points={`${flag.x - 13},8 ${flag.x + 13},8 ${flag.x},42`}
            fill="#f25473"
          />
        ))}
      </svg>
    </motion.div>
  );
}

function Sparkle({ className }: { className: string }) {
  return (
    <span
      className={`pointer-events-none absolute z-10 select-none font-black text-[#211f28] ${className}`}
    >
      ✦
    </span>
  );
}

function PartyHat() {
  return (
    <motion.svg
      viewBox="0 -18 100 136"
      initial={{ y: -110, opacity: 0, rotate: 16, scale: 0.86 }}
      animate={{ y: 0, opacity: 1, rotate: 13, scale: 1 }}
      transition={{
        delay: 2.1,
        duration: 1.1,
        type: "spring",
        stiffness: 75,
        damping: 7,
      }}
      className="pointer-events-none absolute z-30"
      style={{
        width: 80,
        height: 102,
        top: -62,
        left: "78%",
      }}
    >
      <path
        d="M18 90 L50 6 L82 90 Z"
        fill="#ef536d"
        stroke="#1e1b24"
        strokeWidth="5"
        strokeLinejoin="round"
      />

      {[
        [47, 25],
        [55, 33],
        [40, 42],
        [61, 46],
        [49, 54],
        [67, 59],
        [36, 63],
        [56, 69],
      ].map(([cx, cy], index) => (
        <circle key={index} cx={cx} cy={cy} r="2.1" fill="#ffffff" />
      ))}

      <ellipse cx="50" cy="90" rx="33" ry="10" fill="#1e1b24" />

      <g
        stroke="#1e1b24"
        strokeWidth="5"
        strokeLinecap="round"
        transform="translate(50 -4)"
      >
        <line x1="0" y1="-10" x2="0" y2="10" />
        <line x1="-10" y1="0" x2="10" y2="0" />
        <line x1="-7" y1="-7" x2="7" y2="7" />
        <line x1="7" y1="-7" x2="-7" y2="7" />
      </g>
    </motion.svg>
  );
}

function PinkButton({
  children,
  className = "",
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-[14px] border-[2px] border-[#d7354d] bg-[#ff6578] py-[8px] text-[12.5px] font-bold italic text-[#7b1c28] shadow-[0_5px_0_#9e2336] active:translate-y-[2px] active:shadow-[0_3px_0_#9e2336] ${className}`}
    >
      {children}
    </button>
  );
}

function SmileyFace() {
  return (
    <svg
      viewBox="0 0 60 60"
      width="62"
      height="62"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="30"
        cy="30"
        r="27"
        fill="white"
        stroke="#24202a"
        strokeWidth="3"
      />
      <circle cx="20" cy="23" r="3.2" fill="#24202a" />
      <circle cx="40" cy="23" r="3.2" fill="#24202a" />
      <path
        d="M17 35 Q30 46 43 35"
        fill="none"
        stroke="#24202a"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BirthdayTitleScene({ onNext }: BirthdayTitleSceneProps) {
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [isLoveOpen, setIsLoveOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      confetti({ particleCount: 90, spread: 80, origin: { x: 0.08, y: 0.18 } });
      confetti({ particleCount: 90, spread: 80, origin: { x: 0.92, y: 0.18 } });
    }, 2850);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#fcd5e2]">
      <div className="pointer-events-none absolute inset-0 opacity-[0.25] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:34px_34px]" />

      <MusicButton />

      <CornerFlags side="left" />
      <CornerFlags side="right" />

      <Sparkle className="left-[7%]  top-[34%] text-[18px]" />
      <Sparkle className="left-[32%] top-[22%] text-[13px]" />
      <Sparkle className="left-[36%] top-[72%] text-[13px]" />
      <Sparkle className="right-[11%] top-[30%] text-[18px]" />
      <Sparkle className="right-[22%] bottom-[22%] text-[13px]" />
      <Sparkle className="left-[44%] top-[54%] text-[11px]" />

      <div className="relative z-20 flex min-h-screen items-center px-[5%]">
        <div className="mt-[-5%] flex flex-col">
          <div className="relative inline-block w-fit">
            <PartyHat />

            <h1
              className="flex leading-[0.88]"
              style={{ letterSpacing: "-2px" }}
            >
              {happy.map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 52, scale: 0.68 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: 0.85 + index * 0.09,
                    duration: 0.42,
                    type: "spring",
                    stiffness: 172,
                    damping: 13,
                  }}
                  style={{
                    fontSize: "clamp(80px, 10.5vw, 126px)",
                    fontWeight: 900,
                    color: "#ffffff",
                    WebkitTextStroke: "4px #1e1b24",
                    textShadow: "4px 7px 0px #1e1b24",
                    display: "inline-block",
                    lineHeight: 0.9,
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </h1>

            <h2
              className="flex leading-[0.88]"
              style={{ letterSpacing: "-2px", marginTop: "16px" }}
            >
              {birthday.map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 48, scale: 0.68 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: 1.42 + index * 0.06,
                    duration: 0.42,
                    type: "spring",
                    stiffness: 172,
                    damping: 13,
                  }}
                  style={{
                    fontSize: "clamp(86px, 11.2vw, 134px)",
                    fontWeight: 900,
                    color: "#e8304a",
                    WebkitTextStroke: "3px #6e1520",
                    textShadow: "4px 7px 0px #6e1520",
                    display: "inline-block",
                    lineHeight: 0.9,
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.0, duration: 0.42 }}
            className="mt-7 flex h-[42px] w-[290px] items-center justify-between rounded-[13px] border-[2px] border-[#d7354d] bg-[#ff6578] px-6 text-[14px] font-bold text-[#7b1c28] shadow-[0_5px_0_#9e2336]"
          >
            <span>★</span>
            <span>8 June</span>
            <span>★</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.2, duration: 0.42 }}
            className="mt-3 flex gap-3"
          >
            <PinkButton
              onClick={() => setIsBookOpen(true)}
              className="w-41.25 cursor-pointer"
            >
              ♡ Check Here Razan
            </PinkButton>
            <PinkButton
              onClick={() => setIsLoveOpen(true)}
              className="w-34.5 cursor-pointer"
            >
              ▻ From Razan
            </PinkButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 650, scale: 0.96 }}
          animate={{ opacity: 2, y: 0, scale: 1 }}
          transition={{
            delay: 2.9,
            duration: 9,
            type: "spring",
            stiffness: 8,
            damping: 22,
          }}
          className="relative ml-auto"
          style={{ marginRight: "3%", marginTop: "-2%" }}
        >
          <PhotoBalloons />

          <div
            className="relative z-20 overflow-hidden rounded-full bg-[#f7adc4]"
            style={{
              width: "clamp(260px, 26vw, 340px)",
              height: "clamp(260px, 26vw, 340px)",
              border: "5px solid #1e1b24",
            }}
          >
            <img
              src="/images/memories/memory-1.jpg"
              alt="Razan"
              className="h-full w-full object-cover object-center"
            />
          </div>

          <PinkButton className="absolute -bottom-5 left-1/2 z-30 w-[158px] -translate-x-1/2">
            Dear Razan
          </PinkButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.4, rotate: -12 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            delay: 3.45,
            duration: 0.65,
            type: "spring",
            stiffness: 130,
            damping: 10,
          }}
          className="pointer-events-none absolute select-none"
          style={{ bottom: "22%", left: "42%" }}
        >
          <SmileyFace />
        </motion.div>

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
            {isMessageOpen && (
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
                className="absolute left-1/2 bottom-[28px] w-[240px] -translate-x-1/2 rounded-[4px] bg-[#f5eecb] px-5 py-4 text-left text-[#7b6d47] shadow-sm"
              >
                <p className="mb-3 text-[12px] font-bold">To Razan...</p>

                <p className="text-[11px] leading-[1.7]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>

                <p className="mt-4 text-[11px]">Rajo</p>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setIsMessageOpen((prev) => !prev)}
            className="relative h-[46px] w-[58px] cursor-pointer border-0 bg-transparent p-0"
          >
            <span className="absolute inset-0 bg-[#f23f50]" />

            <motion.span
              initial={false}
              animate={{
                rotateX: isMessageOpen ? 180 : 0,
                y: isMessageOpen ? -7 : 0,
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

            <span className="absolute right-[8px] bottom-[8px] text-[12px] text-white">
              ✦
            </span>
          </button>
        </motion.div>
      </div>

      <EnvelopeMessage
        isOpen={isMessageOpen}
        onToggle={() => setIsMessageOpen((prev) => !prev)}
      />
      <BirthdayBookPopup
        isOpen={isBookOpen}
        onClose={() => setIsBookOpen(false)}
      />
      <LoveHeartScene
        isOpen={isLoveOpen}
        onClose={() => setIsLoveOpen(false)}
      />
    </section>
  );
}