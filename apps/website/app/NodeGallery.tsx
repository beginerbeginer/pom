"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useState } from "react";

type GalleryNode = { name: string; image: StaticImageData };

export function NodeGallery({ nodes }: { nodes: GalleryNode[] }) {
  const [selected, setSelected] = useState<GalleryNode | null>(null);

  const close = useCallback(() => setSelected(null), []);

  useEffect(() => {
    if (!selected) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [selected, close]);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {nodes.map((node) => (
          <button
            key={node.name}
            type="button"
            onClick={() => setSelected(node)}
            className="group cursor-pointer overflow-hidden rounded-xl border border-gray-200 text-left transition-colors hover:border-gray-400 dark:border-gray-800 dark:hover:border-gray-600"
          >
            <div className="bg-gray-50 p-3 dark:bg-gray-900">
              <Image
                src={node.image}
                alt={`${node.name} node example`}
                className="w-full rounded"
                placeholder="blur"
              />
            </div>
            <div className="px-3 py-2">
              <span className="text-sm font-medium">{node.name}</span>
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${selected.name} node example`}
          onClick={close}
        >
          <div
            className="relative max-h-[90vh] max-w-4xl overflow-auto rounded-2xl bg-white p-4 shadow-2xl dark:bg-gray-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-semibold">{selected.name}</span>
              <button
                type="button"
                onClick={close}
                className="rounded-lg p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <Image
              src={selected.image}
              alt={`${selected.name} node example`}
              className="w-full rounded-lg"
              placeholder="blur"
            />
          </div>
        </div>
      )}
    </>
  );
}
