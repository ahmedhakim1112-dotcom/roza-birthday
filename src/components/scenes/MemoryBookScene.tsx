"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

type BirthdayBookPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

type BirthdayBookPopupContentProps = {
  onClose: () => void;
};

const ARABIC_INK_COLOR = "#101827";

export function BirthdayBookPopup({
  isOpen,
  onClose,
}: BirthdayBookPopupProps) {
  return (
    <AnimatePresence>
      {isOpen && <BirthdayBookPopupContent onClose={onClose} />}
    </AnimatePresence>
  );
}

function BirthdayBookPopupContent({ onClose }: BirthdayBookPopupContentProps) {
  const [bookOpened, setBookOpened] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const messageScrollRef = useRef<HTMLDivElement | null>(null);
  const messageWheelZoneRef = useRef<HTMLDivElement | null>(null);

  const handFont: CSSProperties = {
    fontFamily: '"Segoe Script", "Brush Script MT", "Comic Sans MS", cursive',
  };

  const arabicHandFont: CSSProperties = {
    fontFamily: '"Aref Ruqaa", "Amiri", "Tahoma", serif',
    color: ARABIC_INK_COLOR,
    textShadow: "none",
  };

  const openBook = () => {
    if (bookOpened || isClosing) return;
    setBookOpened(true);
  };

  const closePopup = () => {
    if (isClosing) return;

    if (!bookOpened) {
      onClose();
      return;
    }

    setIsClosing(true);

    window.setTimeout(() => {
      setBookOpened(false);
      setIsClosing(false);
      onClose();
    }, 820);
  };

  useEffect(() => {
    if (!bookOpened) return;

    const handleWindowWheel = (event: WheelEvent) => {
      const zone = messageWheelZoneRef.current;
      const scrollElement = messageScrollRef.current;

      if (!zone || !scrollElement) return;

      const rect = zone.getBoundingClientRect();
      const isInsideMessage =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (!isInsideMessage) return;

      const maxScrollTop =
        scrollElement.scrollHeight - scrollElement.clientHeight;

      if (maxScrollTop <= 0) return;

      event.preventDefault();
      event.stopPropagation();

      const deltaMultiplier =
        event.deltaMode === 1 ? 32 : event.deltaMode === 2 ? 120 : 1;

      const nextScrollTop = Math.max(
        0,
        Math.min(
          maxScrollTop,
          scrollElement.scrollTop + event.deltaY * deltaMultiplier,
        ),
      );

      scrollElement.scrollTop = nextScrollTop;
    };

    window.addEventListener("wheel", handleWindowWheel, {
      passive: false,
      capture: true,
    });

    return () => {
      window.removeEventListener("wheel", handleWindowWheel, {
        capture: true,
      });
    };
  }, [bookOpened]);

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-[#140d16]/58 px-3 backdrop-blur-[5px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onMouseDown={closePopup}
    >
      <button
        type="button"
        onMouseDown={(event) => {
          event.preventDefault();
          event.stopPropagation();
          closePopup();
        }}
        className="fixed right-8 top-8 z-[200] flex h-10 w-10 items-center justify-center rounded-full bg-[#ff8fab]/80 text-white shadow-[0_0_24px_rgba(255,112,150,0.7)] backdrop-blur-sm transition hover:bg-[#ff7fa0]"
        aria-label="Close"
      >
        <span className="block -translate-y-[2px] text-[28px] font-black leading-none">
          ×
        </span>
      </button>

      <div
        className="relative h-[min(78vh,540px)] w-[min(92vw,850px)]"
        onMouseDown={(event) => event.stopPropagation()}
        style={{ perspective: 1800 }}
      >
        {!bookOpened && (
          <motion.button
            type="button"
            onMouseDown={(event) => {
              event.preventDefault();
              event.stopPropagation();
              openBook();
            }}
            className="absolute left-1/2 top-1/2 z-[120] h-[92%] w-[43%] -translate-x-1/2 -translate-y-1/2 cursor-pointer overflow-hidden rounded-[3px] border-[2px] border-[#ffadc0] bg-[#ffe6f0] p-0 text-left shadow-[0_0_24px_rgba(255,78,124,0.5),0_0_44px_rgba(255,78,124,0.22)]"
            style={{ transformStyle: "preserve-3d" }}
            initial={{
              opacity: 0,
              scale: 0.9,
              rotateX: 6,
              rotateY: -10,
              rotateZ: -3,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotateX: 6,
              rotateY: -10,
              rotateZ: -3,
            }}
            transition={{
              duration: 0.85,
              ease: [0.16, 0.78, 0.2, 1],
            }}
            aria-label="Open birthday book"
          >
            <ClosedCard handFont={handFont} />
          </motion.button>
        )}

        {bookOpened && (
          <motion.div
            className="absolute inset-0 z-[100] rounded-[4px] shadow-[0_0_24px_rgba(255,72,120,0.48),0_0_52px_rgba(255,72,120,0.22)]"
            style={{
              transformStyle: "preserve-3d",
              transformOrigin: "center center",
            }}
            initial={{
              opacity: 0,
              scale: 0.94,
              rotateX: 6,
              rotateY: -13,
              rotateZ: -3,
            }}
            animate={{
              opacity: isClosing ? 0 : 1,
              scale: isClosing ? 0.92 : 1,
              rotateX: 6,
              rotateY: isClosing ? -14 : -10,
              rotateZ: -3,
            }}
            transition={{
              duration: isClosing ? 0.82 : 1.08,
              ease: [0.16, 0.78, 0.2, 1],
            }}
          >
            <motion.div
              className="relative flex h-full w-full overflow-visible rounded-[4px]"
              initial={{ opacity: 0, scaleX: 0.72 }}
              animate={{
                opacity: isClosing ? 0 : 1,
                scaleX: isClosing ? 0.62 : 1,
              }}
              transition={{
                duration: isClosing ? 0.76 : 1.05,
                ease: [0.16, 0.78, 0.2, 1],
              }}
              style={{ transformOrigin: "center center" }}
            >
              <div className="birthday-book-ink relative h-full flex-1 overflow-hidden rounded-l-[4px] border-y-[3px] border-l-[3px] border-[#ff9bb3] bg-[#fff1f6]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_45%_42%,rgba(255,255,255,0.99),rgba(255,243,248,0.96)_54%,rgba(255,216,229,0.65)_100%)]" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-[48px] bg-gradient-to-l from-[#d79aad]/34 via-[#f5d2dc]/18 to-transparent" />

                <InsideLeftPage arabicHandFont={arabicHandFont} />
              </div>

              <div className="relative z-20 h-full w-[15px] shrink-0 bg-gradient-to-r from-[#c78799] via-[#fff9fb] to-[#9c4056] shadow-[inset_6px_0_10px_rgba(95,22,42,0.22),inset_-6px_0_10px_rgba(95,22,42,0.22)]">
                <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/95" />
              </div>

              <div className="birthday-book-ink relative h-full flex-1 overflow-hidden rounded-r-[4px] border-y-[3px] border-r-[3px] border-[#ff9bb3] bg-[#fff7fa]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_45%_35%,rgba(255,255,255,0.98),rgba(255,241,246,0.9)_55%,rgba(255,210,223,0.45)_100%)]" />
                <div className="pointer-events-none absolute inset-y-0 left-0 w-[34px] bg-gradient-to-r from-[#d99aac]/28 via-[#f8dce5]/16 to-transparent" />

                <div className="relative z-10 h-full w-full">
                  <div className="absolute bottom-[18px] left-[18px] right-[18px] top-[14px]">
                    <div className="pointer-events-none absolute inset-0 rounded-[2px] bg-[#fff2e7]" />
                    <div className="pointer-events-none absolute inset-0 rounded-[2px] shadow-[0_12px_28px_rgba(88,32,48,0.12)]" />

                    <div className="absolute left-0 top-0 h-full w-full rounded-[2px] bg-[#fff0e3] px-7 pb-5 pt-6">
                      <Bow />

                      <div className="relative z-30 flex h-full min-h-0 flex-col">
                        <p
                          style={arabicHandFont}
                          className="text-center text-[clamp(28px,3.3vw,42px)] font-bold leading-none"
                        >
                          رسالتي ليكي
                        </p>

                        <div className="mx-auto mt-5 w-full border-t-2 border-dashed border-[#8b6a4a]/45" />

                        <div
                          ref={messageWheelZoneRef}
                          className="relative z-40 mt-6 min-h-0 flex-1"
                        >
                          <div
                            ref={messageScrollRef}
                            className="birthday-book-scroll relative z-50 h-full overflow-y-auto overscroll-contain pl-3 pr-4"
                            style={arabicHandFont}
                            dir="rtl"
                          >
                            <p
                              style={arabicHandFont}
                              className="whitespace-pre-line text-right text-[clamp(18px,1.85vw,25px)] font-bold leading-[2.05]"
                            >
                              حياتي رزان..
                              {"\n\n"}
                              كل سنة وإنتِ أجمل بنت اتخلقت على الأرض، كل سنة
                              وإنتِ حياتي، كل سنة وإنتِ بخير وصحة وعافية وراحة
                              بال.
                              {"\n\n"}
                              كل سنة وإنتِ مكمّلة حياتي بخفة دمك، ولطافتك،
                              ورقتك، وضحكتك اللي بتنور أي حاجة حواليّا. كل سنة
                              وإنتِ فراشة قلبي، وحب حياتي، ونور الدنيا كلها في
                              عيني.
                              {"\n\n"}
                              حابب أقولك إنك مليتي حياتي بحاجات حلوة ما كنتش
                              أعرف إنها ممكن تكون موجودة بالشكل ده. وجودك في
                              حياتي فارق معايا جدًا، ومن غيرك الدنيا بتبقى صعبة
                              وناقصة، وكأن في حاجة كبيرة غايبة عني.
                              {"\n\n"}
                              يمكن أنا عمري ما عرفت أعبّر كويس عن قد إيه بحبك،
                              ويمكن كلامي مهما كان مش هيكفي يشرح اللي جوايا، بس
                              والله أنا بعشقك يا رزان، وبحبك حب كبير بجد.
                              {"\n\n"}
                              إن شاء الله عمرك الجاي كله يكون في طاعة ربنا،
                              وسعادة، وراحة بال، ونجاح، وتحققي كل أمانيك وحاجاتك
                              اللي بتحلمي بيها.
                              {"\n\n"}
                              بحبك كتيييييييير ❤️
                            </p>

                            <p
                              style={arabicHandFont}
                              className="mt-7 pb-2 text-center text-[clamp(21px,2.35vw,31px)] font-bold"
                            >
                              أحمد حكيم
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-[3px] border-[2px] border-[#ffadc0] bg-[#ffe6f0] shadow-[0_0_24px_rgba(255,78,124,0.5),0_0_44px_rgba(255,78,124,0.22)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: isClosing ? 1 : 0 }}
              transition={{ duration: 0.38, ease: "easeOut" }}
            >
              <ClosedCard handFont={handFont} />
            </motion.div>
          </motion.div>
        )}

        <style jsx global>{`
          @import url("https://fonts.googleapis.com/css2?family=Aref+Ruqaa:wght@400;700&family=Amiri:wght@400;700&display=swap");

          .birthday-book-ink,
          .birthday-book-ink p,
          .birthday-book-ink span,
          .birthday-book-ink div {
            color: ${ARABIC_INK_COLOR} !important;
            text-shadow: none !important;
          }

          .birthday-book-scroll {
            scrollbar-width: thin;
            scrollbar-color: rgba(210, 88, 132, 0.92) transparent;
          }

          .birthday-book-scroll::-webkit-scrollbar {
            width: 8px;
          }

          .birthday-book-scroll::-webkit-scrollbar-track {
            background: transparent;
            box-shadow: none;
            border: 0;
          }

          .birthday-book-scroll::-webkit-scrollbar-button {
            display: none;
            width: 0;
            height: 0;
            background: transparent;
          }

          .birthday-book-scroll::-webkit-scrollbar-corner {
            background: transparent;
          }

          .birthday-book-scroll::-webkit-scrollbar-thumb {
            min-height: 58px;
            border-radius: 999px;
            border: 1px solid rgba(255, 240, 247, 0.92);
            background: linear-gradient(
              180deg,
              rgba(255, 188, 208, 0.98) 0%,
              rgba(242, 106, 148, 0.96) 52%,
              rgba(196, 54, 102, 0.96) 100%
            );
            box-shadow:
              0 4px 10px rgba(199, 61, 109, 0.26),
              inset 0 1px 1px rgba(255, 255, 255, 0.82);
          }

          .birthday-book-scroll::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(
              180deg,
              rgba(255, 173, 198, 1) 0%,
              rgba(232, 83, 132, 0.98) 52%,
              rgba(170, 41, 88, 0.98) 100%
            );
          }
        `}</style>
      </div>
    </motion.div>
  );
}

function ClosedCard({ handFont }: { handFont: CSSProperties }) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.92),transparent_63%)]" />

      <p
        style={handFont}
        className="relative z-10 mb-5 text-[clamp(17px,2vw,23px)] font-bold text-[#2b2630]"
      >
        Dear Razan
      </p>

      <p
        style={handFont}
        className="relative z-10 text-[clamp(42px,5.8vw,69px)] font-black leading-[0.9] text-[#f23569] drop-shadow-[0_0_10px_rgba(242,53,105,0.18)]"
      >
        Happy
        <br />
        Birthday!
      </p>

      <p
        style={handFont}
        className="relative z-10 mt-7 text-[clamp(11px,1.25vw,15px)] text-[#5a4d55]"
      >
        A little message made for you
      </p>

      <div className="relative z-10 mt-6 h-[58px] w-[58px] overflow-hidden rounded-full border-[3px] border-[#f2557d] bg-white shadow-[0_0_14px_rgba(242,53,105,0.28)] sm:h-[68px] sm:w-[68px]">
        <Image
          src="/images/memories/memory-1.jpg"
          alt="Razan"
          fill
          sizes="68px"
          className="object-cover object-center"
        />
      </div>
    </div>
  );
}

function InsideLeftPage({
  arabicHandFont,
}: {
  arabicHandFont: CSSProperties;
}) {
  return (
    <div
      className="relative z-10 flex h-full flex-col items-center justify-center px-7 text-center"
      dir="rtl"
    >
      <p
        style={arabicHandFont}
        className="text-[clamp(25px,2.8vw,38px)] font-bold"
      >
        رزان
      </p>

      <div className="relative my-6 h-[74px] w-[74px] overflow-hidden rounded-full border-[3px] border-[#f2557d] bg-white shadow-[0_0_18px_rgba(242,53,105,0.28)]">
        <Image
          src="/images/memories/memory-1.jpg"
          alt="Razan"
          fill
          sizes="74px"
          className="object-cover object-center"
        />
      </div>

      <p
        style={arabicHandFont}
        className="max-w-[82%] text-[clamp(18px,1.8vw,25px)] font-bold leading-[2]"
      >
        كل سنة وإنتِ طيبة.
        <br />
        رسالة صغيرة تفضل ذكرى حلوة بينا.
      </p>

      <div className="mt-7 h-px w-[62%] bg-gradient-to-r from-transparent via-[#8b6a4a]/45 to-transparent" />

      <p
        style={arabicHandFont}
        className="mt-5 text-[clamp(18px,1.65vw,23px)] font-bold"
      >
        ٨ يونيو
      </p>
    </div>
  );
}

function Bow() {
  return (
    <svg
      viewBox="0 0 92 62"
      className="pointer-events-none absolute left-[-20px] top-[-18px] z-20 h-[56px] w-[82px]"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="bowRed" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#ff334f" />
          <stop offset="55%" stopColor="#d7132f" />
          <stop offset="100%" stopColor="#9f1024" />
        </linearGradient>
      </defs>

      <path
        d="M43 29C30 10 14 7 7 15C0 23 7 38 23 39C32 40 38 35 43 29Z"
        fill="url(#bowRed)"
        stroke="#8f1021"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      <path
        d="M49 29C62 10 78 7 85 15C92 23 85 38 69 39C60 40 54 35 49 29Z"
        fill="url(#bowRed)"
        stroke="#8f1021"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      <path
        d="M39 24H53L57 34L46 42L35 34Z"
        fill="#f82743"
        stroke="#8f1021"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      <path
        d="M34 37C29 43 24 51 22 58L38 50L44 40Z"
        fill="#b91128"
        stroke="#8f1021"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      <path
        d="M58 37C63 43 68 51 70 58L54 50L48 40Z"
        fill="#b91128"
        stroke="#8f1021"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      <path
        d="M15 17C22 13 31 17 38 27"
        fill="none"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <path
        d="M77 17C70 13 61 17 54 27"
        fill="none"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}