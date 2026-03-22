import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";

const navbar = (
  <Navbar logo={<b>pom</b>} projectLink="https://github.com/hirokisakabe/pom" />
);

const footer = <Footer>MIT {new Date().getFullYear()} © pom</Footer>;

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout
      navbar={navbar}
      pageMap={await getPageMap()}
      docsRepositoryBase="https://github.com/hirokisakabe/pom/tree/main/website"
      footer={footer}
    >
      {children}
    </Layout>
  );
}
