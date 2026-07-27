"use client";

import { useRef, useEffect, useCallback, useState, useMemo } from "react";
import type { Work } from "@/data/works";
import { constellations, getTags } from "@/data/works";
import AboutPanel from "@/components/AboutPanel";

/* ══════════════════════════════════════════════════════════
   Types
   ══════════════════════════════════════════════════════════ */
interface StarData {
  id: string;
  x: number; y: number; // 大地图坐标 (0~MAP_W, 0~MAP_H)
  baseRadius: number;
  brightness: number;
  phase: number;
  work: Work | null;
  tags: string[];
  color?: { r: number; g: number; b: number }; // 自定义颜色（银河用）
  depth?: "far" | "mid" | "near";
}

interface NebulaData {
  x: number; y: number; rx: number; ry: number;
  color: string; alpha: number;
}

interface Camera {
  cx: number; cy: number; zoom: number; // 地图中心 + 缩放
}

interface CameraTarget {
  cx: number; cy: number; zoom: number;
}

export interface StarChartProps {
  onSelectWork?: (work: Work, filteredIds?: string[]) => void;
  isWorkOpen?: boolean;
}

/* ══════════════════════════════════════════════════════════
   Constants
   ══════════════════════════════════════════════════════════ */
const MAP_W = 3600;
const MAP_H = 2000;

// 星座在地图上的位置
const REGIONS: Record<string, { cx: number; cy: number }> = {
  photo: { cx: 950, cy: 950 },
  game: { cx: 2600, cy: 1050 },
};

// 星座骨架形状（相对坐标 -1..1，连线索引对）
interface ConstellationShape {
  skeleton: { x: number; y: number }[];
  connections: [number, number][];
}
const SHAPES: Record<string, ConstellationShape> = {
  // Photography → 双层光圈：外圈像镜头，内圈像收拢的光圈叶片。
  photo: {
    skeleton: [
      { x:  0.00, y:  0.00 }, // 0: 光圈中心
      { x:  0.00, y: -0.48 }, // 1-6: 内圈叶片顶点（逆时针）
      { x:  0.42, y: -0.24 },
      { x:  0.42, y:  0.24 },
      { x:  0.00, y:  0.48 },
      { x: -0.42, y:  0.24 },
      { x: -0.42, y: -0.24 },
      { x:  0.00, y: -1.00 }, // 7-12: 外圈镜头节点
      { x:  0.87, y: -0.50 },
      { x:  0.87, y:  0.50 },
      { x:  0.00, y:  1.00 },
      { x: -0.87, y:  0.50 },
      { x: -0.87, y: -0.50 },
    ],
    connections: [
      [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 1],
      [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [12, 7],
      [0, 1], [0, 3], [0, 5],
      [1, 7], [2, 8], [3, 9], [4, 10], [5, 11], [6, 12],
    ],
  },
  // Game Design → 分支式交互图：核心、选择路径、回馈节点与终点。
  game: {
    skeleton: [
      { x:  0.00, y:  0.00 }, // 0: 系统核心
      { x:  0.00, y: -0.56 }, // 1: 上行选择
      { x: -0.72, y: -0.92 }, // 2: 上左终点
      { x:  0.82, y: -0.78 }, // 3: 上右终点
      { x: -0.62, y:  0.12 }, // 4: 左侧路径
      { x: -1.05, y:  0.54 }, // 5: 左侧结果
      { x:  0.66, y:  0.10 }, // 6: 右侧路径
      { x:  1.08, y:  0.52 }, // 7: 右侧结果
      { x:  0.00, y:  0.70 }, // 8: 回馈节点
      { x: -0.52, y:  1.06 }, // 9: 下左延伸
      { x:  0.58, y:  1.10 }, // 10: 下右延伸
    ],
    connections: [
      [0, 1], [1, 2], [1, 3],
      [0, 4], [4, 5],
      [0, 6], [6, 7],
      [0, 8], [8, 9], [8, 10],
      [4, 8], [6, 8],
    ],
  },
};

/* ══════════════════════════════════════════════════════════
   Seeded Random
   ══════════════════════════════════════════════════════════ */
function seededRand(seed: number) {
  let s = seed | 0;
  return (a: number, b: number) => {
    s = (s * 1664525 + 1013904223) | 0;
    return a + ((s >>> 0) / 4294967296) * (b - a);
  };
}

/* ══════════════════════════════════════════════════════════
   Star Generators (大地图坐标)
   ══════════════════════════════════════════════════════════ */
interface ConstellationStars {
  stars: StarData[];
  connections: [number, number][]; // 骨架连线（索引指向 stars 数组）
}

function genConstellationStars(
  works: Work[], seed: number, cx: number, cy: number, spread: number, shape: ConstellationShape,
): ConstellationStars {
  const r = seededRand(seed);
  const stars: StarData[] = [];
  const usedWorks = new Set<string>();

  // 1. 骨架星点：每个骨架位置放一个作品（优先不同 tag）
  const tagOrder = [...new Set(works.map(w => w.tags[0]))];
  const skeletonIdx = shape.skeleton.map((pt, i) => {
    const tag = tagOrder[i % tagOrder.length];
    const wk = works.find(w => w.tags[0] === tag && !usedWorks.has(w.id))
            || works.find(w => !usedWorks.has(w.id));
    if (wk) usedWorks.add(wk.id);
    const sx = cx + pt.x * spread;
    const sy = cy + pt.y * spread;
    const idx = stars.length;
    stars.push({
      id: wk?.id ?? `skel-${i}`, work: wk ?? null, tags: wk?.tags ?? [],
      x: sx, y: sy,
      baseRadius: r(2.0, 4.5), brightness: r(0.7, 1.0),
      phase: r(0, Math.PI * 2),
    });
    return idx;
  });

  // 2. 剩余作品散布在骨架周围
  const remaining = works.filter(w => !usedWorks.has(w.id));
  remaining.forEach((wk) => {
    const si = skeletonIdx[Math.floor(r(0, skeletonIdx.length))];
    const ref = stars[si];
    stars.push({
      id: wk.id, work: wk, tags: wk.tags,
      x: ref.x + r(-55, 55), y: ref.y + r(-55, 55),
      baseRadius: r(1.2, 2.8), brightness: r(0.5, 0.9),
      phase: r(0, Math.PI * 2),
    });
  });

  // 连线：骨架连接 → 实际索引
  const connections: [number, number][] = shape.connections.map(
    ([a, b]) => [skeletonIdx[a], skeletonIdx[b]]
  );

  return { stars, connections };
}

function genBgStars(n: number, seed: number): StarData[] {
  const r = seededRand(seed);
  const farCount = Math.round(n * 0.6);
  const midCount = Math.round(n * 0.32);
  return Array.from({ length: n }, (_, i) => {
    const depth = i < farCount ? "far" : i < farCount + midCount ? "mid" : "near";
    const palette = depth === "far"
      ? [{ r: 128, g: 157, b: 210 }, { r: 149, g: 172, b: 225 }]
      : depth === "near"
        ? [{ r: 191, g: 185, b: 255 }, { r: 168, g: 204, b: 255 }, { r: 242, g: 189, b: 235 }]
        : [{ r: 191, g: 207, b: 244 }, { r: 206, g: 218, b: 255 }];
    const color = palette[Math.floor(r(0, palette.length))];
    const radius = depth === "far" ? r(0.28, 0.85) : depth === "near" ? r(1.1, 2.15) : r(0.5, 1.45);
    const brightness = depth === "far" ? r(0.16, 0.38) : depth === "near" ? r(0.48, 0.86) : r(0.28, 0.66);
    return {
      id: `bg-${i}`, work: null, tags: [], depth, color,
      x: r(0, MAP_W), y: r(0, MAP_H),
      baseRadius: radius, brightness,
      phase: r(0, Math.PI * 2),
    };
  });
}

/* ══════════════════════════════════════════════════════════
   Camera Helpers
   ══════════════════════════════════════════════════════════ */
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/* ══════════════════════════════════════════════════════════
   Component
   ══════════════════════════════════════════════════════════ */
export default function StarChart({ onSelectWork, isWorkOpen = false }: StarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);

  const [view, setView] = useState<"main" | "constellation">("main");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [hoveredRegionId, setHoveredRegionId] = useState<string | null>(null);
  const [selTag, setSelTag] = useState<string | null>(null);

  const hoveredRef = useRef<string | null>(null);
  const hoveredRegionRef = useRef<string | null>(null);
  useEffect(() => { hoveredRef.current = hoveredId; }, [hoveredId]);
  useEffect(() => { hoveredRegionRef.current = hoveredRegionId; }, [hoveredRegionId]);

  // 摄像机
  const camRef = useRef<Camera>({ cx: MAP_W / 2, cy: MAP_H / 2, zoom: 1 });
  const cameraAnimRef = useRef<{ startTime: number; from: Camera; to: CameraTarget; duration: number; active: boolean }>({
    startTime: 0, from: { cx: 0, cy: 0, zoom: 1 }, to: { cx: 0, cy: 0, zoom: 1 }, duration: 800, active: false,
  });

  const [size, setSize] = useState({ w: 800, h: 600 });
  useEffect(() => {
    const ctn = containerRef.current;
    if (!ctn) return;
    const upd = () => setSize({ w: ctn.clientWidth, h: ctn.clientHeight });
    upd();
    const ro = new ResizeObserver(upd);
    ro.observe(ctn);
    return () => ro.disconnect();
  }, []);

  /* ── 生成大地图星图（一次性） ── */
  const worldMap = useMemo(() => {
    const bg = genBgStars(1300, 1);
    // 黑洞周围星点
    const r2 = seededRand(42);
    const bhStars: StarData[] = [];
    for (let i = 0; i < 700; i++) {
      const angle = r2(0, Math.PI * 2);
      const dist = r2(50, 250);
      bhStars.push({
        id: `bh-${i}`, work: null, tags: [],
        x: 1800 + Math.cos(angle) * dist,
        y: 1000 + Math.sin(angle) * dist * 0.6,
        baseRadius: r2(0.4, 1.5), brightness: r2(0.3, 0.7),
        phase: r2(0, Math.PI * 2),
        color: { r: Math.round(r2(80, 180)), g: Math.round(r2(60, 140)), b: Math.round(r2(120, 255)) },
      });
    }
    const allStars: StarData[] = [...bg, ...bhStars];
    const constData: { id: string; stars: StarData[]; connections: [number, number][] }[] = [];

    constellations.forEach((c, i) => {
      const reg = REGIONS[c.id];
      const shape = SHAPES[c.id];
      const { stars, connections } = genConstellationStars(c.works, 100 + i * 37, reg.cx, reg.cy, 350, shape);
      constData.push({ id: c.id, stars, connections });
      allStars.push(...stars);
    });

    const nebulae: NebulaData[] = [
      { x: 900, y: 900, rx: 500, ry: 350, color: "#1a2a44", alpha: 0.12 },
      { x: 2550, y: 1000, rx: 450, ry: 320, color: "#1e2848", alpha: 0.11 },
      { x: 1750, y: 700, rx: 600, ry: 400, color: "#162040", alpha: 0.08 },
    ];

    return { allStars, nebulae, constellations, constData };
  }, []);

  // 当前可见星（在屏幕范围内的）
  // 为了方便 hover 检测，我们直接用全部星
  const visibleStars = useMemo(() => {
    if (view === "constellation" && activeId) {
      const cd = worldMap.constData.find(d => d.id === activeId);
      if (cd) {
        return [...worldMap.allStars.filter(s => !s.work), ...cd.stars];
      }
    }
    return worldMap.allStars;
  }, [view, activeId, worldMap]);

  /* ── 摄像机动画 ── */
  const animateCamera = useCallback((target: CameraTarget, duration: number) => {
    cameraAnimRef.current = {
      startTime: performance.now(),
      from: { ...camRef.current },
      to: target,
      duration,
      active: true,
    };
  }, []);

  // 初始化 / 切换视图时设置摄像机目标
  useEffect(() => {
    if (view === "main") {
      // 适配：让完整地图适配屏幕
      const fitZoom = Math.min(size.w / MAP_W, size.h / MAP_H);
      const target: CameraTarget = {
        cx: MAP_W / 2,
        cy: MAP_H / 2,
        zoom: clamp(fitZoom * 1.04, 0.34, 0.58),
      };
      animateCamera(target, 1400);
    } else if (view === "constellation" && activeId) {
      if (activeId === "center") {
        // 黑洞中心：中等缩放，看到两个星座
        const zoom = clamp(Math.min(size.w, size.h) / 340, 1.8, 3.4);
        animateCamera({ cx: 1800, cy: 1000, zoom }, 1600);
      } else {
        const reg = REGIONS[activeId];
        if (reg) {
          const SPREAD = 350;
          const PADDING = size.w < 900 ? 3.3 : 2.9;
          const dynZoom = clamp(Math.min(size.w, size.h) / (SPREAD * PADDING), 0.88, 1.95);
          animateCamera({ cx: reg.cx, cy: reg.cy, zoom: dynZoom }, 1600);
        }
      }
    }
  }, [view, activeId, size, animateCamera]);

  /* ── 渲染循环 ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const dpr = devicePixelRatio;

    const drawNeb = (nebs: NebulaData[]) => {
      nebs.forEach(n => {
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.rx);
        g.addColorStop(0, n.color); g.addColorStop(1, "transparent");
        ctx.fillStyle = g; ctx.globalAlpha = n.alpha;
        ctx.fillRect(n.x - n.rx, n.y - n.ry, n.rx * 2, n.ry * 2);
        ctx.globalAlpha = 1;
      });
    };

    const drawStar = (sx: number, sy: number, rr: number, glowA: number, bodyA: number, clr?: { r: number; g: number; b: number }) => {
      if (rr < 0.005) return;
      const cr = clr?.r ?? 200, cg = clr?.g ?? 215, cb = clr?.b ?? 255;
      if (glowA > 0.005 && rr * 5 > 0.01) {
        const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, rr * 5);
        g.addColorStop(0, `rgba(${cr},${cg},${cb},${glowA})`);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.fillRect(sx - rr * 5, sy - rr * 5, rr * 10, rr * 10);
      }
      ctx.beginPath(); ctx.arc(sx, sy, rr, 0, Math.PI * 2);
      const br = clr ? Math.min(255, cr + 25) : 225;
      const bg = clr ? Math.min(255, cg + 15) : 230;
      const bb = clr ? Math.min(255, cb + 0) : 255;
      ctx.fillStyle = `rgba(${br},${bg},${bb},${bodyA})`; ctx.fill();
    };

    const drawLine = (x1: number, y1: number, x2: number, y2: number, a: number) => {
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
      ctx.strokeStyle = `rgba(160,180,220,${a})`; ctx.lineWidth = 0.6; ctx.stroke();
    };

    // 引力透镜：距黑洞 <250px 的星点向黑洞偏移
    const BH_X = 1800, BH_Y = 1000;
    const lensStar = (sx: number, sy: number) => {
      const dx = sx - BH_X, dy = sy - BH_Y;
      const dist = Math.hypot(dx, dy);
      if (dist < 250 && dist > 35) {
        const strength = (1 - dist / 250) * 40;
        return { sx: sx - (dx / dist) * strength, sy: sy - (dy / dist) * strength * 0.7 };
      }
      return { sx, sy };
    };

    const drawBlackHole = (cx: number, cy: number, time: number) => {
      const pulse = 1 + Math.sin(time * 0.7) * 0.08;

      for (let i = 4; i >= 0; i--) {
        const r = (70 + i * 30) * pulse;
        const g = ctx.createRadialGradient(cx, cy, r * 0.2, cx, cy, r);
        g.addColorStop(0, "rgba(120,100,220,0)");
        g.addColorStop(0.5, `rgba(100,60,180,${0.04 - i * 0.007})`);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
      }

      const tilt = Math.PI / 6;
      const rings = [
        { rx: 42, ry: 12, w: 4.5, color: "rgba(240,230,255,0.5)" },
        { rx: 48, ry: 14, w: 3.5, color: "rgba(200,170,240,0.4)" },
        { rx: 54, ry: 16, w: 3, color: "rgba(160,120,220,0.3)" },
        { rx: 62, ry: 19, w: 2, color: "rgba(120,80,200,0.2)" },
        { rx: 72, ry: 23, w: 1.5, color: "rgba(90,50,170,0.12)" },
      ];
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(tilt);
      rings.forEach(r => {
        ctx.beginPath();
        ctx.ellipse(0, 0, r.rx * pulse, r.ry * pulse, 0, 0, Math.PI * 2);
        ctx.strokeStyle = r.color;
        ctx.lineWidth = r.w;
        ctx.stroke();
      });

      for (let side = -1; side <= 1; side += 2) {
        const jetLen = 160 + Math.sin(time * 1.3) * 30;
        const grad = ctx.createLinearGradient(0, -side * 32 * pulse, 0, -side * jetLen);
        grad.addColorStop(0, "rgba(180,140,240,0.35)");
        grad.addColorStop(0.15, "rgba(140,100,220,0.2)");
        grad.addColorStop(0.5, "rgba(100,60,200,0.08)");
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(-1.5, -side * 32 * pulse);
        ctx.lineTo(1.5, -side * 32 * pulse);
        ctx.lineTo(18, -side * jetLen);
        ctx.lineTo(-18, -side * jetLen);
        ctx.fill();
        const coreGrad = ctx.createLinearGradient(0, -side * 30 * pulse, 0, -side * jetLen * 0.6);
        coreGrad.addColorStop(0, "rgba(220,200,255,0.4)");
        coreGrad.addColorStop(1, "transparent");
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.moveTo(-0.5, -side * 30 * pulse);
        ctx.lineTo(0.5, -side * 30 * pulse);
        ctx.lineTo(0.5, -side * jetLen * 0.6);
        ctx.lineTo(-0.5, -side * jetLen * 0.6);
        ctx.fill();
      }
      for (let side = -1; side <= 1; side += 2) {
        for (let j = 0; j < 8; j++) {
          const tJet = (time * 0.6 + j * 0.4) % 1;
          const py = -side * (32 * pulse + tJet * 150);
          const alpha = (1 - tJet) * 0.6;
          if (alpha > 0.02) {
            const spread = tJet * 8;
            const px = Math.sin(j * 3.7 + time * 2) * spread;
            ctx.beginPath(); ctx.arc(px, py, 0.6 + tJet * 1.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(220,200,255,${alpha})`;
            ctx.fill();
          }
        }
      }

      for (let i = 0; i < 50; i++) {
        const orbit = 35 + (i % 5) * 8;
        const speed = 0.2 + (i % 5) * 0.08;
        const N = 20;
        const pts: { x: number; y: number }[] = [];
        for (let k = 0; k < N; k++) {
          const ht = time - k * 0.015;
          const ha = (i / 50) * Math.PI * 2 + ht * speed;
          const hdr = orbit + Math.sin(ht * 1.8 + i) * 5;
          pts.push({ x: Math.cos(ha) * hdr, y: Math.sin(ha) * hdr * 0.3 });
        }
        for (let k = 0; k < N - 1; k++) {
          const t = k / (N - 1);
          const alpha = 0.5 * (1 - t);
          const w = 1.8 * (1 - t * 0.85);
          if (alpha < 0.01) continue;
          ctx.beginPath();
          ctx.moveTo(pts[k].x, pts[k].y);
          ctx.lineTo(pts[k + 1].x, pts[k + 1].y);
          ctx.strokeStyle = `rgba(200,180,240,${alpha})`;
          ctx.lineWidth = w;
          ctx.stroke();
        }
        ctx.beginPath(); ctx.arc(pts[0].x, pts[0].y, 0.8, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(240,225,255,0.8)";
        ctx.fill();
      }

      ctx.restore();

      const phRing = 33 * pulse;
      const pg = ctx.createRadialGradient(cx, cy, phRing * 0.85, cx, cy, phRing * 1.15);
      pg.addColorStop(0, "rgba(180,160,240,0)");
      pg.addColorStop(0.45, "rgba(220,200,255,0.7)");
      pg.addColorStop(0.55, "rgba(240,220,255,0.8)");
      pg.addColorStop(1, "rgba(160,140,220,0)");
      ctx.fillStyle = pg;
      ctx.beginPath(); ctx.arc(cx, cy, phRing * 1.15, 0, Math.PI * 2); ctx.fill();

      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 30 * pulse);
      g.addColorStop(0, "#000");
      g.addColorStop(0.7, "#040410");
      g.addColorStop(1, "rgba(20,15,50,0.3)");
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(cx, cy, 30 * pulse, 0, Math.PI * 2); ctx.fill();
    };

    const render = (ts: number) => {
      const t = ts * 0.001;
      const { w, h } = size;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // 更新摄像机
      const anim = cameraAnimRef.current;
      if (anim.active) {
        const raw = Math.min((ts - anim.startTime) / anim.duration, 1);
        const et = easeInOutCubic(raw);
        camRef.current = {
          cx: lerp(anim.from.cx, anim.to.cx, et),
          cy: lerp(anim.from.cy, anim.to.cy, et),
          zoom: lerp(anim.from.zoom, anim.to.zoom, et),
        };
        if (raw >= 1) anim.active = false;
      }

      const cam = camRef.current;

      ctx.clearRect(0, 0, w, h);
      // 半透明深色底：保留星空暗调，同时让下层 CSS 极光背景透出
      ctx.fillStyle = "rgba(2, 6, 17, 0.75)"; ctx.fillRect(0, 0, w, h);

      // 应用摄像机变换
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.scale(cam.zoom, cam.zoom);
      ctx.translate(-cam.cx, -cam.cy);

      // 星云
      drawNeb(worldMap.nebulae);

      const hovId = hoveredRef.current;

      if (view === "main") {
        // 黑洞
        drawBlackHole(1800, 1000, t);
        // 背景星 + bhStars公转
        worldMap.allStars.filter(s => !s.work).forEach(s => {
          const tw = 0.55 + 0.45 * Math.sin(t * 2 + s.phase);
          let sx = s.x, sy = s.y;
          if (s.depth === "near") {
            sx += Math.sin(t * 0.18 + s.phase) * 12;
            sy += Math.cos(t * 0.13 + s.phase * 1.7) * 8;
          }
          // bh星绕黑洞公转
          if (s.id.startsWith("bh-")) {
            const dx = s.x - BH_X, dy = s.y - BH_Y;
            const dist = Math.hypot(dx, dy);
            const angle = Math.atan2(dy, dx) + t * (0.15 / Math.max(dist / 60, 0.6));
            sx = BH_X + Math.cos(angle) * dist;
            sy = BH_Y + Math.sin(angle) * dist;
          }
          const ls = lensStar(sx, sy);
          drawStar(ls.sx, ls.sy, s.baseRadius * tw, s.brightness * 0.22, s.brightness * 0.75, s.color);
        });

        // 星座
        worldMap.constData.forEach(cd => {
          const isRegionHov = hoveredRegionRef.current === cd.id;
          const isHov = isRegionHov || (!!hovId && cd.stars.some(s => s.id === hovId));
          const la = isHov ? 0.5 : 0.22;

          // 骨架连线
          cd.connections.forEach(([a, b]) => {
            drawLine(cd.stars[a].x, cd.stars[a].y, cd.stars[b].x, cd.stars[b].y, la);
          });

          cd.stars.forEach(s => {
            const tw = 0.55 + 0.45 * Math.sin(t * 2 + s.phase);
            const hl = hovId === s.id;
            const ls = lensStar(s.x, s.y);
            drawStar(ls.sx, ls.sy, s.baseRadius * tw * (hl ? 1.6 : 1),
              s.brightness * (isHov || hl ? 0.5 : 0.2),
              s.brightness * (hl ? 1 : 0.7));
          });
        });
      } else {
        // 分区视图
        worldMap.allStars.filter(s => !s.work).forEach(s => {
          const tw = 0.55 + 0.45 * Math.sin(t * 2 + s.phase);
          let sx = s.x, sy = s.y;
          if (s.depth === "near") {
            sx += Math.sin(t * 0.18 + s.phase) * 12;
            sy += Math.cos(t * 0.13 + s.phase * 1.7) * 8;
          }
          if (s.id.startsWith("bh-")) {
            const dx = s.x - BH_X, dy = s.y - BH_Y;
            const dist = Math.hypot(dx, dy);
            const angle = Math.atan2(dy, dx) + t * (0.15 / Math.max(dist / 60, 0.6));
            sx = BH_X + Math.cos(angle) * dist;
            sy = BH_Y + Math.sin(angle) * dist;
          }
          const ls = lensStar(sx, sy);
          drawStar(ls.sx, ls.sy, s.baseRadius * tw, s.brightness * 0.2, s.brightness * 0.7, s.color);
        });

        if (activeId) {
          // 中心视图：画黑洞 + 显示全部星座星
          if (activeId === "center") {
            drawBlackHole(1800, 1000, t);
            worldMap.constData.forEach(cd => {
              cd.stars.forEach(s => {
                const tw = 0.55 + 0.45 * Math.sin(t * 2 + s.phase);
                const ls = lensStar(s.x, s.y);
                drawStar(ls.sx, ls.sy, s.baseRadius * tw, s.brightness * 0.3, s.brightness * 0.7);
              });
            });
          } else {
            // 星座分区视图：画黑洞 + 其他星座星（暗）
            drawBlackHole(1800, 1000, t);
            worldMap.constData.forEach(otherCd => {
              if (otherCd.id === activeId) return; // 跳过当前星座，后面会画
              otherCd.stars.forEach(s => {
                const tw = 0.55 + 0.45 * Math.sin(t * 2 + s.phase);
                const ls = lensStar(s.x, s.y);
                drawStar(ls.sx, ls.sy, s.baseRadius * tw, s.brightness * 0.04, s.brightness * 0.18);
              });
            });
          }
          const cd = worldMap.constData.find(d => d.id === activeId);
          if (cd) {
            // 预计算：符合 tag 的 star id 集合（从原始 works 数据，而非 star.tags）
            const matchingIds = new Set<string>();
            if (selTag) {
              const c = worldMap.constellations.find(c => c.id === activeId);
              if (c) {
                c.works.forEach(w => {
                  if (w.tags.includes(selTag)) matchingIds.add(w.id);
                });
              }
            }

            // 骨架连线
            cd.connections.forEach(([a, b]) => {
              const bothMatch = !selTag || (matchingIds.has(cd.stars[a].id) && matchingIds.has(cd.stars[b].id));
              drawLine(cd.stars[a].x, cd.stars[a].y, cd.stars[b].x, cd.stars[b].y, selTag ? (bothMatch ? 0.25 : 0.03) : 0.28);
            });

            // 匹配星之间的连线（tag 内连线）
            if (selTag) {
              const matchedStars = cd.stars.filter(s => matchingIds.has(s.id));
              for (let i = 0; i < matchedStars.length; i++) {
                for (let j = i + 1; j < matchedStars.length; j++) {
                  const dx = matchedStars[i].x - matchedStars[j].x;
                  const dy = matchedStars[i].y - matchedStars[j].y;
                  if (Math.hypot(dx, dy) < 200) {
                    drawLine(matchedStars[i].x, matchedStars[i].y, matchedStars[j].x, matchedStars[j].y, 0.15);
                  }
                }
              }
            }

            cd.stars.forEach(s => {
              const tw = 0.55 + 0.45 * Math.sin(t * 2 + s.phase);
              const boosted = selTag ? matchingIds.has(s.id) : false;
              const hl = hovId === s.id;
              const sz = boosted ? 2.5 : 1;
              const ga = selTag ? (boosted ? s.brightness * 0.5 : 0.012) : s.brightness * 0.3;
              const ba = selTag ? (boosted ? s.brightness * (hl ? 1 : 0.85) : 0.05) : s.brightness * (hl ? 1 : 0.7);
              const ls = lensStar(s.x, s.y);
              if (boosted) {
                ctx.beginPath(); ctx.arc(ls.sx, ls.sy, s.baseRadius * sz * 4, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(180,200,240,0.3)`; ctx.lineWidth = 0.5; ctx.stroke();
              }
              drawStar(ls.sx, ls.sy, s.baseRadius * tw * sz * (hl ? 1.3 : 1), ga, ba);
            });
          }
        }
      }

      // hover 光环（选 tag 时只显示匹配星的）
      if (hovId) {
        const s = visibleStars.find(x => x.id === hovId);
        // 用 matchingIds 判断（需要在这里重建，但为了性能用 selTag + work 查）
        let tagOk = true;
        if (selTag && s?.work) {
          tagOk = s.work.tags.includes(selTag);
        }
        if (s && s.work && s.baseRadius > 0 && tagOk) {
          const hr = s.baseRadius * 7 * (1 / cam.zoom);
          if (hr > 0.01) {
            ctx.beginPath(); ctx.arc(s.x, s.y, hr * 2, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(190,200,235,0.45)"; ctx.lineWidth = 1.2 / cam.zoom;
            ctx.stroke();
          }
        }
      }

      ctx.restore();

      // ── 屏幕空间：星座标签 + 黑洞标签 ──
      if (view === "main") {
        const labelFontSize = clamp(Math.min(w, h) * 0.032, 20, 28);
        const labelOffset = clamp(Math.min(w, h) * 0.18, 112, 170);

        // 黑洞标签
        const bhSx = size.w / 2 + (1800 - cam.cx) * cam.zoom;
        const bhSy = size.h / 2 + (1000 - cam.cy) * cam.zoom;
        const isCenterHov = hoveredRegionRef.current === "center";
        ctx.fillStyle = isCenterHov ? "rgba(230,221,255,0.98)" : "rgba(195,210,235,0.85)";
        ctx.font = `italic ${labelFontSize}px 'Times New Roman', Georgia, serif`;
        ctx.textAlign = "center";
        ctx.fillText("About LvkkSyringa", bhSx, bhSy - labelOffset);
        if (isCenterHov) {
          ctx.fillStyle = "rgba(230,221,255,0.30)";
          ctx.fillText("About LvkkSyringa", bhSx, bhSy - labelOffset);
        }

        worldMap.constellations.forEach(c => {
          const reg = REGIONS[c.id];
          const sx = size.w / 2 + (reg.cx - cam.cx) * cam.zoom;
          const sy = size.h / 2 + (reg.cy - cam.cy) * cam.zoom;
          const cd = worldMap.constData.find(d => d.id === c.id);
          const isHov = hoveredRegionRef.current === c.id
            || (!!hoveredRef.current && !!cd && cd.stars.some(s => s.id === hoveredRef.current));
          ctx.fillStyle = isHov ? "rgba(226,231,255,0.98)" : "rgba(195,210,235,0.85)";
          ctx.font = `italic ${labelFontSize}px 'Times New Roman', Georgia, serif`;
          ctx.textAlign = "center";
          ctx.fillText(c.name, sx, sy - labelOffset * 0.94);
          // 微光晕
          if (isHov) {
            ctx.fillStyle = `rgba(210,220,245,0.95)`;
            ctx.fillText(c.name, sx, sy - labelOffset * 0.94);
          }
        });
      }

      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animRef.current);
  }, [size, view, activeId, worldMap, visibleStars, selTag]);

  /* ── 鼠标：屏幕坐标 → 地图坐标 ── */
  const screenToMap = useCallback((mx: number, my: number) => {
    const cam = camRef.current;
    const mapX = cam.cx + (mx - size.w / 2) / cam.zoom;
    const mapY = cam.cy + (my - size.h / 2) / cam.zoom;
    return { mapX, mapY };
  }, [size]);

  const onMove = useCallback((e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const { mapX, mapY } = screenToMap(mx, my);

    let closest: string | null = null;
    let minDist = 20;
    for (const s of visibleStars) {
      const d = Math.hypot(mapX - s.x, mapY - s.y);
      if (d < minDist) { minDist = d; closest = s.id; }
    }
    setHoveredId(closest);

    if (view !== "main") {
      setHoveredRegionId(null);
      return;
    }

    let region: string | null = Math.hypot(mapX - 1800, mapY - 1000) < 175 ? "center" : null;
    if (!region) {
      for (const c of worldMap.constellations) {
        const reg = REGIONS[c.id];
        if (Math.hypot(mapX - reg.cx, mapY - reg.cy) < 420) {
          region = c.id;
          break;
        }
      }
    }
    setHoveredRegionId(region);
  }, [visibleStars, screenToMap, view, worldMap]);

  const onClick = useCallback((e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const { mapX, mapY } = screenToMap(mx, my);

    if (view === "main") {
      // 黑洞中心
      if (Math.hypot(mapX - 1800, mapY - 1000) < 120) {
        setActiveId("center");
        setView("constellation");
        setSelTag(null);
        setHoveredId(null);
        setHoveredRegionId(null);
        return;
      }
      for (const c of worldMap.constellations) {
        const reg = REGIONS[c.id];
        const d = Math.hypot(mapX - reg.cx, mapY - reg.cy);
        if (d < 400) {
          setActiveId(c.id);
          setView("constellation");
          setSelTag(null);
          setHoveredId(null);
          setHoveredRegionId(null);
          return;
        }
      }
    } else {
      if (!activeId) return;
      const cd = worldMap.constData.find(d => d.id === activeId);
      if (!cd) return;
      for (const s of cd.stars) {
        if (Math.hypot(mapX - s.x, mapY - s.y) < 20 && s.work) {
          // 选 tag 时非匹配星不可点击
          if (selTag && !s.work.tags.includes(selTag)) continue;
          // 传过滤后的作品 id 列表，供 GlassCard 导航限定
          const filteredIds = selTag
            ? cd.stars.filter(x => x.work?.tags.includes(selTag)).map(x => x.id)
            : undefined;
          onSelectWork?.(s.work, filteredIds);
          return;
        }
      }
    }
  }, [view, activeId, worldMap, screenToMap, onSelectWork, selTag]);

  const onBack = useCallback(() => {
    setView("main");
    setActiveId(null);
    setSelTag(null);
    setHoveredId(null);
    setHoveredRegionId(null);
  }, []);

  const tags = view === "constellation" && activeId && activeId !== "center" ? getTags(activeId) : [];

  // 各 tag 照片数量
  const tagCounts = useMemo(() => {
    if (view !== "constellation" || !activeId || activeId === "center") return null;
    const c = worldMap.constellations.find(c => c.id === activeId);
    if (!c) return null;
    const counts: Record<string, number> = {};
    for (const w of c.works) {
      for (const t of w.tags) {
        counts[t] = (counts[t] || 0) + 1;
      }
    }
    return counts;
  }, [view, activeId, worldMap]);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <canvas ref={canvasRef} className="absolute inset-0"
        style={{
          cursor: hoveredRegionId || (view === "constellation" && visibleStars.some(s => s.id === hoveredId && !!s.work))
            ? "pointer"
            : "crosshair",
        }}
        onMouseMove={onMove} onMouseLeave={() => { setHoveredId(null); setHoveredRegionId(null); }} onClick={onClick} />

      {view === "main" && (
        <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center px-4 sm:bottom-8">
          <div className="glass-hint text-center">
            Click a constellation to explore works.
          </div>
        </div>
      )}

      {view === "constellation" && (
        <>
          {activeId !== "center" && (
          <div className="absolute top-16 left-0 right-0 z-10 flex justify-center gap-2 sm:top-6 sm:gap-3 flex-wrap px-4 sm:px-36">
            <button
              className={`glass-tag ${!selTag ? "active" : ""}`}
              onClick={() => setSelTag(null)}
            >All</button>
            {tags.map(tag => (
              <button
                key={tag}
                className={`glass-tag ${selTag === tag ? "active" : ""}`}
                onClick={() => setSelTag(selTag === tag ? null : tag)}
              >{tag}</button>
            ))}
          </div>
          )}
          <button className="absolute top-6 left-6 z-30 glass-tag" onClick={onBack}>← BACK</button>
          {activeId !== "center" && (
          <div className="star-side-note absolute top-6 right-6 z-10 hidden sm:block text-right font-serif">
            {activeId !== "game" && tagCounts && (
            <div className="text-white/35 text-xs leading-relaxed mb-2 tracking-wide">
              <div className="text-white/50">Total: {worldMap.constellations.find(c=>c.id===activeId)?.works.length ?? 0} photos</div>
              <div className="my-1 border-t border-white/10" />
              {Object.entries(tagCounts).sort(([,a],[,b]) => b-a).map(([tag, n]) => (
                <div key={tag}>{tag}: {n}</div>
              ))}
            </div>
            )}
            <p className="text-white/40 text-sm tracking-wider italic">
              点击图片查看大图<br />
              <span className="not-italic text-xs">Click the image to see the full version.</span>
            </p>
          </div>
          )}
          {activeId !== "center" && !isWorkOpen && (
          <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center px-4 sm:bottom-8">
            <div className="glass-hint text-center">
              Click a glowing star to view a work.
            </div>
          </div>
          )}
        </>
      )}
      {view === "constellation" && activeId === "center" && <AboutPanel />}
    </div>
  );
}
