import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/header/header";
import Footer from "../components/footer/footer"; // ⬅️ добавляем импорт футера
import { FilterProvider } from "../providers/FilterProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Events Düsseldorf",
  description: "Find and explore events in Düsseldorf",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex flex-col min-h-screen antialiased`}
      >
        <FilterProvider>
          {/* Header — сверху на всех страницах */}
          <Header />

          {/* Основной контент */}
          <main className="grow">{children}</main>

          {/* Footer — снизу на всех страницах */}
          <Footer />
        </FilterProvider>
      </body>
    </html>
  );
}
