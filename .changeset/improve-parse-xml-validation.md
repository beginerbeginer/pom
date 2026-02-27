---
"@hirokisakabe/pom": minor
---

parseXmlのバリデーション・エラーメッセージを改善。未知の属性名検出（Did you mean?提案付き）、Zodスキーマによるセマンティックバリデーション（enum値、数値範囲、必須属性）、リーフノードへの不正な子要素検出、複数エラーの一括報告に対応。ParseXmlErrorクラスを新規exportし、プログラム的なエラーハンドリングが可能に。
