"use client";

import { AnimatePresence, motion, useMotionValue, animate, MotionValue } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";

/** CSS 変数を型で安全に扱うためのヘルパー */
type CSSVar<K extends string> = React.CSSProperties & Record<K, string | number>;
type MotionCSSVar<K extends string> = React.CSSProperties &
  Record<K, string | number | MotionValue<number>>;

type OceanIntroProps = {
  logoSrc: string;
  durationMs?: number;
  onlyOnce?: boolean;
};

export default function OceanIntro({
  logoSrc,
  durationMs = 2600,
  onlyOnce = true,
}: OceanIntroProps) {
  const [show, setShow] = useState(false);

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
          {bubbles.map((b) => {
            const style: CSSVar<"--drift"> = {
              left: `${b.left}%`,
              width: b.size,
              height: b.size,
              filter: b.blur ? `blur(${b.blur}px)` : "none",
              opacity: b.opacity,
              animation: `bubble-rise ${b.dur}ms linear ${b.delay}ms 1 both`,
              "--drift": `${b.drift}px`,
            };
            return (
              <span
                key={b.id}
                className="absolute bottom-[-12vh] rounded-full bg-white/70"
                style={style}
              />
            );
          })}

          {/* ロゴ（浮かび上がる） */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              perspective: "1000px",
              transformStyle: "preserve-3d",
            }}
          >
            <ZLogo logoSrc={logoSrc} />
          </motion.div>

          {/* 上からおりてくる波 */}
          <motion.div
            className="absolute -top-24 left-0 right-0 h-48 pointer-events-none"
            initial={{ y: -80, opacity: 0.0 }}
            animate={{ y: 0, opacity: 0.4 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          >
            <svg viewBox="0 0 1200 200" preserveAspectRatio="none" className="w-full h-full">
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
  const tz = useMotionValue(-600);

  useEffect(() => {
    const controls = animate(tz, 0, {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.05,
    });
    return () => controls.stop();
  }, [tz]);

  // MotionValue を CSS 変数で渡せるように型を拡張
  const style: MotionCSSVar<"--tz"> = {
    transformOrigin: "50% 60%",
    transformStyle: "preserve-3d",
    "--tz": tz,
  };

  return (
    <motion.img
      src={logoSrc}
      alt=""
      className="h-24 w-auto sm:h-28 md:h-36 select-none drop-shadow-[0_12px_18px_rgba(0,0,0,0.35)] will-change-transform"
      style={style}
      transformTemplate={(t) => `perspective(900px) translate3d(0,0,var(--tz, -600px)) ${t}`}
      initial={{
        opacity: 0,
        y: 16,
        scale: 0.88,
        rotateX: 6,
        filter: "blur(4px) brightness(0.96)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1.08,
        rotateX: 0,
        filter: "blur(0px) brightness(1)",
      }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
    />
  );
}
