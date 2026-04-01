import type { PositionedNode } from "../../types.ts";
import type { RenderContext } from "../types.ts";
import {
  resolveColumnWidths,
  resolveRowHeights,
} from "../../shared/tableUtils.ts";
import { pxToIn, pxToPt } from "../units.ts";
import { convertUnderline, convertStrike } from "../textOptions.ts";
import { getContentArea } from "../utils/contentArea.ts";

type TablePositionedNode = Extract<PositionedNode, { type: "table" }>;

export function renderTableNode(
  node: TablePositionedNode,
  ctx: RenderContext,
): void {
  const tableRows = node.rows.map((row) =>
    row.cells.map((cell) => {
      const cellOptions: Record<string, unknown> = {
        fontSize: pxToPt(cell.fontSize ?? 18),
        color: cell.color,
        bold: cell.bold,
        italic: cell.italic,
        underline: convertUnderline(cell.underline),
        strike: convertStrike(cell.strike),
        highlight: cell.highlight,
        align: cell.textAlign ?? "left",
        fill: cell.backgroundColor
          ? { color: cell.backgroundColor }
          : undefined,
        colspan: cell.colspan,
        rowspan: cell.rowspan,
      };

      if (cell.runs && cell.runs.length > 0) {
        const textItems = cell.runs.map((run) => ({
          text: run.text,
          options: {
            fontSize: pxToPt(cell.fontSize ?? 18),
            color: cell.color,
            bold: run.bold ?? cell.bold,
            italic: run.italic ?? cell.italic,
            underline: convertUnderline(run.underline ?? cell.underline),
            strike: convertStrike(run.strike ?? cell.strike),
            highlight: run.highlight ?? cell.highlight,
            ...(run.href ? { hyperlink: { url: run.href } } : {}),
          },
        }));
        return {
          text: textItems,
          options: {
            align: cell.textAlign ?? "left",
            fill: cell.backgroundColor
              ? { color: cell.backgroundColor }
              : undefined,
            colspan: cell.colspan,
            rowspan: cell.rowspan,
          },
        };
      }

      return {
        text: cell.text,
        options: cellOptions,
      };
    }),
  );

  const content = getContentArea(node);
  const tableOptions = {
    x: pxToIn(content.x),
    y: pxToIn(content.y),
    w: pxToIn(content.w),
    h: pxToIn(content.h),
    colW: resolveColumnWidths(node, content.w).map((width) => pxToIn(width)),
    rowH: resolveRowHeights(node).map((height) => pxToIn(height)),
    margin: 0,
  };

  ctx.slide.addTable(tableRows, tableOptions);
}
