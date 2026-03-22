import type { POMNode, PositionedNode } from "../types.ts";
import type { BuildContext } from "../buildContext.ts";
import { getNodeDef } from "../registry/index.ts";

/**
 * POMNode から yogaNode を除外したオブジェクトを返す。
 * PositionedNode に yogaNode 参照が残らないようにするため。
 */
export function omitYogaNode<T extends POMNode>(pom: T): Omit<T, "yogaNode"> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { yogaNode, ...rest } = pom;
  return rest;
}

/**
 * POMNode ツリーを絶対座標付きの PositionedNode ツリーに変換する
 * @param pom 入力 POMNode
 * @param ctx BuildContext
 * @param parentX 親ノードの絶対X座標
 * @param parentY 親ノードの絶対Y座標
 * @returns PositionedNode ツリー
 */
export function toPositioned(
  pom: POMNode,
  ctx: BuildContext,
  parentX = 0,
  parentY = 0,
): PositionedNode {
  if (!pom.yogaNode) {
    throw new Error("yogaNode not set on POMNode");
  }

  const layout = pom.yogaNode.getComputedLayout();
  const absoluteX = parentX + layout.left;
  const absoluteY = parentY + layout.top;

  const def = getNodeDef(pom.type);

  // ノード固有のカスタム変換がある場合はそれを使用
  if (def.toPositioned) {
    return def.toPositioned(pom, absoluteX, absoluteY, layout, ctx);
  }

  // category ベースのデフォルト処理
  switch (def.category) {
    case "leaf":
      return {
        ...omitYogaNode(pom),
        x: absoluteX,
        y: absoluteY,
        w: layout.width,
        h: layout.height,
      } as PositionedNode;

    case "single-child": {
      const boxNode = pom as Extract<POMNode, { type: "box" }>;
      return {
        ...omitYogaNode(boxNode),
        x: absoluteX,
        y: absoluteY,
        w: layout.width,
        h: layout.height,
        children: toPositioned(boxNode.children, ctx, absoluteX, absoluteY),
      } as PositionedNode;
    }

    case "multi-child": {
      const containerNode = pom as Extract<
        POMNode,
        { type: "vstack" | "hstack" }
      >;
      return {
        ...omitYogaNode(containerNode),
        x: absoluteX,
        y: absoluteY,
        w: layout.width,
        h: layout.height,
        children: containerNode.children.map((child) =>
          toPositioned(child, ctx, absoluteX, absoluteY),
        ),
      } as PositionedNode;
    }

    case "absolute-child":
      // absolute-child (layer) は必ずカスタム toPositioned を持つべき
      throw new Error(
        `Node type "${pom.type}" with category "absolute-child" must have a custom toPositioned`,
      );
  }
}
