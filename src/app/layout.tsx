import "./globals.css"; // ←これ必須！

export const metadata = {
  title: "Krabby Patty (仮) – Recovery",
  description: "復元用スターター",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-dvh bg-white text-gray-900">{children}</body>
    </html>
  );
}