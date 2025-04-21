import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { AccordionMenu } from "@/components/accordion-menu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "툴파인더 | 내 업무에 필요한 AI 도구와 소프트웨어 추천 | 무료/유료 비교",
  description: "매일 사용할 툴을 고민하는 마케터, 개발자, 디자이너를 위한 솔루션! 더 이상 검색에 시간 낭비하지 말고 목적별 최적의 소프트웨어를 찾아보세요. 예산과 기능으로 쉽게 비교하는 툴 큐레이션 서비스.",
  keywords: "툴파인더, 업무 효율화, 업무 도구 추천, 마케터 필수 앱, 디자이너 작업 도구, 개발자 생산성 툴, 무료 협업 프로그램, 시간 절약 앱, 스타트업 추천 SaaS, 가성비 소프트웨어, 대체 프로그램, 원격근무 솔루션",
  metadataBase: new URL('https://www.toolfinder.kr'),
  authors: [{ name: "ToolFinder Team" }],
  category: "Technology",
  icons: {
    icon: "https://www.toolfinder.kr/toolfinder_favicon.ico",
  },
  openGraph: {
    title: "툴파인더 | 시간과 비용을 아끼는 똑똑한 도구 선택",
    description: "매달 SaaS 구독료가 부담되시나요? 무료 대안부터 가성비 좋은 소프트웨어까지, 실제 사용자 후기와 함께 비교해보세요. 불필요한 기능 없이 정확히 내가 필요한 도구를 찾는 방법!",
    url: 'https://www.toolfinder.kr',
    siteName: '툴파인더',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: "https://www.toolfinder.kr/toolfinder_og.png",
        width: 1200,
        height: 630,
        alt: "툴파인더 - 당신의 워크플로우를 완성하는 도구 추천 플랫폼",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "툴파인더 | 일 잘하는 사람들의 도구 선택법",
    description: "매일 3시간 이상 절약하는 비결? 적합한 도구 선택이 업무 효율을 결정합니다. 직군별 추천 툴킷을 지금 확인하세요.",
    images: ["https://www.toolfinder.kr/toolfinder_og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.toolfinder.kr',
    languages: {
      'ko': 'https://www.toolfinder.kr',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/toolfinder_favicon.ico" />
        <link rel="shortcut icon" href="/toolfinder_favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="alternate" hrefLang="ko" href="https://www.toolfinder.kr" />
        <meta name="google-adsense-account" content="ca-pub-4931955840341505" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4931955840341505"
          crossOrigin="anonymous"></script>
        <meta name="google-site-verification" content="CmTrLxL5_cJ1XfYp2UEQHxV6E_OX80AizpIf-UYIvjQ" />
        <meta name="naver-site-verification" content="32648255223819a83dc032e565b8b136f0dcbada" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-7QH1FZGMFE"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-7QH1FZGMFE');
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:6378024,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "url": "https://www.toolfinder.kr/",
                "name": "툴파인더 - 스마트한 업무 도구 선택을 위한 가이드",
                "description": "왜 같은 일을 하는데 누구는 더 빠르게 처리할까요? 적합한 도구 선택이 일의 속도와 퀄리티를 좌우합니다. 여러분의 워크플로우를 업그레이드할 최적의 도구를 찾아보세요.",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://www.toolfinder.kr/search?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              }
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "툴파인더(Toolfinder)",
                "url": "https://www.toolfinder.kr",
                "logo": "https://www.toolfinder.kr/toolfinder_og.png",
                "contactPoint": {
                  "@type": "ContactPoint",
                  "contactType": "customer service",
                  "email": "info@toolfinder.kr"
                },
                "sameAs": [
                  "https://www.facebook.com/toolfinder",
                  "https://twitter.com/toolfinder",
                  "https://www.instagram.com/toolfinder"
                ]
              }
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
              {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "홈",
                    "item": "https://www.toolfinder.kr"
                  }
                ]
              }
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
              {
                "@context": "https://schema.org",
                "@type": "ItemList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "item": {
                      "@type": "Thing",
                      "name": "AI 번역 도구",
                      "url": "https://www.toolfinder.kr/categories/ai-translation",
                      "description": "마감 임박한 번역 작업, 구글 번역으로는 부족하신가요? 전문 용어와 맥락을 정확히 이해하는 AI 번역 도구를 사용해보세요. 논문, 계약서, 마케팅 자료별 최적의 번역기 추천."
                    }
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "item": {
                      "@type": "Thing",
                      "name": "마케팅 도구",
                      "url": "https://www.toolfinder.kr/categories/marketing",
                      "description": "마케팅 담당자 혼자서도 가능한 올인원 솔루션을 찾고 계신가요? 이메일 캠페인부터 소셜 미디어 스케줄링, SEO 최적화까지 한 도구로 해결하는 방법을 알려드립니다."
                    }
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "item": {
                      "@type": "Thing",
                      "name": "협업 도구",
                      "url": "https://www.toolfinder.kr/categories/collaboration",
                      "description": "재택근무와 하이브리드 환경에서 팀 커뮤니케이션이 단절되나요? 실시간 협업, 프로젝트 관리, 문서 공유를 원활하게 만드는 최고의 협업 도구들을 소개합니다."
                    }
                  },
                  {
                    "@type": "ListItem",
                    "position": 4,
                    "item": {
                      "@type": "Thing",
                      "name": "디자인 도구",
                      "url": "https://www.toolfinder.kr/categories/design",
                      "description": "포토샵 구독료가 부담스러운 디자이너와 비전공자를 위한 솔루션! 무료 대안부터 올인원 디자인 툴까지, 목적과 예산에 맞는 최적의 디자인 소프트웨어를 찾아드립니다."
                    }
                  },
                  {
                    "@type": "ListItem",
                    "position": 5,
                    "item": {
                      "@type": "Thing",
                      "name": "개발 도구",
                      "url": "https://www.toolfinder.kr/categories/development",
                      "description": "코드 작성부터 배포까지 개발 워크플로우를 자동화할 방법을 찾고 계신가요? 반복 작업을 줄이고 생산성을 높여주는 개발자 필수 도구들을 모았습니다."
                    }
                  },
                  {
                    "@type": "ListItem",
                    "position": 6,
                    "item": {
                      "@type": "Thing",
                      "name": "생산성 도구",
                      "url": "https://www.toolfinder.kr/categories/productivity",
                      "description": "하루가 24시간보다 짧게 느껴지시나요? 할 일 관리, 시간 추적, 집중력 향상을 위한 생산성 앱으로 매일 2시간 이상 절약하는 방법을 알려드립니다."
                    }
                  },
                  {
                    "@type": "ListItem",
                    "position": 7,
                    "item": {
                      "@type": "Thing",
                      "name": "AI 콘텐츠 생성",
                      "url": "https://www.toolfinder.kr/categories/ai-content",
                      "description": "콘텐츠 제작에 시간을 너무 많이 쓰고 계신가요? 블로그 글, 소셜 미디어 포스트, 이미지, 동영상까지 AI로 빠르게 제작하는 도구들을 찾아보세요."
                    }
                  }
                ]
              }
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "포토샵처럼 비싼 소프트웨어의 무료 대안은 없나요?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "물론 있습니다! 디자인 작업에 GIMP, Inkscape, Canva 무료 버전 등이 있고, 오피스 프로그램은 LibreOffice, 영상 편집에는 DaVinci Resolve 등 다양한 전문가급 무료 소프트웨어가 있습니다. 툴파인더에서 카테고리별 무료 대안을 자세히 살펴보세요."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "소규모 팀에 적합한 올인원 협업 툴은 무엇인가요?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "소규모 팀이라면 Notion, ClickUp, Monday.com이 인기 있는 올인원 솔루션입니다. 이 도구들은 프로젝트 관리, 문서 작성, 일정 조율, 할 일 추적 등 다양한 기능을 하나로 통합하여 여러 도구를 오가는 번거로움을 줄여줍니다. 각 도구별 자세한 비교는 툴파인더의 협업 도구 카테고리에서 확인하세요."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "마케팅팀에게 가장 시간을 절약해주는 자동화 도구는 무엇인가요?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "마케팅 자동화에는 HubSpot, Zapier, Buffer/Hootsuite, Mailchimp이 특히 유용합니다. 이메일 마케팅 자동화, 소셜 미디어 스케줄링, 리드 관리 프로세스 자동화 등으로 매일 반복하는 작업을 획기적으로 줄여줍니다. 마케팅 워크플로우 별 최적의 자동화 도구 조합은 툴파인더에서 확인하세요."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "최근 주목받는 새로운 AI 도구는 어떤 것들이 있나요?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "현재 주목받는 AI 도구로는 문서 요약과 분석에 특화된 Anthropic의 Claude, 디자인 작업을 도와주는 Midjourney, 코딩 어시스턴트 GitHub Copilot, 문서 처리 자동화 도구 TextCortex 등이 있습니다. 툴파인더에서는 매주 새롭게 출시되는 혁신적인 AI 도구들을 업데이트하고 있습니다."
                    }
                  }
                ]
              }
            `,
          }}
        />
      </head>
      <body className={cn(inter.className, "min-h-screen bg-background font-sans antialiased")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="toolfinder-theme"
        >
          <div className="relative flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-14 items-center">
                <div className="mr-4 flex">
                  <Link href="/" className="flex items-center">
                    <Image
                      src="/toolfinder_header.png"
                      alt="툴파인더 - 업무 효율을 높이는 소프트웨어 추천 플랫폼"
                      width={280}
                      height={65}
                      className="h-12 w-auto"
                      priority
                    />
                  </Link>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                  <div className="w-full flex-1 md:w-auto md:flex-none">
                    <AccordionMenu />
                  </div>
                </div>
              </div>
            </header>
            <main className="flex-1">{children}</main>
            <footer className="border-t border-border py-6 md:py-8">
              <div className="container flex flex-col items-center gap-4 text-center">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold">툴파인더</span> - 일 잘하는 사람들의 도구 선택 가이드
                </p>
                <p className="text-xs text-muted-foreground">
                  매일 수십 개의 도구를 테스트하고 비교합니다. 마케팅, 디자인, 개발, 생산성, 협업에 필요한 최적의 소프트웨어를 한곳에서 찾아보세요.
                </p>
                <nav className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
                  <Link href="/" className="hover:underline">
                    홈
                  </Link>
                  <Link href="/about" className="hover:underline">
                    소개
                  </Link>
                  <Link href="/categories" className="hover:underline">
                    카테고리
                  </Link>
                  <a
                    href="https://forms.gle/scFWRXenuPyKZBav9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    문의하기
                  </a>
                </nav>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
