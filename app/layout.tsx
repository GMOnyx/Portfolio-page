import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import localFont from 'next/font/local';
import "./globals.css";

const soriaFont = localFont({
  src: "../public/soria-font.ttf",
  variable: "--font-soria",
});

const vercettiFont = localFont({
  src: "../public/Vercetti-Regular.woff",
  variable: "--font-vercetti",
});

export const metadata: Metadata = {
  title: "Abdarrahman Abdelnasir",
  description: "The Everything Man. Builder, founder, and creator.",
  keywords: "Abdarrahman Abdelnasir, Founder, Builder, AI, Product, Commandless AI, Nested Wallet, LeetPost AI, Portfolio",
  authors: [{ name: "Abdarrahman Abdelnasir" }],
  creator: "Abdarrahman Abdelnasir",
  publisher: "Abdarrahman Abdelnasir",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Abdarrahman Abdelnasir - The Everything Man",
    description: "Builder, founder, and creator.",
    url: "https://abdarrahman.github.io",
    siteName: "Abdarrahman Abdelnasir's Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdarrahman Abdelnasir - The Everything Man",
    description: "Builder, founder, and creator.",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overscroll-y-none">
      <body
        className={`${soriaFont.variable} ${vercettiFont.variable} font-sans antialiased`}
      >
        {children}
      </body>
      <GoogleAnalytics gaId={'G-7WD4HM3XRE'}/>
    </html>
  );
}
