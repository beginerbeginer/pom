import React, { act } from "react";
// @types/react-reconciler 0.33 が React 19 で追加された resolveUpdatePriority 等を
// 未カバーのため @ts-ignore で型チェックを回避する。
// 型安全性は各メソッドの引数・戻り値の型注釈で個別に確保している。
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Reconciler from "react-reconciler";
import { DefaultEventPriority } from "react-reconciler/constants.js";
import type { SerializableNode } from "./renderer.ts";

type Container = { children: SerializableNode[] };
type Instance = SerializableNode;
// null ではなく { __text: string } にする。
// react-reconciler は "tag" in child で Instance と TextInstance を区別できないため、
// 構造体にすることでユニオン判定を安全に行える。
type TextInstance = { __text: string };

const TEXT_CONTENT_TAGS = new Set(["Text", "Shape"]);

function extractStringText(children: unknown): string | null {
  if (typeof children === "string") return children;
  if (
    Array.isArray(children) &&
    children.length > 0 &&
    children.every((c) => typeof c === "string")
  ) {
    return children.join("");
  }
  return null;
}

// resolveUpdatePriority / setCurrentUpdatePriority / getCurrentUpdatePriority は
// react-reconciler 0.33 (React 19) で host config に追加された必須フィールド。
// react-dom はイベントシステムと連動してこれらを実装するが、
// 静的レンダリングにはイベント優先度の動的変更が不要なため定数を返す。
let _currentPriority = DefaultEventPriority;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pomReconciler = Reconciler({
  supportsMutation: true,
  supportsPersistence: false,
  supportsHydration: false,
  // false にする理由: マイクロタスクを有効にすると updateContainer が非同期コミットを
  // 期待し、act() でフラッシュしても順序が保証されなくなる。
  supportsMicrotasks: false,
  isPrimaryRenderer: true,
  warnsIfNotActing: false,
  noTimeout: -1,
  scheduleTimeout: setTimeout,
  cancelTimeout: clearTimeout,

  resolveUpdatePriority: () => _currentPriority,
  setCurrentUpdatePriority: (priority: number) => { _currentPriority = priority; },
  getCurrentUpdatePriority: () => _currentPriority,
  getCurrentEventPriority: () => DefaultEventPriority,

  trackSchedulerEvent: () => {},
  resolveEventType: () => null,
  resolveEventTimeStamp: () => -1,
  shouldAttemptEagerTransition: () => false,
  NotPendingTransition: null,
  // ThemeProvider 等のコンテキストと衝突しないよう null を初期値とする専用コンテキスト。
  HostTransitionContext: React.createContext(null),

  maySuspendCommit: () => false,
  maySuspendCommitOnUpdate: () => false,
  maySuspendCommitInSyncRender: () => false,
  preloadInstance: () => true,
  startSuspendingCommit: () => {},
  suspendInstance: () => {},
  waitForCommitToBeReady: () => null,
  getSuspendedCommitReason: () => null,

  supportsTestSelectors: false,

  createInstance(type: string, props: Record<string, unknown>): Instance {
    const { children: _c, ...rest } = props;

    if (TEXT_CONTENT_TAGS.has(type)) {
      const text = extractStringText(props.children);
      if (text !== null) {
        return { tag: type, props: { ...rest, text }, children: [] };
      }
    }

    return { tag: type, props: rest, children: [] };
  },

  createTextInstance(text: string): TextInstance {
    return { __text: text };
  },

  appendInitialChild(parent: Instance, child: Instance | TextInstance): void {
    if ("tag" in child) parent.children.push(child);
  },

  appendChild(parent: Instance, child: Instance | TextInstance): void {
    if ("tag" in child) parent.children.push(child);
  },

  appendChildToContainer(container: Container, child: Instance | TextInstance): void {
    if ("tag" in child) container.children.push(child);
  },

  insertBefore(parent: Instance, child: Instance | TextInstance, before: Instance | TextInstance): void {
    if (!("tag" in child) || !("tag" in before)) return;
    const idx = parent.children.indexOf(before);
    if (idx !== -1) parent.children.splice(idx, 0, child);
  },

  insertInContainerBefore(container: Container, child: Instance | TextInstance, before: Instance | TextInstance): void {
    if (!("tag" in child) || !("tag" in before)) return;
    const idx = container.children.indexOf(before);
    if (idx !== -1) container.children.splice(idx, 0, child);
  },

  removeChild(parent: Instance, child: Instance | TextInstance): void {
    if (!("tag" in child)) return;
    const idx = parent.children.indexOf(child);
    if (idx !== -1) parent.children.splice(idx, 1);
  },

  removeChildFromContainer(container: Container, child: Instance | TextInstance): void {
    if (!("tag" in child)) return;
    const idx = container.children.indexOf(child);
    if (idx !== -1) container.children.splice(idx, 1);
  },

  clearContainer(container: Container): void {
    container.children = [];
  },

  // false ではなく shouldSetTextContent を実装する理由:
  // shouldSetTextContent=true の場合、reconciler は createTextInstance を呼ばずに
  // props.children を文字列として createInstance に渡す。
  // appendInitialChild で TextInstance を無視するだけでは文字列 children が
  // ツリーから消えてしまうため、createInstance で text prop に昇格できるよう
  // 事前に reconciler の振る舞いを切り替える必要がある。
  shouldSetTextContent(type: string, props: Record<string, unknown>): boolean {
    if (!TEXT_CONTENT_TAGS.has(type)) return false;
    return extractStringText(props.children) !== null;
  },

  getRootHostContext: () => ({}),
  getChildHostContext: () => ({}),

  prepareForCommit: () => null,
  resetAfterCommit: () => {},
  preparePortalMount: () => {},
  finalizeInitialChildren: () => false,
  prepareUpdate: () => null,
  commitMount: () => {},
  commitUpdate: () => {},
  commitTextUpdate: () => {},
  resetTextContent: () => {},
  hideInstance: () => {},
  hideTextInstance: () => {},
  unhideInstance: () => {},
  unhideTextInstance: () => {},

  getPublicInstance: (instance: Instance) => instance,
  getInstanceFromNode: () => null,
  beforeActiveInstanceBlur: () => {},
  afterActiveInstanceBlur: () => {},
  prepareScopeUpdate: () => {},
  getInstanceFromScope: () => null,
  detachDeletedInstance: () => {},
  requestPostPaintCallback: () => {},
  bindToConsole: (method: unknown) => method,
  resetFormInstance: () => {},
});

export function renderReactElement(element: React.ReactElement): SerializableNode[] {
  // flushSync ではなく act() を使う理由:
  // pomReconciler.flushSync は LegacyRoot との組み合わせで動作が保証されていない。
  // react の act() は任意のカスタムレンダラーに対しても更新をフラッシュすることが
  // 仕様で保証されている。IS_REACT_ACT_ENVIRONMENT=true は act() の
  // 「テスト環境外で使われた」という警告を抑制するための設定。
  (globalThis as Record<string, unknown>).IS_REACT_ACT_ENVIRONMENT = true;

  const container: Container = { children: [] };

  // ConcurrentRoot (1) ではなく LegacyRoot (0) を使う理由:
  // ConcurrentRoot は useTransition / Suspense 等の並行機能を有効にするが、
  // 静的レンダリングではこれらが不要でデバッグが複雑になる。
  // LegacyRoot は同期的なツリー構築が保証されており、静的用途に適している。
  const root = pomReconciler.createContainer(
    container,
    0,
    null,
    false,
    null,
    "",
    () => {},
    null,
  );

  act(() => {
    pomReconciler.updateContainer(element, root, null, null);
  });

  return container.children;
}
