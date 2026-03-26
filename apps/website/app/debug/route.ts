import { NextResponse } from "next/server";

export async function GET() {
  const results: Record<string, string> = {};

  const modules = [
    "hono/vercel",
    "pptxgenjs",
    "yoga-layout",
    "@resvg/resvg-js",
    "fast-xml-parser",
    "@hirokisakabe/pom",
  ];

  for (const mod of modules) {
    try {
      await import(mod);
      results[mod] = "ok";
    } catch (e: unknown) {
      results[mod] = e instanceof Error ? e.message : String(e);
    }
  }

  try {
    await import("@/playground/server/hono");
    results["@/playground/server/hono"] = "ok";
  } catch (e: unknown) {
    results["@/playground/server/hono"] =
      e instanceof Error ? e.message + "\n" + e.stack : String(e);
  }

  return NextResponse.json(results, { status: 200 });
}
