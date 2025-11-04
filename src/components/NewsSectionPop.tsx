"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FloatingDecos } from "./FloatingDecos";

/**
 * NewsSectionCheapoPop – クラビーパティ（仮）NEWSセクション（改）
 * 変更点:
 *  1) ジョーク/店舗告知の区分を削除（バッジ/凡例なし）
 *  2) Swiper不使用のまま
 *  3) 「ニュースが消える」現象対策：
 *     - Framer Motion の whileInView/initial を廃止し、CSS Keyframes で安定した浮遊アニメに変更
 *     - 空配列時のプレースホルダーを追加
 *     - transform を使う要素に will-change を付与
 *
 * 使い方:
 *  <NewsSectionCheapoPop items={newsItems} />
 *  /public/news/ に画像を配置。items が未指定でも sample を表示します。
 */

export type NewsItem = {
  id: string;
  title: string;
  date: string; // YYYY.MM.DD 推奨
  img: string; // public 配下パス
  desc: string;
  slug: string; // /news/[slug]
};

const sample: NewsItem[] = [
  {
    id: "n1",
    title: "新作バーガー近日登場！",
    date: "2025.10.05",
    img: "/news/news1.png",
    desc: "シーフードを限界まで盛った伝説の一品。",
    slug: "canimax",
  },
  {
    id: "n2",
    title: "【お知らせ】本日17:00で閉店（台風のため）",
    date: "2025.10.01",
    img: "/news/news2.png",
    desc: "お足元の悪い中ご来店ありがとうございます。安全第一でクローズします。",
    slug: "close-typhoon",
  },
  {
    id: "n3",
    title: "スタンプキャンペーン開催中",
    date: "2025.09.25",
    img: "/news/news3.png",
    desc: "スタンプを10個ためることでバーガー一個プレゼント！（スタンプはお会計1万以上で1つ押します。）",
    slug: "ai-chaos",
  },
];

export default function NewsSectionCheapoPop({ items = sample }: { items?: NewsItem[] }) {
  const list = Array.isArray(items) ? [...items].sort((a, b) => (a.date < b.date ? 1 : -1)) : [];

  return (
    <section className="relative py-20 md:py-24 bg-[#FFF5D8] overflow-hidden" id="news">
      {/* 背景デコ：上部の波 */}
      <WaveTop className="absolute -top-6 left-0 right-0 w-full text-[#FFE28C] opacity-80" />
      <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">

        <div>
          <h2
  className="text-3xl sm:text-4xl font-extrabold text-white"
  style={{ WebkitTextStroke: "2px #003E99" }}
>
  NEWS
</h2>
        </div>
        <br></br>

      {/* コンテンツ */}
      {list.length === 0 ? (
        <EmptyNotice />
      ) : (
        <div className="relative z-10 mx-auto max-w-6xl grid gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((item, i) => (
            <motion.article
              key={item.id}
              whileHover={{ scale: 1.03, rotate: 1 }}
              className="kp-float group bg-white/95 rounded-3xl border-[6px] border-[#FFD24A] shadow-[0_10px_0_#FFB703] overflow-hidden will-change-transform"
            >
              {/* <Link href={`/news/${item.slug}`} className="block focus:outline-none focus:ring-4 focus:ring-[#FFB703]/40"> */}
                <div className="relative w-full aspect-[16/10]">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    priority={i < 2}
                  />
                </div>
                <div className="p-5 md:p-6">
                  <p className="text-xs md:text-sm text-gray-500">{item.date}</p>
                  <h3 className="mt-1 text-xl md:text-2xl font-extrabold text-[#FF4E1B] drop-shadow-[1px_1px_0_#fff]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[15px] text-gray-700 leading-relaxed line-clamp-3">
                    {item.desc}
                  </p>
                  {/* <span className="mt-3 inline-flex items-center gap-1 font-bold text-[#FF4E1B]">
                    → 続きを読む
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </span> */}
                </div>
              {/* </Link> */}
            </motion.article>
          ))}
        </div>
      )}

      {/* 背景デコ：下部の波 */}
      <WaveBottom className="absolute -bottom-6 left-0 right-0 w-full text-[#FFE28C] opacity-80" />

      {/* 浮遊アニメ: CSS Keyframes（安定） */}
      <style jsx global>{`
        @keyframes kpFloat {
          0% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-6px) rotate(1.2deg); }
          100% { transform: translateY(0) rotate(0); }
        }
        .kp-float { animation: kpFloat 4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .kp-float { animation: none !important; }
        }
      `}</style>
      </div>

      <FloatingDecos
          items={[
            { src: "/deco/fish3.png",    size: 72, pos: { right: "24px", top: "120px" }, rotate: -8 },
            { src: "/deco/shell.png",     size: 84, pos: { left: "12%", bottom: "18%" }, motion:{ distance:10, duration:6, rotate:true } },
          ]}
          pointerEvents="none"
          zIndex={10}
          randomize
          motionOptions={{ duration: 5, distance: 6, rotate: false }}
        />
    </section>
  );
}

/* ============ 小物 ============ */
function EmptyNotice() {
  return (
    <div className="relative z-10 mx-auto max-w-2xl text-center px-6 py-16 bg-white/70 border-4 border-white rounded-3xl shadow">
      <p className="text-lg font-bold text-gray-700">現在お知らせはありません。</p>
      <p className="mt-1 text-sm text-gray-500">新着ニュースが入り次第こちらに表示されます。</p>
    </div>
  );
}

function WaveTop({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden>
      <path d="M0,64L80,80C160,96,320,128,480,133.3C640,139,800,117,960,106.7C1120,96,1280,96,1360,96L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z" fill="currentColor"></path>
    </svg>
  );
}

function WaveBottom({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden>
      <path d="M0,96L80,96C160,96,320,96,480,85.3C640,75,800,53,960,53.3C1120,53,1280,75,1360,85.3L1440,96L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="currentColor"></path>
    </svg>
  );
}

/* =============================================
   参考: /app/news/[slug]/page.tsx の最小実装例（任意）

// app/news/[slug]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import { sample, type NewsItem } from "../NewsSectionCheapoPop";

export default function NewsDetail({ params }: { params: { slug: string } }) {
  const item = sample.find((n) => n.slug === params.slug);
  if (!item) return notFound();
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm text-gray-500">{item.date}</p>
      <h1 className="mt-2 text-3xl md:text-4xl font-extrabold text-[#FF4E1B]">{item.title}</h1>
      <div className="relative mt-6 w-full aspect-[16/9] rounded-2xl overflow-hidden">
        <Image src={item.img} alt={item.title} fill className="object-cover" />
      </div>
      <article className="prose prose-lg mt-8">
        <p>{item.desc}</p>
        <p>（本文をここに記載。営業時間や地図リンクなどがある場合はこちらに）</p>
      </article>
    </main>
  );
}

   ============================================= */
