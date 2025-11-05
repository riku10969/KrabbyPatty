// components/FooterKrabbyPopMini.tsx
"use client";

import { Instagram, Twitter } from "lucide-react";

export default function FooterKrabbyPopMini() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative text-[#003E99]">
      {/* 上部：波のセパレーター */}
      <div
        aria-hidden
        className="h-8 w-full"
        style={{
          backgroundImage:
            "radial-gradient(100% 60% at 50% 100%, rgba(255,255,255,0) 49%, #ffffff 50%), radial-gradient(100% 60% at 0% 0%, #7dd3fc 49%, rgba(125,211,252,0) 50%), radial-gradient(100% 60% at 100% 0%, #7dd3fc 49%, rgba(125,211,252,0) 50%)",
          backgroundSize: "48px 24px, 48px 24px, 48px 24px",
          backgroundRepeat: "repeat-x",
        }}
      />

      {/* メイン部 */}
      <div className="bg-gradient-to-b from-sky-300 to-sky-200 border-t-8 border-white shadow-[0_-6px_0_#003E99]">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-6">
          {/* 左：ロゴ */}
          <div className="flex items-center gap-2">
            <img
                src="/logo.png"  // ← public配下に置く（例：public/logo/krabby-logo.png）
                alt="Krabby Patty Logo"
                className="h-20 w-auto drop-shadow-[0_2px_0_#001E66] transition-transform group-hover:scale-105"
              />
          </div>

          {/* 中央：リンク */}
          <nav className="flex flex-wrap justify-center gap-4 text-sm font-bold">
            <a href="#menu" className="hover:underline decoration-[#FF0000] underline-offset-2">
              メニュー
            </a>
            <a href="#access" className="hover:underline decoration-[#FF0000] underline-offset-2">
              アクセス
            </a>
            <a href="#news" className="hover:underline decoration-[#FF0000] underline-offset-2">
              NEWS
            </a>
            <a href="#contact" className="hover:underline decoration-[#FF0000] underline-offset-2">
              お問い合わせ
            </a>
          </nav>

          {/* 右：SNS */}
          <div className="flex gap-3">
            <a
              aria-label="Instagram"
              href="#"
              className="rounded-full bg-[#003E99] p-2 text-white shadow-[0_3px_0_#001E66] border-4 border-white hover:translate-y-[1px] transition"
            >
              <Instagram className="h-3.5 w-3.5" />
            </a>
            <a
              aria-label="Twitter/X"
              href="#"
              className="rounded-full bg-[#003E99] p-2 text-white shadow-[0_3px_0_#001E66] border-4 border-white hover:translate-y-[1px] transition"
            >
              <Twitter className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* コピーライト */}
        <div className="text-center text-xs font-bold text-[#003E99]/80 pb-4">
          © {year} Krabby Patty
        </div>
      </div>

      {/* 下：ストライプバー */}
      <div
        aria-hidden
        className="h-2 w-full bg-repeat"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg,#FF0000 0 10px,#FFD600 10px 20px)",
        }}
      />
    </footer>
  );
}
