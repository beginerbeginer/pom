# syntax=docker/dockerfile:1
FROM node:22-slim

# システムパッケージのインストール（BuildKitキャッシュマウント使用）
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt,sharing=locked \
    apt-get update && apt-get install -y --no-install-recommends \
    libreoffice-impress \
    imagemagick \
    ghostscript \
    fonts-noto-cjk \
    fonts-noto-cjk-extra \
    && rm -rf /usr/share/doc/* \
    && rm -rf /usr/share/man/* \
    && sed -i 's/rights="none" pattern="PDF"/rights="read|write" pattern="PDF"/' /etc/ImageMagick-6/policy.xml

# pnpm のセットアップ（package.json の packageManager フィールドからバージョンを取得）
WORKDIR /app
COPY package.json ./
RUN corepack enable && corepack install

# pnpm依存のインストール（BuildKitキャッシュマウント使用）
COPY pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY packages/pom/package.json packages/pom/
COPY packages/pom-md/package.json packages/pom-md/
COPY packages/pom-vscode/package.json packages/pom-vscode/
COPY apps/website/package.json apps/website/
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# アプリケーションコードのコピー
COPY . .

WORKDIR /app/packages/pom
CMD ["pnpm", "run", "vrt"]
