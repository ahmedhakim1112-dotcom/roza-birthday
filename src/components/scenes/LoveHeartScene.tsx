"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { HeartIntro, SmallHeart } from "@/components/animations/HeartAnimation";
import { LoveFloatingHearts } from "@/components/shared/FloatingHearts";
import { LoveSceneMusicButton } from "@/components/shared/LoveSceneMusicButton";
import {
  arabicCardFont,
  englishHandFont,
  letterCards,
  LOVE_SCENE_MUSIC_SRC,
} from "@/data/love-heart-data";
import { STOP_GLOBAL_MUSIC_EVENT } from "@/lib/audio-events";

type LoveHeartSceneProps = {
  isOpen: boolean;
  onClose: () => void;
};

type LoveHeartSceneContentProps = {
  onClose: () => void;
};

function LoveHeartSceneContent({ onClose }: LoveHeartSceneContentProps) {
  const [showEnvelope, setShowEnvelope] = useState(false);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [showLetterCards, setShowLetterCards] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [isSceneMusicPlaying, setIsSceneMusicPlaying] = useState(false);

  const sceneAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    window.dispatchEvent(new Event(STOP_GLOBAL_MUSIC_EVENT));

    const timer = window.setTimeout(() => {
      setShowEnvelope(true);
    }, 6900);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const sceneAudio = sceneAudioRef.current;

    if (!sceneAudio) return;

    window.dispatchEvent(new Event(STOP_GLOBAL_MUSIC_EVENT));

    sceneAudio.volume = 0.45;
    sceneAudio.loop = true;

    sceneAudio
      .play()
      .then(() => {
        setIsSceneMusicPlaying(true);
      })
      .catch(() => {
        setIsSceneMusicPlaying(false);
      });

    return () => {
      sceneAudio.pause();
      sceneAudio.currentTime = 0;
    };
  }, []);

  const toggleSceneMusic = () => {
    const audio = sceneAudioRef.current;

    if (!audio) return;

    window.dispatchEvent(new Event(STOP_GLOBAL_MUSIC_EVENT));

    audio.volume = 0.45;
    audio.loop = true;

    if (audio.paused) {
      audio
        .play()
        .then(() => {
          setIsSceneMusicPlaying(true);
        })
        .catch(() => {
          setIsSceneMusicPlaying(false);
        });

      return;
    }

    audio.pause();
    setIsSceneMusicPlaying(false);
  };

  const handleClose = () => {
    const audio = sceneAudioRef.current;

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    setIsSceneMusicPlaying(false);
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden bg-[#812630]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
    >
      <button
        type="button"
        onClick={handleClose}
        className="absolute right-6 top-5 z-[160] flex h-9 w-9 items-center justify-center rounded-full bg-white/14 text-[25px] font-black leading-none text-white shadow-[0_0_18px_rgba(255,255,255,0.2)] backdrop-blur-sm transition hover:bg-white/22"
        aria-label="Close love letters"
      >
        ×
      </button>

      <audio
        ref={sceneAudioRef}
        src={LOVE_SCENE_MUSIC_SRC}
        preload="auto"
        onPlay={() => setIsSceneMusicPlaying(true)}
        onPause={() => setIsSceneMusicPlaying(false)}
        onEnded={() => setIsSceneMusicPlaying(false)}
      />

      <LoveSceneMusicButton
        isPlaying={isSceneMusicPlaying}
        onToggle={toggleSceneMusic}
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_52%,rgba(255,140,160,0.14),transparent_20%),radial-gradient(circle_at_50%_56%,rgba(120,0,22,0.24),transparent_38%),linear-gradient(180deg,rgba(255,20,55,0.06),rgba(140,0,25,0.08))]" />

      <LoveFloatingHearts visible />

      <motion.div
        className="absolute left-1/2 top-1/2 h-[min(68vw,430px)] w-[min(68vw,430px)] -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 1 }}
        animate={{
          opacity: showEnvelope ? 0 : 1,
          scale: showEnvelope ? 0.96 : 1,
        }}
        transition={{ duration: 0.45 }}
      >
        <HeartIntro />
      </motion.div>

      <AnimatePresence>
        {showEnvelope && (
          <motion.div
            className="absolute left-1/2 top-1/2 h-[520px] w-[780px] max-w-[96vw] -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0.84, y: 44 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 34 }}
            transition={{
              duration: 0.72,
              type: "spring",
              stiffness: 90,
              damping: 14,
            }}
          >
            <div className="absolute left-1/2 top-1/2 h-[280px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b90021]/22 blur-[38px]" />

            <AnimatePresence>
              {showLetterCards &&
                letterCards.map((card, index) => {
                  const isArabic = card.lang === "ar";

                  return (
                    <motion.div
                      key={index}
                      drag
                      dragMomentum={false}
                      onPointerDown={() => setActiveCard(index)}
                      className={`absolute left-1/2 top-[44%] ${
                        card.widthClass ?? "w-[315px]"
                      } cursor-grab rounded-[2px] bg-[#fffdfb] px-8 pb-6 pt-7 text-center shadow-[0_16px_28px_rgba(60,0,14,0.18)] active:cursor-grabbing`}
                      style={{
                        zIndex: activeCard === index ? 130 : 80 + index,
                      }}
                      initial={{
                        opacity: 0,
                        x: "-50%",
                        y: 28,
                        scale: 0.72,
                        rotate: 0,
                      }}
                      animate={{
                        opacity: 1,
                        x: card.x,
                        y: card.y,
                        scale: 1,
                        rotate: card.rotate,
                      }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      whileDrag={{
                        scale: 1.04,
                        rotate: 0,
                        zIndex: 150,
                      }}
                      transition={{
                        delay: card.delay,
                        duration: 0.9,
                        type: "spring",
                        stiffness: 68,
                        damping: 16,
                      }}
                    >
                      <div className="mb-4 flex items-center justify-center gap-2 text-[#b91d33]">
                        <span
                          className="text-[12px] tracking-[0.26em]"
                          style={{ fontFamily: englishHandFont }}
                        >
                          xXx
                        </span>

                        <SmallHeart className="h-[13px] w-[13px]" />

                        <span className="text-[10px]">•</span>
                      </div>

                      <p
                        dir={isArabic ? "rtl" : "ltr"}
                        className={`mx-auto whitespace-pre-line text-center font-semibold text-[#352925] ${
                          isArabic
                            ? "max-w-[292px] text-[14px] leading-[1.92]"
                            : "max-w-[260px] text-[14px] leading-[1.58]"
                        } ${card.textClassName ?? ""}`}
                        style={{
                          fontFamily: isArabic
                            ? arabicCardFont
                            : englishHandFont,
                        }}
                      >
                        {card.text}
                      </p>

                      <p
                        dir={isArabic ? "rtl" : "ltr"}
                        className={`mt-5 text-center text-[#5b433d] ${
                          isArabic
                            ? "text-[14px] font-bold"
                            : "text-[13px] italic"
                        }`}
                        style={{
                          fontFamily: isArabic
                            ? arabicCardFont
                            : englishHandFont,
                        }}
                      >
                        {card.signature}
                      </p>
                    </motion.div>
                  );
                })}
            </AnimatePresence>

            <div className="absolute left-1/2 top-1/2 z-50 h-[390px] w-[620px] max-w-[92vw] -translate-x-1/2 -translate-y-1/2">
              <AnimatePresence>
                {isEnvelopeOpen && !showLetterCards && (
                  <motion.button
                    type="button"
                    onClick={() => setShowLetterCards(true)}
                    className="absolute left-1/2 top-[54px] z-20 h-[235px] w-[370px] -translate-x-1/2 cursor-pointer overflow-hidden rounded-[1px] border-0 bg-[#fffdfb] px-8 pb-6 pt-7 text-center shadow-[0_8px_18px_rgba(80,18,12,0.1)]"
                    initial={{ y: 126, opacity: 0, scale: 0.96 }}
                    animate={{ y: -38, opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94, y: -56 }}
                    transition={{
                      duration: 0.82,
                      type: "spring",
                      stiffness: 76,
                      damping: 14,
                    }}
                  >
                    <div className="mb-4 flex items-center justify-center gap-2 text-[#b91d33]">
                      <span
                        className="text-[13px] tracking-[0.28em]"
                        style={{ fontFamily: englishHandFont }}
                      >
                        xXx
                      </span>

                      <SmallHeart className="h-[12px] w-[12px]" />

                      <span className="text-[10px]">•</span>
                    </div>

                    <p
                      className="mx-auto max-w-[305px] text-center text-[16px] font-semibold leading-[2] text-[#352925]"
                      style={{ fontFamily: arabicCardFont }}
                      dir="rtl"
                    >
                      في شوية رسايل صغيرة ليكي،
                      <br />
                      كل واحدة فيهم فيها كلمة حلوة
                      <br />
                      مخصوص علشانك 🤍
                    </p>

                    <p
                      className="mt-5 text-center text-[13px] font-bold text-[#5b433d]"
                      style={{ fontFamily: arabicCardFont }}
                    >
                      افتحيهم
                    </p>
                  </motion.button>
                )}
              </AnimatePresence>

              <div className="absolute bottom-0 left-1/2 z-30 h-[285px] w-[520px] -translate-x-1/2">
                <div className="absolute inset-0 rounded-[2px] border border-[#e2cfad] bg-[#f3e3bf] shadow-[0_18px_38px_rgba(72,18,10,0.18)]" />

                <div className="absolute inset-0 overflow-hidden rounded-[2px]">
                  <div className="absolute inset-0 bg-[#f3e3bf]" />

                  <div
                    className="absolute bottom-0 left-0 h-full w-1/2 bg-[#ead6ae]"
                    style={{
                      clipPath: "polygon(0 0, 100% 50%, 0 100%)",
                    }}
                  />

                  <div
                    className="absolute bottom-0 right-0 h-full w-1/2 bg-[#efdcb9]"
                    style={{
                      clipPath: "polygon(100% 0, 0 50%, 100% 100%)",
                    }}
                  />

                  <div
                    className="absolute bottom-0 left-0 h-[58%] w-full bg-[#f7e7c6]"
                    style={{
                      clipPath:
                        "polygon(0 0, 50% 62%, 100% 0, 100% 100%, 0 100%)",
                    }}
                  />
                </div>

                <motion.div
                  className="absolute left-0 top-0 z-50 h-[155px] w-full origin-top"
                  initial={false}
                  animate={{
                    rotateX: isEnvelopeOpen ? 180 : 0,
                    y: isEnvelopeOpen ? -92 : 0,
                  }}
                  transition={{
                    duration: 0.8,
                    type: "spring",
                    stiffness: 80,
                    damping: 12,
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div
                    className="relative h-full w-full overflow-hidden border-t border-[#dfcba7] bg-[#efd9af]"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <div className="absolute left-1/2 top-[26px] -translate-x-1/2 text-center">
                      <p className="text-[15px] font-medium tracking-[0.01em] text-[#4a352f]">
                        Envelope Of Love
                      </p>

                      <p
                        className="mt-2 text-[18px] italic text-[#7b6158]"
                        style={{ fontFamily: englishHandFont }}
                      >
                        Dear Razan
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute left-1/2 top-[145px] z-[60] -translate-x-1/2"
                  animate={{
                    opacity: isEnvelopeOpen ? 0 : 1,
                    scale: isEnvelopeOpen ? 0.75 : 1,
                    pointerEvents: isEnvelopeOpen ? "none" : "auto",
                  }}
                  transition={{ duration: 0.25 }}
                >
                  <button
                    type="button"
                    onClick={() => setIsEnvelopeOpen(true)}
                    disabled={isEnvelopeOpen}
                    className="relative flex h-[82px] w-[90px] items-center justify-center border-0 bg-transparent disabled:cursor-default"
                    aria-label="Open envelope"
                  >
                    <SmallHeart className="absolute inset-0 h-full w-full drop-shadow-[0_8px_14px_rgba(90,10,18,0.22)]" />

                    <span className="relative z-10 text-[13px] font-black text-white">
                      Open
                    </span>
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Marhey:wght@400;500;600;700&display=swap");
      `}</style>
    </motion.div>
  );
}

export function LoveHeartScene({ isOpen, onClose }: LoveHeartSceneProps) {
  return (
    <AnimatePresence>
      {isOpen && <LoveHeartSceneContent onClose={onClose} />}
    </AnimatePresence>
  );
}