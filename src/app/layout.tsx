import "./globals.css"; // ←これ必須！

export const metadata = {
  title: "Krabby Patty",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-dvh bg-white text-gray-900">{children}</body>
    </html>
  );
}