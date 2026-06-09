"use client";

import confetti from "canvas-confetti";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import {
  BirthdayBookPopup,
  EnvelopeMessage,
} from "@/components/scenes/EnvelopeLettersScene";
import { LoveHeartScene } from "@/components/scenes/LoveHeartScene";
import PhotoBalloonsScene from "@/components/scenes/PhotoBalloonsScene";
import MusicButton from "@/components/shared/MusicButton";

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
      className="pointer-events-none absolute top-[8px] z-30 max-sm:top-[2px] max-sm:scale-[0.72] sm:max-md:top-[4px] sm:max-md:scale-[0.82]"
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
      className="pointer-events-none absolute left-[78%] top-[-62px] z-30 h-[102px] w-[80px] max-sm:left-[72%] max-sm:top-[-34px] max-sm:h-[58px] max-sm:w-[46px] sm:max-md:top-[-44px] sm:max-md:h-[76px] sm:max-md:w-[60px]"
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
      className={`rounded-[14px] border-[2px] border-[#d7354d] bg-[#ff6578] py-[8px] text-[12.5px] font-bold italic text-[#7b1c28] shadow-[0_5px_0_#9e2336] active:translate-y-[2px] active:shadow-[0_3px_0_#9e2336] max-sm:rounded-[12px] max-sm:py-[7px] max-sm:text-[11px] ${className}`}
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
      className="max-sm:h-[38px] max-sm:w-[38px] sm:max-md:h-[48px] sm:max-md:w-[48px]"
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

function EnvelopeButton({
  isOpen,
  onClick,
  className = "",
}: {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative h-[46px] w-[58px] cursor-pointer border-0 bg-transparent p-0 ${className}`}
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
  );
}

function ButterflyDecoration() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22, scale: 0.55, rotate: 16 }}
      animate={{
        opacity: 1,
        y: [0, -4, 0],
        scale: 1,
        rotate: [-10, -15, -10],
      }}
      transition={{
        opacity: { delay: 3.65, duration: 0.35 },
        scale: {
          delay: 3.65,
          duration: 0.65,
          type: "spring",
          stiffness: 145,
          damping: 11,
        },
        y: {
          delay: 4.05,
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
        },
        rotate: {
          delay: 4.05,
          duration: 3.2,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      className="pointer-events-none absolute bottom-[108px] right-[48px] z-40 h-[64px] w-[64px] select-none max-sm:bottom-[92px] max-sm:right-[18px] max-sm:h-[54px] max-sm:w-[54px] sm:max-md:bottom-[86px] sm:max-md:right-[28px]"
    >
      <span className="absolute inset-[5px] rounded-full bg-white/35 shadow-[0_12px_24px_rgba(174,42,86,0.18)] backdrop-blur-sm" />

      <motion.svg
        viewBox="0 0 96 96"
        className="relative z-10 h-full w-full drop-shadow-[0_10px_14px_rgba(120,35,75,0.22)]"
      >
        <defs>
          <linearGradient
            id="butterflyLeftWing"
            x1="18"
            y1="18"
            x2="48"
            y2="72"
          >
            <stop offset="0%" stopColor="#ffbfd0" />
            <stop offset="45%" stopColor="#f46b96" />
            <stop offset="100%" stopColor="#d92f5a" />
          </linearGradient>

          <linearGradient
            id="butterflyRightWing"
            x1="78"
            y1="18"
            x2="48"
            y2="72"
          >
            <stop offset="0%" stopColor="#ffd3df" />
            <stop offset="45%" stopColor="#ff7aa0" />
            <stop offset="100%" stopColor="#e33a63" />
          </linearGradient>

          <linearGradient id="butterflyBody" x1="48" y1="28" x2="48" y2="76">
            <stop offset="0%" stopColor="#7b1c42" />
            <stop offset="100%" stopColor="#3b1026" />
          </linearGradient>
        </defs>

        <motion.path
          d="M46 42 C35 15 13 14 10 35 C8 53 26 60 43 52 C31 64 34 80 45 73 C52 68 51 52 46 42Z"
          fill="url(#butterflyLeftWing)"
          stroke="#7b1c42"
          strokeWidth="2.2"
          animate={{ rotate: [-3, 2, -3] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "46px 49px" }}
        />

        <motion.path
          d="M50 42 C61 15 83 14 86 35 C88 53 70 60 53 52 C65 64 62 80 51 73 C44 68 45 52 50 42Z"
          fill="url(#butterflyRightWing)"
          stroke="#7b1c42"
          strokeWidth="2.2"
          animate={{ rotate: [3, -2, 3] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "50px 49px" }}
        />

        <path
          d="M48 34 C52 43 52 62 48 76 C44 62 44 43 48 34Z"
          fill="url(#butterflyBody)"
        />

        <path
          d="M45 34 C38 24 31 22 25 24"
          fill="none"
          stroke="#3b1026"
          strokeWidth="2.4"
          strokeLinecap="round"
        />

        <path
          d="M51 34 C58 24 65 22 71 24"
          fill="none"
          stroke="#3b1026"
          strokeWidth="2.4"
          strokeLinecap="round"
        />

        <circle cx="32" cy="38" r="3.1" fill="#ffd2df" opacity="0.95" />
        <circle cx="25" cy="47" r="2.3" fill="#fff1f6" opacity="0.9" />
        <circle cx="64" cy="38" r="3.1" fill="#ffdce7" opacity="0.95" />
        <circle cx="71" cy="47" r="2.3" fill="#fff1f6" opacity="0.9" />
      </motion.svg>
    </motion.div>
  );
}

export function BirthdayTitleScene({ onNext }: BirthdayTitleSceneProps) {
  const [isDesktopMessageOpen, setIsDesktopMessageOpen] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [isLoveOpen, setIsLoveOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      confetti({ particleCount: 90, spread: 80, origin: { x: 0.08, y: 0.18 } });
      confetti({ particleCount: 90, spread: 80, origin: { x: 0.92, y: 0.18 } });
    }, 2850);

    return () => clearTimeout(timer);
  }, []);

  void onNext;

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#fcd5e2] max-md:h-[100dvh] max-md:min-h-[100dvh]">
      <div className="pointer-events-none absolute inset-0 opacity-[0.25] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:34px_34px]" />

      <MusicButton />

      <CornerFlags side="left" />
      <CornerFlags side="right" />

      <Sparkle className="left-[7%] top-[34%] text-[18px] max-sm:left-[8%] max-sm:top-[25%] max-sm:text-[12px]" />
      <Sparkle className="left-[32%] top-[22%] text-[13px] max-sm:left-[19%] max-sm:top-[18%] max-sm:text-[9px]" />
      <Sparkle className="left-[36%] top-[72%] text-[13px] max-sm:left-[14%] max-sm:top-[58%] max-sm:text-[10px]" />
      <Sparkle className="right-[11%] top-[30%] text-[18px] max-sm:right-[10%] max-sm:top-[30%] max-sm:text-[12px]" />
      <Sparkle className="right-[22%] bottom-[22%] text-[13px] max-sm:right-[16%] max-sm:bottom-[30%] max-sm:text-[10px]" />
      <Sparkle className="left-[44%] top-[54%] text-[11px] max-sm:left-[50%] max-sm:top-[42%] max-sm:text-[9px]" />
      <Sparkle className="left-[18%] top-[48%] text-[11px] max-sm:text-[9px]" />
      <Sparkle className="right-[31%] top-[55%] text-[12px] max-sm:text-[9px]" />
      <Sparkle className="right-[8%] bottom-[41%] text-[10px] max-sm:text-[8px]" />
      <Sparkle className="left-[51%] bottom-[18%] text-[10px] max-sm:text-[8px]" />

      <div className="relative z-20 flex min-h-screen items-center px-[5%] max-md:h-[100dvh] max-md:min-h-0 max-md:flex-col max-md:justify-start max-md:px-4 max-md:pb-[92px] max-md:pt-[70px] max-sm:pb-[88px] max-sm:pt-[66px]">
        <div className="mt-[-5%] flex flex-col max-md:order-2 max-md:mt-[-8px] max-md:w-full max-md:items-center max-sm:mt-[-12px]">
          <div className="relative inline-block w-fit max-md:max-w-full">
            <PartyHat />

            <h1 className="flex leading-[0.88] tracking-[-2px] max-sm:tracking-[-3.5px]">
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
                  className="inline-block text-[clamp(80px,10.5vw,126px)] font-black leading-[0.9] text-white [-webkit-text-stroke:4px_#1e1b24] [text-shadow:4px_7px_0px_#1e1b24] max-sm:text-[54px] max-sm:[-webkit-text-stroke:2.3px_#1e1b24] max-sm:[text-shadow:2.4px_3.8px_0px_#1e1b24] sm:max-md:text-[72px] sm:max-md:[-webkit-text-stroke:3px_#1e1b24] sm:max-md:[text-shadow:3px_5px_0px_#1e1b24]"
                >
                  {letter}
                </motion.span>
              ))}
            </h1>

            <h2 className="mt-4 flex leading-[0.88] tracking-[-2px] max-sm:mt-2 max-sm:tracking-[-4.5px] sm:max-md:mt-3">
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
                  className="inline-block text-[clamp(86px,11.2vw,134px)] font-black leading-[0.9] text-[#e8304a] [-webkit-text-stroke:3px_#6e1520] [text-shadow:4px_7px_0px_#6e1520] max-sm:text-[44px] max-sm:[-webkit-text-stroke:2px_#6e1520] max-sm:[text-shadow:2.3px_3.8px_0px_#6e1520] sm:max-md:text-[62px] sm:max-md:[-webkit-text-stroke:2.5px_#6e1520] sm:max-md:[text-shadow:3px_5px_0px_#6e1520]"
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
            className="mt-7 flex h-[42px] w-[290px] items-center justify-between rounded-[13px] border-[2px] border-[#d7354d] bg-[#ff6578] px-6 text-[14px] font-bold text-[#7b1c28] shadow-[0_5px_0_#9e2336] max-sm:mt-5 max-sm:h-[38px] max-sm:w-full max-sm:max-w-[300px] max-sm:px-5 max-sm:text-[13px] sm:max-md:max-w-[330px]"
          >
            <span>★</span>
            <span>8 June</span>
            <span>★</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.2, duration: 0.42 }}
            className="mt-3 flex gap-3 max-sm:w-full max-sm:max-w-[300px] max-sm:gap-2 sm:max-md:max-w-[330px]"
          >
            <PinkButton
              onClick={() => setIsBookOpen(true)}
              className="w-41.25 cursor-pointer max-sm:flex-1 sm:max-md:w-[168px]"
            >
              ♡ Check Here Razan
            </PinkButton>

            <PinkButton
              onClick={() => setIsLoveOpen(true)}
              className="w-34.5 cursor-pointer max-sm:flex-1 sm:max-md:w-[142px]"
            >
              ▻ From Razan
            </PinkButton>
          </motion.div>
        </div>

        <PhotoBalloonsScene />

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
          className="pointer-events-none absolute bottom-[22%] left-[42%] select-none max-md:hidden"
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
          className="absolute bottom-[6%] left-[48%] z-40 max-md:hidden"
        >
          <AnimatePresence>
            {isDesktopMessageOpen && (
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>

                <p className="mt-4 text-[11px]">Rajo</p>
              </motion.div>
            )}
          </AnimatePresence>

          <EnvelopeButton
            isOpen={isDesktopMessageOpen}
            onClick={() => setIsDesktopMessageOpen((prev) => !prev)}
          />
        </motion.div>

        <ButterflyDecoration />

        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.78 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: 3.55,
            duration: 0.55,
            type: "spring",
            stiffness: 135,
            damping: 12,
          }}
          className="pointer-events-none absolute z-30 hidden select-none max-md:block max-sm:left-[18px] max-sm:top-[54%] sm:max-md:left-[10%] sm:max-md:top-[58%]"
        >
          <SmileyFace />
        </motion.div>
      </div>

      <EnvelopeMessage
        isOpen={isDesktopMessageOpen}
        onToggle={() => setIsDesktopMessageOpen((prev) => !prev)}
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