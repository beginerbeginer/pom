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
      "../../packages/pom/node_modules/**",
      "../../node_modules/.pnpm/pptxgenjs@*/node_modules/**",
      "../../node_modules/.pnpm/yoga-layout@*/node_modules/**",
      "../../node_modules/.pnpm/fast-xml-parser@*/node_modules/**",
      "../../node_modules/.pnpm/opentype.js@*/node_modules/**",
      "../../node_modules/.pnpm/image-size@*/node_modules/**",
      "../../node_modules/.pnpm/@resvg+resvg-js@*/node_modules/**",
      "../../node_modules/.pnpm/zod@*/node_modules/**",
    ],
  },
});
