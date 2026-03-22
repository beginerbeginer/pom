import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";

export const metadata = {
  title: {
    default: "pom",
    template: "%s - pom",
  },
  description:
    "TypeScript で PowerPoint プレゼンテーションを宣言的に記述するためのライブラリ",
};

const navbar = (
  <Navbar logo={<b>pom</b>} projectLink="https://github.com/hirokisakabe/pom" />
);

const footer = <Footer>MIT {new Date().getFullYear()} © pom</Footer>;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/hirokisakabe/pom/tree/main/website"
          footer={footer}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
