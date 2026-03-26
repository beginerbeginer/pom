import { NextResponse } from "next/server";

let handler: { GET: Function; POST: Function } | null = null;
let importError: string | null = null;

try {
  const { handle } = require("hono/vercel");
  const { app } = require("@/playground/server/hono");
  const h = handle(app);
  handler = { GET: h, POST: h };
} catch (e: unknown) {
  importError =
    e instanceof Error ? e.message + "\n" + e.stack : String(e);
}

function debugWrap(method: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async (...args: any[]) => {
    if (importError) {
      return NextResponse.json(
        { error: importError },
        { status: 500 },
      );
    }
    return (handler as any)[method](...args);
  };
}

export const GET = debugWrap("GET");
export const POST = debugWrap("POST");
