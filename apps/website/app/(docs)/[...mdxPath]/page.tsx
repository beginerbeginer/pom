import { generateStaticParamsFor, importPage } from "nextra/pages";
import { useMDXComponents as getMDXComponents } from "../../../mdx-components";

const _generateStaticParams = generateStaticParamsFor("mdxPath");

export async function generateStaticParams() {
  const params = await _generateStaticParams();
  // ルートパス "/" はランディングページ (app/page.tsx) が担当するため除外
  // Nextra はルートを { mdxPath: [""] } として生成する
  return (params as { mdxPath?: string[] }[]).filter((p) => {
    if (!Array.isArray(p.mdxPath)) return false;
    return !(p.mdxPath.length === 1 && p.mdxPath[0] === "");
  });
}

export async function generateMetadata(props: {
  params: Promise<{ mdxPath: string[] }>;
}) {
  const params = await props.params;
  const { metadata } = await importPage(params.mdxPath);
  return metadata;
}

const Wrapper =
  getMDXComponents().wrapper ??
  (({ children }: { children: React.ReactNode }) => <>{children}</>);

export default async function Page(props: {
  params: Promise<{ mdxPath: string[] }>;
}) {
  const params = await props.params;
  const {
    default: MDXContent,
    toc,
    metadata,
    sourceCode,
  } = await importPage(params.mdxPath);
  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  );
}
