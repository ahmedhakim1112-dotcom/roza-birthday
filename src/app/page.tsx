"use client";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { BirthdayTitleScene } from "@/components/scenes/BirthdayTitleScene";
import { IntroCakeScene } from "@/components/scenes/IntroCakeScene";

export default function Home() {
  const [scene, setScene] = useState(0);

  return (
    <main className="min-h-screen overflow-hidden bg-[#ffd6e8]">
      <AnimatePresence mode="wait">
        {scene === 0 && (
          <IntroCakeScene key="intro" onNext={() => setScene(1)} />
        )}

        {scene === 1 && (
          <BirthdayTitleScene key="birthday" onNext={() => setScene(2)} />
        )}

        {scene === 2 && (
          <section className="flex min-h-screen items-center justify-center bg-[#ffd6e8] text-center">
            <h1 className="text-4xl font-black">هنا هنبدأ مشهد الصورة والبالونات</h1>
          </section>
        )}
      </AnimatePresence>
    </main>
  );
}