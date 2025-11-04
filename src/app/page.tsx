"use client";
import React, { useEffect, useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";

import { NavKrabbyPop, default as HeroKrabbyPatty } from "../components/HeroKrabbyPatty";
import MenuListKrabby from "../components/MenuListKrabby";
import StoreInfoSeaPop from "@/components/StoreInfoSeaPop";
import NewsSectionCheapoPop from "@/components/NewsSectionPop";
import FooterKrabbyPop from "@/components/FooterKrabbyPop";

// モバイルオーダーUIを動的インポート（SSR無効）
const KrabbyMobileOrderDemo = dynamic(() => import("../components/KrabbyMobileOrderDemo"), {
  ssr: false,
});

export default function Page() {
  // オーダーUIの表示フラグと、どの商品を開くかのID
  const [showOrder, setShowOrder] = useState(false);
  const [focusItemId, setFocusItemId] = useState<string | undefined>(undefined);

  // ESCキーで閉じる
  useEffect(() => {
    if (!showOrder) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setShowOrder(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showOrder]);

  // 背景スクロール固定
  useEffect(() => {
    document.body.style.overflow = showOrder ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showOrder]);

  // Heroまたはメニューから「注文」クリックされた時
  const handleOrderClick = useCallback((itemId?: string) => {
    setFocusItemId(itemId);
    setShowOrder(true);
  }, []);

  return (
    <>
      <NavKrabbyPop />

      <main>
        {/* Hero */}
        <HeroKrabbyPatty onOrderClick={() => handleOrderClick()} />

        {/* メニュー一覧（Heroの下） */}
        <MenuListKrabby onOrderClick={handleOrderClick} />

      </main>

      {/* ==== アニメ付きオーバーレイ ==== */}
      <AnimatePresence>
        {showOrder && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center"
            onClick={() => setShowOrder(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              key="card"
              onClick={(e) => e.stopPropagation()}
              className="w-full sm:w-[92vw] sm:max-w-[520px] max-h-[92vh] rounded-t-3xl sm:rounded-3xl overflow-hidden border border-white/10 bg-neutral-900"
              initial={{ y: 36, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26, mass: 0.9 }}
            >
              {/* ← focusItemId を渡すことで、その商品を開いた状態で表示 */}
              <KrabbyMobileOrderDemo initialItemId={focusItemId} />
            </motion.div>

            {/* 閉じるボタン */}
            <motion.button
              key="close"
              onClick={() => setShowOrder(false)}
              aria-label="閉じる"
              className="absolute top-3 right-3 sm:top-6 sm:right-6 inline-flex items-center justify-center
                         w-10 h-10 rounded-full bg-white/90 text-black font-black shadow"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              ×
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      <StoreInfoSeaPop/>
      <NewsSectionCheapoPop/>
      <FooterKrabbyPop/>
    </>
  );
}
