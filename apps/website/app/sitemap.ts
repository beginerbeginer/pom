import type { MetadataRoute } from "next";
import { siteUrl } from "./siteConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl },
    { url: `${siteUrl}/nodes` },
    { url: `${siteUrl}/master-slide` },
    { url: `${siteUrl}/text-measurement` },
    { url: `${siteUrl}/pom-md` },
    { url: `${siteUrl}/pom-md/markdown-syntax` },
    { url: `${siteUrl}/pom-md/pomxml-code-fence` },
    { url: `${siteUrl}/pom-vscode` },
    { url: `${siteUrl}/pom-vscode/supported-formats` },
    { url: `${siteUrl}/pom-vscode/configuration` },
    { url: `${siteUrl}/llm.txt` },
    { url: `${siteUrl}/playground` },
  ];
}
