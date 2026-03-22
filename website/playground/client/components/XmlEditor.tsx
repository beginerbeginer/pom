"use client";

import { xml } from "@codemirror/lang-xml";
import type { Diagnostic } from "@codemirror/lint";
import { lintGutter, setDiagnostics } from "@codemirror/lint";
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { basicSetup } from "codemirror";
import { useEffect, useRef } from "react";

import type { StructuredError } from "./SlidePreview";

function errorTypeToSeverity(type: string): Diagnostic["severity"] {
  switch (type) {
    case "xml_syntax":
      return "error";
    case "schema":
      return "error";
    case "structure":
      return "warning";
    default:
      return "info";
  }
}

interface XmlEditorProps {
  value: string;
  onChange: (value: string) => void;
  errors: StructuredError[] | null;
  onViewReady?: (view: EditorView) => void;
}

export function XmlEditor({
  value,
  onChange,
  errors,
  onViewReady,
}: XmlEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (!editorRef.current) return;

    const state = EditorState.create({
      doc: value,
      extensions: [
        basicSetup,
        xml(),
        lintGutter(),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onChangeRef.current(update.state.doc.toString());
          }
        }),
      ],
    });

    const view = new EditorView({
      state,
      parent: editorRef.current,
    });

    viewRef.current = view;

    if (onViewReady) {
      onViewReady(view);
    }

    return () => {
      view.destroy();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;

    const currentDoc = view.state.doc.toString();
    if (currentDoc !== value) {
      view.dispatch({
        changes: { from: 0, to: currentDoc.length, insert: value },
      });
    }
  }, [value]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;

    if (!errors || errors.length === 0) {
      view.dispatch(setDiagnostics(view.state, []));
      return;
    }

    const doc = view.state.doc;
    const diagnostics: Diagnostic[] = [];

    for (const error of errors) {
      if (!error.line) continue;

      const lineNum = Math.min(error.line, doc.lines);
      const line = doc.line(lineNum);

      diagnostics.push({
        from: line.from,
        to: line.to,
        severity: errorTypeToSeverity(error.type),
        message: error.message,
      });
    }

    view.dispatch(setDiagnostics(view.state, diagnostics));
  }, [errors]);

  return (
    <div
      ref={editorRef}
      className="h-full overflow-auto rounded-md border [&_.cm-editor]:h-full [&_.cm-scroller]:overflow-auto"
    />
  );
}
