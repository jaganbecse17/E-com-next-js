import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "ECommerce - Your Premier Shopping Destination",
    template: "%s | ECommerce",
  },
  description:
    "Discover quality products at great prices. Shop electronics, clothing, home goods, and more with fast shipping and excellent customer service.",
  keywords: [
    "ecommerce",
    "shopping",
    "online store",
    "electronics",
    "clothing",
    "home goods",
  ],
  authors: [{ name: "ECommerce Team" }],
  creator: "ECommerce",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.vercel.app",
    siteName: "ECommerce",
    title: "ECommerce - Your Premier Shopping Destination",
    description:
      "Discover quality products at great prices. Shop electronics, clothing, home goods, and more.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ECommerce",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ECommerce - Your Premier Shopping Destination",
    description:
      "Discover quality products at great prices. Shop electronics, clothing, home goods, and more.",
    images: ["/og-image.jpg"],
    creator: "@ecommerce",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
