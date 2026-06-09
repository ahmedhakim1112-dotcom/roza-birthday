"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { STOP_GLOBAL_MUSIC_EVENT } from "@/lib/audio-events";

type Track = {
  title: string;
  subtitle: string;
  src: string;
  cover: string;
};

const tracks: Track[] = [
  {
    title: "كل سنه وانت طيب",
    subtitle: "كل سنه وانت طيب - تامر حسني",
    src: "/music/song-4.mp3",
    cover: "/music/cover-4.jpg",
  },
  {
    title: "thousand years",
    subtitle: "a thousand years – christina perri",
    src: "/music/song-1.mp3",
    cover: "/music/cover-1.jpg",
  },
  {
    title: "وصلتلها",
    subtitle: "هيفاء وهبي - وصلتلها",
    src: "/music/song-2.mp3",
    cover: "/music/cover-2.jpg",
  },
  {
    title: "هيجلي موجوع",
    subtitle: "هيجيلي موجوع - تامر عاشور",
    src: "/music/song-3.mp3",
    cover: "/music/cover-3.jpg",
  },
  {
    title: "اذكر يوما كنت بيافا",
    subtitle: "اذكر يوما كنت بيافا -  جوزيف عازار",
    src: "/music/song-5.mp3",
    cover: "/music/cover-5.jpg",
  },
];

function formatTime(value: number) {
  if (!Number.isFinite(value) || value <= 0) return "0:00";

  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export default function MusicButton() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeTimerRef = useRef<number | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const isPlayingRef = useRef(false);
  const volumeRef = useRef(0.72);
  const currentTrackIndexRef = useRef(0);
  const pendingPlayAfterTrackChangeRef = useRef(false);
  const userPausedRef = useRef(false);
  const autoplayWantedRef = useRef(true);

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.72);
  const [showVolume, setShowVolume] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const currentTrack = useMemo(
    () => tracks[currentTrackIndex],
    [currentTrackIndex],
  );

  const clearFadeTimer = useCallback(() => {
    if (fadeTimerRef.current) {
      window.clearInterval(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }
  }, []);

  const fadeTo = useCallback(
    (targetVolume: number, onDone?: () => void) => {
      const audio = audioRef.current;
      if (!audio) return;

      clearFadeTimer();

      const safeTarget = Math.min(Math.max(targetVolume, 0), 1);
      const step = safeTarget > audio.volume ? 0.035 : -0.035;

      fadeTimerRef.current = window.setInterval(() => {
        if (!audioRef.current) {
          clearFadeTimer();
          return;
        }

        const nextVolume = audioRef.current.volume + step;
        const finished =
          step > 0 ? nextVolume >= safeTarget : nextVolume <= safeTarget;

        if (finished) {
          audioRef.current.volume = safeTarget;
          clearFadeTimer();
          onDone?.();
          return;
        }

        audioRef.current.volume = Math.min(Math.max(nextVolume, 0), 1);
      }, 45);
    },
    [clearFadeTimer],
  );

  const tryPlayAfterInteraction = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || userPausedRef.current) return;

    audio.volume = 0;

    audio
      .play()
      .then(() => {
        isPlayingRef.current = true;
        setIsPlaying(true);
        fadeTo(volumeRef.current);
      })
      .catch(() => {
        // المتصفح لسه مانع التشغيل، هنسيبه لحد أول interaction حقيقي.
      });
  }, [fadeTo]);

  const playMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    userPausedRef.current = false;
    autoplayWantedRef.current = true;

    clearFadeTimer();

    audio.volume = 0;

    audio
      .play()
      .then(() => {
        isPlayingRef.current = true;
        setIsPlaying(true);
        fadeTo(volumeRef.current);
      })
      .catch(() => {
        isPlayingRef.current = false;
        setIsPlaying(false);
      });
  }, [clearFadeTimer, fadeTo]);

  const pauseMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    userPausedRef.current = true;
    autoplayWantedRef.current = false;

    fadeTo(0, () => {
      audio.pause();
      audio.volume = volumeRef.current;
      isPlayingRef.current = false;
      setIsPlaying(false);
    });
  }, [fadeTo]);

  useEffect(() => {
    const handleStopGlobalMusic = () => {
      const audio = audioRef.current;

      userPausedRef.current = true;
      autoplayWantedRef.current = false;
      pendingPlayAfterTrackChangeRef.current = false;

      clearFadeTimer();

      if (audio) {
        audio.pause();
        audio.volume = volumeRef.current;
      }

      isPlayingRef.current = false;
      setIsPlaying(false);
    };

    window.addEventListener(STOP_GLOBAL_MUSIC_EVENT, handleStopGlobalMusic);

    return () => {
      window.removeEventListener(
        STOP_GLOBAL_MUSIC_EVENT,
        handleStopGlobalMusic,
      );
    };
  }, [clearFadeTimer]);

  const togglePlay = useCallback(
    (event?: React.MouseEvent<HTMLButtonElement>) => {
      event?.stopPropagation();

      if (isPlayingRef.current) {
        pauseMusic();
      } else {
        playMusic();
      }
    },
    [pauseMusic, playMusic],
  );

  const changeTrack = useCallback((direction: "next" | "prev") => {
    pendingPlayAfterTrackChangeRef.current = isPlayingRef.current;

    setCurrentTime(0);
    setDuration(0);

    setCurrentTrackIndex((prev) => {
      const nextIndex =
        direction === "next"
          ? (prev + 1) % tracks.length
          : (prev - 1 + tracks.length) % tracks.length;

      currentTrackIndexRef.current = nextIndex;
      return nextIndex;
    });
  }, []);

  const handleNext = useCallback(
    (event?: React.MouseEvent<HTMLButtonElement>) => {
      event?.stopPropagation();
      changeTrack("next");
    },
    [changeTrack],
  );

  const handlePrev = useCallback(
    (event?: React.MouseEvent<HTMLButtonElement>) => {
      event?.stopPropagation();
      changeTrack("prev");
    },
    [changeTrack],
  );

  const handleProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const nextTime = Number(event.target.value);
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();

    const nextVolume = Number(event.target.value);
    volumeRef.current = nextVolume;
    setVolume(nextVolume);

    if (audioRef.current) {
      audioRef.current.volume = nextVolume;
    }
  };

  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);

  useEffect(() => {
    currentTrackIndexRef.current = currentTrackIndex;

    const audio = new Audio(currentTrack.src);
    audio.preload = "metadata";
    audio.volume = volumeRef.current;

    audioRef.current = audio;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0);
    };

    const handleEnded = () => {
      isPlayingRef.current = false;
      setIsPlaying(false);
      pendingPlayAfterTrackChangeRef.current = true;

      setCurrentTime(0);
      setDuration(0);

      setCurrentTrackIndex((prev) => {
        const nextIndex = (prev + 1) % tracks.length;
        currentTrackIndexRef.current = nextIndex;
        return nextIndex;
      });
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    if (pendingPlayAfterTrackChangeRef.current) {
      pendingPlayAfterTrackChangeRef.current = false;
      audio.currentTime = 0;

      audio
        .play()
        .then(() => {
          audio.volume = 0;
          isPlayingRef.current = true;
          setIsPlaying(true);
          fadeTo(volumeRef.current);
        })
        .catch(() => {
          isPlayingRef.current = false;
          setIsPlaying(false);
        });
    }

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);

      if (audioRef.current === audio) {
        audioRef.current = null;
      }
    };
  }, [currentTrack.src, currentTrackIndex, fadeTo]);

  useEffect(() => {
    const startTimer = window.setTimeout(() => {
      if (!autoplayWantedRef.current || userPausedRef.current) return;

      const audio = audioRef.current;
      if (!audio) return;

      audio.volume = 0;

      audio
        .play()
        .then(() => {
          isPlayingRef.current = true;
          setIsPlaying(true);
          fadeTo(volumeRef.current);
        })
        .catch(() => {
          // طبيعي يحصل بسبب قيود autoplay.
        });
    }, 1350);

    const handleFirstInteraction = () => {
      if (!autoplayWantedRef.current || userPausedRef.current) return;
      if (isPlayingRef.current) return;

      tryPlayAfterInteraction();
    };

    window.addEventListener("pointerdown", handleFirstInteraction, {
      once: true,
    });
    window.addEventListener("keydown", handleFirstInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstInteraction, {
      once: true,
    });

    return () => {
      window.clearTimeout(startTimer);
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [fadeTo, tryPlayAfterInteraction]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current) return;

      if (!wrapperRef.current.contains(event.target as Node)) {
        setShowVolume(false);
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    return () => {
      clearFadeTimer();

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [clearFadeTimer]);

  return (
    <motion.div
      ref={wrapperRef}
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.35, duration: 0.75, ease: "easeOut" }}
      onClick={(event) => event.stopPropagation()}
      className="fixed bottom-5 left-5 z-50 max-lg:bottom-4 max-lg:left-auto max-lg:right-4"
    >
      <div className="relative hidden lg:block">
        <div className="flex w-[285px] items-center gap-3 rounded-2xl border border-white/45 bg-white/75 px-3 py-3 shadow-[0_18px_45px_rgba(190,70,115,0.20)] backdrop-blur-xl">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-pink-100">
            <Image
              src={currentTrack.cover}
              alt={currentTrack.title}
              fill
              sizes="48px"
              className="object-cover"
              draggable={false}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-[13px] font-semibold text-pink-950">
                  {currentTrack.title}
                </p>
                <p className="truncate text-[11px] text-pink-900/55">
                  {currentTrack.subtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowVolume((prev) => !prev)}
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-pink-100/80 text-[13px] text-pink-700 transition hover:bg-pink-200/80"
                aria-label="Volume"
              >
                ♫
              </button>
            </div>

            <div className="mt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/75 text-[13px] text-pink-700 shadow-sm transition hover:bg-pink-50"
                aria-label="Previous song"
              >
                ‹
              </button>

              <button
                type="button"
                onClick={togglePlay}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-pink-500 text-[12px] text-white shadow-[0_8px_20px_rgba(236,72,153,0.35)] transition hover:bg-pink-600"
                aria-label={isPlaying ? "Pause music" : "Play music"}
              >
                {isPlaying ? (
                  "Ⅱ"
                ) : (
                  <span className="ml-[2px] h-0 w-0 border-y-[6px] border-l-[9px] border-y-transparent border-l-white" />
                )}
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/75 text-[13px] text-pink-700 shadow-sm transition hover:bg-pink-50"
                aria-label="Next song"
              >
                ›
              </button>

              <div className="min-w-0 flex-1">
                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  value={Math.min(currentTime, duration || 0)}
                  onChange={handleProgressChange}
                  className="h-1.5 w-full cursor-pointer accent-pink-500"
                  aria-label="Music progress"
                />

                <div className="mt-0.5 flex items-center justify-between text-[10px] text-pink-900/45">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showVolume && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
              className="absolute bottom-full left-4 mb-2 flex items-center gap-2 rounded-xl border border-white/50 bg-white/85 px-3 py-2 shadow-[0_12px_30px_rgba(190,70,115,0.18)] backdrop-blur-xl"
            >
              <span className="text-xs text-pink-700">♫</span>

              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={handleVolumeChange}
                className="w-28 cursor-pointer accent-pink-500"
                aria-label="Volume control"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative lg:hidden">
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.88 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.9 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="absolute bottom-[58px] right-0 w-[218px] rounded-[18px] border border-white/45 bg-white/82 p-2.5 shadow-[0_14px_34px_rgba(120,35,75,0.18)] backdrop-blur-xl max-sm:w-[210px] max-sm:rounded-[17px] max-sm:p-2"
            >
              <div className="flex items-center gap-2">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-[14px] bg-pink-100 max-sm:h-10 max-sm:w-10">
                  <Image
                    src={currentTrack.cover}
                    alt={currentTrack.title}
                    fill
                    sizes="36px"
                    className="object-cover"
                    draggable={false}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12.5px] font-bold text-pink-950 max-sm:text-[12px]">
                    {currentTrack.title}
                  </p>
                  <p className="truncate text-[10.5px] text-pink-900/55 max-sm:text-[10px]">
                    {currentTrack.subtitle}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowVolume((prev) => !prev)}
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-pink-100/90 text-[11px] text-pink-700"
                  aria-label="Volume"
                >
                  ♫
                </button>
              </div>

              <div className="mt-2.5 flex items-center justify-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="grid h-7 w-7 place-items-center rounded-full bg-white/75 text-[14px] text-pink-700 shadow-sm"
                  aria-label="Previous song"
                >
                  ‹
                </button>

                <button
                  type="button"
                  onClick={togglePlay}
                  className="grid h-8.5 w-8.5 place-items-center rounded-full bg-pink-500 text-[12px] text-white shadow-[0_8px_18px_rgba(236,72,153,0.30)]"
                  aria-label={isPlaying ? "Pause music" : "Play music"}
                >
                  {isPlaying ? (
                    "Ⅱ"
                  ) : (
                    <span className="ml-[2px] h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-white" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="grid h-8 w-8 place-items-center rounded-full bg-white/75 text-[16px] text-pink-700 shadow-sm"
                  aria-label="Next song"
                >
                  ›
                </button>
              </div>

              <div className="mt-2">
                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  value={Math.min(currentTime, duration || 0)}
                  onChange={handleProgressChange}
                  className="h-1 w-full cursor-pointer accent-pink-500"
                  aria-label="Music progress"
                />

                <div className="mt-0.5 flex items-center justify-between text-[8px] text-pink-900/45">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <AnimatePresence>
                {showVolume && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2 flex items-center gap-2 rounded-2xl bg-white/60 px-3 py-2">
                      <span className="text-[11px] text-pink-700">♫</span>

                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-full cursor-pointer accent-pink-500"
                        aria-label="Volume control"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="relative grid h-12 w-12 place-items-center rounded-full border border-white/45 bg-white/80 shadow-[0_10px_22px_rgba(120,35,75,0.18)] backdrop-blur-xl"
          aria-label="Open music player"
        >
          <span
            className={`absolute inset-[5px] rounded-full border border-pink-200/70 border-t-pink-500/80 ${
              isPlaying ? "animate-[spin_3.2s_linear_infinite]" : ""
            }`}
          />

          <span className="relative h-8.5 w-8.5 overflow-hidden rounded-full">
            <Image
              src={currentTrack.cover}
              alt={currentTrack.title}
              fill
              sizes="34px"
              className="object-cover"
              draggable={false}
            />
          </span>

          <span className="absolute -right-0.5 -top-0.5 grid h-4.5 w-4.5 place-items-center rounded-full bg-pink-500 text-[8px] text-white shadow-sm">
            ♫
          </span>
        </button>
      </div>
    </motion.div>
  );
}
