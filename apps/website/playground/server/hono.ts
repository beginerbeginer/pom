import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

import { classifyError } from "./classifyError";
import { convertXmlToPptx } from "./convertXmlToPptx";
import { convertXmlToPreview } from "./convertXmlToPreview";

const app = new Hono().basePath("/api");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const route = app
  .get("/health", (c) => {
    return c.json({ status: "ok" });
  })
  .post(
    "/preview",
    zValidator(
      "json",
      z.object({
        xml: z.string(),
      }),
    ),
    async (c) => {
      const { xml } = c.req.valid("json");

      try {
        const result = await convertXmlToPreview(xml);
        return c.json(result);
      } catch (e) {
        const errors = classifyError(e, xml);
        return c.json({ errors }, 400);
      }
    },
  )
  .post(
    "/download",
    zValidator(
      "json",
      z.object({
        xml: z.string(),
      }),
    ),
    async (c) => {
      const { xml } = c.req.valid("json");

      try {
        const buffer = await convertXmlToPptx(xml);
        c.header(
          "Content-Type",
          "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        );
        c.header("Content-Disposition", 'attachment; filename="output.pptx"');
        return c.body(buffer);
      } catch (e) {
        const errors = classifyError(e, xml);
        return c.json({ errors }, 400);
      }
    },
  );

export { app };

export type AppType = typeof route;
