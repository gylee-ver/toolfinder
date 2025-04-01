import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "툴파인더",
  description: "당신에게 필요한 도구를 찾아보세요",
  metadataBase: new URL('https://www.toolfinder.kr'),
  icons: {
    icon: "https://www.toolfinder.kr/toolfinder_favicon.ico",
  },
  openGraph: {
    title: "툴파인더",
    description: "당신에게 필요한 도구를 찾아보세요",
    url: 'https://www.toolfinder.kr',
    siteName: '툴파인더',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: "https://www.toolfinder.kr/toolfinder_og.png",
        width: 1200,
        height: 630,
        alt: "툴파인더",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: 'https://www.toolfinder.kr',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="toolfinder-theme"
        >
          <div className="relative flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container h-14 flex items-center">
                <Link href="/" className="flex items-center">
                  <Image
                    src="/toolfinder_header.png"
                    alt="AI 도구 찾기"
                    width={280}
                    height={65}
                    className="h-12 w-auto"
                    priority
                  />
                </Link>
              </div>
            </header>
            <main className="flex-1">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
