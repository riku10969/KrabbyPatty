import "./globals.css"; // ←これ必須！
import OceanIntro from "@/components/OceanIntro";

export const metadata = {
  title: "Krabby Patty",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-dvh bg-white text-gray-900">{children}</body>
      {/* 初回訪問時のみ・全ページ共通で最上面に表示 */}
        <OceanIntro logoSrc="/logo.png" durationMs={2600} onlyOnce />
    </html>
  );
}