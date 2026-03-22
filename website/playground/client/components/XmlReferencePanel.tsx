"use client";

import { CircleHelp, Search } from "lucide-react";
import { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/playground/components/ui/sheet";

interface ElementInfo {
  name: string;
  description: string;
  attributes: string;
}

interface Section {
  title: string;
  elements: ElementInfo[];
}

const SECTIONS: Section[] = [
  {
    title: "Layout",
    elements: [
      {
        name: "VStack",
        description: "Vertical layout",
        attributes: "gap, alignItems, justifyContent, flexWrap, shadow",
      },
      {
        name: "HStack",
        description: "Horizontal layout",
        attributes: "gap, alignItems, justifyContent, flexWrap, shadow",
      },
      {
        name: "Box",
        description: "Container (single child)",
        attributes: "shadow",
      },
      {
        name: "Layer",
        description: "Absolute positioning",
        attributes: "Children require x, y",
      },
    ],
  },
  {
    title: "Content",
    elements: [
      {
        name: "Text",
        description: "Text",
        attributes:
          "fontSize, color, bold, italic, underline, strike, textAlign, highlight, fontFamily, lineHeight",
      },
      {
        name: "Ul",
        description: "Bullet list",
        attributes:
          "fontSize, color, bold, italic, underline, strike, highlight, textAlign, fontFamily, lineHeight / Children: Li (text, bold, italic, underline, strike, highlight, color, fontSize, fontFamily)",
      },
      {
        name: "Ol",
        description: "Numbered list",
        attributes:
          "fontSize, color, bold, italic, underline, strike, highlight, textAlign, fontFamily, lineHeight, numberType, numberStartAt / Children: Li (text, bold, italic, underline, strike, highlight, color, fontSize, fontFamily)",
      },
      {
        name: "Image",
        description: "Image",
        attributes: "src, sizing (contain/cover/crop), shadow",
      },
      {
        name: "Table",
        description: "Table",
        attributes:
          "defaultRowHeight / Children: TableColumn (width), TableRow (height), TableCell (fontSize, color, bold, italic, underline, strike, highlight, textAlign, backgroundColor, fontFamily, lineHeight, colspan, rowspan)",
      },
      {
        name: "Shape",
        description: "Shape",
        attributes:
          "shapeType (rect/roundRect/ellipse/triangle/star5/cloud/downArrow etc.), text, fill.color, fill.transparency, line, shadow.type/opacity/blur/angle/offset/color, fontSize, color, textAlign, bold, italic, underline, strike, highlight, fontFamily, lineHeight",
      },
      {
        name: "Icon",
        description: "Icon",
        attributes:
          "name (cpu/database/cloud/server/code/terminal/globe/user/users/briefcase/building/bar-chart/mail/search/settings/check/shield/lock/file/folder/calendar/clock/star/heart/zap/lightbulb etc.), size, color",
      },
      {
        name: "Line",
        description: "Line",
        attributes:
          "x1, y1, x2, y2, color, lineWidth, dashType, beginArrow, endArrow",
      },
    ],
  },
  {
    title: "Diagrams",
    elements: [
      {
        name: "Chart",
        description: "Chart",
        attributes:
          "chartType (bar/line/pie/area/doughnut/radar), showLegend, showTitle, title, chartColors, radarStyle / Children: ChartSeries (name), ChartDataPoint (label, value)",
      },
      {
        name: "Timeline",
        description: "Timeline",
        attributes:
          "direction / Children: TimelineItem (date, title, description, color)",
      },
      {
        name: "Matrix",
        description: "2x2 Matrix",
        attributes:
          "Children: MatrixAxes (x, y), MatrixQuadrants (topLeft, topRight, bottomLeft, bottomRight), MatrixItem (label, x, y, color)",
      },
      {
        name: "Tree",
        description: "Tree / Org chart",
        attributes:
          "layout, nodeShape, nodeWidth, nodeHeight, levelGap, siblingGap, connectorStyle / Children: TreeItem (label, color) (recursive nesting)",
      },
      {
        name: "Flow",
        description: "Flowchart",
        attributes:
          "direction, nodeWidth, nodeHeight, nodeGap, connectorStyle / Children: FlowNode (id, shape, text, color), FlowConnection (from, to, label, color)",
      },
      {
        name: "ProcessArrow",
        description: "Process arrow",
        attributes:
          "direction, itemWidth, itemHeight, gap, fontSize, bold, italic, strike / Children: ProcessArrowStep (label, color, textColor)",
      },
      {
        name: "Pyramid",
        description: "Pyramid",
        attributes:
          "direction (up/down) / Children: PyramidLevel (label, color, textColor)",
      },
    ],
  },
];

interface CommonAttribute {
  name: string;
  type: string;
  description: string;
}

const COMMON_ATTRIBUTES: CommonAttribute[] = [
  { name: "w", type: 'number | "max" | "%"', description: "Width" },
  { name: "h", type: 'number | "max" | "%"', description: "Height" },
  { name: "minW / maxW", type: "number", description: "Min / max width" },
  { name: "minH / maxH", type: "number", description: "Min / max height" },
  {
    name: "padding",
    type: "number | padding.top/right/bottom/left",
    description: "Padding",
  },
  {
    name: "backgroundColor",
    type: "string",
    description: "Background color (hex)",
  },
  {
    name: "backgroundImage",
    type: "backgroundImage.src, backgroundImage.sizing",
    description: "Background image",
  },
  {
    name: "border",
    type: "border.color, border.width, border.dashType",
    description: "Border",
  },
  { name: "borderRadius", type: "number", description: "Border radius" },
  { name: "opacity", type: "number (0-1)", description: "Opacity" },
  {
    name: "margin",
    type: "number | margin.top/right/bottom/left",
    description: "Margin",
  },
  {
    name: "alignSelf",
    type: '"start" | "center" | "end" | "stretch" | "auto"',
    description: "Self alignment",
  },
  { name: "zIndex", type: "number", description: "Stacking order" },
  {
    name: "position",
    type: '"relative" | "absolute"',
    description: "Positioning mode",
  },
  {
    name: "top / right / bottom / left",
    type: "number",
    description: "Absolute position offset",
  },
];

export function XmlReferencePanel() {
  const [search, setSearch] = useState("");

  const lowerSearch = search.toLowerCase();

  const filteredSections = SECTIONS.map((section) => ({
    ...section,
    elements: section.elements.filter(
      (el) =>
        el.name.toLowerCase().includes(lowerSearch) ||
        el.description.toLowerCase().includes(lowerSearch) ||
        el.attributes.toLowerCase().includes(lowerSearch),
    ),
  })).filter((section) => section.elements.length > 0);

  const filteredCommonAttributes = COMMON_ATTRIBUTES.filter(
    (attr) =>
      attr.name.toLowerCase().includes(lowerSearch) ||
      attr.type.toLowerCase().includes(lowerSearch) ||
      attr.description.toLowerCase().includes(lowerSearch),
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className="text-muted-foreground hover:text-foreground flex items-center gap-1 rounded-md px-2 py-1 text-sm transition-colors"
          aria-label="Open XML reference"
          title="XML Reference"
        >
          <CircleHelp className="size-4" />
          <span>Reference</span>
        </button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md" side="right">
        <SheetHeader>
          <SheetTitle>XML Reference</SheetTitle>
          <SheetDescription>
            List of XML elements and attributes supported by pom
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-6 overflow-y-auto px-4 pb-4">
          <div className="relative">
            <Search className="text-muted-foreground absolute top-2.5 left-2.5 size-4" />
            <input
              type="text"
              placeholder="Search elements or attributes..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring w-full rounded-md border py-2 pr-3 pl-9 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden"
            />
          </div>

          {filteredSections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-2 text-sm font-semibold">{section.title}</h3>
              <div className="flex flex-col gap-2">
                {section.elements.map((el) => (
                  <div key={el.name} className="rounded-md border p-3 text-sm">
                    <div className="flex items-baseline gap-2">
                      <code className="bg-muted rounded px-1.5 py-0.5 text-xs font-semibold">
                        {el.name}
                      </code>
                      <span className="text-muted-foreground text-xs">
                        {el.description}
                      </span>
                    </div>
                    <p className="text-muted-foreground mt-1.5 text-xs">
                      {el.attributes}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {filteredCommonAttributes.length > 0 && (
            <div>
              <h3 className="mb-2 text-sm font-semibold">Common Attributes</h3>
              <div className="flex flex-col gap-2">
                {filteredCommonAttributes.map((attr) => (
                  <div
                    key={attr.name}
                    className="rounded-md border p-3 text-sm"
                  >
                    <div className="flex items-baseline gap-2">
                      <code className="bg-muted rounded px-1.5 py-0.5 text-xs font-semibold">
                        {attr.name}
                      </code>
                      <span className="text-muted-foreground text-xs">
                        {attr.description}
                      </span>
                    </div>
                    <p className="text-muted-foreground mt-1.5 font-mono text-xs">
                      {attr.type}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredSections.length === 0 &&
            filteredCommonAttributes.length === 0 && (
              <p className="text-muted-foreground py-8 text-center text-sm">
                No matching elements found
              </p>
            )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
