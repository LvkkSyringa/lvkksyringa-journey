"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Strands } from "@/components/Strands";
import { StarChart } from "@/components/StarChart";
import { GlassCard } from "@/components/GlassCard";
import type { Work } from "@/data/works";
import { constellations } from "@/data/works";

type Phase = "welcome" | "entering" | "starchart";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("welcome");
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const [navIds, setNavIds] = useState<string[] | null>(null); // 限定导航范围

  const handleSelectWork = useCallback((work: Work, filteredIds?: string[]) => {
    setSelectedWork(work);
    setNavIds(filteredIds ?? null);
  }, []);

  // 找到当前作品所在星座的全部作品列表，按 tag 过滤
  const allWorks = selectedWork
    ? (constellations.find(c => c.works.some(w => w.id === selectedWork.id))?.works ?? [])
        .filter(w => !navIds || navIds.includes(w.id))
    : [];

  const handleEnter = useCallback(() => {
    setPhase("entering");
    setTimeout(() => setPhase("starchart"), 1200);
  }, []);

  return (
    <div className="relative w-full h-full">
      <AnimatePresence>
        {phase === "welcome" && (
          <motion.div
            key="welcome"
            className="absolute inset-0"
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <div className="absolute inset-0">
              <Strands
                colors={["#1E3A5F", "#7C8EB4", "#A78BFA", "#E2E8F0"]}
                count={4}
                speed={0.3}
                amplitude={0.8}
                waviness={1.2}
                thickness={0.6}
                glow={2.2}
                taper={3.5}
                spread={1.2}
                intensity={0.5}
                saturation={1.2}
                opacity={0.85}
                scale={1.3}
                glass={true}
                refraction={1.1}
                dispersion={1.2}
                glassSize={0.85}
              />
            </div>

            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center select-none">
              <div className="flex flex-col items-center gap-2 px-8 text-center">
                <motion.p
                  className="text-sm sm:text-base tracking-[0.3em] uppercase text-white/50 font-light"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
                >
                  Welcome to
                </motion.p>
                <motion.h1
                  className="text-5xl sm:text-7xl md:text-8xl font-thin tracking-wide text-white/90 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 1.4, ease: "easeOut" }}
                >
                  LvkkSyringa&rsquo;s
                </motion.h1>
                <motion.p
                  className="text-4xl sm:text-6xl md:text-7xl font-thin tracking-wider text-white/75"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 1.4, ease: "easeOut" }}
                >
                  Journey
                </motion.p>
              </div>
              <motion.button
                className="mt-16 px-10 py-3 text-sm sm:text-base tracking-[0.2em] uppercase glass-btn font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1.2, ease: "easeOut" }}
                onClick={handleEnter}
              >
                Start Exploring
              </motion.button>

              <motion.p
                className="absolute bottom-8 text-xs sm:text-sm text-white/25 tracking-wide font-serif italic text-center px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.0, duration: 1.2, ease: "easeOut" }}
              >
                For the best experience, a computer is strongly recommended.<br />
                推荐使用电脑以获得最佳体验。
              </motion.p>
            </div>
          </motion.div>
        )}

        {phase === "starchart" && (
          <motion.div
            key="starchart"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <StarChart onSelectWork={handleSelectWork} />
          </motion.div>
        )}

      </AnimatePresence>

      {/* GlassCard — 独立 AnimatePresence */}
      <AnimatePresence>
        {selectedWork && (
          <GlassCard
            work={selectedWork}
            onClose={() => setSelectedWork(null)}
            allWorks={allWorks}
            onNavigate={setSelectedWork}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
