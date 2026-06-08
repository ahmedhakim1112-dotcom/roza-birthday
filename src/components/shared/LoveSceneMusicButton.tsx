"use client";

import { motion } from "framer-motion";

type LoveSceneMusicButtonProps = {
  isPlaying: boolean;
  onToggle: () => void;
};

const loveTrack = {
  title: "كل سنه وانتي طيبه",
  subtitle: "sweety roza",
  cover: "/music/love-cover.jpg",
};

export function LoveSceneMusicButton({
  isPlaying,
  onToggle,
}: LoveSceneMusicButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      initial={{ opacity: 0, y: -12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="absolute left-7 top-7 z-[170] flex w-[245px] items-center gap-3 overflow-hidden rounded-2xl border border-white/20 bg-white/[0.12] px-3 py-2.5 text-white shadow-[0_16px_42px_rgba(90,10,35,0.22)] backdrop-blur-xl transition hover:border-white/30 hover:bg-white/[0.16]"
      aria-label={isPlaying ? "Pause love scene music" : "Play love scene music"}
    >
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/16 via-[#ff9ab3]/10 to-transparent" />

      <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-white/20 bg-white/10 shadow-[0_8px_22px_rgba(0,0,0,0.16)]">
        <img
          src={loveTrack.cover}
          alt={loveTrack.title}
          className="h-full w-full object-cover"
          draggable={false}
        />
        <span className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
      </span>

      <span className="relative min-w-0 flex-1 text-left">
        <span className="block truncate text-[13px] font-semibold leading-tight text-white">
          {loveTrack.title}
        </span>
        <span className="mt-1 block truncate text-[11px] leading-tight text-white/65">
          {loveTrack.subtitle}
        </span>
      </span>

      <span className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/18 text-white shadow-[inset_0_0_18px_rgba(255,255,255,0.08)]">
        {isPlaying ? (
          <span className="flex h-3.5 w-3.5 items-center justify-center gap-[3px]">
            <span className="h-3.5 w-[3px] rounded-full bg-white" />
            <span className="h-3.5 w-[3px] rounded-full bg-white" />
          </span>
        ) : (
          <span className="ml-[2px] h-0 w-0 border-y-[6px] border-l-[9px] border-y-transparent border-l-white" />
        )}

        {isPlaying && (
          <motion.span
            className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-[#ff9ab3] shadow-[0_0_14px_rgba(255,154,179,0.85)]"
            animate={{ scale: [1, 1.18, 1], opacity: [0.75, 1, 0.75] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </span>
    </motion.button>
  );
}