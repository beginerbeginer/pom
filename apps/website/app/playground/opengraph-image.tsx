import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteName } from "../siteConfig";

export const alt = `${siteName} Playground - Try pom in your browser`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const geistSemiBold = await readFile(
    join(process.cwd(), "fonts", "GeistSans-SemiBold.ttf"),
  );

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Geist Sans",
        background: "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)",
      }}
    >
      {/* Logo (icon.svg を再現) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 128 128"
        width="140"
        height="140"
      >
        <defs>
          <linearGradient id="bg13" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#ffffff" }} />
            <stop offset="100%" style={{ stopColor: "#e0e7ff" }} />
          </linearGradient>
        </defs>
        <rect
          x="4"
          y="4"
          width="120"
          height="120"
          rx="20"
          ry="20"
          fill="url(#bg13)"
        />
        {/* Back page: XML code */}
        <rect
          x="14"
          y="14"
          width="72"
          height="56"
          rx="5"
          fill="#6D28D9"
          opacity="0.2"
        />
        <text
          x="24"
          y="32"
          fontFamily="monospace"
          fontSize="9"
          fill="#6D28D9"
          opacity="0.5"
        >
          {"<VStack>"}
        </text>
        <text
          x="31"
          y="43"
          fontFamily="monospace"
          fontSize="8"
          fill="#6D28D9"
          opacity="0.35"
        >
          {"<Text />"}
        </text>
        <text
          x="31"
          y="53"
          fontFamily="monospace"
          fontSize="8"
          fill="#6D28D9"
          opacity="0.35"
        >
          {"<Table />"}
        </text>
        <text
          x="24"
          y="63"
          fontFamily="monospace"
          fontSize="9"
          fill="#6D28D9"
          opacity="0.5"
        >
          {"</VStack>"}
        </text>
        {/* Front page: PPTX slide */}
        <rect
          x="38"
          y="40"
          width="78"
          height="60"
          rx="5"
          fill="white"
          opacity="0.95"
        />
        <rect
          x="50"
          y="50"
          width="30"
          height="5"
          rx="2.5"
          fill="#5B21B6"
          opacity="0.55"
        />
        <rect
          x="50"
          y="62"
          width="54"
          height="3"
          rx="1.5"
          fill="#5B21B6"
          opacity="0.2"
        />
        <rect
          x="50"
          y="69"
          width="46"
          height="3"
          rx="1.5"
          fill="#5B21B6"
          opacity="0.2"
        />
        <rect
          x="50"
          y="76"
          width="50"
          height="3"
          rx="1.5"
          fill="#5B21B6"
          opacity="0.2"
        />
        <rect
          x="50"
          y="84"
          width="10"
          height="10"
          rx="2"
          fill="#5B21B6"
          opacity="0.25"
        />
        <rect
          x="64"
          y="88"
          width="10"
          height="6"
          rx="2"
          fill="#5B21B6"
          opacity="0.25"
        />
        <rect
          x="78"
          y="82"
          width="10"
          height="12"
          rx="2"
          fill="#5B21B6"
          opacity="0.25"
        />
        <rect
          x="92"
          y="86"
          width="10"
          height="8"
          rx="2"
          fill="#5B21B6"
          opacity="0.25"
        />
      </svg>

      {/* Title */}
      <div
        style={{
          display: "flex",
          fontSize: 72,
          fontWeight: 600,
          color: "white",
          marginTop: 20,
          letterSpacing: "-0.02em",
        }}
      >
        {siteName}
      </div>

      {/* Subtitle: Playground */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginTop: 8,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "rgba(255, 255, 255, 0.9)",
            background: "rgba(255, 255, 255, 0.15)",
            padding: "6px 20px",
            borderRadius: 8,
          }}
        >
          Playground
        </div>
      </div>

      {/* Tagline */}
      <div
        style={{
          display: "flex",
          fontSize: 24,
          color: "rgba(255, 255, 255, 0.75)",
          marginTop: 16,
        }}
      >
        Write XML and generate PowerPoint slides in your browser
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Geist Sans",
          data: geistSemiBold,
          style: "normal",
          weight: 600,
        },
      ],
    },
  );
}
