import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GA4 Dashboard",
  description: "Google Analytics 4 Dashboard Interface",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
