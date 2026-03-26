"use client";

import {
  AlertCircle,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Loader2,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/playground/lib/utils";

import { copySvgAsPng } from "../lib/copySvgAsPng";

export interface StructuredError {
  type: string;
  message: string;
  line?: number;
  column?: number;
  tagName?: string;
}

type CopyStatus = "idle" | "copying" | "success" | "error";

function getErrorTypeLabel(type: string): string {
  switch (type) {
    case "xml_syntax":
      return "XML Syntax Error";
    case "schema":
      return "Attribute Value Error";
    case "structure":
      return "Structure Error";
    default:
      return "Error";
  }
}

interface SlidePreviewProps {
  svgs: string[];
  isLoading: boolean;
  errors: StructuredError[] | null;
  currentPage: number;
  onPageChange: (page: number) => void;
  onErrorClick?: (errorIndex: number) => void;
}

export function SlidePreview({
  svgs,
  isLoading,
  errors,
  currentPage,
  onPageChange,
  onErrorClick,
}: SlidePreviewProps) {
  const totalPages = svgs.length;
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) {
        clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  async function handleCopyAsPng() {
    if (copyTimerRef.current) {
      clearTimeout(copyTimerRef.current);
      copyTimerRef.current = null;
    }
    setCopyStatus("copying");
    try {
      await copySvgAsPng(svgs[currentPage - 1]);
      setCopyStatus("success");
    } catch {
      setCopyStatus("error");
    }
    copyTimerRef.current = setTimeout(() => {
      setCopyStatus("idle");
      copyTimerRef.current = null;
    }, 2000);
  }

  if (isLoading) {
    return (
      <div className="bg-muted flex h-full items-center justify-center rounded-md border">
        <div className="text-muted-foreground flex items-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Generating preview...</span>
        </div>
      </div>
    );
  }

  if (errors && errors.length > 0) {
    return (
      <div className="flex h-full flex-col rounded-md border">
        <div className="flex-1 overflow-auto p-4">
          <ul className="space-y-2">
            {errors.map((error, index) => (
              <li
                key={index}
                className={cn(
                  "border-destructive/20 bg-destructive/5 flex items-start gap-3 rounded-md border p-3",
                  error.line &&
                    "hover:bg-destructive/10 cursor-pointer transition-colors",
                )}
                onClick={() => {
                  if (error.line && onErrorClick) {
                    onErrorClick(index);
                  }
                }}
              >
                <AlertCircle className="text-destructive mt-0.5 size-4 shrink-0" />
                <div className="min-w-0">
                  <p className="text-destructive text-xs font-semibold">
                    {getErrorTypeLabel(error.type)}
                  </p>
                  <p className="text-foreground mt-1 text-sm break-words">
                    {error.message}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  if (totalPages === 0) {
    return (
      <div className="bg-muted flex h-full items-center justify-center rounded-md border">
        <p className="text-muted-foreground">Edit XML to see a preview</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col rounded-md border">
      <div className="bg-muted relative flex min-h-0 flex-1 items-center justify-center p-4">
        <div
          className="h-full w-full [&>svg]:h-full [&>svg]:w-full"
          dangerouslySetInnerHTML={{ __html: svgs[currentPage - 1] }}
        />
        <button
          className="bg-background/80 hover:bg-background absolute top-2 right-2 rounded-md p-2 backdrop-blur-sm transition-colors disabled:opacity-50"
          onClick={() => void handleCopyAsPng()}
          disabled={copyStatus === "copying"}
          title="Copy as image"
          aria-label="Copy as image"
        >
          {copyStatus === "idle" && <Copy className="h-4 w-4" />}
          {copyStatus === "copying" && (
            <Loader2 className="h-4 w-4 animate-spin" />
          )}
          {copyStatus === "success" && (
            <Check className="h-4 w-4 text-green-600" />
          )}
          {copyStatus === "error" && <X className="text-destructive h-4 w-4" />}
        </button>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 border-t px-4 py-2">
          <button
            className="hover:bg-muted rounded p-1 disabled:opacity-50"
            disabled={currentPage <= 1}
            onClick={() => {
              onPageChange(currentPage - 1);
            }}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm">
            {currentPage} / {totalPages}
          </span>
          <button
            className="hover:bg-muted rounded p-1 disabled:opacity-50"
            disabled={currentPage >= totalPages}
            onClick={() => {
              onPageChange(currentPage + 1);
            }}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
