import { describe, it, expect } from "vitest";
import {
  coerceWithRule,
  coerceUnionWithRules,
  coerceFallback,
  getObjectShapeFromRule,
  isBooleanObjectUnionRule,
  type CoercionRule,
} from "./coercionRules.ts";

describe("coercionRules", () => {
  describe("coerceWithRule", () => {
    it("number: 数値文字列を number に変換する", () => {
      expect(coerceWithRule("42", "number")).toEqual({
        value: 42,
        error: null,
      });
      expect(coerceWithRule("3.14", "number")).toEqual({
        value: 3.14,
        error: null,
      });
    });

    it("number: 不正な値でエラーを返す", () => {
      const result = coerceWithRule("abc", "number");
      expect(result.value).toBeUndefined();
      expect(result.error).toContain("Cannot convert");
    });

    it("number: 空文字でエラーを返す", () => {
      const result = coerceWithRule("", "number");
      expect(result.value).toBeUndefined();
      expect(result.error).toContain("Cannot convert");
    });

    it("boolean: true/false を変換する", () => {
      expect(coerceWithRule("true", "boolean")).toEqual({
        value: true,
        error: null,
      });
      expect(coerceWithRule("false", "boolean")).toEqual({
        value: false,
        error: null,
      });
    });

    it("boolean: 不正な値でエラーを返す", () => {
      const result = coerceWithRule("yes", "boolean");
      expect(result.value).toBeUndefined();
      expect(result.error).toContain("Cannot convert");
    });

    it("string: そのまま返す", () => {
      expect(coerceWithRule("hello", "string")).toEqual({
        value: "hello",
        error: null,
      });
    });

    it("json: JSON 文字列をパースする", () => {
      expect(coerceWithRule("[1,2,3]", "json")).toEqual({
        value: [1, 2, 3],
        error: null,
      });
      expect(coerceWithRule('{"a":1}', "json")).toEqual({
        value: { a: 1 },
        error: null,
      });
    });

    it("json: 不正な JSON でエラーを返す", () => {
      const result = coerceWithRule("not-json", "json");
      expect(result.value).toBeUndefined();
      expect(result.error).toContain("Cannot parse JSON");
    });

    it("literal: リテラル値を返す", () => {
      const rule: CoercionRule = { type: "literal", value: "max" };
      expect(coerceWithRule("anything", rule)).toEqual({
        value: "max",
        error: null,
      });
    });

    it("union: 適切な型に変換する", () => {
      // lengthSchema 相当: number | literal("max") | string
      const rule: CoercionRule = {
        type: "union",
        options: ["number", { type: "literal", value: "max" }, "string"],
      };
      expect(coerceWithRule("42", rule)).toEqual({ value: 42, error: null });
      expect(coerceWithRule("max", rule)).toEqual({
        value: "max",
        error: null,
      });
      expect(coerceWithRule("50%", rule)).toEqual({
        value: "50%",
        error: null,
      });
    });

    it("object: JSON パースする", () => {
      const rule: CoercionRule = {
        type: "object",
        shape: { color: "string", width: "number" },
      };
      expect(coerceWithRule('{"color":"red","width":2}', rule)).toEqual({
        value: { color: "red", width: 2 },
        error: null,
      });
    });

    it("object: 不正な JSON でエラーを返す", () => {
      const rule: CoercionRule = {
        type: "object",
        shape: { color: "string" },
      };
      const result = coerceWithRule("not-json", rule);
      expect(result.value).toBeUndefined();
      expect(result.error).toContain("Cannot parse JSON");
    });
  });

  describe("coerceUnionWithRules", () => {
    it("boolean を優先的に試行する", () => {
      expect(coerceUnionWithRules("true", ["boolean", "string"])).toBe(true);
      expect(coerceUnionWithRules("false", ["boolean", "string"])).toBe(false);
    });

    it("number を試行する", () => {
      expect(coerceUnionWithRules("42", ["number", "string"])).toBe(42);
    });

    it("literal にマッチする", () => {
      const options: CoercionRule[] = [
        "number",
        { type: "literal", value: "max" },
        "string",
      ];
      expect(coerceUnionWithRules("max", options)).toBe("max");
    });

    it("JSON パースを試行する", () => {
      const options: CoercionRule[] = [
        "number",
        { type: "object", shape: { x: "number" } },
      ];
      expect(coerceUnionWithRules('{"x":1}', options)).toEqual({ x: 1 });
    });

    it("どれにもマッチしない場合は文字列にフォールバックする", () => {
      expect(coerceUnionWithRules("hello", ["number", "boolean"])).toBe(
        "hello",
      );
    });
  });

  describe("coerceFallback", () => {
    it("true/false を boolean に変換する", () => {
      expect(coerceFallback("true")).toBe(true);
      expect(coerceFallback("false")).toBe(false);
    });

    it("数値文字列を number に変換する", () => {
      expect(coerceFallback("42")).toBe(42);
    });

    it("JSON 文字列をパースする", () => {
      expect(coerceFallback('{"a":1}')).toEqual({ a: 1 });
    });

    it("それ以外は文字列のまま返す", () => {
      expect(coerceFallback("hello")).toBe("hello");
    });
  });

  describe("getObjectShapeFromRule", () => {
    it("object ルールから shape を取得する", () => {
      const rule: CoercionRule = {
        type: "object",
        shape: { color: "string", width: "number" },
      };
      expect(getObjectShapeFromRule(rule)).toEqual({
        color: "string",
        width: "number",
      });
    });

    it("union ルール内の object から shape を取得する", () => {
      const rule: CoercionRule = {
        type: "union",
        options: ["boolean", { type: "object", shape: { type: "string" } }],
      };
      expect(getObjectShapeFromRule(rule)).toEqual({ type: "string" });
    });

    it("object を含まないルールでは undefined を返す", () => {
      expect(getObjectShapeFromRule("number")).toBeUndefined();
      expect(getObjectShapeFromRule("string")).toBeUndefined();
    });

    it("object を含まない union では undefined を返す", () => {
      const rule: CoercionRule = {
        type: "union",
        options: ["boolean", "string"],
      };
      expect(getObjectShapeFromRule(rule)).toBeUndefined();
    });
  });

  describe("isBooleanObjectUnionRule", () => {
    it("boolean と object の union を検出する", () => {
      const rule: CoercionRule = {
        type: "union",
        options: ["boolean", { type: "object", shape: { type: "string" } }],
      };
      expect(isBooleanObjectUnionRule(rule)).toBe(true);
    });

    it("boolean のみの union では false を返す", () => {
      const rule: CoercionRule = {
        type: "union",
        options: ["boolean", "string"],
      };
      expect(isBooleanObjectUnionRule(rule)).toBe(false);
    });

    it("プリミティブルールでは false を返す", () => {
      expect(isBooleanObjectUnionRule("number")).toBe(false);
      expect(isBooleanObjectUnionRule("boolean")).toBe(false);
    });

    it("object ルール単体では false を返す", () => {
      expect(
        isBooleanObjectUnionRule({
          type: "object",
          shape: { x: "number" },
        }),
      ).toBe(false);
    });
  });
});
