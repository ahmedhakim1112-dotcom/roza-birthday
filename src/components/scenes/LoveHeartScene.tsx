"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

import { HeartIntro, SmallHeart } from "@/components/animations/HeartAnimation";
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

type SceneSize = "mobile" | "tablet" | "desktop";

function useSceneSize(): SceneSize {
  const [sceneSize, setSceneSize] = useState<SceneSize>("desktop");

  useEffect(() => {
    const updateSceneSize = () => {
      if (window.matchMedia("(max-width: 767px)").matches) {
        setSceneSize("mobile");
        return;
      }

      if (window.matchMedia("(max-width: 1023px)").matches) {
        setSceneSize("tablet");
        return;
      }

      setSceneSize("desktop");
    };

    updateSceneSize();

    window.addEventListener("resize", updateSceneSize);

    return () => {
      window.removeEventListener("resize", updateSceneSize);
    };
  }, []);

  return sceneSize;
}

function SceneFloatingHearts() {
  const hearts = useMemo(
    () => [
      { left: "8%", size: 8, duration: 13, delay: 0.6, drift: 18 },
      { left: "18%", size: 6, duration: 15, delay: 2.2, drift: -14 },
      { left: "28%", size: 7, duration: 14, delay: 4.1, drift: 16 },
      { left: "38%", size: 5, duration: 16, delay: 1.4, drift: -18 },
      { left: "48%", size: 8, duration: 15, delay: 3.2, drift: 12 },
      { left: "58%", size: 6, duration: 14, delay: 5.4, drift: -12 },
      { left: "68%", size: 9, duration: 17, delay: 2.8, drift: 20 },
      { left: "78%", size: 6, duration: 15, delay: 6.6, drift: -16 },
      { left: "88%", size: 7, duration: 14, delay: 4.8, drift: 14 },
      { left: "12%", size: 5, duration: 18, delay: 7.4, drift: -10 },
      { left: "34%", size: 6, duration: 17, delay: 8.5, drift: 15 },
      { left: "52%", size: 5, duration: 16, delay: 9.7, drift: -15 },
      { left: "72%", size: 7, duration: 18, delay: 10.8, drift: 18 },
      { left: "92%", size: 5, duration: 17, delay: 11.9, drift: -12 },
    ],
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
      {hearts.map((heart, index) => (
        <span
          key={index}
          className="love-scene-floating-heart absolute -top-8 text-white/85"
          style={
            {
              left: heart.left,
              fontSize: `${heart.size}px`,
              animationDuration: `${heart.duration}s`,
              animationDelay: `${heart.delay}s`,
              "--heart-drift": `${heart.drift}px`,
            } as React.CSSProperties
          }
        >
          ♥
        </span>
      ))}
    </div>
  );
}

function getResponsiveCardMotion(
  sceneSize: SceneSize,
  index: number,
  desktopCard: {
    x: string | number;
    y: string | number;
    rotate: number;
  }
) {
  if (sceneSize === "desktop") {
    return {
      x: desktopCard.x,
      y: desktopCard.y,
      rotate: desktopCard.rotate,
      scale: 1,
    };
  }

  if (sceneSize === "tablet") {
    const tabletLayouts = [
      { x: "-118%", y: -150, rotate: -7 },
      { x: "18%", y: -120, rotate: 5 },
      { x: "-104%", y: 70, rotate: 4 },
      { x: "4%", y: 105, rotate: -6 },
      { x: "-50%", y: -8, rotate: 0 },
    ];

    const layout = tabletLayouts[index % tabletLayouts.length];

    return {
      ...layout,
      scale: 0.9,
    };
  }

  const mobileLayouts = [
    { x: "-86%", y: -170, rotate: -6 },
    { x: "-14%", y: -122, rotate: 5 },
    { x: "-88%", y: 18, rotate: 4 },
    { x: "-12%", y: 82, rotate: -5 },
    { x: "-50%", y: 185, rotate: 2 },
  ];

  const layout = mobileLayouts[index % mobileLayouts.length];

  return {
    ...layout,
    scale: 0.74,
  };
}

function LoveHeartSceneContent({ onClose }: LoveHeartSceneContentProps) {
  const [showEnvelope, setShowEnvelope] = useState(false);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [showLetterCards, setShowLetterCards] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [isSceneMusicPlaying, setIsSceneMusicPlaying] = useState(false);

  const sceneSize = useSceneSize();
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
        className="absolute right-6 top-5 z-[160] flex h-9 w-9 items-center justify-center rounded-full bg-white/14 text-[25px] font-black leading-none text-white shadow-[0_0_18px_rgba(255,255,255,0.2)] backdrop-blur-sm transition hover:bg-white/22 max-[767px]:right-4 max-[767px]:top-4 max-[767px]:h-8 max-[767px]:w-8 max-[767px]:text-[23px]"
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

      <SceneFloatingHearts />

      <motion.div
        className="absolute left-1/2 top-1/2 h-[min(68vw,430px)] w-[min(68vw,430px)] -translate-x-1/2 -translate-y-1/2 max-[767px]:h-[min(76vw,310px)] max-[767px]:w-[min(76vw,310px)]"
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
            className="absolute left-1/2 top-1/2 h-[520px] w-[780px] max-w-[96vw] -translate-x-1/2 -translate-y-1/2 max-[1023px]:h-[470px] max-[1023px]:w-[650px] max-[767px]:top-[52%] max-[767px]:h-[430px] max-[767px]:w-full max-[767px]:max-w-none"
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
            <div className="absolute left-1/2 top-1/2 h-[280px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b90021]/22 blur-[38px] max-[767px]:h-[190px] max-[767px]:w-[310px] max-[767px]:blur-[30px]" />

            <AnimatePresence>
              {showLetterCards &&
                letterCards.map((card, index) => {
                  const isArabic = card.lang === "ar";
                  const cardMotion = getResponsiveCardMotion(sceneSize, index, {
                    x: card.x,
                    y: card.y,
                    rotate: card.rotate,
                  });

                  return (
                    <motion.div
                      key={index}
                      drag
                      dragMomentum={false}
                      onPointerDown={() => setActiveCard(index)}
                      className={`absolute left-1/2 top-[44%] ${
                        card.widthClass ?? "w-[315px]"
                      } cursor-grab rounded-[2px] bg-[#fffdfb] px-8 pb-6 pt-7 text-center shadow-[0_16px_28px_rgba(60,0,14,0.18)] active:cursor-grabbing max-[1023px]:top-[47%] max-[1023px]:w-[290px] max-[1023px]:px-6 max-[1023px]:pb-5 max-[1023px]:pt-6 max-[767px]:top-[44%] max-[767px]:w-[min(74vw,255px)] max-[767px]:px-4 max-[767px]:pb-4 max-[767px]:pt-4`}
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
                        x: cardMotion.x,
                        y: cardMotion.y,
                        scale: cardMotion.scale,
                        rotate: cardMotion.rotate,
                      }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      whileDrag={{
                        scale: sceneSize === "desktop" ? 1.04 : 0.92,
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
                      <div className="mb-4 flex items-center justify-center gap-2 text-[#b91d33] max-[767px]:mb-3">
                        <span
                          className="text-[12px] tracking-[0.26em] max-[767px]:text-[11px]"
                          style={{ fontFamily: englishHandFont }}
                        >
                          xXx
                        </span>

                        <SmallHeart className="h-[13px] w-[13px] max-[767px]:h-[11px] max-[767px]:w-[11px]" />

                        <span className="text-[10px]">•</span>
                      </div>

                      <p
                        dir={isArabic ? "rtl" : "ltr"}
                        className={`mx-auto whitespace-pre-line text-center font-semibold text-[#352925] ${
                          isArabic
                            ? "max-w-[292px] text-[14px] leading-[1.92]"
                            : "max-w-[260px] text-[14px] leading-[1.58]"
                        } max-[1023px]:text-[13px] max-[767px]:max-w-[245px] max-[767px]:text-[11.3px] max-[767px]:leading-[1.65] ${
                          card.textClassName ?? ""
                        }`}
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
                        } max-[767px]:mt-4 max-[767px]:text-[11.5px]`}
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

            <div className="absolute left-1/2 top-1/2 z-50 h-[390px] w-[620px] max-w-[92vw] -translate-x-1/2 -translate-y-1/2 max-[1023px]:h-[350px] max-[1023px]:w-[540px] max-[767px]:h-[300px] max-[767px]:w-[min(92vw,350px)]">
              <AnimatePresence>
                {isEnvelopeOpen && !showLetterCards && (
                  <motion.button
                    type="button"
                    onClick={() => setShowLetterCards(true)}
                    className="absolute left-1/2 top-[54px] z-20 h-[235px] w-[370px] -translate-x-1/2 cursor-pointer overflow-hidden rounded-[1px] border-0 bg-[#fffdfb] px-8 pb-6 pt-7 text-center shadow-[0_8px_18px_rgba(80,18,12,0.1)] max-[1023px]:h-[215px] max-[1023px]:w-[330px] max-[767px]:top-[48px] max-[767px]:h-[178px] max-[767px]:w-[270px] max-[767px]:px-5 max-[767px]:pb-5 max-[767px]:pt-5"
                    initial={{ y: 126, opacity: 0, scale: 0.96 }}
                    animate={{ y: sceneSize === "mobile" ? -20 : -38, opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94, y: -56 }}
                    transition={{
                      duration: 0.82,
                      type: "spring",
                      stiffness: 76,
                      damping: 14,
                    }}
                  >
                    <div className="mb-4 flex items-center justify-center gap-2 text-[#b91d33] max-[767px]:mb-3">
                      <span
                        className="text-[13px] tracking-[0.28em] max-[767px]:text-[11px]"
                        style={{ fontFamily: englishHandFont }}
                      >
                        xXx
                      </span>

                      <SmallHeart className="h-[12px] w-[12px] max-[767px]:h-[10px] max-[767px]:w-[10px]" />

                      <span className="text-[10px]">•</span>
                    </div>

                    <p
                      className="mx-auto max-w-[305px] text-center text-[16px] font-semibold leading-[2] text-[#352925] max-[767px]:max-w-[225px] max-[767px]:text-[12.5px] max-[767px]:leading-[1.75]"
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
                      className="mt-5 text-center text-[13px] font-bold text-[#5b433d] max-[767px]:mt-4 max-[767px]:text-[12px]"
                      style={{ fontFamily: arabicCardFont }}
                    >
                      افتحيهم
                    </p>
                  </motion.button>
                )}
              </AnimatePresence>

              <div className="absolute bottom-0 left-1/2 z-30 h-[285px] w-[520px] -translate-x-1/2 max-[1023px]:h-[250px] max-[1023px]:w-[455px] max-[767px]:h-[190px] max-[767px]:w-[min(88vw,330px)]">
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
                  className="absolute left-0 top-0 z-50 h-[155px] w-full origin-top max-[1023px]:h-[135px] max-[767px]:h-[104px]"
                  initial={false}
                  animate={{
                    rotateX: isEnvelopeOpen ? 180 : 0,
                    y: isEnvelopeOpen
                      ? sceneSize === "mobile"
                        ? -60
                        : sceneSize === "tablet"
                          ? -78
                          : -92
                      : 0,
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
                    <div className="absolute left-1/2 top-[26px] -translate-x-1/2 text-center max-[767px]:top-[18px]">
                      <p className="text-[15px] font-medium tracking-[0.01em] text-[#4a352f] max-[767px]:text-[13px]">
                        Envelope Of Love
                      </p>

                      <p
                        className="mt-2 text-[18px] italic text-[#7b6158] max-[767px]:mt-1.5 max-[767px]:text-[16px]"
                        style={{ fontFamily: englishHandFont }}
                      >
                        Dear Razan
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute left-1/2 top-[145px] z-[60] -translate-x-1/2 max-[1023px]:top-[126px] max-[767px]:top-[96px]"
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
                    className="relative flex h-[82px] w-[90px] items-center justify-center border-0 bg-transparent disabled:cursor-default max-[767px]:h-[68px] max-[767px]:w-[74px]"
                    aria-label="Open envelope"
                  >
                    <SmallHeart className="absolute inset-0 h-full w-full drop-shadow-[0_8px_14px_rgba(90,10,18,0.22)]" />

                    <span className="relative z-10 text-[13px] font-black text-white max-[767px]:text-[12px]">
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

        .love-scene-floating-heart {
          opacity: 0;
          transform: translate3d(0, -12vh, 0) scale(0.78);
          animation-name: love-scene-heart-fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform, opacity;
        }

        @keyframes love-scene-heart-fall {
          0% {
            opacity: 0;
            transform: translate3d(0, -12vh, 0) scale(0.78);
          }

          12% {
            opacity: 0.72;
          }

          48% {
            transform: translate3d(var(--heart-drift), 48vh, 0) scale(1);
          }

          88% {
            opacity: 0.66;
          }

          100% {
            opacity: 0;
            transform: translate3d(calc(var(--heart-drift) * -0.45), 112vh, 0)
              scale(0.86);
          }
        }

        @media (max-width: 767px) {
          .love-scene-floating-heart {
            opacity: 0;
            animation-duration: 17s !important;
          }
        }
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