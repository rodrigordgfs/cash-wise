import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { dark } from "@clerk/themes";

import "./globals.css";
import "react-day-picker/dist/style.css";
import { ClerkProvider } from "@clerk/nextjs";
import { I18nextProviderWrapper } from "./I18nextProviderWrapper";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "CashWise - Gerenciamento Financeiro",
    template: "%s | CashWise",
  },
  description: "Controle suas finanças de forma inteligente com o CashWise.",
  keywords: [
    "controle financeiro",
    "gerenciamento de finanças",
    "CashWise",
    "orçamento pessoal",
    "despesas",
    "economia",
    "investimentos",
    "planejamento financeiro",
  ],
  authors: [
    { name: "Rodrigo Shinoda", url: "https://github.com/rodrigordgfs" },
  ],
  creator: "CashWise",
  metadataBase: new URL("https://cash-wise-one.vercel.app/"),
  openGraph: {
    title: "CashWise - Gerenciamento Financeiro",
    description: "Controle suas finanças de forma inteligente com o CashWise.",
    url: "https://cash-wise-one.vercel.app/",
    siteName: "CashWise",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CashWise - Gerenciamento Financeiro",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CashWise - Gerenciamento Financeiro",
    description: "Controle suas finanças de forma inteligente com o CashWise.",
    images: ["/og-image.png"],
    creator: "@cashwise_app",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/shortcut-icon.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport = {
  themeColor: "#10b981",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="pt-BR" className="dark" suppressHydrationWarning>
        <head>
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="theme-color" content="#2563eb" />
        </head>
        <body
          className={`${inter.className} bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100`}
          suppressHydrationWarning
        >
          <I18nextProviderWrapper>
            <Providers>{children}</Providers>
          </I18nextProviderWrapper>
        </body>
      </html>
    </ClerkProvider>
  );
}
