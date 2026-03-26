import { hc } from "hono/client";

import type { AppType } from "@/playground/server/hono";

export const honoClient = hc<AppType>("");
