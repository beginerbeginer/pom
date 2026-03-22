import { honoClient } from "./honoClient";

interface StructuredError {
  type: string;
  message: string;
  line?: number;
  column?: number;
  tagName?: string;
}

function isErrorResponse(
  value: unknown,
): value is { errors: StructuredError[] } {
  if (typeof value !== "object" || value === null || !("errors" in value)) {
    return false;
  }
  const errors: unknown = Object.getOwnPropertyDescriptor(
    value,
    "errors",
  )?.value;
  return Array.isArray(errors) && errors.length > 0;
}

export async function downloadPptx(xml: string): Promise<void> {
  const res = await honoClient.api.download.$post({
    json: { xml },
  });

  if (!res.ok) {
    let message = "ダウンロードに失敗しました";
    try {
      const text = await res.text();
      const parsed: unknown = JSON.parse(text);
      if (isErrorResponse(parsed)) {
        message = parsed.errors[0].message;
      }
    } catch {
      // JSONパースに失敗した場合はデフォルトメッセージを使用
    }
    throw new Error(message);
  }

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "output.pptx";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 0);
}
