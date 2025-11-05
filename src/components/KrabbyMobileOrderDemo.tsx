"use client";
import React, { useEffect, useMemo, useState } from "react";

/**
 * Krabby Patty — Mobile Order UI (Joke)
 * - 単一ファイル / Tailwind前提 / APIなし
 * - props: initialItemId を渡すと開いた瞬間にその商品がアクティブ
 */

const TOKENS = {
  bun: "#F4C84B",
  lettuce: "#35C27C",
  tomato: "#E24B4B",
  patty: "#7A4A2A",
  sea: "#23B5E9",
  ink: "#0E0F11",
};

export type Option = { id: string; label: string; price: number };
export type Item = {
  id: string;
  name: string;
  desc: string;
  price: number;
  img: string;
  tags?: string[];
  options?: {
    label: string;
    required?: boolean;
    choices: Option[];
    maxSelect?: number; // default 1 (radio)
  }[];
};

const MENU: Item[] = [
  // ───── Burgers ─────
  {
    id: "classic",
    name: "クラシック",
    desc: "シンプルなハンバーガー",
    price: 590,
    img: "/menu/burger1.png",
    tags: ["人気", "定番"],
    options: [
      {
        label: "ソース",
        required: true,
        maxSelect: 1,
        choices: [
          { id: "s-house", label: "秘伝ソース", price: 0 },
          { id: "s-tartar", label: "タルタル", price: 60 },
          { id: "s-chili", label: "チリ", price: 60 },
        ],
      },
      {
        label: "トッピング",
        maxSelect: 3,
        choices: [
          { id: "t-cheese", label: "チーズ", price: 80 },
          { id: "t-pickle", label: "ピクルスW", price: 60 },
          { id: "t-kani", label: "クラブ身ちょい増し", price: 120 },
        ],
      },
    ],
  },
  {
    id: "Krabby-classic",
    name: "クラビィクラシック",
    desc: "当店一番人気",
    price: 800,
    img: "/menu/burger5.png",
    tags: ["人気"],
    options: [
      {
        label: "ソース",
        required: true,
        maxSelect: 1,
        choices: [
          { id: "s-house", label: "秘伝ソース（濃いめ）", price: 0 },
          { id: "s-garlic", label: "ガーリック", price: 80 },
        ],
      },
      {
        label: "トッピング",
        maxSelect: 2,
        choices: [
          { id: "t-cheese", label: "追いチーズ", price: 120 },
          { id: "t-bacon", label: "ベーコン", price: 140 },
        ],
      },
    ],
  },
  {
    id: "sea-double",
    name: "セブン・シー・スタック",
    desc: "海の幸で重力に挑戦する塔。",
    price: 1500,
    img: "/menu/burger2.png",
    tags: ["満腹", "限定"],
    options: [
      {
        label: "ソース",
        required: true,
        maxSelect: 1,
        choices: [
          { id: "s-house", label: "秘伝ソース", price: 0 },
          { id: "s-garlic", label: "ガーリック", price: 80 },
        ],
      },
      {
        label: "海トッピング",
        maxSelect: 2,
        choices: [
          { id: "t-ebi", label: "エビ増し", price: 160 },
          { id: "t-kani2", label: "カニ増し", price: 200 },
        ],
      },
    ],
  },
  {
    id: "sea-special",
    name: "シースペシャル",
    desc: "シーフードてんこ盛り",
    price: 860,
    img: "/menu/burger3.png",
    tags: ["新"],
    options: [
      {
        label: "ソース",
        required: true,
        maxSelect: 1,
        choices: [
          { id: "s-lemon", label: "レモンバター", price: 60 },
          { id: "s-tartar", label: "タルタル", price: 60 },
        ],
      },
      {
        label: "追加具材",
        maxSelect: 2,
        choices: [
          { id: "t-ika", label: "イカフライ", price: 140 },
          { id: "t-tako", label: "タコ増し", price: 160 },
        ],
      },
    ],
  },
  {
    id: "crab-sand",
    name: "クラブサンド",
    desc: "生きたカニをそのまま使用",
    price: 2000,
    img: "/menu/burger4.png",
    tags: ["限定"],
    options: [
      {
        label: "ソース",
        required: true,
        maxSelect: 1,
        choices: [
          { id: "s-garlic-butter", label: "ガーリックバター", price: 120 },
          { id: "s-chili-lime", label: "チリライム", price: 120 },
        ],
      },
      {
        label: "追加",
        maxSelect: 2,
        choices: [
          { id: "t-herb", label: "ハーブ増し", price: 60 },
          { id: "t-lemon", label: "追いレモン", price: 40 },
        ],
      },
    ],
  },

  // ───── Sides ─────
  {
    id: "potato",
    name: "ポテトフライ",
    desc: "バーガーのお供に",
    price: 200,
    img: "/menu/side1.png",
    tags: ["サイド"],
    // サイドはオプション無し
  },
  {
    id: "fishfly",
    name: "フィッシュフライ",
    desc: "ポテトに飽きたときに",
    price: 200,
    img: "/menu/side2.png",
    tags: ["サイド"],
  },

  // ───── Drinks ─────
  {
    id: "Cola",
    name: "コーラ",
    desc: "飲み物で人気No1",
    price: 250,
    img: "/menu/drink1.png",
    tags: ["ドリンク"],
  },
  {
    id: "mist-soda",
    name: "マーメイドミスト・ソーダ",
    desc: "深海色のグラデーションとゆらめくミストが幻想的。",
    price: 600,
    img: "/menu/drink2.png",
    tags: ["ドリンク"],
  },
  {
    id: "bubble-soda",
    name: "バブル・ソーダ",
    desc: "ピンク×ライムの2層ネオン。無数の泡で気分もポップ！",
    price: 600,
    img: "/menu/drink3.png",
    tags: ["ドリンク"],
  },
];

export type CartLine = {
  uid: string;
  item: Item;
  qty: number;
  selected: { [groupIndex: number]: string[] };
  memo?: string;
};

function money(jpy: number) {
  return jpy.toLocaleString("ja-JP", { style: "currency", currency: "JPY" });
}
function calcLinePrice(line: CartLine) {
  const base = line.item.price * line.qty;
  const addOns = Object.entries(line.selected).reduce((sum, [gIdx, ids]) => {
    const group = line.item.options?.[Number(gIdx)];
    if (!group) return sum;
    const extra = ids
      .map((id) => group.choices.find((c) => c.id === id)?.price ?? 0)
      .reduce((a, b) => a + b, 0);
    return sum + extra * line.qty;
  }, 0);
  return base + addOns;
}

export default function KrabbyMobileOrderDemo({
  initialItemId,
}: {
  /** 開いた瞬間にこのIDの商品をアクティブ表示（任意） */
  initialItemId?: string;
}) {
  const [active, setActive] = useState<Item | null>(null);
  const [selected, setSelected] = useState<{ [k: number]: string[] }>({});
  const [qty, setQty] = useState(1);
  const [memo, setMemo] = useState("");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [pickupTime, setPickupTime] = useState("今すぐ");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [coupon, setCoupon] = useState("");
  const [placedId, setPlacedId] = useState<string | null>(null);

  const subtotal = useMemo(
    () => cart.reduce((s, l) => s + calcLinePrice(l), 0),
    [cart]
  );
  const discount =
    coupon.trim().toUpperCase() === "KRABBY10"
      ? Math.round(subtotal * 0.1)
      : 0;
  const total = Math.max(0, subtotal - discount);

  // 初期表示で特定商品を開く
  useEffect(() => {
    if (!initialItemId) return;
    const item = MENU.find((m) => m.id === initialItemId);
    if (item) {
      setActive(item);
      setSelected({});
      setQty(1);
      setMemo("");
    }
  }, [initialItemId]);

  function resetConfigurator() {
    setSelected({});
    setQty(1);
    setMemo("");
  }
  function toggleChoice(groupIdx: number, opt: Option, maxSelect = 1) {
    setSelected((prev) => {
      const current = prev[groupIdx] || [];
      const has = current.includes(opt.id);
      let next: string[];
      if (maxSelect === 1) {
        next = has ? [] : [opt.id];
      } else {
        next = has
          ? current.filter((id) => id !== opt.id)
          : [...current, opt.id].slice(-maxSelect);
      }
      return { ...prev, [groupIdx]: next };
    });
  }
  function openItem(item: Item) {
    setActive(item);
    resetConfigurator();
  }
  function addToCart() {
    if (!active) return;
    const missing = active.options?.some(
      (g, i) => g.required && !(selected[i] && selected[i].length)
    );
    if (missing) {
      alert("必須オプションを選択してください。");
      return;
    }
    const line: CartLine = {
      uid: `${active.id}-${Date.now()}`,
      item: active,
      qty,
      selected,
      memo,
    };
    setCart((c) => [...c, line]);
    setActive(null);
  }
  function placeOrder() {
    if (!name || !phone) {
      alert("お名前と電話番号を入力してください。");
      return;
    }
    const id = `KP${Math.floor(1000 + Math.random() * 9000)}`;
    setPlacedId(id);
    setShowCheckout(false);
    setCart([]);
    setCoupon("");
  }

  return (
    <div
      className="h-[92vh] overflow-y-auto overscroll-contain touch-pan-y bg-neutral-950 text-white pb-28"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-30 px-4 py-3 flex items-center justify-between shadow-md"
        style={{
          background: `linear-gradient(90deg, ${TOKENS.bun}, ${TOKENS.tomato})`,
        }}
      >
        <div className="font-black tracking-wide text-neutral-900">
          KRABBY{" "}
          <span className="rounded px-1" style={{ background: TOKENS.lettuce }}>
            ORDER
          </span>
        </div>
        {/* <span className="text-xs font-semibold text-neutral-900 bg-white/80 rounded px-2 py-1">
          ジョークUI
        </span> */}
      </header>

      {/* Order complete banner */}
      {placedId && (
        <div className="mx-4 mt-4 rounded-xl border border白/10 p-4 bg白/5">
          <div className="text-sm opacity-80">ご注文番号</div>
          <div className="text-2xl font-black tracking-widest" style={{ color: TOKENS.sea }}>
            {placedId}
          </div>
          <div className="text-sm mt-1">
            受け取り：{pickupTime} ／ お名前：{name}
          </div>
          <div className="text-xs opacity-70 mt-2">※ これはデモ表示です。実際には何も発注されません。</div>
        </div>
      )}

      {/* Category color bars */}
      <div className="mt-4 grid grid-cols-3 gap-2 px-4 text-center text-xs font-bold">
        <div className="rounded-lg py-2" style={{ background: TOKENS.bun, color: TOKENS.ink }}>
          バーガー
        </div>
        <div className="rounded-lg py-2" style={{ background: TOKENS.lettuce, color: TOKENS.ink }}>
          サイド
        </div>
        <div className="rounded-lg py-2" style={{ background: TOKENS.tomato }}>
          ドリンク
        </div>
      </div>

      {/* Menu list */}
      <section className="mt-2 px-4 space-y-3 ">
        {MENU.map((m) => (
          <button
            key={m.id}
            onClick={() => openItem(m)}
            className="w-full flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 active:scale-[0.99] transition"
          >
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-neutral-800 flex-shrink-0">
              <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 text-left">
              <div className="flex items-center gap-2">
                <h3 className="font-bold leading-tight">{m.name}</h3>
                {m.tags?.map((t) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/10">
                    {t}
                  </span>
                ))}
              </div>
              <p className="text-xs opacity-80 line-clamp-2 mt-0.5">{m.desc}</p>
              <div className="mt-1 font-extrabold" style={{ color: TOKENS.bun }}>
                {money(m.price)}
              </div>
            </div>
          </button>
        ))}
      </section>

      {/* Active item sheet */}
      {active && (
        <div className="fixed inset-0 z-40 flex items-end bg-black/60" onClick={() => setActive(null)}>
          <div
            className="w-full max-h-[88vh] rounded-t-3xl bg-neutral-900 border border-white/10 p-4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex gap-3">
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-neutral-800 flex-shrink-0">
                <img src={active.img} alt={active.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-black text-lg leading-tight">{active.name}</h3>
                <p className="text-xs opacity-80 mt-1">{active.desc}</p>
                <div className="mt-1 font-extrabold" style={{ color: TOKENS.bun }}>
                  {money(active.price)}
                </div>
              </div>
            </div>

            {/* Options */}
            {active.options?.map((g, i) => (
              <div key={i} className="mt-4">
                <div className="text-sm font-semibold flex items-center gap-2">
                  {g.label}
                  {g.required && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-300">必須</span>
                  )}
                  {g.maxSelect && g.maxSelect > 1 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10">最大{g.maxSelect}</span>
                  )}
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {g.choices.map((c) => {
                    const picks = selected[i] || [];
                    const picked = picks.includes(c.id);
                    return (
                      <button
                        key={c.id}
                        onClick={() => toggleChoice(i, c, g.maxSelect ?? 1)}
                        className={`text-left rounded-xl border p-3 transition ${
                          picked ? "border-emerald-400 bg-emerald-400/10" : "border-white/10 bg-white/5"
                        }`}
                      >
                        <div className="text-sm font-semibold">{c.label}</div>
                        <div className="text-xs opacity-80">{c.price === 0 ? "無料" : `+${money(c.price)}`}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Qty & memo */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 rounded-full bg-white/10 grid place-items-center text-xl"
                >
                  −
                </button>
                <div className="w-10 text-center font-bold">{qty}</div>
                <button onClick={() => setQty((q) => q + 1)} className="w-9 h-9 rounded-full bg-white/10 grid place-items-center text-xl">
                  ＋
                </button>
              </div>
              <div className="text-right text-sm opacity-90">
                小計（この商品）：
                <span className="ml-1 font-extrabold" style={{ color: TOKENS.bun }}>
                  {money(calcLinePrice({ uid: "x", item: active, qty, selected, memo }))}
                </span>
              </div>
            </div>

            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="備考（例：ピクルス少なめ）"
              className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm outline-none"
              rows={2}
            />

            <button
              onClick={addToCart}
              className="mt-4 w-full rounded-2xl py-3 font-black text-neutral-900"
              style={{ background: `linear-gradient(90deg, ${TOKENS.lettuce}, ${TOKENS.bun})` }}
            >
              カートに追加
            </button>
          </div>
        </div>
      )}

      {/* Sticky cart bar */}
      <div className="fixed bottom-0 inset-x-0 z-30">
        <div className="mx-4 mb-4 rounded-2xl border border-white/10 bg-neutral-900/90 backdrop-blur p-3 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="text-sm opacity-80">
              アイテム {cart.length}・小計{" "}
              <span className="font-bold" style={{ color: TOKENS.bun }}>
                {money(subtotal)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowCheckout(true)}
                disabled={cart.length === 0}
                className="rounded-xl px-4 py-2 font-bold text-neutral-900 disabled:opacity-40"
                style={{ background: `linear-gradient(90deg, ${TOKENS.sea}, ${TOKENS.lettuce})` }}
              >
                注文へ進む
              </button>
              <button
                onClick={() => alert("現在は空いてます。")}
                className="rounded-xl px-3 py-2 text-xs border border-white/10"
              >
                店内状況
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center" onClick={() => setShowCheckout(false)}>
          <div className="w-[92vw] max-w-md rounded-3xl border border-white/10 bg-neutral-900 p-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-black">受け取り設定</h3>

            {/* lines */}
            <div className="mt-2 max-h-40 overflow-y-auto divide-y divide-white/5">
              {cart.map((l) => (
                <div key={l.uid} className="py-2 text-sm">
                  <div className="flex justify-between">
                    <div className="font-semibold">
                      {l.item.name} × {l.qty}
                    </div>
                    <div style={{ color: TOKENS.bun }} className="font-bold">
                      {money(calcLinePrice(l))}
                    </div>
                  </div>
                  <div className="text-xs opacity-75 mt-0.5">
                    {Object.entries(l.selected).map(([i, ids]) => {
                      const g = l.item.options?.[Number(i)];
                      if (!g || ids.length === 0) return null;
                      const labels = ids
                        .map((id) => g.choices.find((c) => c.id === id)?.label)
                        .filter(Boolean)
                        .join("、");
                      return <div key={i}>・{g.label}: {labels}</div>;
                    })}
                    {l.memo && <div>・備考: {l.memo}</div>}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
              <label className="space-y-1">
                <div className="opacity-80">お名前</div>
                <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none" />
              </label>
              <label className="space-y-1">
                <div className="opacity-80">電話番号</div>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none" />
              </label>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
              <label className="space-y-1">
                <div className="opacity-80">受け取り</div>
                <select value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none">
                  <option>今すぐ</option>
                  <option>15分後</option>
                  <option>30分後</option>
                  <option>時間指定</option>
                </select>
              </label>
              <label className="space-y-1">
                <div className="opacity-80">クーポン</div>
                <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="KRABBY10" className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none" />
              </label>
            </div>

            <div className="mt-3 rounded-2xl bg-white/5 p-3 text-sm">
              <div className="flex justify-between">
                <span>小計</span>
                <span>{money(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>割引</span>
                <span>-{money(discount)}</span>
              </div>
              <div className="flex justify-between font-extrabold text-base mt-1" style={{ color: TOKENS.bun }}>
                <span>合計</span>
                <span>{money(total)}</span>
              </div>
              <div className="text-[10px] opacity-70 mt-1">※デモのため決済は発生しません。</div>
            </div>

            <div className="mt-3 flex gap-2">
              <button onClick={() => setShowCheckout(false)} className="flex-1 rounded-xl border border白/10 px-4 py-2">
                戻る
              </button>
              <button
                onClick={placeOrder}
                className="flex-1 rounded-xl px-4 py-2 font-black text-neutral-900"
                style={{ background: `linear-gradient(90deg, ${TOKENS.lettuce}, ${TOKENS.bun})` }}
              >
                この内容で注文
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-24 pb-36 px-4 text-center text-xs opacity-60">
        © {new Date().getFullYear()} Krabby Patty Parody UI. For fun only.
      </footer>
    </div>
  );
}
