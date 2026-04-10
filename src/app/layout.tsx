import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lem-supply-enterprise.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "LEM Supply Enterprise | Operational Supply and Consumables",
    template: "%s | LEM Supply Enterprise",
  },
  description:
    "LEM Supply Enterprise delivers operational supply support across maintenance, engineering, electrical, plant processing, general supplies, and PPE consumables.",
  keywords: [
    "LEM Supply Enterprise",
    "industrial consumables South Africa",
    "engineering consumables",
    "electrical consumables",
    "PPE supplies",
    "processing plant consumables",
    "general business supplies",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "LEM Supply Enterprise | Operational Supply and Consumables",
    description:
      "Reliable supply support across engineering, electrical, general, processing plant, and safety consumables.",
    url: siteUrl,
    siteName: "LEM Supply Enterprise",
    locale: "en_ZA",
    type: "website",
    images: [
      {
        url: "/logos/LEM-Supply-Enterprise_Logo.png",
        width: 1200,
        height: 630,
        alt: "LEM Supply Enterprise logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LEM Supply Enterprise | Operational Supply and Consumables",
    description:
      "A supply-focused LEM division supporting operations with dependable consumables and sourcing capability.",
    images: ["/logos/LEM-Supply-Enterprise_Logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <div className="flex min-h-full flex-1 flex-col">
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}