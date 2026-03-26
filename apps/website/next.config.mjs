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
  serverExternalPackages: ["@resvg/resvg-js", "@hirokisakabe/pom"],
  webpack: (config, { isServer }) => {
    if (isServer) {
      // workspace リンクされたパッケージは serverExternalPackages だけでは
      // 外部化されないため、webpack externals で明示的に除外する
      config.externals = config.externals || [];
      config.externals.push("@hirokisakabe/pom", "@resvg/resvg-js");
    }
    return config;
  },
});
