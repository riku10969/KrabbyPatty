"use client";

import { AnimatePresence, motion, useMotionValue, animate } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";


type OceanIntroProps = {
  /** /public 配下のロゴ画像パス */
  logoSrc: string;
  /** ミリ秒（デフォ 2600ms） */
  durationMs?: number;
  /** セッション中は1回だけ表示（true 推奨） */
  onlyOnce?: boolean;
};

export default function OceanIntro({
  logoSrc,
  durationMs = 2600,
  onlyOnce = true,
}: OceanIntroProps) {
  const [show, setShow] = useState(false);

  // 泡の乱数プリセット（レイアウト確定後は毎回同じ見え方）
  const bubbles = useMemo(() => {
    const N = 22;
    return Array.from({ length: N }, (_, i) => {
      const size = Math.floor(Math.random() * 22) + 8; // 8〜30px
      const left = Math.random() * 100; // %
      const delay = Math.random() * 1200; // ms
      const dur = 1800 + Math.random() * 1400; // 1.8〜3.2s
      const drift = (Math.random() - 0.5) * 24; // -12〜12px
      const blur = Math.random() < 0.4 ? 2 : 0;
      const opacity = 0.35 + Math.random() * 0.4;
      return { id: i, size, left, delay, dur, drift, blur, opacity };
    });
  }, []);

  useEffect(() => {
    const key = "oceanIntroShown";
    const already = typeof window !== "undefined" && sessionStorage.getItem(key);

    if (onlyOnce && already) {
      setShow(false);
      return;
    }
    setShow(true);

    // スクロール固定
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const t = setTimeout(() => {
      setShow(false);
      if (onlyOnce) sessionStorage.setItem(key, "1");
      document.body.style.overflow = prevOverflow;
    }, durationMs);

    return () => {
      clearTimeout(t);
      document.body.style.overflow = prevOverflow;
    };
  }, [durationMs, onlyOnce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="ocean-intro fixed inset-0 z-[9999] pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          aria-hidden
        >
          {/* 海色のグラデーション層 */}
          <div className="absolute inset-0 bg-[radial-gradient(120%_70%_at_50%_120%,#5ad2ff_0%,#0077b6_45%,#003e99_100%)]" />

          {/* 水面の光（コースティクス風） */}
          <div className="absolute inset-0 mix-blend-screen opacity-30 caustics" />

          {/* ほんのりビネット */}
          <div className="absolute inset-0 bg-[radial-gradient(100%_100%_at_50%_50%,transparent_60%,rgba(0,0,0,0.35)_100%)]" />

          {/* 泡 */}
          {bubbles.map((b) => (
            <span
              key={b.id}
              className="absolute bottom-[-12vh] rounded-full bg-white/70"
              style={{
                left: `${b.left}%`,
                width: b.size,
                height: b.size,
                filter: b.blur ? `blur(${b.blur}px)` : "none",
                opacity: b.opacity,
                animation: `bubble-rise ${b.dur}ms linear ${b.delay}ms 1 both`,
                // 横にほんの少し流す（カスタムプロパティを使って keyframes で参照）
                // @ts-ignore
                "--drift": `${b.drift}px`,
              } as React.CSSProperties}
            />
          ))}

          {/* ロゴ（浮かび上がる） */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{
                // 親にパースペクティブを与える（必須）
                perspective: "1000px",
                transformStyle: "preserve-3d",
            }}
            >
            <ZLogo logoSrc={logoSrc} />
            
            </motion.div>

          {/* 水面の“波線”が上から降りてきて視界が晴れる感じ（ほんのり） */}
          <motion.div
            className="absolute -top-24 left-0 right-0 h-48 pointer-events-none"
            initial={{ y: -80, opacity: 0.0 }}
            animate={{ y: 0, opacity: 0.4 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          >
            <svg
              viewBox="0 0 1200 200"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <path
                d="M0,120 C200,80 300,160 500,120 C700,80 900,160 1200,120 L1200,0 L0,0 Z"
                fill="url(#waveGrad)"
              />
              <defs>
                <linearGradient id="waveGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ZLogo({ logoSrc }: { logoSrc: string }) {
  // もっと奥からスタートさせる（効果を明確に）
  const tz = useMotionValue(-600); // px

  useEffect(() => {
    const controls = animate(tz, 0, {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.05,
    });
    return () => controls.stop();
  }, [tz]);

  return (
    <motion.img
      src={logoSrc}
      alt=""
      className="h-24 w-auto sm:h-28 md:h-36 select-none drop-shadow-[0_12px_18px_rgba(0,0,0,0.35)] will-change-transform"
      style={
        {
          ["--tz" as any]: tz,              // translateZ 用のCSS変数
          transformOrigin: "50% 60%",
          transformStyle: "preserve-3d",
        } as React.CSSProperties
      }
      // ✅ 要素自身の transform に perspective を直書き
      //    さらに translate3d で確実に3D化
      transformTemplate={(t) =>
        `perspective(900px) translate3d(0,0,var(--tz, -600px)) ${t}`
      }
      initial={{
        opacity: 0,
        y: 16,
        // 保険：環境差でZの見え方が弱い場合も拡大を少し併用
        scale: 0.88,
        rotateX: 6,
        filter: "blur(4px) brightness(0.96)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1.08,   // ほんのりオーバーシュートで“前進”を強調
        rotateX: 0,
        filter: "blur(0px) brightness(1)",
      }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
    />
  );
}