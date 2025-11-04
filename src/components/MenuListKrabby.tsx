"use client";
import React, { useMemo, useState } from "react";
import { SwimmingDecos } from "./SwimmingDecos";

type Stock = "in" | "few" | "sold";

type MenuItem = {
  id: string;
  name: string;
  desc: string;
  price: number;
  img: string;
  tags?: string[];
  category: "burger" | "drink" | "side";
  stock: Stock;
};

const MENU: MenuItem[] = [
  {
    id: "classic",
    name: "クラシック",
    desc: "シンプルなハンバーガー",
    price: 590,
    img: "../menu/burger1.png",
    // tags: ["人気", "定番"],
    category: "burger",
    stock: "in",
  },
  {
    id: "sea-double",
    name: "セブン・シー・スタック",
    desc: "海の幸で重力に挑戦する塔。",
    price: 1500,
    img: "/menu/burger2.png",
    // tags: ["満腹", "限定"],
    category: "burger",
    stock: "sold",
  },
  {
    id: "sea-special",
    name: "シースペシャル",
    desc: "シーフードてんこ盛り",
    price: 860,
    img: "../menu/burger3.png",
    category: "burger",
    // tags: ["新"],
    stock: "few",
  },
  {
    id: "crab-sand",
    name: "クラブサンド",
    desc: "生きたカニをそのまま使用",
    price: 2000,
    img: "../menu/burger4.png",
    category: "burger",
    // tags: ["限定"],
    stock: "sold",
  },
  {
    id: "Krabby-classic",
    name: "クラビィクラシック",
    desc: "当店一番人気",
    price: 800,
    img: "../menu/burger5.png",
    category: "burger",
    // tags: ["人気"],
    stock: "few",
  },
  {
    id: "potato",
    name: "ポテトフライ",
    desc: "バーガーのお供に",
    price: 200,
    img: "../menu/side1.png",
    category: "side",
    stock: "in",
  },
  {
    id: "fishfly",
    name: "フィッシュフライ",
    desc: "ポテトに飽きたときに",
    price: 200,
    img: "../menu/side2.png",
    category: "side",
    stock: "in",
  },
  {
    id: "Cola",
    name: "コーラ",
    desc: "飲み物で人気No1",
    price: 250,
    img: "../menu/drink1.png",
    category: "drink",
    stock: "in",
  },
  {
    id: "mist-soda",
    name: "マーメイドミスト・ソーダ",
    desc: "深海をイメージした不思議なソーダ",
    price: 600,
    img: "../menu/drink2.png",
    category: "drink",
    stock: "few",
  },
  {
    id: "bubble-soda",
    name: "バブル・ソーダ",
    desc: "ほんのり甘いトロピカルキャンディ味",
    price: 600,
    img: "../menu/drink3.png",
    category: "drink",
    stock: "few",
  },
];

function money(jpy: number) {
  return jpy.toLocaleString("ja-JP", { style: "currency", currency: "JPY" });
}

export default function MenuListKrabby({
  onOrderClick,
}: {
  onOrderClick?: (itemId?: string) => void;
}) {
  const [activeCat, setActiveCat] = useState<
    "all" | "burger" | "drink" | "side"
  >("all");
  const list = useMemo(
    () => (activeCat === "all" ? MENU : MENU.filter((m) => m.category === activeCat)),
    [activeCat]
  );

  return (
    <section
   id="menu"
   className="relative overflow-hidden [isolation:isolate] bg-gradient-to-b from-[#0077FF] via-[#1EA0FF] to-[#6DD5FA] text-white"
 >
      {/* 上部ウェーブ */}
      <div className="pointer-events-none -mt-8 h-8 opacity-80" aria-hidden>
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
        >
          <path
            fill="#FFD600"
            d="M0,32 C120,48 240,56 360,48 C480,40 600,16 720,24 C840,32 960,64 1080,64 C1200,64 1320,40 1440,24 L1440,80 L0,80 Z"
          />
        </svg>
      </div>

      <div className="relative z-20 mx-auto max-w-6xl px-6 py-12 sm:py-16"> 
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2
  className="text-3xl sm:text-4xl font-extrabold text-white"
  style={{ WebkitTextStroke: "2px #003E99" }}
>
  MENU
</h2>
<span aria-hidden className="krabby-squiggle mt-2 block" />
<p className="mt-1 text-white font-semibold">
  こちらでモバイルオーダーができます。
</p>
          </div>

          {/* フィルタ */}
          <div className="flex gap-2 flex-wrap">
            {[
              { key: "all", label: "すべて" },
              { key: "burger", label: "バーガー" },
              { key: "drink", label: "ドリンク" },
              { key: "side", label: "サイド" },
            ].map((c) => {
              const k = c.key as "all" | "burger" | "drink" | "side";
              const active = activeCat === k;
              return (
                <button
                  key={k}
                  onClick={() => setActiveCat(k)}
                  className={`rounded-xl border-4 px-3 py-1 font-black transition ${
                    active
                      ? "bg-[#FFD600] text-[#FF0000] border-white shadow-[0_4px_0_#920000]"
                      : "bg-white text-[#0077FF] border-[#0077FF] shadow-[4px_4px_0_#003E99]"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* グリッド */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((m) => (
            <article
              key={m.id}
              className="rounded-3xl overflow-hidden border-8 border-white bg-white/10 backdrop-blur shadow-[8px_8px_0_#003E99]"
            >
              <div className="aspect-[4/3] w-full bg-neutral-800">
                <img
                  src={m.img}
                  alt={m.name}
                  className="w-full h-full object-contain]"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-xl font-black drop-shadow-[0_2px_0_#003E99]">
                    {m.name}
                  </h3>

                  {/* 在庫バッジ */}
                  {m.stock === "in" && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-400 text-black font-black border-2 border-white">
                      在庫あり
                    </span>
                  )}
                  {m.stock === "few" && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-300 text-black font-black border-2 border-white animate-badge-pulse">
                      残りわずか
                    </span>
                  )}
                  {m.stock === "sold" && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500 text-white font-black border-2 border-white animate-badge-blink">
                      売り切れ
                    </span>
                  )}

                  {m.tags?.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 border-2 border-white font-black"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <p className="mt-1 text-sm text-white/90">{m.desc}</p>
                <div className="mt-2 text-2xl font-extrabold text-[#FFD600] drop-shadow-[0_2px_0_#003E99]">
                  {money(m.price)}
                </div>

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => onOrderClick?.(m.id)}
                    className={`flex-1 inline-flex items-center justify-center rounded-2xl px-4 py-3 text-white font-extrabold border-4 border-white shadow-[0_4px_0_#920000] hover:translate-y-[1px] ${
                      m.stock === "sold"
                        ? "bg-gray-400 cursor-not-allowed line-through opacity-60"
                        : "bg-[#FF0000]"
                    }`}
                    disabled={m.stock === "sold"}
                  >
                    注文
                  </button>

                  <a
                    href="#order"
                    className="rounded-2xl bg-white px-4 py-3 text-[#0077FF] font-extrabold border-4 border-[#0077FF] shadow-[4px_4px_0_#003E99]"
                  >
                    詳細
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      
    <SwimmingDecos
   layer="back"
   zIndex={0}              // ★背面（セクション背景より前）
   className="z-0"         // ★保険
   defaults={{ direction: "rtl", speed: 12, distance: 6 }}
   items={[
     { src: "/deco/shark.png", size: 120, top: "20%" },
    //  { src: "/deco/fish5.png", size: 70, top: "61%" },
     { src: "/deco/fish4.png", size: 92, top: "47%", direction: "ltr" },
     { src: "/deco/fish1.png", size: 86, top: "88%", delay: 1.2, direction: "ltr", speed: 50 },
   ]}
 />
    </section>
  );
}
