import { Head } from "nextra/components";

export const metadata = {
  title: {
    default: "pom",
    template: "%s - pom",
  },
  description:
    "TypeScript で PowerPoint プレゼンテーションを宣言的に記述するためのライブラリ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>{children}</body>
    </html>
  );
}
