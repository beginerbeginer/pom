import type { MetadataRoute } from "next";
import { siteUrl } from "./siteConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl },
    { url: `${siteUrl}/nodes` },
    { url: `${siteUrl}/master-slide` },
    { url: `${siteUrl}/text-measurement` },
    { url: `${siteUrl}/llm-integration` },
    { url: `${siteUrl}/playground` },
  ];
}
