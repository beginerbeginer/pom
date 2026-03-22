import type { TextMeasurementMode } from "./calcYogaLayout/measureText.ts";

export interface BuildContext {
  textMeasurementMode: TextMeasurementMode;
  imageSizeCache: Map<string, { widthPx: number; heightPx: number }>;
  imageDataCache: Map<string, string>;
  iconRasterCache: Map<string, string>;
}

export function createBuildContext(
  textMeasurementMode: TextMeasurementMode = "auto",
): BuildContext {
  return {
    textMeasurementMode,
    imageSizeCache: new Map(),
    imageDataCache: new Map(),
    iconRasterCache: new Map(),
  };
}
