type PptxGenJSClass = import("pptxgenjs").default;
export type SlideInstance = ReturnType<PptxGenJSClass["addSlide"]>;
export type PptxInstance = PptxGenJSClass;

export type RenderContext = {
  slide: SlideInstance;
  pptx: PptxInstance;
};
