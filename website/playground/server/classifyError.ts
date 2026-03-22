import { ParseXmlError } from "@hirokisakabe/pom";
import { XMLValidator } from "fast-xml-parser";

export type ErrorType = "xml_syntax" | "schema" | "structure" | "unknown";

export interface StructuredError {
  type: ErrorType;
  message: string;
  line?: number;
  column?: number;
  tagName?: string;
}

const XML_SYNTAX_PATTERNS = [
  /is not closed/i,
  /invalid.*xml/i,
  /unexpected.*closing/i,
];

const SCHEMA_PATTERNS = [
  /Cannot convert ".+" to number/,
  /Cannot convert ".+" to boolean/,
  /is not valid JSON$/,
  /Unknown attribute/,
  /Missing required attribute/,
];

const STRUCTURE_PATTERNS = [
  /<\w+> must have exactly/,
  /Unexpected child elements/,
  /Unknown child element/,
  /Unknown tag:/,
];

function matchesAny(message: string, patterns: RegExp[]): boolean {
  return patterns.some((p) => p.test(message));
}

function extractTagName(message: string): string | undefined {
  // パターン1: "<TagName>: ..." or "<TagName>.<SubTag>: ..."
  const prefixMatch = /^<(\w+)>/.exec(message);
  if (prefixMatch) {
    return prefixMatch[1];
  }

  // パターン2: "Unknown tag: <TagName>"
  const unknownTagMatch = /Unknown tag: <(\w+)>/.exec(message);
  if (unknownTagMatch) {
    return unknownTagMatch[1];
  }

  // パターン3: "Unknown child element <TagName> inside <ParentTag>"
  const childMatch = /Unknown child element <(\w+)>/.exec(message);
  if (childMatch) {
    return childMatch[1];
  }

  return undefined;
}

function findTagLine(xml: string, tagName: string): number | undefined {
  const lines = xml.split("\n");
  const pattern = new RegExp(`<${tagName}[\\s>/]`);
  for (let i = 0; i < lines.length; i++) {
    if (pattern.test(lines[i])) {
      return i + 1;
    }
  }
  return undefined;
}

function getXmlSyntaxErrorPosition(
  xml: string,
): { line: number; column: number } | undefined {
  const result = XMLValidator.validate(xml);
  if (result === true) {
    return undefined;
  }
  return { line: result.err.line, column: result.err.col };
}

function classifySingleError(message: string, xml: string): StructuredError {
  const tagName = extractTagName(message);
  const line = tagName ? findTagLine(xml, tagName) : undefined;

  if (matchesAny(message, SCHEMA_PATTERNS)) {
    return { type: "schema", message, line, tagName };
  }

  if (matchesAny(message, STRUCTURE_PATTERNS)) {
    return { type: "structure", message, line, tagName };
  }

  return { type: "unknown", message, line, tagName };
}

export function classifyError(error: unknown, xml: string): StructuredError[] {
  if (error instanceof ParseXmlError) {
    return error.errors.map(function classifyParsed(msg) {
      return classifySingleError(msg, xml);
    });
  }

  if (!(error instanceof Error)) {
    return [{ type: "unknown", message: "不明なエラーが発生しました" }];
  }

  const message = error.message;

  if (matchesAny(message, XML_SYNTAX_PATTERNS)) {
    const pos = getXmlSyntaxErrorPosition(xml);
    return [
      {
        type: "xml_syntax",
        message,
        line: pos?.line,
        column: pos?.column,
      },
    ];
  }

  return [{ type: "unknown", message }];
}
