"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Work } from "@/data/works";

export interface GlassCardProps {
  work: Work;
  onClose: () => void;
  allWorks?: Work[];
  onNavigate?: (work: Work) => void;
}

function FullImage({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <img
        src={src}
        alt={alt}
        className="max-w-full max-h-[95vh] object-contain"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        className="absolute top-4 right-4 text-white/50 hover:text-white text-2xl"
        onClick={onClose}
      >✕</button>
    </motion.div>
  );
}

export default function GlassCard({ work, onClose, allWorks, onNavigate }: GlassCardProps) {
  const [fullscreen, setFullscreen] = useState(false);
  const idx = allWorks ? allWorks.findIndex(w => w.id === work.id) : -1;
  const hasPrev = idx > 0;
  const hasNext = idx >= 0 && idx < (allWorks?.length ?? 0) - 1;

  return (
    <>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        {/* 箭头 — 固定屏幕位置 */}
        {hasPrev && (
          <button
            className="glass-tag !px-4 !py-3 !text-3xl fixed top-1/2 -translate-y-1/2 z-[51]"
            style={{ left: "calc(25vw - 2rem)" }}
            onClick={(e) => { e.stopPropagation(); onNavigate?.(allWorks![idx - 1]); }}
          >←</button>
        )}

        {/* 卡片 */}
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <motion.div
            className="relative glass max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.85, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <button
              className="absolute top-4 right-4 z-10 text-white/40 hover:text-white/80 transition-colors text-xl"
              onClick={onClose}
            >✕</button>

            {work.image && (
              <div
                className="w-full rounded-t-[23px] overflow-hidden flex items-center justify-center bg-black/40"
                onClick={() => work.id.startsWith("photo-") && setFullscreen(true)}
                style={{ cursor: work.id.startsWith("photo-") ? "pointer" : "default" }}
              >
                <img
                  src={work.image}
                  alt={work.title}
                  className={work.id.startsWith("game-")
                    ? "w-32 h-32 sm:w-40 sm:h-40 object-contain my-6"
                    : "w-full h-auto max-h-[40vh] object-contain"}
                />
              </div>
            )}

            <div className="p-6 sm:p-8">
              {work.title && (
                <h2 className="text-2xl sm:text-3xl font-light tracking-wide text-white/90 mb-3">
                  {work.title}
                </h2>
              )}

              <div className="flex flex-wrap gap-2 mb-4">
                {work.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-0.5 rounded-full text-xs tracking-wider bg-white/10 text-white/60 border border-white/10">
                    {tag}
                  </span>
                ))}
              </div>

              {work.description && (
                <p className="text-lg leading-relaxed text-white/55 mb-5">
                  {work.description}
                </p>
              )}

              {(work.metadata && Object.keys(work.metadata).length > 0 || work.itchUrl || work.id.startsWith("game-")) && (
                <div className="border-t border-white/8 pt-4 space-y-1.5">
                  {work.itchUrl ? (
                    <div className="flex text-base">
                      <span className="text-white/35 w-28 shrink-0 tracking-wider">Play</span>
                      <a href={work.itchUrl} target="_blank" rel="noopener noreferrer"
                        className="text-white/60 hover:text-white/80 underline underline-offset-2 transition-colors">
                        itch.io ↗
                      </a>
                    </div>
                  ) : work.id.startsWith("game-") && (
                    <div className="flex text-base">
                      <span className="text-white/35 w-28 shrink-0 tracking-wider">Play</span>
                      <span className="text-white/40 italic">Coming soon!</span>
                    </div>
                  )}
                  {/* 拍摄日期（从文件名解析） */}
                  {work.id.startsWith("photo-") && (() => {
                    const d = work.id.replace("photo-", "").slice(0, 8);
                    if (d.length === 8) {
                      const date = `${d.slice(0,4)}-${d.slice(4,6)}-${d.slice(6,8)}`;
                      return (
                        <div key="date" className="flex text-base">
                          <span className="text-white/35 w-28 shrink-0 tracking-wider">Date</span>
                          <span className="text-white/60">{date}</span>
                        </div>
                      );
                    }
                    return null;
                  })()}
                  {Object.entries(work.metadata ?? {}).map(([key, value]) => (
                    <div key={key} className="flex text-base">
                      <span className="text-white/35 w-28 shrink-0 tracking-wider">{key}</span>
                      <span className="text-white/60">{value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

        </div>

        {/* 右箭头 — 固定屏幕位置 */}
        {hasNext && (
          <button
            className="glass-tag !px-4 !py-3 !text-3xl fixed top-1/2 -translate-y-1/2 z-[51]"
            style={{ right: "calc(25vw - 2rem)" }}
            onClick={(e) => { e.stopPropagation(); onNavigate?.(allWorks![idx + 1]); }}
          >→</button>
        )}
      </motion.div>

      {/* 全屏图 */}
      <AnimatePresence>
        {fullscreen && work.image && (
          <FullImage src={work.image} alt={work.title} onClose={() => setFullscreen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
