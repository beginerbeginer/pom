import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import type { StructuredError } from "./SlidePreview";
import { SlidePreview } from "./SlidePreview";

vi.mock("../lib/copySvgAsPng", () => ({
  copySvgAsPng: vi.fn().mockResolvedValue(undefined),
}));

afterEach(cleanup);

const defaultProps = {
  svgs: [],
  isLoading: false,
  errors: null,
  currentPage: 1,
  onPageChange: vi.fn(),
  onErrorClick: vi.fn(),
};

describe("SlidePreview", () => {
  describe("ローディング状態", () => {
    it("isLoading=true のとき 'Generating preview...' を表示する", () => {
      render(<SlidePreview {...defaultProps} isLoading={true} />);
      expect(screen.getByText("Generating preview...")).toBeInTheDocument();
    });
  });

  describe("空状態", () => {
    it("svgs が空の場合 'Edit XML to see a preview' を表示する", () => {
      render(<SlidePreview {...defaultProps} />);
      expect(screen.getByText("Edit XML to see a preview")).toBeInTheDocument();
    });
  });

  describe("エラー表示", () => {
    const errors: StructuredError[] = [
      { type: "xml_syntax", message: "Tag is not closed", line: 3 },
      { type: "schema", message: "Invalid attribute value" },
      { type: "structure", message: "Unknown tag found", line: 5 },
      { type: "unknown", message: "Something went wrong" },
    ];

    it("エラーリストを表示する", () => {
      render(<SlidePreview {...defaultProps} errors={errors} />);
      expect(screen.getByText("Tag is not closed")).toBeInTheDocument();
      expect(screen.getByText("Invalid attribute value")).toBeInTheDocument();
      expect(screen.getByText("Unknown tag found")).toBeInTheDocument();
      expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    });

    it("type に応じたラベルを表示する", () => {
      render(<SlidePreview {...defaultProps} errors={errors} />);
      expect(screen.getByText("XML Syntax Error")).toBeInTheDocument();
      expect(screen.getByText("Attribute Value Error")).toBeInTheDocument();
      expect(screen.getByText("Structure Error")).toBeInTheDocument();
      expect(screen.getByText("Error")).toBeInTheDocument();
    });

    it("line を持つエラーをクリックすると onErrorClick を呼ぶ", async () => {
      const user = userEvent.setup();
      const onErrorClick = vi.fn();
      render(
        <SlidePreview
          {...defaultProps}
          errors={errors}
          onErrorClick={onErrorClick}
        />,
      );

      await user.click(screen.getByText("Tag is not closed"));
      expect(onErrorClick).toHaveBeenCalledWith(0);
    });

    it("line を持たないエラーをクリックしても onErrorClick を呼ばない", async () => {
      const user = userEvent.setup();
      const onErrorClick = vi.fn();
      render(
        <SlidePreview
          {...defaultProps}
          errors={errors}
          onErrorClick={onErrorClick}
        />,
      );

      await user.click(screen.getByText("Invalid attribute value"));
      expect(onErrorClick).not.toHaveBeenCalled();
    });
  });

  describe("SVG 表示", () => {
    const svgs = [
      '<svg xmlns="http://www.w3.org/2000/svg"><text>Slide 1</text></svg>',
      '<svg xmlns="http://www.w3.org/2000/svg"><text>Slide 2</text></svg>',
    ];

    it("SVG をレンダリングする", () => {
      render(<SlidePreview {...defaultProps} svgs={svgs} currentPage={1} />);
      expect(screen.getByText("Slide 1")).toBeInTheDocument();
    });

    it("Copy as image ボタンが表示される", () => {
      render(<SlidePreview {...defaultProps} svgs={svgs} currentPage={1} />);
      expect(screen.getByLabelText("Copy as image")).toBeInTheDocument();
    });
  });

  describe("ページネーション", () => {
    const svgs = [
      '<svg xmlns="http://www.w3.org/2000/svg"><text>Slide 1</text></svg>',
      '<svg xmlns="http://www.w3.org/2000/svg"><text>Slide 2</text></svg>',
      '<svg xmlns="http://www.w3.org/2000/svg"><text>Slide 3</text></svg>',
    ];

    it("複数ページの場合、ページ番号を表示する", () => {
      render(<SlidePreview {...defaultProps} svgs={svgs} currentPage={2} />);
      expect(screen.getByText("2 / 3")).toBeInTheDocument();
    });

    it("次ページボタンで onPageChange を呼ぶ", async () => {
      const user = userEvent.setup();
      const onPageChange = vi.fn();
      render(
        <SlidePreview
          {...defaultProps}
          svgs={svgs}
          currentPage={1}
          onPageChange={onPageChange}
        />,
      );

      await user.click(screen.getByRole("button", { name: "Next page" }));
      expect(onPageChange).toHaveBeenCalledWith(2);
    });

    it("前ページボタンで onPageChange を呼ぶ", async () => {
      const user = userEvent.setup();
      const onPageChange = vi.fn();
      render(
        <SlidePreview
          {...defaultProps}
          svgs={svgs}
          currentPage={2}
          onPageChange={onPageChange}
        />,
      );

      await user.click(screen.getByRole("button", { name: "Previous page" }));
      expect(onPageChange).toHaveBeenCalledWith(1);
    });

    it("単一ページの場合、ページネーションを表示しない", () => {
      render(
        <SlidePreview {...defaultProps} svgs={[svgs[0]]} currentPage={1} />,
      );
      expect(screen.queryByText("1 / 1")).not.toBeInTheDocument();
    });
  });
});
