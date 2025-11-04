"use client";
import { motion } from "framer-motion";
import { MapPin, Clock, Ship, Map } from "lucide-react";
import { SwimmingDecos } from "./SwimmingDecos";
import { FloatingDecos } from "./FloatingDecos";
import clsx from "clsx";
import React from "react";

export default function FloatingLifebuoySection() {
  return (
    <section className="relative overflow-hidden bg-sky-300 pt-16 pb-32" id="access">
      <TopFloatingDivider />
      <div className="relative z-20 mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <div>
          <h2
  className="text-3xl sm:text-4xl font-extrabold text-white"
  style={{ WebkitTextStroke: "2px #003E99" }}
>
  ACCESS
</h2>
<span aria-hidden className="krabby-squiggle mt-2 block" />
<p className="mt-1 text-[#003E99] font-semibold">
  当店への行き方・住所・営業時間をご案内します。
</p>
        </div>

        {/* ==== 浮き輪カード群 ==== */}
        <div className="mt-10 grid gap-8 md:grid-cols-3 place-items-center">
          <LifebuoyCard
            theme="navy"
            icon={<MapPin className="h-6 w-6" />}
            title="住所"
            lines={["〒999-9999 ○○浜1-2-3", "××ストリート沿い"]}
            floatDelay={0}
          />
          <LifebuoyCard
            theme="red"
            icon={<Clock className="h-6 w-6" />}
            title="営業時間"
            lines={["平日 10:00 - 20:00", "土日祝 9:00 - 21:00", "定休日：潮が荒い日"]}
            floatDelay={0.8}
          />
          <LifebuoyCard
            theme="mint"
            icon={<Ship className="h-6 w-6" />}
            title="アクセス"
            lines={[
              "海岸通りバス「△△前」下車 徒歩30分",
              "無料パーキング 12台",
            ]}
            floatDelay={1.6}
          />
        </div>

        {/* ==== 下の大きな浮き輪 ==== */}
        <div className="mt-12 flex justify-center">
          <LifebuoyCard
            theme="yellow"
            big
            icon={<Map className="h-6 w-6" />}
            title=""
            mapPlaceholder
            floatDelay={0.4}
          />
        </div>
      </div>

      {/* ==== 背景ドット（質感） ==== */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10px_10px,rgba(255,255,255,0.25)_1px,transparent_1px)] bg-[size:14px_14px] opacity-30" />

      {/* ==== 下端の波（上向き） ==== */}
      <WaveDivider />

      {/* ==== 波の下の白フェード ==== */}
      <WhiteFadeUnderWave />

      {/* ==== 浮き輪ぷかぷかアニメ ==== */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
        .floaty {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>

      <SwimmingDecos
         layer="back"
         zIndex={0}              // ★背面（セクション背景より前）
         className="z-0"         // ★保険
         defaults={{ direction: "rtl", speed: 12, distance: 6 }}
         items={[
           { src: "/deco/fish2.png", size: 64, top: "20%" },
           { src: "/deco/fish1.png", size: 86, top: "66%", delay: 1.2, direction: "ltr", speed: 22 },


         ]}
       />
       <FloatingDecos
           items={[
             { src: "/deco/ukiwa2.png",    size: 72, pos: { right: "24px", top: "120px" }, rotate: -8 },
             { src: "/deco/ukiwa.png",     size: 84, pos: { left: "12%", bottom: "18%" }, motion:{ distance:10, duration:6, rotate:true } },
           ]}
           pointerEvents="none"
           zIndex={10}
           randomize
           motionOptions={{ duration: 5, distance: 6, rotate: false }}
         />
    </section>
  );
}

/* ===== 浮き輪カード（4色テーマ） ===== */
type Theme = "navy" | "red" | "mint" | "yellow";
const PALETTE: Record<Theme, { ring: string; stripeHex: string; text: string }> = {
  navy: { ring: "ring-sky-700", stripeHex: "#0B3171", text: "text-sky-900" },
  red: { ring: "ring-rose-600", stripeHex: "#FF3B3B", text: "text-rose-900" },
  mint: { ring: "ring-emerald-600", stripeHex: "#10B981", text: "text-emerald-900" },
  yellow: { ring: "ring-amber-500", stripeHex: "#F59E0B", text: "text-amber-900" },
};

function LifebuoyCard({
  theme,
  title,
  icon,
  lines,
  big = false,
  mapPlaceholder = false,
  floatDelay = 0,
}: {
  theme: Theme;
  title: string;
  icon: React.ReactNode;
  lines?: string[];
  big?: boolean;
  mapPlaceholder?: boolean;
  floatDelay?: number;
}) {
  const p = PALETTE[theme];
  return (
    <motion.div
      style={{ animationDelay: `${floatDelay}s` }}
      className={clsx(
        "floaty relative isolate flex flex-col items-center justify-center text-center",
        "bg-white/95 backdrop-blur-sm overflow-hidden shadow-[4px_4px_0_rgba(0,0,0,0.18)]",
        "border-[12px] border-white ring-[10px]",
        p.ring,
        big
          ? "aspect-[3/2] w-[min(640px,92vw)]"
          : "aspect-square w-[min(320px,60vw)]",
        "rounded-full"
      )}
    >
      {/* 浮き輪模様 */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `repeating-conic-gradient(${p.stripeHex} 0deg 25deg, #fff 25deg 50deg)`,
          mask: "radial-gradient(circle, transparent 55%, black 57%)",
          WebkitMask: "radial-gradient(circle, transparent 55%, black 57%)",
        }}
      />

      {/* 内容 */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-white/80 ring-2 ring-black/10 mb-2">
          {icon}
        </div>
        <h4 className={clsx("font-black text-base mb-1", p.text)}>{title}</h4>

        {mapPlaceholder ? (
          <div className="mt-2 aspect-[3/2] w-[90%] rounded-xl overflow-hidden shadow-[0_4px_0_#003E99] border-4 border-white">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3238.217091319538!2d139.75248757649857!3d34.97616252169225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601b70b6b3d97b47%3A0x6f7c03f83d1dc5c!2z44CSNDAyLTAwMTQg5p2x5Lqs6YO95a6u5Z-OMeOCt-ODrOOCuOOCueODs-ODkeODvOOCuA!5e0!3m2!1sja!2sjp!4v1730620000000!5m2!1sja!2sjp"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        ) : (
          <ul className={clsx("text-xs leading-tight space-y-1 max-w-[180px]", p.text)}>
            {lines?.map((t, i) => (
              <li key={i}>・{t}</li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}

/* ===== 上向きの波（背景と同色） ===== */
function WaveDivider() {
  return (
    <div className="absolute bottom-0 left-0 w-full overflow-visible leading-[0] rotate-180 z-10">
      <svg
        className="relative block w-[calc(120%+1.3px)] h-[120px]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86
             82.69-16.73,168.94-17.15,251.43.39C823.78,27.52,
             906.67,59,985.66,70.3c69.5,9.72,138,3.83,
             206.34-10.69V120H0V66.92A600.21,600.21,0,0,0,
             321.39,56.44Z"
          fill="#7dd3fc"
          fillOpacity="1"
        />
      </svg>
    </div>
  );
}

/* ===== 波下の白フェード（次へ滑らか遷移） ===== */
function WhiteFadeUnderWave() {
  return (
    <div
      className="pointer-events-none absolute left-0 w-full z-0
                 -bottom-[100px] h-[200px]
                 bg-gradient-to-b from-sky-300 via-sky-100 to-[#FFF9E6]"
    />
  );
}

/* ===== 上部の“海に浮かぶ仕切り” ===== */
/* ===== 上部の“ロープ＋ブイ”だけの仕切り ===== */
function TopFloatingDivider() {
  return (
    <div className="absolute top-0 left-0 right-0 h-[120px] z-10 pointer-events-none select-none">
      {/* 水面（泡縁＋同色波） */}
      {/* <svg
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[calc(120%+1px)] h-[80px]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
      >
        <path d="M0,0 C200,40 400,40 600,12 C800,-16 1000,16 1200,0 L1200,0 L0,0 Z"
              fill="white" fillOpacity="0.9"/>
        <path d="M0,8 C200,48 400,48 600,20 C800,-8 1000,24 1200,8 L1200,80 L0,80 Z"
              fill="#7dd3fc"/>
      </svg> */}

      {/* たるんだロープ */}
      {/* <svg
        className="absolute top-[54px] left-0 w-full h-[24px]"
        viewBox="0 0 1200 24"
        preserveAspectRatio="none"
      > */}
        {/* ロープ本体（2本で立体感） */}
        {/* <path d="M0,12 C150,4 300,20 450,12 C600,4 750,20 900,12 C1050,4 1125,16 1200,12"
              stroke="#B7791F" strokeWidth="7" fill="none" strokeLinecap="round"/>
        <path d="M0,15 C150,7 300,23 450,15 C600,7 750,23 900,15 C1050,7 1125,19 1200,15"
              stroke="#D69E2E" strokeWidth="5" fill="none" strokeLinecap="round"/> */}

        {/* 斜めの撚り（細いストロークをリピート） */}
        {/* {Array.from({ length: 40 }).map((_, i) => {
          const x = (i / 39) * 1200;
          const y1 = 12 + Math.sin((i / 39) * Math.PI * 4) * 3;
          return (
            <line key={i} x1={x} y1={y1-5} x2={x+18} y2={y1+5}
                  stroke="#8B5E20" strokeWidth="2" strokeLinecap="round" />
          );
        })}
      </svg> */}

      {/* ブイ（ロープ上に均等配置） */}
      <Buoy style={{ left: "8%"  }} delay={0.0} />
      <Buoy style={{ left: "24%" }} delay={0.4} />
      <Buoy style={{ left: "40%" }} delay={0.8} />
      <Buoy style={{ left: "56%" }} delay={0.2} />
      <Buoy style={{ left: "72%" }} delay={0.6} />
      <Buoy style={{ left: "88%" }} delay={1.0} />
    </div>
  );
}

/* ===== ブイ（赤白ストライプ＋軽いバウンド） ===== */
function Buoy({
  style,
  delay = 0,
}: {
  style?: React.CSSProperties;
  delay?: number;
}) {
  return (
    <div
      className="absolute top-[33px] w-[34px] h-[20px] rounded-full border border-black/15 shadow-[0_2px_0_rgba(0,0,0,0.25)] floaty"
      style={{
        ...style,
        animationDelay: `${delay}s`,
        background:
          "repeating-linear-gradient(90deg, #FFFFFF 0 8px, #EF4444 8px 16px)",
        transform: "rotate(-8deg)",
      }}
    >
      <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/45 to-transparent" />
    </div>
  );
}