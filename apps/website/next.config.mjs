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
  serverExternalPackages: ["@resvg/resvg-js"],
  webpack: (config, { isServer }) => {
    if (isServer) {
      // workspace リンクされた @hirokisakabe/pom はバンドルに含まれるが、
      // 内部で require する @resvg/resvg-js はネイティブバイナリのため
      // バンドルから除外する必要がある。
      config.externals = config.externals || [];
      config.externals.push(({ request }, callback) => {
        if (request && /^@resvg\//.test(request)) {
          return callback(null, `commonjs ${request}`);
        }
        callback();
      });
    }
    return config;
  },
});
