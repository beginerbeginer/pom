/**
 * react-reconciler を使った静的レンダラー。
 *
 * react-test-renderer の代替として実装した自前レンダラー。
 * 静的な PPTX 生成に特化しており、更新・アニメーションは不要なため
 * 初回レンダリングのみを行う。
 *
 * react-test-renderer ではなく react-reconciler を使う理由:
 * - react-test-renderer は React 19 で非推奨
 * - 静的用途専用のため余分な DOM エミュレーションが不要
 * - act() / IS_REACT_ACT_ENVIRONMENT のハックが不要
 */
import React, { act } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore — react-reconciler の型定義が React 19 の新 API を未カバーのため
import Reconciler from "react-reconciler";
import { DefaultEventPriority } from "react-reconciler/constants.js";
import type { SerializableNode } from "./renderer.ts";

// ─── ホスト型定義 ──────────────────────────────────────────────────────────

type Container = { children: SerializableNode[] };
type Instance = SerializableNode;
// 文字列 TextInstance は Text/Shape コンポーネント以外では使わない（無視する）
type TextInstance = { __text: string };

// ─── 文字列 children → text prop 昇格 ────────────────────────────────────

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

// ─── 優先度管理（静的レンダリング用スタブ）──────────────────────────────────

let _currentPriority = DefaultEventPriority;

// ─── Host Config ──────────────────────────────────────────────────────────

// React 19 (react-reconciler 0.33) では @types/react-reconciler が未カバーの
// 新フィールドが多数あるため any で型チェックを回避する。
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pomReconciler = Reconciler({
  // ── 基本設定 ─────────────────────────────────────────────────────────────
  supportsMutation: true,
  supportsPersistence: false,
  supportsHydration: false,
  supportsMicrotasks: false,   // 同期レンダリングのためマイクロタスク不要
  isPrimaryRenderer: true,
  warnsIfNotActing: false,
  noTimeout: -1,
  scheduleTimeout: setTimeout,
  cancelTimeout: clearTimeout,

  // ── 優先度（React 19 で新規追加された必須フィールド）────────────────────
  resolveUpdatePriority: () => _currentPriority,
  setCurrentUpdatePriority: (priority: number) => { _currentPriority = priority; },
  getCurrentUpdatePriority: () => _currentPriority,
  getCurrentEventPriority: () => DefaultEventPriority,

  // ── Transition サポート（静的レンダリングでは不使用）────────────────────
  trackSchedulerEvent: () => {},
  resolveEventType: () => null,
  resolveEventTimeStamp: () => -1,
  shouldAttemptEagerTransition: () => false,
  NotPendingTransition: null,
  HostTransitionContext: React.createContext(null),

  // ── Suspense サポート（不使用）──────────────────────────────────────────
  maySuspendCommit: () => false,
  maySuspendCommitOnUpdate: () => false,
  maySuspendCommitInSyncRender: () => false,
  preloadInstance: () => true,
  startSuspendingCommit: () => {},
  suspendInstance: () => {},
  waitForCommitToBeReady: () => null,
  getSuspendedCommitReason: () => null,

  // ── テストセレクタ（不使用）─────────────────────────────────────────────
  supportsTestSelectors: false,

  // ── インスタンス生成 ──────────────────────────────────────────────────────

  createInstance(type: string, props: Record<string, unknown>): Instance {
    const { children: _c, ...rest } = props;

    // Text / Shape は文字列 children を text prop に昇格する
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

  // ── 子要素の追加 ──────────────────────────────────────────────────────────

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

  // ── テキスト処理 ──────────────────────────────────────────────────────────

  // Text/Shape コンポーネントで文字列 children が来たとき、
  // 子テキストノードを生成せず props.children をそのまま保持する。
  // createInstance 内で text prop への昇格を行うため。
  shouldSetTextContent(type: string, props: Record<string, unknown>): boolean {
    if (!TEXT_CONTENT_TAGS.has(type)) return false;
    return extractStringText(props.children) !== null;
  },

  // ── コンテキスト ──────────────────────────────────────────────────────────
  getRootHostContext: () => ({}),
  getChildHostContext: () => ({}),

  // ── コミット ─────────────────────────────────────────────────────────────
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

  // ── その他 ──────────────────────────────────────────────────────────────
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

// ─── 公開関数 ─────────────────────────────────────────────────────────────

/**
 * React 要素を SerializableNode[] に変換する。
 *
 * act() でラップすることで未コミットの更新を同期的にフラッシュする。
 * IS_REACT_ACT_ENVIRONMENT を設定することで act() の環境警告を抑制する。
 */
export function renderReactElement(element: React.ReactElement): SerializableNode[] {
  (globalThis as Record<string, unknown>).IS_REACT_ACT_ENVIRONMENT = true;

  const container: Container = { children: [] };

  const root = pomReconciler.createContainer(
    container,
    /* tag (LegacyRoot) */ 0,
    /* hydrationCallbacks */ null,
    /* isStrictMode */ false,
    /* concurrentUpdatesByDefaultOverride */ null,
    /* identifierPrefix */ "",
    /* onRecoverableError */ () => {},
    /* transitionCallbacks */ null,
  );

  act(() => {
    pomReconciler.updateContainer(element, root, null, null);
  });

  return container.children;
}
