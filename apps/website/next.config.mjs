import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import nextra from "nextra";

const withNextra = nextra({});

export default withNextra({
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  outputFileTracingRoot: dirname(
    dirname(dirname(fileURLToPath(import.meta.url))),
  ),
  serverExternalPackages: [
    "@resvg/resvg-js",
    "@hirokisakabe/pom",
    "pptxgenjs",
    "yoga-layout",
    "fast-xml-parser",
    "opentype.js",
    "image-size",
    "zod",
  ],
  outputFileTracingIncludes: {
    "/api/**": [
      "./node_modules/@hirokisakabe/pom/**",
      "./node_modules/pptxgenjs/**",
      "./node_modules/yoga-layout/**",
      "./node_modules/fast-xml-parser/**",
      "./node_modules/opentype.js/**",
      "./node_modules/image-size/**",
      "./node_modules/@resvg/resvg-js/**",
      "./node_modules/zod/**",
    ],
  },
});
