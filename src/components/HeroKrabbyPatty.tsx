"use client";
import React, { useState, useCallback } from "react";
import { ContactModal } from "./ContactModal";

/**
 * Krabby Patty – チープポップ版ナビゲーション
 */
export function NavKrabbyPop({ onOrderClick }: { onOrderClick?: () => void }) {
  const [contactOpen, setContactOpen] = useState(false);

  const handleOrder = useCallback(() => {
    if (onOrderClick) {
      onOrderClick();
    }
  }, [onOrderClick]);

  return (
    <header className="sticky top-0 z-50">
      {/* 上部ストライプ */}
      <div className="h-2 w-full bg-repeat"
           style={{backgroundImage:"repeating-linear-gradient(45deg,#FF0000 0 10px,#FFD600 10px 20px)"}}/>

      <nav className="relative bg-[#003E99] text-white border-b-8 border-[#FFD600] shadow-[0_8px_0_#001E66]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            <a href="#" className="flex items-center gap-2 group">
              <img
                src="/logo.png"  // ← public配下に置く（例：public/logo/krabby-logo.png）
                alt="Krabby Patty Logo"
                className="h-20 w-auto drop-shadow-[0_2px_0_#001E66] transition-transform group-hover:scale-105"
              />
            </a>

            <ul className="hidden md:flex items-center gap-20 font-extrabold">
              <NavLink href="#top" label="トップ" />
              <NavLink href="#menu" label="メニュー" />
              <NavLink href="#access" label="アクセス" />
              <NavLink href="#news" label="ニュース" />
              <NavLink label="お問い合わせ" onClick={() => setContactOpen(true)} />
            </ul>

            {/* <button
  type="button"
  onClick={handleOrder}
  className="inline-flex items-center rounded-xl bg-[#FF0000] px-4 py-2 text-white border-4 border-white shadow-[0_4px_0_#920000] animate-cta-blink font-black hover:translate-y-[2px] active:translate-y-[4px] transition-all"
>
  注文する!!
</button> */}
            <details className="md:hidden">
              <summary className="list-none cursor-pointer select-none rounded-lg border-4 border-white px-3 py-1 font-black bg-[#FF0000] shadow-[0_4px_0_#920000]">メニュー</summary>
              <div className="mt-3 grid gap-2 bg-[#003E99] p-3 rounded-xl border-4 border-white">
                <a className="MobileItem" href="#top">Top</a>
                <a className="MobileItem" href="#menu">Menu</a>
                <a className="MobileItem" href="#access">Access</a>
                <a className="MobileItem" href="#news">News</a>
                 <button
      className="MobileItem"
      onClick={() => setContactOpen(true)}
      aria-haspopup="dialog"
      aria-controls="contact-modal"
    >
      Information
    </button>

    {/* 注文（同じ onClick を使う） */}
    {/* <button
      className="MobileCTA"
      onClick={handleOrder}
    >
      注文する!!
    </button> */}

              </div>
            </details>
          </div>
        </div>
      </nav>

      <div className="h-2 w-full bg-repeat"
           style={{backgroundImage:"repeating-linear-gradient(-45deg,#FF0000 0 10px,#FFD600 10px 20px)"}}/>

      <style jsx>{`
        .MobileItem{ @apply block rounded-lg border-4 border-white px-3 py-2 font-black text-white bg-[#004FBA]; }
        .MobileCTA{ @apply block text-center rounded-lg border-4 border-white px-3 py-2 font-black text-white bg-[#FF0000]; }
      `}</style>
      {/* ★ モーダルを最後に配置 */}
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </header>
  );
}

function NavLink({
  href,
  label,
  onClick,
}: { href?: string; label: string; onClick?: (e: React.MouseEvent) => void }) {
  const base =
    "relative inline-flex h-12 items-center px-5 rounded-xl border-4 border-white bg-[#004FBA] " +
    "shadow-[4px_4px_0_#001E66] hover:-translate-y-0.5 transition whitespace-nowrap " +
    "leading-none text-[15px] md:text-base font-extrabold gap-1";

  const glow = (
    <span
      className="absolute left-2 right-2 bottom-1 h-2 bg-[#FFD600] border-2 border-[#FF0000] -z-10 rounded-full"
      aria-hidden
    />
  );

  if (onClick) {
    return (
      <li>
        <button
          type="button"
          onClick={onClick}
          className={base}
          aria-haspopup="dialog"
          aria-controls="contact-modal"
        >
          <span className="w-4 text-center" aria-hidden>✨</span>
          <span>{label}</span>
          {glow}
        </button>
      </li>
    );
  }

  return (
    <li>
      <a href={href} className={base}>
        <span className="w-4 text-center" aria-hidden>✨</span>
        <span>{label}</span>
        {glow}
      </a>
    </li>
  );
}


function LockedLink({label}:{label:string}){
  return (
    <li>
      <span className="inline-flex items-center px-4 py-2 rounded-xl border-4 border-white bg-[#808AAE] text-white/80 cursor-not-allowed shadow-[4px_4px_0_#4d577a]">
        🔒 {label}
      </span>
    </li>
  );
}

/**
 * HeroKrabbyPatty (チープポップ版泡大きめ)
 */
export default function HeroKrabbyPatty({onOrderClick,}: {onOrderClick?: () => void;}) {
  return (
    <section className="relative overflow-visible" id="top">
      {/* <FloatingDecos
    items={[
      { src: "../deco/shark.png", size: 96, pos: { top: "20px", left: "16px" }, delay: 0.1 },
      { src: "/deco/fish1.png",    size: 72, pos: { right: "24px", top: "120px" }, rotate: -8 },
      { src: "/deco/fish2.png",     size: 84, pos: { left: "12%", bottom: "18%" }, motion:{ distance:10, duration:6, rotate:true } },
    ]}
    pointerEvents="none"
    zIndex={10}
    randomize
    motionOptions={{ duration: 5, distance: 6, rotate: false }}
  /> */}
      {/* <div className="absolute inset-0 bg-[#0077FF]">
        <div
          aria-hidden
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.25) 8px, transparent 12px), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.25) 10px, transparent 14px), radial-gradient(circle at 40% 80%, rgba(255,255,255,0.25) 12px, transparent 16px)",
            backgroundSize: "200px 200px, 240px 240px, 280px 280px",
            backgroundPosition: "0 0, 40px 80px, 120px 40px",
            animation: "bubbleShift 20s linear infinite",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(180deg, rgba(255,255,255,0.08) 0 2px, transparent 2px 16px)",
            animation: "waveDrift 18s ease-in-out infinite",
          }}
        />
      </div> */}

      {/* === 店内ぼかし背景 === */}
<div className="absolute inset-0 -z-10">
  {/* 背景写真（object-cover + ぼかし + 微拡大で縁の荒れ防止） */}
  <img
    src="/top/store.png"
    alt=""
    aria-hidden
    className="w-full h-full object-cover blur-[8px] scale-[1.04] brightness-[0.85] object-[50%_20%]"
    loading="eager"
  />

  {/* 色味をのせる（既存の海っぽさ維持） */}
  <div className="absolute inset-0 bg-[#0077FF]/30 mix-blend-multiply" />

  {/* うっすら泡の粒感（前の装飾を背景用に微調整） */}
  <div
    aria-hidden
    className="absolute inset-0 opacity-25"
    style={{
      backgroundImage:
        "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.25) 8px, transparent 12px), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.25) 10px, transparent 14px), radial-gradient(circle at 40% 80%, rgba(255,255,255,0.25) 12px, transparent 16px)",
      backgroundSize: "200px 200px, 240px 240px, 280px 280px",
      backgroundPosition: "0 0, 40px 80px, 120px 40px",
      animation: "bubbleShift 20s linear infinite",
    }}
  />

  {/* 線のゆらぎも弱めに（店内写真の邪魔をしない程度） */}
  <div
    aria-hidden
    className="absolute inset-0 opacity-10"
    style={{
      backgroundImage:
        "repeating-linear-gradient(180deg, rgba(255,255,255,0.12) 0 2px, transparent 2px 16px)",
      animation: "waveDrift 18s ease-in-out infinite",
    }}
  />
</div>

      <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-24 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="text-center md:text-left">
          <span className="mb-6 inline-block select-none rounded-full bg-[#FFD600] border-4 border-[#FF0000] px-4 py-1 text-[#FF0000] font-black text-sm tracking-wide shadow-[4px_4px_0_#FF0000] animate-bounce-slow">
            世界一（※当社比）
          </span>
          <h1 className="text-center font-extrabold text-[48px] leading-[1.1] tracking-tight">
            <span className="text-white drop-shadow-[2px_2px_0_#003E99]">
              世界一うまいバーガーを
            </span>
            <br />
            <span className="text-yellow-400 drop-shadow-[2px_2px_0_#001E66]">
              今すぐ注文！
            </span>
          </h1>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button
              onClick={onOrderClick}
              className="group inline-flex items-center justify-center rounded-2xl bg-[#FF0000] px-8 py-4 text-white text-xl font-extrabold shadow-[0_6px_0_#920000] border-4 border-white hover:translate-y-[2px] hover:shadow-[0_4px_0_#920000] active:translate-y-[4px] active:shadow-[0_2px_0_#920000] focus:outline-none focus:ring-4 focus:ring-white/50 animate-cta-blink"
            >
              注文する!!
              <span className="ml-2 inline-block translate-y-[-1px] transition-transform group-hover:translate-x-1">👉</span>
            </button>

            <a
              href="#menu"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-4 text-[#0077FF] text-lg font-extrabold border-4 border-[#0077FF] shadow-[4px_4px_0_#003E99] hover:translate-y-[2px]"
            >
              メニューを見る
            </a>
          </div>

          {/* <div className="mt-5 flex items-center gap-3 justify-center md:justify-start">
            <Sticker text="本日の名言：利益は正義" color="#FF6699" />
            <Sticker text="時給：海藻1枚" color="#00CC66" />
          </div> */}
        </div>

        <div className="relative">
          <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-[#FFD600] border-4 border-[#FF0000] shadow-[6px_6px_0_#FF0000] rotate-[-6deg] flex items-center justify-center text-[#FF0000] font-black z-20">
            NEW!
          </div>

          <div className="relative mx-auto max-w-[520px] aspect-square rounded-[2.5rem] bg-white/10 backdrop-blur border-8 border-white shadow-[12px_12px_0_#003E99] flex items-center justify-center z-10">
            <img
              src="../top/newburger.png"
              alt="Krabby Patty"
              className="w-[78%] h-[78%] object-contain drop-shadow-[0_20px_0_#FFB800]"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.style.display = "none";
                const parent = target.parentElement;
                if (parent && !parent.querySelector(".emoji-fallback")) {
                  const span = document.createElement("span");
                  span.className = "emoji-fallback text-[180px] select-none";
                  span.textContent = "🍔";
                  parent.appendChild(span);
                }
              }}
            />
            <div className="pointer-events-none absolute inset-0">
              <Bubble className="left-6 top-8" size={36} />
              <Bubble className="right-10 top-10" size={28} />
              <Bubble className="left-10 bottom-10" size={32} />
              <Bubble className="right-16 bottom-8" size={40} />
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute left-0 right-0 -bottom-px h-24 sm:h-36 z-20 opacity-70" aria-hidden>
        <svg className="w-full h-full" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path fill="#FFD600" d="M0,48 C180,72 360,84 540,72 C720,60 900,24 1080,48 C1260,72 1440,96 1440,120 L0,120 Z" />
        </svg>
      </div>

      <style jsx global>{`
        @keyframes bubbleShift { 0% { background-position: 0 0, 40px 80px, 120px 40px; } 100% { background-position: 200px 400px, 320px 480px, 480px 320px; } }
        @keyframes waveDrift { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(6px); } }
        @keyframes ctaBlink { 0%, 100% { filter: brightness(1); } 50% { filter: brightness(1.25); } }
        .animate-cta-blink { animation: ctaBlink 1.1s steps(2) infinite; }
        .animate-bounce-slow { animation: bounce 2.4s infinite; }
      `}</style>
    </section>
  );
}

function Sticker({ text, color = "#FF6699" }: { text: string; color?: string }) {
  return (
    <div className="select-none inline-flex items-center gap-2 px-3 py-1 rounded-xl border-4 text-xs font-extrabold rotate-[-4deg] shadow-[4px_4px_0_rgba(0,0,0,0.3)]" style={{ borderColor: "#000", background: color }}>
      <span>★</span>
      <span className="whitespace-nowrap">{text}</span>
    </div>
  );
}

function Bubble({ className = "", size = 16 }: { className?: string; size?: number }) {
  const d = size;
  return (
    <span className={`absolute rounded-full border-2 border-white/70 ${className}`} style={{ width: d, height: d, boxShadow: "inset 0 0 0 2px rgba(255,255,255,.25)", animation: `rise ${6 + (80 - d) / 10}s ease-in infinite` }}>
      <style jsx>{`
        @keyframes rise { 0% { transform: translateY(12px) scale(0.85); opacity: .7; } 60% { transform: translateY(-12px) scale(1); opacity: 1; } 100% { transform: translateY(12px) scale(0.85); opacity: .7; } }
      `}</style>
    </span>
  );
}

