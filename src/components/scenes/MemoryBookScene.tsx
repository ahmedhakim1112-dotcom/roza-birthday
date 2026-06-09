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

type ViewportMode = "mobile" | "tablet" | "desktop";

const ARABIC_INK_COLOR = "#101827";

export function BirthdayBookPopup({ isOpen, onClose }: BirthdayBookPopupProps) {
  return (
    <AnimatePresence>
      {isOpen && <BirthdayBookPopupContent onClose={onClose} />}
    </AnimatePresence>
  );
}

function BirthdayBookPopupContent({ onClose }: BirthdayBookPopupContentProps) {
  const [bookOpened, setBookOpened] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [viewportMode, setViewportMode] = useState<ViewportMode>("desktop");

  const messageScrollRef = useRef<HTMLDivElement | null>(null);
  const messageWheelZoneRef = useRef<HTMLDivElement | null>(null);
  const touchScrollYRef = useRef<number | null>(null);
  const isDraggingMessageRef = useRef(false);

  const isMobile = viewportMode === "mobile";
  const isTablet = viewportMode === "tablet";
  const isTouchBook = isMobile || isTablet;

  const closedTilt = {
    rotateX: isMobile ? 7 : isTablet ? 6 : 6,
    rotateY: isMobile ? -4 : isTablet ? -8 : -10,
    rotateZ: isMobile ? -1.5 : isTablet ? -2.5 : -3,
  };

  const openedTilt = {
    rotateX: isMobile ? 8 : isTablet ? 6 : 6,
    rotateY: isClosing
      ? isMobile
        ? -5
        : isTablet
          ? -10
          : -14
      : isMobile
        ? -3
        : isTablet
          ? -7
          : -10,
    rotateZ: isMobile ? -1 : isTablet ? -2.2 : -3,
  };

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

  const scrollMessageBy = (deltaY: number) => {
    const scrollElement = messageScrollRef.current;

    if (!scrollElement) return;

    const maxScrollTop =
      scrollElement.scrollHeight - scrollElement.clientHeight;

    if (maxScrollTop <= 0) return;

    const nextScrollTop = Math.max(
      0,
      Math.min(maxScrollTop, scrollElement.scrollTop + deltaY),
    );

    scrollElement.scrollTop = nextScrollTop;
  };

  useEffect(() => {
    const updateViewportMode = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setViewportMode("mobile");
        return;
      }

      if (width < 768) {
        setViewportMode("tablet");
        return;
      }

      setViewportMode("desktop");
    };

    updateViewportMode();

    window.addEventListener("resize", updateViewportMode);
    return () => window.removeEventListener("resize", updateViewportMode);
  }, []);

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

      scrollMessageBy(event.deltaY * deltaMultiplier);
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

  useEffect(() => {
    if (!bookOpened || !isTouchBook) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverscroll =
      document.documentElement.style.overscrollBehavior;
    const originalBodyOverscroll = document.body.style.overscrollBehavior;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overscrollBehavior = "none";
    document.body.style.overscrollBehavior = "none";

    const isTouchInsideMessage = (touch: Touch) => {
      const zone = messageWheelZoneRef.current;
      if (!zone) return false;

      const rect = zone.getBoundingClientRect();

      return (
        touch.clientX >= rect.left &&
        touch.clientX <= rect.right &&
        touch.clientY >= rect.top &&
        touch.clientY <= rect.bottom
      );
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) return;

      const touch = event.touches[0];

      if (!isTouchInsideMessage(touch)) {
        isDraggingMessageRef.current = false;
        touchScrollYRef.current = null;
        return;
      }

      isDraggingMessageRef.current = true;
      touchScrollYRef.current = touch.clientY;

      event.stopPropagation();

      if (event.cancelable) {
        event.preventDefault();
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!isDraggingMessageRef.current) return;
      if (event.touches.length !== 1) return;

      const previousY = touchScrollYRef.current;
      const currentY = event.touches[0].clientY;

      if (previousY === null) {
        touchScrollYRef.current = currentY;
        return;
      }

      const deltaY = previousY - currentY;

      scrollMessageBy(deltaY);
      touchScrollYRef.current = currentY;

      event.stopPropagation();

      if (event.cancelable) {
        event.preventDefault();
      }
    };

    const handleTouchEnd = (event: TouchEvent) => {
      if (!isDraggingMessageRef.current) return;

      isDraggingMessageRef.current = false;
      touchScrollYRef.current = null;

      event.stopPropagation();

      if (event.cancelable) {
        event.preventDefault();
      }
    };

    window.addEventListener("touchstart", handleTouchStart, {
      passive: false,
      capture: true,
    });

    window.addEventListener("touchmove", handleTouchMove, {
      passive: false,
      capture: true,
    });

    window.addEventListener("touchend", handleTouchEnd, {
      passive: false,
      capture: true,
    });

    window.addEventListener("touchcancel", handleTouchEnd, {
      passive: false,
      capture: true,
    });

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overscrollBehavior =
        originalHtmlOverscroll;
      document.body.style.overscrollBehavior = originalBodyOverscroll;

      window.removeEventListener("touchstart", handleTouchStart, {
        capture: true,
      });

      window.removeEventListener("touchmove", handleTouchMove, {
        capture: true,
      });

      window.removeEventListener("touchend", handleTouchEnd, {
        capture: true,
      });

      window.removeEventListener("touchcancel", handleTouchEnd, {
        capture: true,
      });
    };
  }, [bookOpened, isTouchBook]);

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-[#140d16]/58 px-3 backdrop-blur-[5px] max-sm:px-2"
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
        className="fixed right-8 top-8 z-[200] flex h-10 w-10 items-center justify-center rounded-full bg-[#ff8fab]/80 text-white shadow-[0_0_24px_rgba(255,112,150,0.7)] backdrop-blur-sm transition hover:bg-[#ff7fa0] max-sm:right-5 max-sm:top-5 max-sm:h-11 max-sm:w-11"
        aria-label="Close"
      >
        <span className="block -translate-y-[2px] text-[28px] font-black leading-none">
          ×
        </span>
      </button>

      <div
        className="relative h-[min(78vh,540px)] w-[min(92vw,850px)] max-sm:h-[min(61dvh,390px)] max-sm:w-[min(88vw,330px)] sm:max-md:h-[min(66vh,455px)] sm:max-md:w-[min(86vw,560px)]"
        onMouseDown={(event) => event.stopPropagation()}
        onTouchStart={(event) => event.stopPropagation()}
        onTouchMove={(event) => event.stopPropagation()}
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
            className="absolute left-1/2 top-1/2 z-[120] h-[92%] w-[43%] -translate-x-1/2 -translate-y-1/2 cursor-pointer overflow-hidden rounded-[3px] border-[2px] border-[#ffadc0] bg-[#ffe6f0] p-0 text-left shadow-[0_0_24px_rgba(255,78,124,0.5),0_0_44px_rgba(255,78,124,0.22)] max-sm:h-[84%] max-sm:w-[55%] max-sm:border-[1.5px] sm:max-md:h-[86%] sm:max-md:w-[48%]"
            style={{ transformStyle: "preserve-3d" }}
            initial={{
              opacity: 0,
              scale: 0.9,
              ...closedTilt,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              ...closedTilt,
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
            className="absolute left-1/2 top-1/2 z-[100] h-[92%] w-full -translate-x-1/2 -translate-y-1/2 rounded-[4px] shadow-[0_0_24px_rgba(255,72,120,0.48),0_0_52px_rgba(255,72,120,0.22)] max-sm:h-[86%] max-sm:w-[96%] max-sm:rounded-[3px] sm:max-md:h-[90%] sm:max-md:w-[96%]"
            style={{
              transformStyle: "preserve-3d",
              transformOrigin: "center center",
            }}
            initial={{
              opacity: 0,
              scale: isMobile ? 0.96 : 0.94,
              ...openedTilt,
            }}
            animate={{
              opacity: isClosing ? 0 : 1,
              scale: isClosing ? (isMobile ? 0.94 : 0.92) : 1,
              ...openedTilt,
            }}
            transition={{
              duration: isClosing ? 0.82 : 1.08,
              ease: [0.16, 0.78, 0.2, 1],
            }}
          >
            <motion.div
              className="relative flex h-full w-full overflow-visible rounded-[4px] max-sm:rounded-[3px]"
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
              <div className="birthday-book-ink relative h-full flex-1 overflow-hidden rounded-l-[4px] border-y-[3px] border-l-[3px] border-[#ff9bb3] bg-[#fff1f6] max-sm:rounded-l-[3px] max-sm:border-y-[2px] max-sm:border-l-[2px]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_45%_42%,rgba(255,255,255,0.99),rgba(255,243,248,0.96)_54%,rgba(255,216,229,0.65)_100%)]" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-[48px] bg-gradient-to-l from-[#d79aad]/34 via-[#f5d2dc]/18 to-transparent max-sm:w-[18px]" />

                <InsideLeftPage arabicHandFont={arabicHandFont} />
              </div>

              <div className="relative z-20 h-full w-[15px] shrink-0 bg-gradient-to-r from-[#c78799] via-[#fff9fb] to-[#9c4056] shadow-[inset_6px_0_10px_rgba(95,22,42,0.22),inset_-6px_0_10px_rgba(95,22,42,0.22)] max-sm:w-[7px]">
                <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/95" />
              </div>

              <div className="birthday-book-ink relative h-full flex-1 overflow-hidden rounded-r-[4px] border-y-[3px] border-r-[3px] border-[#ff9bb3] bg-[#fff7fa] max-sm:rounded-r-[3px] max-sm:border-y-[2px] max-sm:border-r-[2px]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_45%_35%,rgba(255,255,255,0.98),rgba(255,241,246,0.9)_55%,rgba(255,210,223,0.45)_100%)]" />
                <div className="pointer-events-none absolute inset-y-0 left-0 w-[34px] bg-gradient-to-r from-[#d99aac]/28 via-[#f8dce5]/16 to-transparent max-sm:w-[14px]" />

                <div className="relative z-10 h-full w-full">
                  <div className="absolute bottom-[18px] left-[18px] right-[18px] top-[14px] max-sm:bottom-[8px] max-sm:left-[6px] max-sm:right-[6px] max-sm:top-[9px] sm:max-md:bottom-[12px] sm:max-md:left-[10px] sm:max-md:right-[10px] sm:max-md:top-[12px]">
                    <div className="pointer-events-none absolute inset-0 rounded-[2px] bg-[#fff2e7]" />
                    <div className="pointer-events-none absolute inset-0 rounded-[2px] shadow-[0_12px_28px_rgba(88,32,48,0.12)]" />

                    <div className="absolute left-0 top-0 h-full w-full rounded-[2px] bg-[#fff0e3] px-7 pb-5 pt-6 max-sm:px-2.5 max-sm:pb-2.5 max-sm:pt-5 sm:max-md:px-4 sm:max-md:pb-3 sm:max-md:pt-5">
                      <Bow />

                      <div className="relative z-30 flex h-full min-h-0 flex-col">
                        <p
                          style={arabicHandFont}
                          className="text-center text-[clamp(20px,6.4vw,26px)] font-bold leading-none sm:text-[clamp(27px,3vw,38px)]"
                        >
                          رسالتي ليكي
                        </p>

                        <div className="mx-auto mt-4 w-full border-t-2 border-dashed border-[#8b6a4a]/45 max-sm:mt-2.5 max-sm:border-t" />

                        <div
                          ref={messageWheelZoneRef}
                          className="relative z-[80] mt-5 min-h-0 flex-1 max-sm:mt-3"
                          style={{
                            touchAction: isTouchBook ? "none" : "pan-y",
                            userSelect: "none",
                          }}
                          onMouseDown={(event) => event.stopPropagation()}
                          onWheel={(event) => event.stopPropagation()}
                          onTouchStart={(event) => event.stopPropagation()}
                          onTouchMove={(event) => event.stopPropagation()}
                        >
                          <div
                            ref={messageScrollRef}
                            className="birthday-book-scroll relative z-[80] h-full overflow-y-auto overscroll-contain pl-3 pr-4 max-sm:pl-0.5 max-sm:pr-1.5"
                            style={
                              {
                                ...arabicHandFont,
                                touchAction: isTouchBook ? "none" : "pan-y",
                                WebkitOverflowScrolling: "touch",
                              } as CSSProperties
                            }
                            dir="rtl"
                            onMouseDown={(event) => event.stopPropagation()}
                            onWheel={(event) => event.stopPropagation()}
                            onTouchStart={(event) => event.stopPropagation()}
                            onTouchMove={(event) => event.stopPropagation()}
                          >
                            <p
                              style={arabicHandFont}
                              className="whitespace-pre-line text-right text-[13.5px] font-bold leading-[1.75] sm:text-[clamp(17px,1.7vw,24px)] sm:leading-[2]"
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
                              className="mt-6 pb-2 text-center text-[17px] font-bold sm:text-[clamp(20px,2.2vw,29px)]"
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

          @media (max-width: 767px) {
            .birthday-book-scroll {
              -webkit-overflow-scrolling: touch;
              touch-action: none;
            }

            .birthday-book-scroll::-webkit-scrollbar {
              width: 4px;
            }

            .birthday-book-scroll::-webkit-scrollbar-thumb {
              min-height: 36px;
            }
          }
        `}</style>
      </div>
    </motion.div>
  );
}

function ClosedCard({ handFont }: { handFont: CSSProperties }) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden px-6 text-center max-sm:px-3">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.92),transparent_63%)]" />

      <p
        style={handFont}
        className="relative z-10 mb-5 text-[16px] font-bold text-[#2b2630] max-sm:mb-4 sm:text-[clamp(17px,2vw,23px)]"
      >
        Dear Razan
      </p>

      <p
        style={handFont}
        className="relative z-10 max-w-full text-[clamp(30px,8.2vw,38px)] font-black leading-[0.9] text-[#f23569] drop-shadow-[0_0_10px_rgba(242,53,105,0.18)] sm:text-[clamp(42px,4.6vw,56px)]"
      >
        Happy
        <br />
        Birthday!
      </p>

      <p
        style={handFont}
        className="relative z-10 mt-6 text-[11px] text-[#5a4d55] max-sm:mt-5 max-sm:text-[10px] sm:mt-7 sm:text-[clamp(11px,1.25vw,15px)]"
      >
        A little message made for you
      </p>

      <div className="relative z-10 mt-5 h-[52px] w-[52px] overflow-hidden rounded-full border-[3px] border-[#f2557d] bg-white shadow-[0_0_14px_rgba(242,53,105,0.28)] sm:mt-6 sm:h-[68px] sm:w-[68px]">
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

function InsideLeftPage({ arabicHandFont }: { arabicHandFont: CSSProperties }) {
  return (
    <div
      className="relative z-10 flex h-full flex-col items-center justify-center px-7 text-center max-sm:px-3 sm:max-md:px-5"
      dir="rtl"
    >
      <p
        style={arabicHandFont}
        className="text-[clamp(20px,6vw,28px)] font-bold sm:text-[clamp(25px,2.8vw,38px)]"
      >
        رزان
      </p>

      <div className="relative my-5 h-[56px] w-[56px] overflow-hidden rounded-full border-[3px] border-[#f2557d] bg-white shadow-[0_0_18px_rgba(242,53,105,0.28)] sm:my-6 sm:h-[74px] sm:w-[74px]">
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
        className="max-w-[88%] text-[14px] font-bold leading-[1.8] sm:max-w-[82%] sm:text-[clamp(18px,1.8vw,25px)] sm:leading-[2]"
      >
        كل سنة وإنتِ طيبة.
        <br />
        رسالة صغيرة تفضل ذكرى حلوة بينا.
      </p>

      <div className="mt-5 h-px w-[62%] bg-gradient-to-r from-transparent via-[#8b6a4a]/45 to-transparent sm:mt-7" />

      <p
        style={arabicHandFont}
        className="mt-4 text-[15px] font-bold sm:mt-5 sm:text-[clamp(18px,1.65vw,23px)]"
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
      className="pointer-events-none absolute left-[-4px] top-[-10px] z-20 h-[31px] w-[46px] rotate-[-6deg] sm:left-[-20px] sm:top-[-18px] sm:h-[56px] sm:w-[82px] sm:rotate-0"
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
