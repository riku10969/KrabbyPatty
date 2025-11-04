"use client";
import { motion } from "framer-motion";
import type { ReactNode, CSSProperties } from "react";
import { useMemo } from "react";

/**
 * Reusable FloatingDecos
 * ------------------------------------------------------
 * Drop this in any section to sprinkle floating images (buoys, shells, fish, etc.)
 * with gentle bobbing. Works with Tailwind, Next.js App Router.
 *
 * Usage:
 *  import { FloatingDecos, Bobbing } from "@/components/decos/FloatingDecos";
 *  <section className="relative">
 *    <FloatingDecos
 *      items={[
 *        { src: "/deco/ring-red.png", size: 96, pos: { top: "20px", left: "16px" }, delay: 0.1 },
 *        { src: "/deco/shell.png", size: 72, pos: { right: "24px", top: "120px" }, rotate: -8 },
 *      ]}
 *    />
 *  </section>
 *
 * Or, for a one-off floating element:
 *  <Bobbing stylePos={{ right: "8%", bottom: "18%" }}>
 *    <img src="/deco/fish-blue.png" alt="fish" width={80} height={80} />
 *  </Bobbing>
 */

export type DecoItem = {
  /** Image path under /public */
  src: string;
  alt?: string;
  /** width in px (height auto) */
  size?: number;
  /** animation delay in seconds */
  delay?: number;
  /** absolute positioning (CSS values) */
  pos?: Partial<Record<"top" | "left" | "right" | "bottom", string>>;
  /** initial rotation in deg */
  rotate?: number;
  /** optional per-item overrides */
  motion?: Partial<BobbingMotionOptions>;
  /** tailwind classes for extra tweaking */
  className?: string;
};

export type BobbingMotionOptions = {
  /** One full up-down cycle length (s) */
  duration: number;
  /** Amplitude of vertical movement (px) */
  distance: number;
  /** Add a subtle sway/tilt */
  rotate: boolean;
  /** Pause animation */
  paused: boolean;
  /** Easing */
  ease: "easeInOut" | "easeOut" | "linear";
};

const DEFAULT_MOTION: BobbingMotionOptions = {
  duration: 5,
  distance: 6,
  rotate: false,
  paused: false,
  ease: "easeInOut",
};

export function FloatingDecos({
  items,
  className,
  pointerEvents = "none",
  zIndex = 10,
  randomize = false,
  motionOptions,
}: {
  items?: DecoItem[];
  /** Extra classes for the wrapper (must be inside a relative parent) */
  className?: string;
  /** pointer-events on the whole layer (default: none) */
  pointerEvents?: "none" | "auto";
  /** z-index of the layer */
  zIndex?: number;
  /** If true, add small randomized offsets to delay/rotation/distance */
  randomize?: boolean;
  /** Global motion defaults that items can override */
  motionOptions?: Partial<BobbingMotionOptions>;
}) {
  if (!items || items.length === 0) return null;

  const base = { ...DEFAULT_MOTION, ...(motionOptions ?? {}) };

  return (
    <div
      className={`absolute inset-0 select-none ${className ?? ""}`}
      style={{ pointerEvents, zIndex } as CSSProperties}
    >
      {items.map((it, i) => {
        const r = randomize ? rngFromIndex(i) : 0;
        const perItem: BobbingMotionOptions = {
          ...base,
          ...(it.motion ?? {}),
          duration: clamp((it.motion?.duration ?? base.duration) + r * 0.8, 3, 8),
          distance: clamp((it.motion?.distance ?? base.distance) + r * 2, 2, 12),
          rotate: it.motion?.rotate ?? base.rotate,
          paused: it.motion?.paused ?? base.paused,
        };

        const delay = it.delay ?? i * 0.18 + r * 0.2;
        const rot = (it.rotate ?? 0) + r * 6;

        return (
          <Bobbing
            key={`${it.src}-${i}`}
            delay={delay}
            stylePos={it.pos}
            rotate={rot}
            options={perItem}
          >
            <img
              src={it.src}
              alt={it.alt ?? "deco"}
              style={{ width: `${it.size ?? 80}px`, height: "auto" }}
              className={`pointer-events-none drop-shadow ${it.className ?? ""}`}
              loading="lazy"
            />
          </Bobbing>
        );
      })}
    </div>
  );
}

/** Single floating wrapper for any child */
export function Bobbing({
  children,
  delay = 0,
  stylePos,
  rotate = 0,
  options,
  className,
}: {
  children: ReactNode;
  delay?: number;
  stylePos?: Partial<Record<"top" | "left" | "right" | "bottom", string>>;
  rotate?: number;
  options?: Partial<BobbingMotionOptions>;
  className?: string;
}) {
  const opt = { ...DEFAULT_MOTION, ...(options ?? {}) };
  const yKeyframes = [0, -opt.distance, 0, opt.distance * 0.66, 0];
  const rotateKeyframes = opt.rotate ? [0, -1.5, 0, 1.2, 0] : undefined;

  return (
    <motion.div
      className={`absolute ${className ?? ""}`}
      style={{
        ...(stylePos ?? {}),
        transform: `rotate(${rotate}deg)`,
        willChange: "transform",
      } as CSSProperties}
      // ← 初回状態を明示。暗転させない
      initial={{ y: 0, opacity: 1 }}
      animate={
        opt.paused
          ? { y: 0, opacity: 1, rotate: 0 }
          : { y: yKeyframes, opacity: 1, ...(rotateKeyframes ? { rotate: rotateKeyframes } : {}) }
      }
      // ← プロパティ別にループ指定（mirrorで往復）
      transition={
        opt.paused
          ? { duration: 0 }
          : {
              y: {
                duration: opt.duration,
                repeat: Infinity,
                repeatType: "mirror",
                ease: opt.ease,
                delay,
              },
              ...(rotateKeyframes
                ? {
                    rotate: {
                      duration: opt.duration * 1.1,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "easeInOut",
                      delay,
                    },
                  }
                : {}),
            }
      }
    >
      {children}
    </motion.div>
  );
}

/* ----------------- helpers ----------------- */
function buildAnim(opt: BobbingMotionOptions) {
  const base = [0, -opt.distance, 0, opt.distance * 0.66, 0];
  const r = opt.rotate ? { rotate: [0, -1.5, 0, 1.2, 0] } : {};
  return { y: base, opacity: 1, ...r };
}

function rngFromIndex(i: number) {
  // simple deterministic pseudo-random from index ([-0.5, 0.5])
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return (x - Math.floor(x)) - 0.5;
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}
