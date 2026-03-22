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
    title: "レイアウト",
    elements: [
      {
        name: "VStack",
        description: "縦並びレイアウト",
        attributes: "gap, alignItems, justifyContent, flexWrap, shadow",
      },
      {
        name: "HStack",
        description: "横並びレイアウト",
        attributes: "gap, alignItems, justifyContent, flexWrap, shadow",
      },
      {
        name: "Box",
        description: "コンテナ（単一子要素）",
        attributes: "shadow",
      },
      {
        name: "Layer",
        description: "絶対位置配置",
        attributes: "子要素に x, y を指定",
      },
    ],
  },
  {
    title: "コンテンツ",
    elements: [
      {
        name: "Text",
        description: "テキスト",
        attributes:
          "fontSize, color, bold, italic, underline, strike, textAlign, highlight, fontFamily, lineHeight",
      },
      {
        name: "Ul",
        description: "箇条書きリスト",
        attributes:
          "fontSize, color, bold, italic, underline, strike, highlight, textAlign, fontFamily, lineHeight / 子要素: Li (text, bold, italic, underline, strike, highlight, color, fontSize, fontFamily)",
      },
      {
        name: "Ol",
        description: "番号付きリスト",
        attributes:
          "fontSize, color, bold, italic, underline, strike, highlight, textAlign, fontFamily, lineHeight, numberType, numberStartAt / 子要素: Li (text, bold, italic, underline, strike, highlight, color, fontSize, fontFamily)",
      },
      {
        name: "Image",
        description: "画像",
        attributes: "src, sizing (contain/cover/crop), shadow",
      },
      {
        name: "Table",
        description: "テーブル",
        attributes:
          "defaultRowHeight / 子要素: TableColumn (width), TableRow (height), TableCell (fontSize, color, bold, italic, underline, strike, highlight, textAlign, backgroundColor, fontFamily, lineHeight, colspan, rowspan)",
      },
      {
        name: "Shape",
        description: "シェイプ",
        attributes:
          "shapeType (rect/roundRect/ellipse/triangle/star5/cloud/downArrow等), text, fill.color, fill.transparency, line, shadow.type/opacity/blur/angle/offset/color, fontSize, color, textAlign, bold, italic, underline, strike, highlight, fontFamily, lineHeight",
      },
      {
        name: "Icon",
        description: "アイコン",
        attributes:
          "name (cpu/database/cloud/server/code/terminal/globe/user/users/briefcase/building/bar-chart/mail/search/settings/check/shield/lock/file/folder/calendar/clock/star/heart/zap/lightbulb等), size, color",
      },
      {
        name: "Line",
        description: "線",
        attributes:
          "x1, y1, x2, y2, color, lineWidth, dashType, beginArrow, endArrow",
      },
    ],
  },
  {
    title: "図表",
    elements: [
      {
        name: "Chart",
        description: "チャート",
        attributes:
          "chartType (bar/line/pie/area/doughnut/radar), showLegend, showTitle, title, chartColors, radarStyle / 子要素: ChartSeries (name), ChartDataPoint (label, value)",
      },
      {
        name: "Timeline",
        description: "タイムライン",
        attributes:
          "direction / 子要素: TimelineItem (date, title, description, color)",
      },
      {
        name: "Matrix",
        description: "2x2 マトリクス",
        attributes:
          "子要素: MatrixAxes (x, y), MatrixQuadrants (topLeft, topRight, bottomLeft, bottomRight), MatrixItem (label, x, y, color)",
      },
      {
        name: "Tree",
        description: "ツリー/組織図",
        attributes:
          "layout, nodeShape, nodeWidth, nodeHeight, levelGap, siblingGap, connectorStyle / 子要素: TreeItem (label, color) ※再帰ネスト可",
      },
      {
        name: "Flow",
        description: "フローチャート",
        attributes:
          "direction, nodeWidth, nodeHeight, nodeGap, connectorStyle / 子要素: FlowNode (id, shape, text, color), FlowConnection (from, to, label, color)",
      },
      {
        name: "ProcessArrow",
        description: "プロセス矢印",
        attributes:
          "direction, itemWidth, itemHeight, gap, fontSize, bold, italic, strike / 子要素: ProcessArrowStep (label, color, textColor)",
      },
      {
        name: "Pyramid",
        description: "ピラミッド図",
        attributes:
          "direction (up/down) / 子要素: PyramidLevel (label, color, textColor)",
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
  { name: "w", type: 'number | "max" | "%"', description: "幅" },
  { name: "h", type: 'number | "max" | "%"', description: "高さ" },
  { name: "minW / maxW", type: "number", description: "最小/最大幅" },
  { name: "minH / maxH", type: "number", description: "最小/最大高さ" },
  {
    name: "padding",
    type: "number | padding.top/right/bottom/left",
    description: "パディング",
  },
  {
    name: "backgroundColor",
    type: "string",
    description: "背景色（16進数）",
  },
  {
    name: "backgroundImage",
    type: "backgroundImage.src, backgroundImage.sizing",
    description: "背景画像",
  },
  {
    name: "border",
    type: "border.color, border.width, border.dashType",
    description: "枠線",
  },
  { name: "borderRadius", type: "number", description: "角丸" },
  { name: "opacity", type: "number (0-1)", description: "不透明度" },
  {
    name: "margin",
    type: "number | margin.top/right/bottom/left",
    description: "マージン",
  },
  {
    name: "alignSelf",
    type: '"start" | "center" | "end" | "stretch" | "auto"',
    description: "自身の配置",
  },
  { name: "zIndex", type: "number", description: "重なり順" },
  {
    name: "position",
    type: '"relative" | "absolute"',
    description: "配置モード",
  },
  {
    name: "top / right / bottom / left",
    type: "number",
    description: "絶対位置指定",
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
          aria-label="XML リファレンスを開く"
          title="XML リファレンス"
        >
          <CircleHelp className="size-4" />
          <span>リファレンス</span>
        </button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md" side="right">
        <SheetHeader>
          <SheetTitle>XML リファレンス</SheetTitle>
          <SheetDescription>
            pom がサポートする XML 要素と属性の一覧
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-6 overflow-y-auto px-4 pb-4">
          <div className="relative">
            <Search className="text-muted-foreground absolute top-2.5 left-2.5 size-4" />
            <input
              type="text"
              placeholder="要素名や属性で検索..."
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
              <h3 className="mb-2 text-sm font-semibold">共通属性</h3>
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
                一致する要素が見つかりません
              </p>
            )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
