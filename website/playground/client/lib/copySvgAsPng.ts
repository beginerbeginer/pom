const PNG_WIDTH = 1920;
const PNG_HEIGHT = 1080;

export async function copySvgAsPng(svgString: string): Promise<void> {
  if (
    !("clipboard" in navigator) ||
    !("write" in navigator.clipboard) ||
    typeof ClipboardItem === "undefined"
  ) {
    throw new Error(
      "お使いのブラウザはクリップボードへの画像コピーに対応していません",
    );
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, "image/svg+xml");
  const svgElement = doc.documentElement;

  if (!svgElement.getAttribute("viewBox")) {
    const origWidth = parseFloat(svgElement.getAttribute("width") ?? "0");
    const origHeight = parseFloat(svgElement.getAttribute("height") ?? "0");
    if (origWidth > 0 && origHeight > 0) {
      svgElement.setAttribute(
        "viewBox",
        "0 0 " + String(origWidth) + " " + String(origHeight),
      );
    }
  }

  svgElement.setAttribute("width", String(PNG_WIDTH));
  svgElement.setAttribute("height", String(PNG_HEIGHT));

  if (!svgElement.getAttribute("xmlns")) {
    svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  }

  const serializer = new XMLSerializer();
  const svgData = serializer.serializeToString(svgElement);
  const svgBlob = new Blob([svgData], {
    type: "image/svg+xml;charset=utf-8",
  });
  const url = URL.createObjectURL(svgBlob);

  try {
    const img = await loadImage(url);

    const canvas = document.createElement("canvas");
    canvas.width = PNG_WIDTH;
    canvas.height = PNG_HEIGHT;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Canvas context is not available");
    }

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, PNG_WIDTH, PNG_HEIGHT);
    ctx.drawImage(img, 0, 0, PNG_WIDTH, PNG_HEIGHT);

    const pngBlob = await canvasToBlob(canvas);

    await navigator.clipboard.write([
      new ClipboardItem({ "image/png": pngBlob }),
    ]);
  } finally {
    URL.revokeObjectURL(url);
  }
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve(img);
    };
    img.onerror = () => {
      reject(new Error("Failed to load SVG as image"));
    };
    img.src = src;
  });
}

function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("Failed to convert canvas to PNG"));
      }
    }, "image/png");
  });
}
