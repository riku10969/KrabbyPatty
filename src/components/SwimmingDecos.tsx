"use client";
import { motion } from "framer-motion";
import type { CSSProperties } from "react";

/**
 * SwimmingDecos – 横方向に泳ぐデコ（右→左 既定）
 * ------------------------------------------------------
 * - 画面外(110vw)から反対側(-10vw)まで直進し、ループで再出現
 * - 上下のバウンド＋微回転をオプションで付与
 * - layer="back" にすると要素の背面を通過
 *
 * 使用例:
 *  <section className="relative overflow-hidden [isolation:isolate]">
 *    <SwimmingDecos
 *      layer="back"
 *      defaults={{ direction: "rtl", speed: 12, distance: 6 }}
 *      items={[
 *        { src: "/deco/fish-orange.png", size: 64, top: "85%" },
 *        { src: "/deco/fish-blue.png", size: 72, delay: 2, top: "88%" },
 *      ]}
 *    />
 *
 *    <div className="relative z-10">
 *      {前面のカードやテキスト }
 *    </div>
 *  </section>
 */

export type SwimItem = {
  /** /public 配下の画像パス */
  src: string;
  alt?: string;
  /** px（高さは auto） */
  size?: number;
  /** セクション内の縦位置（例 "30%" / "120px"） */
  top?: string;
  /** 初回ディレイ（秒） */
  delay?: number;
  /** 1往復（画面横断）にかける秒数。小さいほど速い */
  speed?: number;
  /** 上下の振幅(px) */
  distance?: number;
  /** 微回転の有無 */
  sway?: boolean;
  /** レイヤー微調整 */
  zIndex?: number;
  /** 右→左 or 左→右 */
  direction?: "rtl" | "ltr";
  /** 追加クラス */
  className?: string;
  /** 不透明度 (0–1) */
  opacity?: number;
};

type Layer = "back" | "front";

export function SwimmingDecos({
  items,
  className,
  pointerEvents = "none",
  zIndex = 1,
  randomize = false,
  defaults,
  layer = "back", // ← 背面がデフォルト
}: {
  items?: SwimItem[];
  className?: string;
  pointerEvents?: "none" | "auto";
  zIndex?: number;
  randomize?: boolean;
  defaults?: Partial<
    Pick<SwimItem, "speed" | "distance" | "sway" | "direction" | "opacity">
  >;
  layer?: Layer;
}) {
  if (!items || items.length === 0) return null;

  const base: Required<
    Pick<SwimItem, "speed" | "distance" | "sway" | "direction" | "opacity">
  > = {
    speed: clamp(defaults?.speed ?? 12, 4, 40),
    distance: clamp(defaults?.distance ?? 8, 0, 40),
    sway: defaults?.sway ?? true,
    direction: defaults?.direction ?? "rtl",
    opacity: clamp01(defaults?.opacity ?? 1),
  };

  const wrapperZ = layer === "back" ? (zIndex ?? 0) : (zIndex ?? 10);

  return (
    <div
      className={`absolute inset-0 select-none ${
        layer === "back" ? "" : "z-10"
      } ${className ?? ""}`}
      style={{ pointerEvents, zIndex: wrapperZ } as CSSProperties}
      aria-hidden
    >
      {items.map((it, i) => {
        const r = randomize ? rngFromIndex(i) : 0;
        const speed = clamp((it.speed ?? base.speed) + r * 2, 4, 60);
        const distance = clamp((it.distance ?? base.distance) + r * 3, 0, 48);
        const sway = it.sway ?? base.sway;
        const direction = it.direction ?? base.direction;
        const opacity = clamp01((it.opacity ?? base.opacity) + r * 0.1);

        const xFrom = direction === "rtl" ? "110vw" : "-10vw";
        const xTo = direction === "rtl" ? "-10vw" : "110vw";

        // y／回転アニメーションキー
        const yKey =
          distance > 0 ? [0, -distance, 0, distance * 0.66, 0] : [0];
        const rotKey = sway
          ? [0, direction === "rtl" ? -3 : 3, 0, direction === "rtl" ? 2 : -2, 0]
          : [0];

        const delay = it.delay ?? i * 0.4 + Math.abs(r) * 0.6;

        return (
          <motion.div
            key={`${it.src}-${i}`}
            className={`absolute will-change-transform ${it.className ?? ""}`}
            style={{
              top: it.top ?? `${80 + i * 5}%`, // 下を泳ぐ
              transformOrigin: "50% 50%",
              zIndex: it.zIndex ?? wrapperZ,
              opacity,
            }}
            initial={{ x: xFrom, y: -distance / 2, rotate: 0, opacity }}
            animate={{ x: xTo, y: yKey, rotate: rotKey, opacity }}
            transition={{
              duration: speed,
              ease: "linear",
              repeat: Infinity,
              delay,
            }}
          >
            <img
              src={it.src}
              alt={it.alt ?? "deco"}
              width={it.size ?? 80}
              height={it.size ?? 80}
              style={{ height: "auto" }}
              className="pointer-events-none drop-shadow"
              loading="lazy"
              draggable={false}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

/* ----------------- utils ----------------- */
function rngFromIndex(i: number) {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return (x - Math.floor(x)) - 0.5;
}
function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}
function clamp01(n: number) {
  return clamp(n, 0, 1);
}
