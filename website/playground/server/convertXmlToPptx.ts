import { buildPptx } from "@hirokisakabe/pom";

const SLIDE_WIDTH = 1280;
const SLIDE_HEIGHT = 720;

export async function convertXmlToPptx(xml: string): Promise<ArrayBuffer> {
  const pptx = await buildPptx(xml, { w: SLIDE_WIDTH, h: SLIDE_HEIGHT });
  const buffer = await pptx.write({
    outputType: "uint8array",
  });
  if (!(buffer instanceof Uint8Array)) {
    throw new Error("Unexpected output type from pptx.write");
  }
  const arrayBuffer = new ArrayBuffer(buffer.byteLength);
  new Uint8Array(arrayBuffer).set(buffer);
  return arrayBuffer;
}
