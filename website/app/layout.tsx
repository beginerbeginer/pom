import { Head } from "nextra/components";

export const metadata = {
  title: {
    default: "pom",
    template: "%s - pom",
  },
  description:
    "A library for declaratively describing PowerPoint presentations in TypeScript",
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
