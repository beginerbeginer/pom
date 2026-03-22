import type { Metadata } from "next";
import { Head } from "nextra/components";
import { siteDescription, siteName, siteUrl } from "./siteConfig";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s - ${siteName}`,
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    siteName,
    description: siteDescription,
  },
  twitter: {
    card: "summary",
    description: siteDescription,
  },
  alternates: {
    canonical: "./",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>{children}</body>
    </html>
  );
}
