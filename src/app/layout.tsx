import type { Metadata, Viewport } from "next";
import { Archivo, Plus_Jakarta_Sans } from "next/font/google";

import { DonationThanks } from "@/components/donation-thanks";
import { MetaPixel } from "@/components/meta-pixel";
import { contact, site } from "@/lib/site";
import "./globals.css";

const display = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const body = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${contact.portal}`),
  title: {
    default: `${site.name} — Every Life Has a Story`,
    template: `%s | ${site.name}`,
  },
  description:
    "Belyamaharajpur Dream Golden Memories Club (DGMC) works on education, doorstep healthcare, food and animal rescue across rural West Medinipur, West Bengal.",
  keywords: [
    "NGO West Bengal",
    "Dream Golden Memories Club",
    "DGMC",
    "West Medinipur NGO",
    "rural education India",
    "animal rescue West Bengal",
    "CSR partnership India",
  ],
  openGraph: {
    type: "website",
    title: `${site.name} — Every Life Has a Story`,
    description:
      "From classrooms in rural West Medinipur to street shelters for abandoned animals — small acts of kindness, lifelong transformation.",
    siteName: site.legalName,
    locale: "en_IN",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: site.legalName }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Every Life Has a Story`,
    description:
      "Education, healthcare, food and animal rescue across rural West Medinipur.",
    images: ["/logo.png"],
  },
  icons: {
    icon: [
      { url: "/logo-96.png", sizes: "96x96", type: "image/png" },
      { url: "/logo-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: { url: "/logo-192.png", sizes: "180x180", type: "image/png" },
  },
};

export const viewport: Viewport = {
  themeColor: "#0e2a1b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <head>
        {/*
          Scroll reveals below the fold are driven by Framer Motion, which needs
          JS to un-hide them. With JS off they would stay invisible forever, so
          reset any element still carrying a motion "initial" style.
        */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col">
        {children}
        <DonationThanks />
        <MetaPixel />
      </body>
    </html>
  );
}
