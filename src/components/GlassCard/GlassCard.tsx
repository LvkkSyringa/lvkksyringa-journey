"use client";

import Image, { getImageProps } from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import type { Work } from "@/data/works";

export interface GlassCardProps {
  work: Work;
  onClose: () => void;
  allWorks?: Work[];
  onNavigate?: (work: Work) => void;
}

type CardPosition = "left" | "center" | "right";
type ConnectionInfo = { saveData?: boolean; effectiveType?: string };

const imageWarmups = new Map<string, Promise<void>>();
const compactMetaKeys = ["Aperture", "Shutter", "ISO", "Focal"];

function imageAlt(work: Work) {
  return work.title || work.description || "Portfolio work";
}

function optimizedImageUrl(src: string, width: number) {
  return getImageProps({ src, alt: "", width, height: width, quality: 75 }).props.src;
}

function warmImage(work: Work | undefined, width: number, priority: "high" | "low" = "low") {
  if (!work?.image) return Promise.resolve();
  const src = optimizedImageUrl(work.image, width);
  const existing = imageWarmups.get(src);
  if (existing) return existing;

  const warmup = new Promise<void>((resolve) => {
    const image = new window.Image();
    image.fetchPriority = priority;
    image.decoding = "async";
    image.onload = () => resolve();
    image.onerror = () => {
      imageWarmups.delete(src);
      resolve();
    };
    image.src = src;
    if (image.complete) resolve();
  });
  imageWarmups.set(src, warmup);
  return warmup;
}

const cardVariants: Variants = {
  enter: (direction: number) => ({
    x: direction < 0 ? "-184%" : "84%",
    y: "-50%",
    z: -300,
    rotateY: direction < 0 ? 58 : -58,
    scale: 0.68,
    opacity: 0,
  }),
  left: {
    x: "-116%",
    y: "-50%",
    z: -180,
    rotateY: 38,
    scale: 0.8,
    opacity: 0.27,
    zIndex: 10,
  },
  center: {
    x: "-50%",
    y: "-50%",
    z: 0,
    rotateY: 0,
    scale: 1,
    opacity: 1,
    zIndex: 30,
  },
  right: {
    x: "16%",
    y: "-50%",
    z: -180,
    rotateY: -38,
    scale: 0.8,
    opacity: 0.27,
    zIndex: 10,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "84%" : "-184%",
    y: "-50%",
    z: -300,
    rotateY: direction < 0 ? -58 : 58,
    scale: 0.68,
    opacity: 0,
    zIndex: 0,
  }),
};

function FullImage({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/92 p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.24 }}
      onClick={onClose}
    >
      <div className="relative h-[95vh] w-[96vw]" onClick={(event) => event.stopPropagation()}>
        <Image src={src} alt={alt} fill sizes="96vw" className="object-contain" />
      </div>
      <button
        type="button"
        aria-label="Close full-screen image"
        className="absolute right-5 top-5 text-2xl text-white/50 transition-colors hover:text-white"
        onClick={onClose}
      >
        ✕
      </button>
    </motion.div>
  );
}

function WorkCardContent({ work, active, onClose, onFullscreen }: {
  work: Work;
  active: boolean;
  onClose: () => void;
  onFullscreen: () => void;
}) {
  const metadata = work.metadata ?? {};
  const standardMeta = Object.entries(metadata).filter(([key]) => !compactMetaKeys.includes(key));
  const compactMeta = compactMetaKeys
    .filter((key) => metadata[key])
    .map((key) => [key, metadata[key]] as const);
  const isGame = work.id.startsWith("game-");

  return (
    <div className={`work-carousel-surface ${active ? "work-carousel-surface-active" : "work-carousel-surface-side"}`}>
      {active && (
        <button
          type="button"
          aria-label="Close work"
          className="absolute right-4 top-4 z-20 text-xl text-white/40 transition-colors hover:text-white/80"
          onClick={onClose}
        >
          ✕
        </button>
      )}

      <div className={`work-card-scroll hide-scrollbar h-full ${active ? "overflow-y-auto" : "overflow-hidden"}`}>
        {work.image && (
          <div
            className={`work-card-media relative w-full overflow-hidden rounded-t-[23px] bg-black/40 ${isGame ? "work-card-media-game" : "work-card-media-photo"}`}
            onClick={active && !isGame ? onFullscreen : undefined}
            style={{ cursor: active && !isGame ? "pointer" : "default" }}
          >
            <Image
              src={work.image}
              alt={imageAlt(work)}
              fill
              sizes={active ? "(max-width: 1280px) 48vw, 672px" : "(max-width: 1280px) 28vw, 420px"}
              fetchPriority={active ? "high" : "low"}
              className={isGame ? "object-contain p-8" : "object-contain"}
            />
          </div>
        )}

        <div className="p-6 sm:p-8">
          {work.title && <h2 className="mb-3 text-2xl font-light tracking-wide text-white/90 sm:text-3xl">{work.title}</h2>}

          <div className="mb-4 flex flex-wrap gap-2">
            {work.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/10 bg-white/10 px-2.5 py-0.5 text-xs tracking-wider text-white/60">{tag}</span>
            ))}
          </div>

          {work.description && <p className="mb-5 whitespace-pre-line text-lg leading-relaxed text-white/55">{work.description}</p>}

          {(work.id.startsWith("photo-") || Object.keys(metadata).length > 0 || work.itchUrl || isGame) && (
            <div className="space-y-1.5 border-t border-white/8 pt-4">
              {work.itchUrl ? (
                <div className="flex text-base">
                  <span className="w-28 shrink-0 tracking-wider text-white/35">Play</span>
                  <a
                    href={work.itchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={active ? 0 : -1}
                    className="text-white/60 underline underline-offset-2 transition-colors hover:text-white/80"
                  >
                    itch.io ↗
                  </a>
                </div>
              ) : isGame ? (
                <div className="flex text-base">
                  <span className="w-28 shrink-0 tracking-wider text-white/35">Play</span>
                  <span className="text-white/40 italic">Coming soon!</span>
                </div>
              ) : null}

              {work.id.startsWith("photo-") && (() => {
                const rawDate = work.id.replace("photo-", "").slice(0, 8);
                if (rawDate.length !== 8) return null;
                const date = `${rawDate.slice(0, 4)}-${rawDate.slice(4, 6)}-${rawDate.slice(6, 8)}`;
                return (
                  <div key="date" className="flex text-base">
                    <span className="w-28 shrink-0 tracking-wider text-white/35">Date</span>
                    <span className="text-white/60">{date}</span>
                  </div>
                );
              })()}

              {standardMeta.map(([key, value]) => (
                <div key={key} className="flex items-start text-base">
                  <span className="w-28 shrink-0 tracking-wider text-white/35">{key}</span>
                  <span className="min-w-0 flex-1 whitespace-pre-line leading-relaxed text-white/60">{value}</span>
                </div>
              ))}

              {compactMeta.length > 0 && (
                <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 pt-1">
                  {compactMeta.map(([key, value], index) => (
                    <div key={key} className="flex text-base">
                      <span className={index % 2 === 0 ? "w-28 shrink-0 tracking-wider text-white/35" : "w-24 shrink-0 tracking-wider text-white/35"}>{key}</span>
                      <span className="text-white/60">{value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function GlassCard({ work, onClose, allWorks, onNavigate }: GlassCardProps) {
  const [fullscreen, setFullscreen] = useState(false);
  const [direction, setDirection] = useState(1);
  const works = useMemo(() => allWorks?.length ? allWorks : [work], [allWorks, work]);
  const idx = Math.max(0, works.findIndex((candidate) => candidate.id === work.id));
  const hasPrev = idx > 0;
  const hasNext = idx < works.length - 1;

  const visibleCards = useMemo(() => {
    const cards: { work: Work; position: CardPosition }[] = [];
    if (hasPrev) cards.push({ work: works[idx - 1], position: "left" });
    cards.push({ work, position: "center" });
    if (hasNext) cards.push({ work: works[idx + 1], position: "right" });
    return cards;
  }, [hasNext, hasPrev, idx, work, works]);

  const navigate = useCallback((nextIndex: number) => {
    if (!onNavigate || nextIndex < 0 || nextIndex >= works.length || nextIndex === idx) return;
    setDirection(nextIndex > idx ? 1 : -1);
    setFullscreen(false);
    onNavigate(works[nextIndex]);
  }, [idx, onNavigate, works]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (fullscreen) setFullscreen(false);
        else onClose();
      } else if (!fullscreen && event.key === "ArrowLeft" && hasPrev) {
        navigate(idx - 1);
      } else if (!fullscreen && event.key === "ArrowRight" && hasNext) {
        navigate(idx + 1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [fullscreen, hasNext, hasPrev, idx, navigate, onClose]);

  useEffect(() => {
    let cancelled = false;
    let cancelIdle: (() => void) | undefined;

    void warmImage(work, 1920, "high").then(() => {
      if (cancelled) return;
      void warmImage(works[idx - 1], 1920);
      void warmImage(works[idx + 1], 1920);

      const connection = (navigator as Navigator & { connection?: ConnectionInfo }).connection;
      const constrained = connection?.saveData === true || ["slow-2g", "2g"].includes(connection?.effectiveType ?? "");
      if (constrained) return;

      const warmSecondNeighbours = () => {
        void warmImage(works[idx - 2], 640);
        void warmImage(works[idx + 2], 640);
      };

      if ("requestIdleCallback" in window) {
        const idleId = window.requestIdleCallback(warmSecondNeighbours, { timeout: 1500 });
        cancelIdle = () => window.cancelIdleCallback(idleId);
      } else {
        const timeoutId = globalThis.setTimeout(warmSecondNeighbours, 800);
        cancelIdle = () => globalThis.clearTimeout(timeoutId);
      }
    });

    return () => {
      cancelled = true;
      cancelIdle?.();
    };
  }, [idx, work, works]);

  return (
    <>
      <motion.div
        className="work-modal-shell fixed inset-0 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.32 }}
      >
        <button type="button" aria-label="Close work viewer" className="work-modal-backdrop absolute inset-0 h-full w-full cursor-default" onClick={onClose} />

        <div className="work-carousel-stage absolute inset-0" onClick={(event) => event.stopPropagation()}>
          <AnimatePresence initial={false} custom={direction} mode="sync">
            {visibleCards.map(({ work: cardWork, position }) => {
              const active = position === "center";
              const targetIndex = works.findIndex((candidate) => candidate.id === cardWork.id);
              return (
                <motion.div
                  key={cardWork.id}
                  className={`work-carousel-card ${active ? "work-carousel-card-active" : "work-carousel-card-side"}`}
                  custom={direction}
                  variants={cardVariants}
                  initial="enter"
                  animate={position}
                  exit="exit"
                  transition={{ type: "spring", stiffness: 175, damping: 24, mass: 0.9 }}
                  aria-hidden={!active}
                  onClick={!active ? () => navigate(targetIndex) : undefined}
                >
                  <WorkCardContent
                    work={cardWork}
                    active={active}
                    onClose={onClose}
                    onFullscreen={() => setFullscreen(true)}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {hasPrev && <button type="button" aria-label="Previous work" className="carousel-nav carousel-nav-left glass-tag" onClick={() => navigate(idx - 1)}>←</button>}
        {hasNext && <button type="button" aria-label="Next work" className="carousel-nav carousel-nav-right glass-tag" onClick={() => navigate(idx + 1)}>→</button>}
      </motion.div>

      <AnimatePresence>
        {fullscreen && work.image && <FullImage src={work.image} alt={imageAlt(work)} onClose={() => setFullscreen(false)} />}
      </AnimatePresence>
    </>
  );
}
