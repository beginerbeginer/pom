// TS6 で CSS の side-effect import に型宣言が必要
declare module "*.css";

declare module "*.png" {
  import type { StaticImageData } from "next/image";
  const content: StaticImageData;
  export default content;
}
